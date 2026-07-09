import { RefreshCw } from 'lucide-react';
import SubNav from '../../components/layout/SubNav';
import {
  monthlyHistory,
  mockCards,
  mockPriceList,
  mockRechargeTiers,
  studioAnalytics,
} from '../../mock/data';
import Money from '../../components/common/Money';
import ProgressBar from '../../components/common/ProgressBar';

function todayStr() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

const TODAY = todayStr();

/* --------------------------------------------------------------------------
   页面二级导航 — v2.1 sage-style active
   -------------------------------------------------------------------------- */
const opsSubNav = [
  { label: '关键指标',  href: '#hero' },
  { label: '月度营收',  href: '#monthly-revenue' },
  { label: '耗卡率',    href: '#rings' },
  { label: '会员卡分布', href: '#card-dist' },
  { label: '充值档位',  href: '#recharge-tiers' },
  { label: '课程原价',  href: '#course-price' },
  { label: '会员清单',  href: '#members' },
];

/* --------------------------------------------------------------------------
   RingProgress — 进度环（0 → 目标 offset）
   -------------------------------------------------------------------------- */
function RingProgress({
  percent,
  decimals = 0,
  label,
  sublabel,
  unit = '%',
  centerColor = '#1A1917',
  trackColor = '#E8E6E1',
  stroke = 10,
  gradientFrom,
  gradientTo,
  size = 160,
  innerMoney,
}: {
  percent: number;
  decimals?: number;
  label: string;
  sublabel?: string;
  unit?: string;
  centerColor?: string;
  trackColor?: string;
  stroke?: number;
  gradientFrom: string;
  gradientTo: string;
  size?: number;
  innerMoney?: { value: number; variant?: 'default' | 'warm' | 'peach' };
}) {
  const radius = 50;
  const C = 2 * Math.PI * radius;
  const offset = C * (1 - Math.max(0, Math.min(100, percent)) / 100);
  const id = `ringGrad-${gradientFrom.replace('#', '')}-${gradientTo.replace('#', '')}`;
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={gradientFrom} />
              <stop offset="100%" stopColor={gradientTo} />
            </linearGradient>
          </defs>
          <circle cx="60" cy="60" r={radius} fill="none" stroke={trackColor} strokeWidth={stroke} />
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={`url(#${id})`}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={C}
            data-offset={offset}
            className="ring-fill"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <p className="num-count font-bold text-3xl tabular-nums" style={{ color: centerColor }} data-count={percent} data-decimals={decimals}>
            <span className="num">0</span>
            <span className="text-base font-normal ml-0.5">{unit}</span>
          </p>
          <p className="eyebrow text-muted mt-1">{label}</p>
        </div>
      </div>
      <p className="font-display font-bold text-xl text-ink-900 mt-5 mb-1">{sublabel}</p>
      {innerMoney && (
        <Money value={innerMoney.value} variant={innerMoney.variant || 'default'} size="sm" className="!text-base" />
      )}
    </div>
  );
}

