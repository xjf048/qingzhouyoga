import { useEffect, useState } from 'react';
import { ArrowUpRight, RefreshCw } from 'lucide-react';
import SubNav from '../../components/layout/SubNav';
import {
  monthlyHistory,
  balanceSheet,
  mockOverview,
  mockCourses,
  mockCards,
  mockPriceList,
  mockRechargeTiers,
  studioAnalytics,
  studioOpeningDate,
} from '../../mock/data';

/* ---------- Animated number ---------- */
function AnimatedNumber({ value, prefix = '', suffix = '', decimals = 0 }: { value: number; prefix?: string; suffix?: string; decimals?: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  useEffect(() => {
    let raf = 0;
    const begin = performance.now();
    const duration = 1400;
    const tick = (t: number) => {
      const p = Math.min((t - begin) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplayValue(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  const formatted = decimals > 0 ? displayValue.toFixed(decimals) : Math.floor(displayValue).toLocaleString();
  return <span>{prefix}{formatted}{suffix}</span>;
}

function todayStr() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

const TODAY = todayStr();

/* --------------------------------------------------------------------------
   页面二级导航
   -------------------------------------------------------------------------- */
const opsSubNav = [
  { label: '月度营收',  href: '#monthly-revenue' },
  { label: '关键指标',  href: '#metrics' },
  { label: '卡分布',    href: '#card-dist' },
  { label: '充值档位',  href: '#recharge-tiers' },
  { label: '课程原价',  href: '#course-price' },
  { label: '会员清单',  href: '#members' },
];

export default function OperationsPage() {
  const days = Math.max(0, Math.floor((Date.now() - studioOpeningDate.getTime()) / 86400000));
  const totalSpentFromCards = mockCards.reduce((s, c) => s + (c.price || 0), 0);
  // 当前储值余额使用 OCR 权威数据 (2026-07-04 截图)，不再累加各卡余额
  const totalRemainingFromCards = studioAnalytics.balanceRemaining;
  const cardNameDist = mockCards.reduce<Record<string, number>>((acc, c) => {
    acc[c.cardName] = (acc[c.cardName] || 0) + 1;
    return acc;
  }, {});
  const activeCards = mockCards.filter((c) => c.cardStatus === '正常').length;
  const uniqueMembers = new Set(mockCards.map((c) => c.phone).filter(Boolean)).size;
  const maxRev = Math.max(...monthlyHistory.map((m) => m.revenue));
  const W = 800, H = 280, padTop = 40, padBottom = 32, padX = 24;
  const chartH = H - padTop - padBottom;
  const innerW = W - padX * 2;
  const slot = innerW / monthlyHistory.length;
  const barW = slot * 0.55;
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => Math.round(maxRev * t));

  return (
    <div className="min-h-screen bg-cream">
      {/* ====== Hero ====== */}
      <section className="bg-ink-900 text-white pt-32 sm:pt-40 pb-16 sm:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900 via-ink-900 to-ink-800" />
        <div className="absolute inset-0 opacity-20 mix-blend-luminosity"
             style={{ backgroundImage: 'radial-gradient(ellipse at 70% 30%, rgba(110,140,95,0.4), transparent 55%)' }} />
        <div className="relative container-x">
          <div className="flex items-center gap-3 mb-10 animate-fade-in">
            <span className="live-dot" />
            <span className="eyebrow-light">运营数据 · LIVE</span>
          </div>

          <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
            <h1 className="font-display font-black tracking-tightest leading-[0.92] text-[clamp(2.5rem,8vw,6rem)] max-w-4xl">
              <span className="block animate-slide-up">数据。</span>
              <span className="block animate-slide-up delay-100 italic font-medium text-sage-300">
                全部摆在这里。
              </span>
            </h1>
            <div className="flex items-center gap-3 text-xs font-mono text-white/55">
              <RefreshCw className="w-3.5 h-3.5" />
              <span>更新于 {TODAY}</span>
            </div>
          </div>

          {/* 5 KPI tiles */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-px bg-white/8 border border-white/10 rounded-2xl overflow-hidden">
            {[
              { l: '累计收款',   v: studioAnalytics.cumulativeRevenue,    p: '¥', s: '',       accent: true },
              { l: '当前储值余额', v: totalRemainingFromCards,             p: '¥', s: '',       accent: false },
              { l: '已耗卡',     v: studioAnalytics.cumulativeRevenue - totalRemainingFromCards, p: '¥', s: '', accent: false },
              { l: '独立会员',   v: uniqueMembers,                        p: '',  s: '位',     accent: false },
              { l: '活跃储值卡', v: activeCards,                          p: '',  s: ` / ${mockCards.length} 张`, accent: false },
            ].map((it) => (
              <div key={it.l} className={`bg-ink-900 p-5 sm:p-6 ${it.accent ? 'lg:col-span-1' : ''}`}>
                <p className="eyebrow-light text-[10px] mb-3 flex items-center gap-1.5">
                  <span className="live-dot" />
                  {it.l}
                </p>
                <p className={`font-mono tabular-nums text-3xl sm:text-4xl font-semibold tracking-tight ${it.accent ? 'text-sage-300' : 'text-white'}`}>
                  <AnimatedNumber value={it.v} prefix={it.p} suffix={it.s} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SubNav items={opsSubNav} />

      {/* ====== Section: 月度营收曲线 ====== */}
      <section id="monthly-revenue" className="container-x py-16">
        <SectionHead num="01" title="月度营收曲线" sub={`${monthlyHistory[0].label.slice(0, 4)} · ${monthlyHistory[0].month.slice(5)} → ${monthlyHistory[monthlyHistory.length-1].month.slice(0, 4)} · ${monthlyHistory[monthlyHistory.length-1].month.slice(5)}`} />

        <div className="border border-ink-200 rounded-2xl overflow-hidden bg-white">
          <div className="p-7 sm:p-9">
            <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" className="w-full h-auto" role="img" aria-label="月度营收柱状图">
              {ticks.map((v, i) => {
                const y = padTop + chartH * (1 - v / maxRev);
                return (
                  <g key={i}>
                    <line x1={padX} x2={W - padX} y1={y} y2={y} stroke="#E8E6E1" strokeWidth="1" strokeDasharray={i === 0 ? '0' : '3 3'} />
                    <text x={W - padX} y={y - 4} fontSize="10" fontFamily="ui-monospace, monospace" fill="#8A867D" textAnchor="end">
                      ¥{(v / 1000).toFixed(0)}k
                    </text>
                  </g>
                );
              })}
              {monthlyHistory.map((m, i) => {
                const x = padX + slot * i + (slot - barW) / 2;
                const h = (m.revenue / maxRev) * chartH;
                const y = padTop + chartH - h;
                const isPeak = m.revenue === maxRev;
                return (
                  <g key={m.month}>
                    <rect x={x} y={y} width={barW} height={Math.max(h, 2)} rx="4" fill={isPeak ? '#3D5A3D' : '#94AD85'} />
                    <text x={x + barW / 2} y={y - 8} fontSize="11" fontFamily="ui-monospace, monospace" fontWeight="700" fill="#1A1917" textAnchor="middle">
                      ¥{(m.revenue / 1000).toFixed(1)}k
                    </text>
                    <text x={x + barW / 2} y={H - 10} fontSize="11" fontFamily="ui-monospace, monospace" fill="#5E5B54" textAnchor="middle">
                      {m.month.slice(5)}月
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* 月度明细表 */}
          <div className="overflow-x-auto border-t border-ink-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs font-mono uppercase tracking-widest-2 text-muted bg-ink-100">
                  <th className="text-left font-medium px-5 py-3">月份</th>
                  <th className="text-right font-medium px-5 py-3">营收</th>
                  <th className="text-right font-medium px-5 py-3">新增会员</th>
                  <th className="text-right font-medium px-5 py-3">售卡</th>
                  <th className="text-right font-medium px-5 py-3">私教节数</th>
                  <th className="text-right font-medium px-5 py-3">耗卡金额</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {monthlyHistory.map((m) => (
                  <tr key={m.month} className="hover:bg-cream">
                    <td className="px-5 py-3 text-ink-900 font-medium font-mono">{m.month}</td>
                    <td className="px-5 py-3 text-right font-mono tabular-nums font-bold text-ink-900">¥{m.revenue.toLocaleString()}</td>
                    <td className="px-5 py-3 text-right font-mono tabular-nums text-ink-700">{m.newMembers}</td>
                    <td className="px-5 py-3 text-right font-mono tabular-nums text-ink-700">{m.cardsSold}</td>
                    <td className="px-5 py-3 text-right font-mono tabular-nums text-ink-700">{m.privateClasses ?? '—'}</td>
                    <td className="px-5 py-3 text-right font-mono tabular-nums text-ink-700">{m.spent ? `¥${m.spent.toLocaleString()}` : '—'}</td>
                  </tr>
                ))}
                <tr className="bg-ink-900 text-white">
                  <td className="px-5 py-3 font-display font-bold">合计</td>
                  <td className="px-5 py-3 text-right font-mono tabular-nums font-bold text-sage-300">¥{monthlyHistory.reduce((s, m) => s + m.revenue, 0).toLocaleString()}</td>
                  <td className="px-5 py-3 text-right font-mono tabular-nums">{monthlyHistory.reduce((s, m) => s + m.newMembers, 0)}</td>
                  <td className="px-5 py-3 text-right font-mono tabular-nums">{monthlyHistory.reduce((s, m) => s + m.cardsSold, 0)}</td>
                  <td className="px-5 py-3 text-right font-mono tabular-nums">{monthlyHistory.reduce((s, m) => s + (m.privateClasses ?? 0), 0)}</td>
                  <td className="px-5 py-3 text-right font-mono tabular-nums">¥{monthlyHistory.reduce((s, m) => s + (m.spent ?? 0), 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ====== Section: 关键指标 ====== */}
      <section id="metrics" className="container-x pb-16">
        <SectionHead num="02" title="关键指标" sub={`${days} 天 · ${mockCourses.length} 课类 · 4 档充值`} />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-ink-200 border border-ink-200 rounded-2xl overflow-hidden">
          {[
            { l: '累计收款',     v: studioAnalytics.cumulativeRevenue,   p: '¥', s: '', trend: '+14.2% MoM' },
            { l: '月均营收',     v: studioAnalytics.monthlyAvgRevenue,   p: '¥', s: '/ 月' },
            { l: '客单价',       v: studioAnalytics.avgMemberValue,      p: '¥', s: '/ 人' },
            { l: '私教单节均价', v: studioAnalytics.avgClassPrice,       p: '¥', s: '/ 节' },
            { l: '私教总节数',   v: studioAnalytics.totalPrivateClasses, p: '',  s: '节' },
            { l: '独立会员',     v: studioAnalytics.totalMembers,       p: '',  s: '位' },
            { l: '总售卡',       v: studioAnalytics.totalCardsSold,     p: '',  s: '张' },
            { l: '活跃卡',       v: studioAnalytics.totalCardsActive,    p: '',  s: '张' },
            { l: '耗卡率',       v: Math.round(studioAnalytics.consumedRate * 100), p: '', s: '%' },
            { l: '课程品类',     v: mockCourses.length,                 p: '',  s: '类' },
            { l: '客座老师',     v: 2,                                  p: '',  s: '位' },
            { l: '开业天数',     v: days,                              p: '',  s: '天' },
          ].map((it) => (
            <div key={it.l} className="bg-white p-5">
              <p className="text-[10px] font-mono uppercase tracking-widest-2 text-muted mb-2">{it.l}</p>
              <p className="font-mono tabular-nums font-bold text-2xl text-ink-900 tracking-tightest leading-none mb-1">
                <AnimatedNumber value={it.v} prefix={it.p} suffix={it.s} />
              </p>
              {it.trend && <p className="text-[10px] font-mono text-sage">{it.trend}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* ====== Section: 卡类型分布 ====== */}
      <section id="card-dist" className="container-x pb-16">
        <SectionHead num="03" title="会员卡分布" sub={`${mockCards.length} 张 · 按名称`} />
        <div className="border border-ink-200 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs font-mono uppercase tracking-widest-2 text-muted bg-ink-100">
                <th className="text-left font-medium px-5 py-3">卡名称</th>
                <th className="text-right font-medium px-5 py-3">张数</th>
                <th className="text-right font-medium px-5 py-3">占比</th>
                <th className="text-right font-medium px-5 py-3">开卡金额合计</th>
                <th className="text-right font-medium px-5 py-3">均价</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {Object.entries(cardNameDist).map(([name, count]) => {
                const items = mockCards.filter((c) => c.cardName === name);
                const total = items.reduce((s, c) => s + (c.price || 0), 0);
                const pct = (count / mockCards.length) * 100;
                return (
                  <tr key={name} className="hover:bg-cream">
                    <td className="px-5 py-3 text-ink-900 font-medium">{name}</td>
                    <td className="px-5 py-3 text-right font-mono tabular-nums text-ink-900 font-bold">{count}</td>
                    <td className="px-5 py-3 text-right font-mono tabular-nums text-ink-700">{pct.toFixed(1)}%</td>
                    <td className="px-5 py-3 text-right font-mono tabular-nums text-ink-900 font-bold">¥{total.toLocaleString()}</td>
                    <td className="px-5 py-3 text-right font-mono tabular-nums text-ink-700">¥{Math.round(total / count).toLocaleString()}</td>
                  </tr>
                );
              })}
              <tr className="bg-ink-900 text-white">
                <td className="px-5 py-3 font-display font-bold">合计</td>
                <td className="px-5 py-3 text-right font-mono tabular-nums font-bold text-sage-300">{mockCards.length}</td>
                <td className="px-5 py-3 text-right font-mono tabular-nums">100.0%</td>
                <td className="px-5 py-3 text-right font-mono tabular-nums font-bold text-sage-300">¥{totalSpentFromCards.toLocaleString()}</td>
                <td className="px-5 py-3 text-right font-mono tabular-nums">¥{Math.round(totalSpentFromCards / mockCards.length).toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ====== Section: 充值档位 ====== */}
      <section id="recharge-tiers" className="container-x pb-16">
        <SectionHead num="04" title="充值档位" sub="4 档 · 折后单价以体态调整 ¥298 为参考" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ink-200 border border-ink-200 rounded-2xl overflow-hidden">
          {mockRechargeTiers.map((t) => (
            <div key={t.id} className={`p-6 sm:p-7 ${t.highlight ? 'bg-sage text-white' : 'bg-white'}`}>
              <p className={`eyebrow mb-3 ${t.highlight ? 'text-white/80' : 'text-muted'}`}>充 ¥{t.amount.toLocaleString()}</p>
              <p className={`font-display font-black text-4xl tabular-nums tracking-tightest leading-none mb-2 ${t.highlight ? 'text-white' : 'text-ink-900'}`}>
                ¥{t.total.toLocaleString()}
              </p>
              <p className={`text-xs font-mono mb-1 ${t.highlight ? 'text-white/85' : 'text-ink-700'}`}>
                送 ¥{t.bonus.toLocaleString()} · {t.discount}
              </p>
              <p className={`text-xs font-mono ${t.highlight ? 'text-white/65' : 'text-muted'}`}>
                可上 {t.classCount} 节 · ¥{t.perClass} / 节
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ====== Section: 课程价目 ====== */}
      <section id="course-price" className="container-x pb-16">
        <SectionHead num="05" title="课程原价" sub={`${mockPriceList.length} 类课程`} />
        <div className="border border-ink-200 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs font-mono uppercase tracking-widest-2 text-muted bg-ink-100">
                <th className="text-left font-medium px-5 py-3">编号</th>
                <th className="text-left font-medium px-5 py-3">课程</th>
                <th className="text-left font-medium px-5 py-3">标签</th>
                <th className="text-left font-medium px-5 py-3">类型</th>
                <th className="text-left font-medium px-5 py-3">时段</th>
                <th className="text-right font-medium px-5 py-3">原价 / 次</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {mockCourses.map((c, i) => (
                <tr key={c.id} className="hover:bg-cream">
                  <td className="px-5 py-3 font-mono text-xs text-muted">0{i + 1}</td>
                  <td className="px-5 py-3 text-ink-900 font-medium">{c.name}</td>
                  <td className="px-5 py-3 text-xs">{mockPriceList[i]?.tag ? <span className="px-2 py-0.5 rounded bg-sage/10 text-sage">{mockPriceList[i].tag}</span> : '—'}</td>
                  <td className="px-5 py-3 text-ink-700 text-xs">{c.type === 'yoga' ? '瑜伽' : c.type === 'pilates' ? '普拉提' : '理疗'}</td>
                  <td className="px-5 py-3 text-xs font-mono text-ink-700">
                    {c.schedule?.length
                      ? c.schedule.map((s) => `${s.day} ${s.time}`).join(' · ')
                      : <span className="text-muted">— 待接入</span>}
                  </td>
                  <td className="px-5 py-3 text-right font-mono tabular-nums font-bold text-ink-900">{c.price === 0 ? '另议' : `¥${c.price}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ====== Section: 会员清单 ====== */}
      <section id="members" className="container-x pb-16">
        <SectionHead num="06" title="会员清单" sub={`${mockCards.length} 张卡 · ${uniqueMembers} 位独立会员 · 名称 / 电话已脱敏`} />
        <div className="border border-ink-200 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto max-h-[640px]">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-white z-10 shadow-[0_1px_0_0_#E8E6E1]">
                <tr className="text-xs font-mono uppercase tracking-widest-2 text-muted">
                  <th className="text-left font-medium px-5 py-3">#</th>
                  <th className="text-left font-medium px-5 py-3">昵称</th>
                  <th className="text-left font-medium px-5 py-3">手机号</th>
                  <th className="text-left font-medium px-5 py-3">状态</th>
                  <th className="text-right font-medium px-5 py-3">余额</th>
                  <th className="text-right font-medium px-5 py-3">收费金额</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {mockCards.map((c, i) => (
                  <tr key={c.cardNo} className="hover:bg-cream">
                    <td className="px-5 py-2.5 font-mono text-xs text-muted tabular-nums">{String(i + 1).padStart(2, '0')}</td>
                    <td className="px-5 py-2.5 text-ink-900 font-medium">{c.nick || '—'}</td>
                    <td className="px-5 py-2.5 font-mono tabular-nums text-ink-700">{c.phone || '—'}</td>
                    <td className="px-5 py-2.5">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        c.cardStatus === '正常' ? 'bg-sage/10 text-sage' : 'bg-ink-100 text-muted'
                      }`}>
                        {c.cardStatus}
                      </span>
                    </td>
                    <td className="px-5 py-2.5 text-right font-mono tabular-nums font-bold text-ink-900">{c.balance}</td>
                    <td className="px-5 py-2.5 text-right font-mono tabular-nums text-ink-700">{c.price > 0 ? `¥${c.price.toLocaleString()}` : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionHead({ num, title, sub }: { num: string; title: string; sub: string }) {
  return (
    <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
      <div>
        <p className="eyebrow-sage mb-2">{num}</p>
        <h2 className="font-display font-black text-display-md text-ink-900 tracking-tightest">{title}</h2>
      </div>
      <p className="text-xs text-muted font-mono">{sub}</p>
    </div>
  );
}