export default function OperationsPage() {
  const totalSpentFromCards = mockCards.reduce((s, c) => s + (c.price || 0), 0);
  const totalRemainingFromCards = studioAnalytics.balanceRemaining;
  const totalConsumed = studioAnalytics.balanceConsumed;
  const cardNameDist = mockCards.reduce<Record<string, number>>((acc, c) => {
    acc[c.cardName] = (acc[c.cardName] || 0) + 1;
    return acc;
  }, {});
  const activeCards = mockCards.filter((c) => c.cardStatus === '正常').length;
  const uniqueMembers = new Set(mockCards.map((c) => c.phone).filter(Boolean)).size;

  // 折线 / 面积图 — viewBox 800x320，data points mapped to coords
  const W = 800, H = 320, padTop = 60, padBottom = 32, padX = 40;
  const innerW = W - padX * 2;
  const innerH = H - padTop - padBottom;
  const maxRev = Math.max(...monthlyHistory.map((m) => m.revenue));
  const minRev = 0;
  const points = monthlyHistory.map((m, i) => {
    const x = padX + (innerW / (monthlyHistory.length - 1)) * i;
    const y = padTop + innerH * (1 - (m.revenue - minRev) / (maxRev - minRev));
    return { x, y, m, i };
  });
  const linePath =
    `M ${points.map((p) => `${p.x},${p.y}`).join(' L ')}`;
  const areaPath =
    `${linePath} L ${points[points.length - 1].x},${padTop + innerH} L ${points[0].x},${padTop + innerH} Z`;

  const dotColors = ['#94AD85', '#E07D8C', '#C8894A', '#8765A8', '#94AD85', '#E07D8C', '#C8894A', '#94AD85'];

  return (
    <div className="min-h-screen bg-cream">
      {/* ====== Hero — v2.1 dawn gradient ====== */}
      <section id="hero" className="relative py-24 md:py-32 bg-dawn overflow-hidden">
        <div className="absolute top-20 right-32 w-96 h-96 rounded-full blur-3xl opacity-30" style={{ background: 'radial-gradient(#94AD85,transparent)' }} />
        <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full blur-3xl opacity-25" style={{ background: 'radial-gradient(#F5C2C7,transparent)' }} />

        <div className="relative container-x">
          <div className="flex items-center gap-3 mb-10 reveal">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-sage-500 animate-pulse-soft" />
            <span className="eyebrow">2025.12.01 — 2026.07.04 · 真实数据</span>
            <span className="h-px flex-1 max-w-[120px] bg-ink-300" />
            <span className="eyebrow text-sage-500">7 个月 · 运营档案</span>
          </div>

          <h1 className="font-display font-black tracking-tightest leading-[0.92] text-[clamp(2.5rem,9vw,7rem)] mb-8 reveal" style={{ animationDelay: '100ms' }}>
            <span className="block">每一个数字，</span>
            <span className="block italic font-medium">
              <span className="text-gradient-leaf">都是真的</span>。
            </span>
          </h1>

          <p className="text-ink-700 text-xl max-w-2xl leading-relaxed font-body mb-16 reveal" style={{ animationDelay: '200ms' }}>
            这是一份持续更新的运营档案 ——
            来自店铺小程序后台的真实导出。
            <span className="bg-peach-200/50 px-1">不修饰、不粉饰、不编造</span>。
          </p>

          {/* 4 KPI tiles with money highlight */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 reveal-stagger">
            <div className="tilt-card glass rounded-3xl p-7 shadow-soft relative overflow-hidden">
              <p className="eyebrow text-muted mb-3">累计收款</p>
              <Money value={studioAnalytics.cumulativeRevenue} variant="default" size="lg" className="money-shadow" />
              <p className="text-xs text-muted font-mono mt-2">小程序后台导出</p>
            </div>

            <div className="tilt-card bg-night text-white rounded-3xl p-7 shadow-deep relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-40" style={{ background: 'radial-gradient(#94AD85,transparent)' }} />
              <p className="eyebrow text-sage-300 mb-3">月均营收</p>
              <Money value={studioAnalytics.monthlyAvgRevenue} variant="on-dark" size="lg" />
              <p className="text-xs text-white/55 font-mono mt-2">7 个月均值</p>
            </div>

            <div className="tilt-card bg-blush-50 rounded-3xl p-7 shadow-soft border border-blush-100 relative overflow-hidden">
              <p className="eyebrow text-blush-500 mb-3">会员总数</p>
              <p className="num-count font-bold text-4xl text-blush-500 leading-none mb-2" data-count={studioAnalytics.totalMembers}>
                <span className="num">0</span>
                <span className="text-xl font-normal text-blush-400">位</span>
              </p>
              <p className="text-xs text-muted font-mono">36 位独立会员</p>
            </div>

            <div className="tilt-card bg-peach-50 rounded-3xl p-7 shadow-soft border border-peach-100 relative overflow-hidden">
              <p className="eyebrow text-peach-500 mb-3">私教节数</p>
              <p className="num-count font-bold text-4xl text-peach-500 leading-none mb-2" data-count={studioAnalytics.totalPrivateClasses}>
                <span className="num">0</span>
                <span className="text-xl font-normal text-peach-400">节</span>
              </p>
              <p className="text-xs text-muted font-mono">馆主一人带</p>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3 text-xs font-mono text-muted reveal">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>更新于 {TODAY}</span>
          </div>
        </div>
      </section>

      <SubNav items={opsSubNav} />

      {/* ====== Section: 月度营收曲线（SVG 折线 + 面积） ====== */}
      <section id="monthly-revenue" className="py-24 md:py-32 bg-cream-100">
        <div className="container-x">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12 reveal">
            <div className="md:col-span-5">
              <p className="eyebrow text-sage-500 mb-4">MONTHLY REVENUE</p>
              <h2 className="font-display font-black text-[clamp(2rem,4.5vw,3.5rem)] text-ink-900 tracking-tightest leading-[1.05]">
                8 个月的
                <br />
                <span className="font-editorial italic text-gradient-leaf font-medium">真实节奏</span>。
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7 text-ink-700 text-lg leading-relaxed font-body">
              <p>
                12 月开业首月 ¥16k → 1 月高峰 ¥27k → 2 月春节低谷 ¥3k → 3 月春季 ¥27k（峰值）→ 之后稳定 ¥18-23k。
                <span className="bg-sage-100 px-1">没有促销、没有补贴</span>。
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-soft border border-ink-100 reveal chart-reveal">
            <div className="relative">
              <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#94AD85" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#94AD85" stopOpacity="0.02" />
                  </linearGradient>
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#94AD85" />
                    <stop offset="50%" stopColor="#E07D8C" />
                    <stop offset="100%" stopColor="#8765A8" />
                  </linearGradient>
                </defs>

                {/* 网格 */}
                <g stroke="#E8E6E1" strokeDasharray="3 3" strokeWidth="1">
                  {[0.25, 0.5, 0.75].map((t, i) => (
                    <line key={i} x1={padX} x2={W - padX} y1={padTop + innerH * t} y2={padTop + innerH * t} />
                  ))}
                </g>

                {/* 面积 */}
                <path className="draw-area" d={areaPath} fill="url(#areaGrad)" />

                {/* 折线 */}
                <path
                  className="draw-path"
                  d={linePath}
                  fill="none"
                  stroke="url(#lineGrad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* 数据点 */}
                <g>
                  {points.map((p, i) => (
                    <circle
                      key={p.m.month}
                      className="draw-dot"
                      cx={p.x}
                      cy={p.y}
                      r={p.m.revenue === maxRev ? 8 : 6}
                      fill="#fff"
                      stroke={dotColors[i % dotColors.length]}
                      strokeWidth="3"
                      style={{ cursor: 'pointer', transformOrigin: `${p.x}px ${p.y}px` }}
                    />
                  ))}
                </g>

                {/* 峰值标记 */}
                <g transform={`translate(${points[3].x}, ${points[3].y})`}>
                  <circle r="14" fill="#8765A8" fillOpacity="0.18" className="animate-pulse-soft" />
                  <text y="-22" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10" fontWeight="700" fill="#8765A8">★ PEAK</text>
                </g>

                {/* X 轴 */}
                <g fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#5E5B54" textAnchor="middle">
                  {points.map((p) => (
                    <text key={p.m.month} x={p.x} y={H - 10}>{p.m.month.slice(5)}月</text>
                  ))}
                </g>
              </svg>

              {/* 浮动 tooltip mock */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 glass rounded-xl px-4 py-2.5 shadow-soft text-xs animate-fade-in">
                <p className="font-mono text-ink-700">2026 · 3 月 · <span className="font-bold text-lavender-500">¥27,000</span> · 峰值</p>
              </div>
            </div>

            {/* 图例 */}
            <div className="mt-8 pt-6 border-t border-ink-100 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-muted">
              <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-sage-300" />稳定期</span>
              <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blush-300" />高峰</span>
              <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-peach-300" />淡季</span>
              <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-lavender-400" />峰值</span>
              <span className="ml-auto">v2 折线图 · 路径 0→绘出 + 面积淡入 + 点弹入</span>
            </div>
          </div>

          {/* 月度明细表 — 全部 8 行保留 */}
          <div className="mt-8 border border-ink-200 rounded-2xl overflow-hidden bg-white">
            <div className="overflow-x-auto">
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
                      <td className="px-5 py-3 text-right">
                        <Money value={m.revenue} size="sm" className="!text-sm !font-bold" />
                      </td>
                      <td className="px-5 py-3 text-right font-mono tabular-nums text-ink-700" data-count={m.newMembers}>
                        <span className="num">{m.newMembers}</span>
                      </td>
                      <td className="px-5 py-3 text-right font-mono tabular-nums text-ink-700" data-count={m.cardsSold}>
                        <span className="num">{m.cardsSold}</span>
                      </td>
                      <td className="px-5 py-3 text-right font-mono tabular-nums text-ink-700">
                        {m.privateClasses != null ? <span data-count={m.privateClasses}><span className="num">{m.privateClasses}</span></span> : '—'}
                      </td>
                      <td className="px-5 py-3 text-right">
                        {m.spent != null ? (
                          <Money value={m.spent} decimals={2} size="sm" className="!text-sm" />
                        ) : '—'}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-ink-900 text-white">
                    <td className="px-5 py-3 font-display font-bold">合计</td>
                    <td className="px-5 py-3 text-right">
                      <Money value={studioAnalytics.cumulativeRevenue} variant="on-dark" size="sm" className="!text-sm !font-bold" />
                    </td>
                    <td className="px-5 py-3 text-right num-count">{monthlyHistory.reduce((s, m) => s + m.newMembers, 0)}</td>
                    <td className="px-5 py-3 text-right num-count">{monthlyHistory.reduce((s, m) => s + m.cardsSold, 0)}</td>
                    <td className="px-5 py-3 text-right num-count">{monthlyHistory.reduce((s, m) => s + (m.privateClasses ?? 0), 0)}</td>
                    <td className="px-5 py-3 text-right">
                      <Money
                        value={monthlyHistory.reduce((s, m) => s + (m.spent ?? 0), 0)}
                        decimals={2}
                        variant="on-dark"
                        size="sm"
                        className="!text-sm"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ====== Section: 耗卡率 / 进度环 ====== */}
      <section id="rings" className="py-24 md:py-32 bg-sunset relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-30" style={{ background: 'radial-gradient(#D4C3E2,transparent)' }} />

        <div className="relative container-x">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16 reveal">
            <div className="md:col-span-5">
              <p className="eyebrow text-blush-500 mb-4">CARD UTILIZATION</p>
              <h2 className="font-display font-black text-[clamp(2rem,4.5vw,3.5rem)] text-ink-900 tracking-tightest leading-[1.05]">
                耗卡率
                <span className="font-editorial italic text-gradient-blush font-medium"> {Math.round(studioAnalytics.consumedRate * 1000) / 10}%</span>。
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7 text-ink-700 text-lg leading-relaxed font-body">
              <p>
                累计收款 ¥136,180，已耗卡 ¥72,940，剩余价值 ¥63,240。
                充值卡 7 个月消化过半 ——
                <span className="bg-blush-100 px-1">说明会员活跃度健康</span>。
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 reveal-stagger">
            {/* 进度环 1 — 已耗卡 */}
            <div className="bg-white rounded-3xl p-8 shadow-soft border border-ink-100">
              <RingProgress
                percent={Math.round(studioAnalytics.consumedRate * 1000) / 10}
                decimals={1}
                label="已耗"
                sublabel="已耗卡"
                gradientFrom="#94AD85"
                gradientTo="#3D5A3D"
                innerMoney={{ value: totalConsumed, variant: 'default' }}
              />
            </div>

            {/* 进度环 2 — 剩余价值 */}
            <div className="bg-night text-white rounded-3xl p-8 shadow-deep relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl opacity-30" style={{ background: 'radial-gradient(#E07D8C,transparent)' }} />
              <RingProgress
                percent={Math.round(((1 - studioAnalytics.consumedRate) * 100) * 10) / 10}
                decimals={1}
                label="剩余"
                sublabel="剩余价值"
                centerColor="#EDA0AA"
                trackColor="#3a3a3a"
                gradientFrom="#E07D8C"
                gradientTo="#A684C0"
                innerMoney={{ value: totalRemainingFromCards, variant: 'warm' }}
              />
            </div>

            {/* 进度环 3 — 活跃卡率 */}
            <div className="bg-white rounded-3xl p-8 shadow-soft border border-ink-100">
              <RingProgress
                percent={Math.round((activeCards / mockCards.length) * 1000) / 10}
                decimals={1}
                label="留存"
                sublabel="活跃卡率"
                gradientFrom="#C8894A"
                gradientTo="#E0A66B"
              />
              <p className="num-count text-lg text-peach-500 mt-2">
                <span className="num" data-count={activeCards}>0</span> / <span className="num" data-count={mockCards.length}>0</span> 张
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====== Section: 卡类型分布 ====== */}
      <section id="card-dist" className="py-16 container-x">
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
                    <td className="px-5 py-3 text-right">
                      <Money value={total} size="sm" className="!text-sm !font-bold" />
                    </td>
                    <td className="px-5 py-3 text-right font-mono tabular-nums text-ink-700">¥{Math.round(total / count).toLocaleString()}</td>
                  </tr>
                );
              })}
              <tr className="bg-ink-900 text-white">
                <td className="px-5 py-3 font-display font-bold">合计</td>
                <td className="px-5 py-3 text-right font-mono tabular-nums font-bold text-sage-300">{mockCards.length}</td>
                <td className="px-5 py-3 text-right font-mono tabular-nums">100.0%</td>
                <td className="px-5 py-3 text-right">
                  <Money value={totalSpentFromCards} variant="on-dark" size="sm" className="!text-sm !font-bold" />
                </td>
                <td className="px-5 py-3 text-right font-mono tabular-nums">¥{Math.round(totalSpentFromCards / mockCards.length).toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ====== Section: 课程价目（横向条） ====== */}
      <section id="course-price" className="py-16 container-x">
        <SectionHead num="04" title="课程原价" sub={`${mockPriceList.length} 类课程 · 明码标价`} />

        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-soft border border-ink-100 reveal">
          <div className="space-y-5">
            {mockPriceList.map((p) => {
              const pct = p.price === 0 ? 50 : Math.round((p.price / 368) * 100);
              const tones: Array<'sage' | 'warm' | 'peach' | 'lavender' | 'clay' | 'ink'> = ['sage', 'warm', 'peach', 'lavender', 'sage', 'clay', 'ink'];
              const tone = tones[(p.id.charCodeAt(p.id.length - 1) || 0) % tones.length];
              return (
                <div key={p.id}>
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="font-display font-semibold text-lg text-ink-900">
                      {p.name}
                      {p.tag && (
                        <span className={`px-2 py-0.5 rounded-md text-[11px] font-mono ml-1 ${
                          p.tag === '高客单' ? 'bg-blush/10 text-blush-500'
                          : p.tag === '专长' ? 'bg-sage/10 text-sage'
                          : p.tag === '入门' ? 'bg-sage/10 text-sage'
                          : p.tag === '热门' ? 'bg-sage/10 text-sage'
                          : 'bg-sage/10 text-sage'
                        }`}>{p.tag}</span>
                      )}
                    </span>
                    {p.price === 0 ? (
                      <span className="text-ink-500 font-mono font-bold">另议</span>
                    ) : (
                      <Money
                        value={p.price}
                        variant={p.price >= 350 ? 'warm' : p.price <= 150 ? 'peach' : 'default'}
                        size="sm"
                        className="!text-base"
                      />
                    )}
                  </div>
                  <ProgressBar percent={pct} tone={tone} />
                  <p className="text-xs text-muted font-mono mt-1.5">
                    {p.price === 0 ? '单次原价 · 理疗 · 不公开标价' : '单次原价'}
                  </p>
                </div>
              );
            })}
          </div>
          <p className="mt-6 text-xs text-muted font-mono text-center">
            v2.1 · 横向条 0→目标增长 + 金钱高亮 + 全部 7 类课程保留
          </p>
        </div>
      </section>

      {/* ====== Section: 充值档位 ====== */}
      <section id="recharge-tiers" className="relative py-24 md:py-32 bg-night text-white grain overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-25" style={{ background: 'radial-gradient(#94AD85,transparent)' }} />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-25" style={{ background: 'radial-gradient(#E07D8C,transparent)' }} />

        <div className="relative container-x">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16 reveal">
            <div className="md:col-span-5">
              <p className="eyebrow text-sage-300 mb-4">RECHARGE TIERS</p>
              <h2 className="font-display font-black text-[clamp(2rem,4.5vw,3.5rem)] tracking-tightest leading-[1.05]">
                充得越多，
                <br />
                <span className="font-editorial italic text-blush-300 font-medium">折得越低</span>。
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7 text-white/65 text-lg leading-relaxed font-body">
              <p>
                4 档线性折扣，公开透明。充 ¥6,000 实得 ¥11,000 是店铺利润底盘 ——
                <span className="bg-peach-400/20 text-peach-300 px-1">平均客单 ¥3,783</span> 对应这一档。
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 reveal-stagger">
            {mockRechargeTiers.map((t) => (
              <article
                key={t.id}
                className={`tilt-card rounded-3xl p-7 ${
                  t.highlight
                    ? 'relative bg-gradient-to-br from-sage-500 via-sage-600 to-sage-700 shadow-deep'
                    : 'glass-dark'
                }`}
              >
                {t.highlight && (
                  <span className="absolute top-5 right-5 inline-flex items-center gap-1 px-2.5 py-1 rounded-pill bg-white/15 text-[10px] font-mono tracking-widest">★ 主推</span>
                )}
                <p className={`eyebrow mb-4 ${t.highlight ? 'text-sage-200' : 'text-white/55'}`}>
                  充{' '}
                  <Money value={t.amount} variant={t.highlight ? 'default' : 'on-dark'} size="sm" className={`!text-sm ml-1 ${t.highlight ? '!text-white' : ''}`} />
                </p>
                <Money
                  value={t.total}
                  variant={t.highlight ? 'default' : 'on-dark'}
                  size="md"
                  className={`!text-3xl mb-3 ${t.highlight ? '!text-white' : ''}`}
                />
                <p className={`text-xs font-mono mb-5 ${t.highlight ? 'text-sage-200' : 'text-white/55'}`}>
                  送 <span className="num-count">¥{t.bonus.toLocaleString()}</span> · {t.discount}
                </p>
                <div className={`h-px my-5 ${t.highlight ? 'bg-white/15' : 'bg-white/10'}`} />
                <p className={`text-sm font-body ${t.highlight ? 'text-white/90' : 'text-white/80'}`}>
                  可上 <span className="num-count">{t.classCount}</span> 节{t.refCourse}
                </p>
                <Money
                  value={t.perClass}
                  variant={t.highlight ? 'default' : 'on-dark'}
                  size="sm"
                  className={`!text-sm mt-1 ${t.highlight ? '!text-white' : ''}`}
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ====== Section: 会员清单 ====== */}
      <section id="members" className="py-16 container-x">
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
                  <tr key={c.cardNo} className="hover:bg-blush-50/40 transition-colors">
                    <td className="px-5 py-2.5 font-mono text-xs text-muted tabular-nums">{String(i + 1).padStart(2, '0')}</td>
                    <td className="px-5 py-2.5 text-ink-900 font-medium">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${
                          i % 4 === 0 ? 'from-sage-200 to-sage-300 text-sage-700' :
                          i % 4 === 1 ? 'from-blush-200 to-blush-300 text-blush-700' :
                          i % 4 === 2 ? 'from-peach-200 to-peach-300 text-peach-700' :
                          'from-lavender-200 to-lavender-300 text-lavender-700'
                        } flex items-center justify-center font-bold text-[11px]`}>
                          {(c.nick || '—').slice(0, 1)}
                        </div>
                        {c.nick || '—'}
                      </div>
                    </td>
                    <td className="px-5 py-2.5 font-mono tabular-nums text-ink-700">{c.phone || '—'}</td>
                    <td className="px-5 py-2.5">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        c.cardStatus === '正常' ? 'bg-sage/10 text-sage' : 'bg-ink-100 text-muted'
                      }`}>
                        {c.cardStatus}
                      </span>
                    </td>
                    <td className="px-5 py-2.5 text-right font-mono tabular-nums font-bold text-ink-900">{c.balance}</td>
                    <td className="px-5 py-2.5 text-right">
                      {c.price > 0 ? (
                        <Money value={c.price} size="sm" className="!text-sm" />
                      ) : (
                        <span className="font-mono tabular-nums text-muted">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="mt-6 text-xs text-muted font-mono text-center">
          v2.1 · 真实 Excel 导出 · 余额 + 收费金额 count-up · 全部 {mockCards.length} 张卡保留
        </p>
      </section>
    </div>
  );
}

function SectionHead({ num, title, sub }: { num: string; title: string; sub: string }) {
  return (
    <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
      <div>
        <p className="eyebrow text-sage-500 mb-2">{num}</p>
        <h2 className="font-display font-black text-display-md text-ink-900 tracking-tightest">{title}</h2>
      </div>
      <p className="text-xs text-muted font-mono">{sub}</p>
    </div>
  );
}