import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  ArrowRight,
  Award,
  Check,
  CheckCircle2,
  CircleAlert,
  HandHeart,
  Lock,
  Package,
  Sparkles,
  UserCheck,
} from 'lucide-react';
import {
  shopProfile,
  mockPriceList,
  mockRechargeTiers,
  monthlyHistory,
  balanceSheet,
  studioAnalytics,
  studioOpeningDate,
} from '../../mock/data';
import SubNav from '../../components/layout/SubNav';

/* --------------------------------------------------------------------------
   Home 页面二级导航 — 浏览本页时始终可见
   -------------------------------------------------------------------------- */
const homeSubNav = [
  { label: '数据看板', href: '#dashboard' },
  { label: '认识馆主', href: '#teacher' },
  { label: '6 大特点', href: '#features' },
  { label: '课程价目', href: '#prices' },
  { label: '充值档位', href: '#recharge' },
  { label: '经济模型', href: '#method' },
];

/* --------------------------------------------------------------------------
   Hooks
   -------------------------------------------------------------------------- */
function useCountUp(target: number, duration = 1400, start = 0) {
  const [v, setV] = useState(start);
  useEffect(() => {
    let raf = 0;
    const begin = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - begin) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.floor(start + (target - start) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return v;
}

function useStudioDays() {
  const [days, setDays] = useState(0);
  useEffect(() => {
    const compute = () => {
      const ms = Date.now() - studioOpeningDate.getTime();
      setDays(Math.max(0, Math.floor(ms / 86400000)));
    };
    compute();
    const t = setInterval(compute, 60_000);
    return () => clearInterval(t);
  }, []);
  return days;
}

const featureIcons: Record<string, any> = {
  'owner-teaches': UserCheck,
  'no-tricks': HandHeart,
  'private': Lock,
  'simple-packages': Package,
  'refund-anytime': ArrowRight,
  'crafted': Sparkles,
};

/* --------------------------------------------------------------------------
   Hero
   -------------------------------------------------------------------------- */
function Hero() {
  const days = useStudioDays();
  const dayCount = useCountUp(days, 1800);
  const revenue = useCountUp(studioAnalytics.cumulativeRevenue);
  const members = useCountUp(studioAnalytics.totalMembers);
  const classes = useCountUp(studioAnalytics.totalPrivateClasses);
  const avgMember = useCountUp(studioAnalytics.avgMemberValue);

  return (
    <section className="relative min-h-screen bg-ink-900 text-white overflow-hidden grain">
      <div className="absolute inset-0 bg-gradient-to-b from-ink-900 via-ink-900 to-ink-800" />
      <div
        className="absolute inset-0 opacity-[0.18] mix-blend-luminosity"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 70% 20%, rgba(110,140,95,0.35), transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(200,167,134,0.18), transparent 60%)',
        }}
      />

      <div className="relative container-x pt-28 sm:pt-32 pb-16 sm:pb-20 min-h-screen flex flex-col">
        <div className="flex items-center gap-3 mb-10 sm:mb-14 animate-fade-in">
          <span className="live-dot" />
          <span className="eyebrow-light">2025.12 — 至今 · 湖南 · 宁乡 · 一人一馆</span>
          <span className="h-px flex-1 max-w-[120px] bg-white/15" />
          <span className="eyebrow-light">DASHBOARD · LIVE</span>
        </div>

        <div className="flex-1 flex flex-col justify-center max-w-6xl">
          <h1 className="font-display font-black tracking-tightest leading-[0.92] text-[clamp(2.25rem,11vw,9rem)] text-balance">
            <span className="block animate-slide-up">开馆第</span>
            <span className="block animate-slide-up delay-100 font-mono tabular-nums">
              {dayCount}
              <span className="text-sage-300 ml-3 text-[0.6em] font-medium italic font-display">天</span>
            </span>
            <span className="block animate-slide-up delay-200">一人一馆，</span>
            <span className="block animate-slide-up delay-300 italic font-medium text-sage-300">
              全过程公开。
            </span>
          </h1>

          <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end animate-fade-in delay-500">
            <p className="md:col-span-5 text-white/65 text-base sm:text-lg leading-relaxed max-w-md">
              我是晨晨老师，店主即老师。这是一间宁乡老街拐角的瑜伽普拉提馆，
              也是一份持续更新的运营档案 — 写给同样想开一间小馆的同行。
            </p>

            <div className="md:col-span-4 flex flex-wrap items-center gap-3">
              <a href="#dashboard" className="pill-sage group">
                看实时数据
                <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
              </a>
              <a href="#teacher" className="pill-outline-light">
                <Award className="w-3.5 h-3.5" />
                认识馆主
              </a>
            </div>

            <div className="md:col-span-3 md:text-right">
              <p className="eyebrow-light mb-2">累计收款</p>
              <p className="font-mono tabular-nums text-4xl sm:text-5xl font-bold text-sage-300 leading-none">
                ¥{studioAnalytics.cumulativeRevenue.toLocaleString()}
              </p>
              <p className="eyebrow-light mt-2">开馆 7 个月 · 真实流水</p>
            </div>
          </div>
        </div>

        {/* Live ticker */}
        <div className="mt-14 sm:mt-20 animate-slide-up delay-700">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/8 border border-white/10 rounded-2xl overflow-hidden">
            {[
              { l: '累计收款', v: revenue, p: '¥', s: '' },
              { l: '会员总数', v: members, p: '', s: '位' },
              { l: '私教节数', v: classes, p: '', s: '节' },
              { l: '人均消费', v: avgMember, p: '¥', s: '/ 人' },
            ].map((it) => (
              <div key={it.l} className="bg-ink-900 p-5 sm:p-6">
                <p className="eyebrow-light text-[10px] mb-3 flex items-center gap-1.5">
                  <span className="live-dot" />
                  {it.l}
                </p>
                <p className="font-mono tabular-nums text-3xl sm:text-4xl font-semibold text-white tracking-tight">
                  {it.p}{it.v.toLocaleString()}<span className="text-white/40 text-xl ml-1 font-normal">{it.s}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   Marquee
   -------------------------------------------------------------------------- */
function Marquee() {
  const items = [
    '月均营收 ¥19,454',
    '累计收款 ¥136,180',
    '开馆第 217 天',
    '私教 452 节',
    '会员 34 位',
    '售卡 44 张',
    '人均消费 ¥4,005',
    '私教单节均价 ¥161',
    '耗卡率 53.6%',
    '剩余价值 ¥63,240',
    '春季爆款 ¥27,000',
    '私教高峰 97 节/月',
  ];
  return (
    <section className="bg-ink-900 border-t border-white/8 py-5 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items, ...items].map((p, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-8 px-8 text-white/55 text-sm font-mono tracking-wide"
          >
            {p}
            <span className="w-1 h-1 rounded-full bg-sage-400" />
          </span>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   Slogan banner
   -------------------------------------------------------------------------- */
function SloganBanner() {
  return (
    <section className="bg-cream py-20 sm:py-28 border-b border-ink-200">
      <div className="container-x text-center">
        <p className="eyebrow-sage mb-6">轻舟寄语</p>
        <h2 className="font-display font-black text-[clamp(2rem,7vw,5.5rem)] text-ink-900 tracking-tightest leading-[1.05] whitespace-nowrap">
          「轻舟已过万重山」
        </h2>
        <p className="mt-8 text-ink-700 text-lg leading-relaxed max-w-2xl mx-auto">
          愿每一位走进轻舟的人，都能在这里找到属于自己的轻盈与自在。
        </p>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   RevenueChart — SVG bar chart (robust across all layouts)
   -------------------------------------------------------------------------- */
function RevenueChart() {
  const W = 800;
  const H = 280;
  const padTop = 36;        // 留出顶部写金额标签
  const padBottom = 32;     // 留出底部写月份
  const padX = 24;
  const chartH = H - padTop - padBottom;
  const innerW = W - padX * 2;
  const slot = innerW / monthlyHistory.length;
  const barW = slot * 0.55;
  const maxRev = Math.max(...monthlyHistory.map((m) => m.revenue));

  // 网格线刻度（4 条）
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => Math.round(maxRev * t));

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-auto"
        role="img"
        aria-label="月度营收柱状图"
      >
        {/* 水平网格线 */}
        {ticks.map((v, i) => {
          const y = padTop + chartH * (1 - v / maxRev);
          return (
            <g key={i}>
              <line
                x1={padX}
                x2={W - padX}
                y1={y}
                y2={y}
                stroke="#E8E6E1"
                strokeWidth="1"
                strokeDasharray={i === 0 ? '0' : '3 3'}
              />
              <text
                x={W - padX}
                y={y - 4}
                fontSize="10"
                fontFamily="ui-monospace, monospace"
                fill="#8A867D"
                textAnchor="end"
              >
                ¥{(v / 1000).toFixed(0)}k
              </text>
            </g>
          );
        })}

        {/* 柱子 */}
        {monthlyHistory.map((m, i) => {
          const x = padX + slot * i + (slot - barW) / 2;
          const h = (m.revenue / maxRev) * chartH;
          const y = padTop + chartH - h;
          const isPeak = m.revenue === maxRev;
          const monthLabel = m.label.replace('2026 · ', '').replace('2025 · ', '');
          return (
            <g key={m.month}>
              {/* 柱子 */}
              <rect
                x={x}
                y={y}
                width={barW}
                height={Math.max(h, 2)}
                rx="4"
                fill={isPeak ? '#3D5A3D' : '#94AD85'}
              />
              {/* 顶部金额 */}
              <text
                x={x + barW / 2}
                y={y - 8}
                fontSize="11"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
                fill="#1A1917"
                textAnchor="middle"
              >
                ¥{(m.revenue / 1000).toFixed(1)}k
              </text>
              {/* 月份 */}
              <text
                x={x + barW / 2}
                y={H - 10}
                fontSize="11"
                fontFamily="ui-monospace, monospace"
                fill="#5E5B54"
                textAnchor="middle"
              >
                {monthLabel}
              </text>
              {/* 峰值标记 */}
              {isPeak && (
                <text
                  x={x + barW / 2}
                  y={y - 24}
                  fontSize="10"
                  fontFamily="ui-monospace, monospace"
                  fontWeight="700"
                  fill="#3D5A3D"
                  textAnchor="middle"
                >
                  ★ PEAK
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Dashboard — real metrics + monthly chart
   -------------------------------------------------------------------------- */
function Dashboard() {
  const stats = [
    { l: '累计收款', v: studioAnalytics.cumulativeRevenue, p: '¥', s: '', trend: '开馆 7 个月', accent: true },
    { l: '月均营收', v: studioAnalytics.monthlyAvgRevenue, p: '¥', s: '/ 月', trend: '春季旺季拉动' },
    { l: '会员总数', v: studioAnalytics.totalMembers, p: '', s: '位', trend: '34 位付费会员' },
    { l: '私教节数', v: studioAnalytics.totalPrivateClasses, p: '', s: '节', trend: '馆主一人带' },
    { l: '人均消费', v: studioAnalytics.avgMemberValue, p: '¥', s: '/ 人', trend: '高于行业 2x' },
    { l: '私教均价', v: studioAnalytics.avgClassPrice, p: '¥', s: '/ 节', trend: '充值折扣后' },
    { l: '售卡总量', v: studioAnalytics.totalCardsSold, p: '', s: '张', trend: '44 张已激活' },
    { l: '剩余价值', v: studioAnalytics.balanceRemaining, p: '¥', s: '', trend: '已耗 53.6%' },
  ];

  return (
    <section id="dashboard" className="bg-cream section">
      <div className="container-x">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12 sm:mb-16">
          <div className="md:col-span-4">
            <p className="eyebrow-sage mb-4">01 — 公开数据</p>
            <h2 className="font-display font-black text-display-lg text-ink-900 tracking-tightest">
              经营看板，
              <br />
              <span className="text-sage">真实流水</span>。
            </h2>
          </div>
          <div className="md:col-span-7 md:col-start-6 text-ink-700 text-lg leading-relaxed">
            <p>
              下面每一个数字都来自店铺小程序后台的真实导出 —
              累计 ¥136,180、月均 ¥19,454、私教 452 节、会员 34 位。
              不修饰、不粉饰。这是给同行看的一份工作档案。
            </p>
          </div>
        </div>

        {/* Big stat grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-ink-200 border border-ink-200 rounded-2xl overflow-hidden mb-12">
          {stats.map((s) => (
            <div
              key={s.l}
              className={`p-6 sm:p-8 ${s.accent ? 'bg-ink-900 text-white' : 'bg-white'}`}
            >
              <p className={`eyebrow mb-4 ${s.accent ? 'text-white/45' : ''}`}>{s.l}</p>
              <p
                className={`font-mono tabular-nums font-bold tracking-tightest leading-none mb-3 ${
                  s.accent ? 'text-sage-300' : 'text-ink-900'
                } text-3xl sm:text-4xl`}
              >
                {s.p}
                {s.v.toLocaleString()}
                <span className={`text-xl ml-1 font-normal ${s.accent ? 'text-white/40' : 'text-ink-400'}`}>{s.s}</span>
              </p>
              <p className={`text-xs font-mono ${s.accent ? 'text-white/55' : 'text-muted'}`}>
                <span className="inline-block w-1 h-1 rounded-full bg-sage mr-1.5 align-middle" />
                {s.trend}
              </p>
            </div>
          ))}
        </div>

        {/* Monthly chart */}
        <div className="border border-ink-200 rounded-2xl overflow-hidden bg-white">
          <div className="p-7 sm:p-9 border-b border-ink-200 flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="eyebrow-sage mb-2">月度营收曲线</p>
              <h3 className="font-display font-bold text-2xl text-ink-900">
                从 12 月开业到 7 月，8 个月的真实节奏
              </h3>
            </div>
            <p className="text-xs text-muted font-mono">
              更新于 {balanceSheet.updatedAt}
            </p>
          </div>

          <div className="p-7 sm:p-9">
            {/* SVG bar chart — robust across layouts */}
            <RevenueChart />

            <div className="overflow-x-auto -mx-7 sm:-mx-9 px-7 sm:px-9 pt-6 border-t border-ink-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs font-mono uppercase tracking-widest-2 text-muted">
                    <th className="text-left font-medium py-2">月份</th>
                    <th className="text-right font-medium py-2">营收</th>
                    <th className="text-right font-medium py-2">新增</th>
                    <th className="text-right font-medium py-2">售卡</th>
                    <th className="text-right font-medium py-2">私教</th>
                    <th className="text-right font-medium py-2">耗卡</th>
                    <th className="text-left font-medium py-2 pl-4">备注</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-100">
                  {monthlyHistory.map((m) => (
                    <tr key={m.month} className="hover:bg-ink-50">
                      <td className="py-3 text-ink-900 font-medium">{m.label}</td>
                      <td className="py-3 text-right font-mono tabular-nums font-bold text-ink-900">
                        ¥{m.revenue.toLocaleString()}
                      </td>
                      <td className="py-3 text-right font-mono tabular-nums text-ink-700">{m.newMembers}</td>
                      <td className="py-3 text-right font-mono tabular-nums text-ink-700">{m.cardsSold}</td>
                      <td className="py-3 text-right font-mono tabular-nums text-ink-700">
                        {m.privateClasses ?? '—'}
                      </td>
                      <td className="py-3 text-right font-mono tabular-nums text-ink-700">
                        {m.spent ? `¥${m.spent.toLocaleString()}` : '—'}
                      </td>
                      <td className="py-3 pl-4 text-muted">{m.note}</td>
                    </tr>
                  ))}
                  <tr className="bg-ink-900 text-white">
                    <td className="py-3 px-0 font-display font-bold">合计</td>
                    <td className="py-3 text-right font-mono tabular-nums font-bold text-sage-300">¥136,180</td>
                    <td className="py-3 text-right font-mono tabular-nums">34</td>
                    <td className="py-3 text-right font-mono tabular-nums">44</td>
                    <td className="py-3 text-right font-mono tabular-nums">452</td>
                    <td className="py-3 text-right font-mono tabular-nums">¥72,940</td>
                    <td className="py-3 pl-4 text-white/55">开馆 7 个月</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   Teacher / 馆主完整介绍
   -------------------------------------------------------------------------- */
function Teacher() {
  const t = shopProfile.teacher;

  return (
    <section id="teacher" className="bg-ink-900 text-white section grain relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-ink-900 via-ink-900 to-ink-800" />
      <div className="relative container-x">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Portrait + headline */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <p className="eyebrow-light mb-4">02 — 认识馆主 / TEACHER</p>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 mb-6">
              <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/50 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="eyebrow-light mb-1">主理人</p>
                <p className="font-display font-bold text-3xl">{t.name}</p>
                <p className="text-white/65 text-sm">本名：李玲</p>
              </div>
            </div>

            {/* Big stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { v: t.yearsPractice, s: '年专业练习' },
                { v: t.yearsTeaching, s: '年教学经验' },
                { v: `${t.hoursTaught}+`, s: '授课时长' },
              ].map((s) => (
                <div key={s.s} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="font-mono font-bold text-2xl text-sage-300 tabular-nums">{s.v}</p>
                  <p className="text-xs text-white/55 mt-1">{s.s}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bio + credentials */}
          <div className="lg:col-span-7 space-y-10">
            <div>
              <h2 className="font-display font-black text-display-xl text-white tracking-tightest leading-[0.95]">
                把每位学员，
                <br />
                <span className="italic font-medium text-sage-300">当作唯一的</span>那位。
              </h2>
              <p className="mt-8 text-white/65 text-lg leading-relaxed max-w-xl">
                8 年练习、5 年教学、2000+ 节私教时长。这家馆没有"我们"，
                只有我和来到这里的你 ——
                所以我必须够专业，也必须够了解你。
              </p>
            </div>

            {/* Credentials */}
            <div>
              <p className="eyebrow-light mb-4">资质认证</p>
              <ul className="space-y-3">
                {t.certifications.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-white/85 text-base">
                    <Check className="w-5 h-5 text-sage-300 flex-shrink-0 mt-0.5" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Previous roles */}
            <div>
              <p className="eyebrow-light mb-4">过往任职</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {t.previousRoles.map((r) => (
                  <div key={r.org} className="border border-white/10 rounded-xl p-5 bg-white/5">
                    <p className="text-xs font-mono uppercase tracking-widest-2 text-sage-300 mb-2">{r.role}</p>
                    <p className="text-white font-medium">{r.org}</p>
                  </div>
                ))}
                <div className="border border-sage/40 rounded-xl p-5 bg-sage/10">
                  <p className="text-xs font-mono uppercase tracking-widest-2 text-sage-300 mb-2">现创办</p>
                  <p className="text-white font-medium">宁乡 · 轻舟瑜伽普拉提馆</p>
                </div>
              </div>
            </div>

            {/* Lifestyle */}
            <div>
              <p className="eyebrow-light mb-4">生活侧写</p>
              <div className="flex flex-wrap gap-2">
                {t.lifestyle.map((l) => (
                  <span key={l} className="pill-light text-xs">
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   6 Features — 店铺六大特点
   -------------------------------------------------------------------------- */
function Features() {
  return (
    <section id="features" className="bg-cream section">
      <div className="container-x">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12 sm:mb-16">
          <div className="md:col-span-5">
            <p className="eyebrow-sage mb-4">03 — 这家馆的 6 个特点</p>
            <h2 className="font-display font-black text-display-lg text-ink-900 tracking-tightest">
              为什么是
              <br />
              <span className="text-sage">一人一馆</span>？
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7 text-ink-700 text-lg leading-relaxed">
            <p>
              这 6 条不是营销话术 ——
              是这家店跑通 7 个月、累计收款 ¥136,180 之后沉淀下来的真实方法。
              也是一份给同行的可抄模板。
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink-200 border border-ink-200 rounded-2xl overflow-hidden">
          {shopProfile.features.map((f, i) => {
            const Icon = featureIcons[f.key] || Check;
            return (
              <article key={f.key} className="bg-white p-7 sm:p-8 hover:bg-cream transition-colors group">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-11 h-11 rounded-pill bg-sage/10 text-sage flex items-center justify-center group-hover:bg-sage group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs text-muted">0{i + 1}</span>
                </div>
                <h3 className="font-display font-bold text-xl text-ink-900 mb-3">{f.title}</h3>
                <p className="text-ink-700 leading-relaxed text-[15px]">{f.desc}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   Price List — 课程价目
   -------------------------------------------------------------------------- */
function PriceList() {
  return (
    <section id="prices" className="bg-white section border-y border-ink-200">
      <div className="container-x">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          <div className="md:col-span-5">
            <p className="eyebrow-sage mb-4">04 — 课程价目</p>
            <h2 className="font-display font-black text-display-lg text-ink-900 tracking-tightest">
              7 类课程，
              <br />
              <span className="text-sage">明码标价</span>。
            </h2>
            <p className="mt-6 text-ink-700 leading-relaxed max-w-md">
              不分淡旺季、不搞"促销价"、不卖年卡强制绑定。
              下面就是这家馆的全部单价 ——
              同行可以直接参考自己城市的定价系数。
            </p>
          </div>

          <div className="md:col-span-7">
            <div className="border border-ink-200 rounded-2xl overflow-hidden">
              <div className="grid grid-cols-12 px-5 py-4 bg-ink-100 text-xs font-mono uppercase tracking-widest-2 text-muted">
                <span className="col-span-2">编号</span>
                <span className="col-span-5">课程项目</span>
                <span className="col-span-3 hidden sm:block">标签</span>
                <span className="col-span-3 sm:col-span-2 text-right">原价 / 次</span>
              </div>
              {mockPriceList.map((p, i) => (
                <div
                  key={p.id}
                  className="grid grid-cols-12 px-5 py-5 border-t border-ink-200 items-baseline hover:bg-cream transition-colors"
                >
                  <span className="col-span-2 font-mono text-xs text-muted">0{i + 1}</span>
                  <span className="col-span-5 font-display font-semibold text-ink-900 text-lg">{p.name}</span>
                  <span className="col-span-3 hidden sm:block">
                    {p.tag && (
                      <span className="px-2 py-0.5 rounded-md bg-sage/10 text-sage text-[11px] font-mono">
                        {p.tag}
                      </span>
                    )}
                  </span>
                  <span className="col-span-5 sm:col-span-2 text-right font-mono tabular-nums font-bold text-ink-900">
                    {p.price === 0 ? '另议' : `¥${p.price}`}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted font-mono">
              * 单次原价。充值档位享 5 — 6.7 折优惠，详见下方。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   Recharge Tiers — 充值活动
   -------------------------------------------------------------------------- */
function RechargeTiers() {
  return (
    <section id="recharge" className="bg-ink-900 text-white section grain relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-ink-900 via-ink-900 to-ink-800" />
      <div className="relative container-x">
        <div className="max-w-3xl mb-16 sm:mb-20">
          <p className="eyebrow-light mb-4">05 — 充值档位</p>
          <h2 className="font-display font-black text-display-xl text-white tracking-tightest leading-[0.95]">
            充得越多，
            <br />
            <span className="italic font-medium text-sage-300">折得越低</span>。
          </h2>
          <p className="mt-8 text-white/65 text-lg leading-relaxed max-w-xl">
            4 档线性折扣，公开透明。不搞"再充 ¥500 升级金卡"这种话术 —
            想练得多就充得多，充多少都欢迎。
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden">
          {mockRechargeTiers.map((t) => (
            <article
              key={t.id}
              className={`relative p-7 sm:p-8 ${
                t.highlight ? 'bg-sage text-white' : 'bg-ink-900 text-white'
              }`}
            >
              {t.highlight && (
                <span className="absolute top-5 right-5 inline-flex items-center gap-1 px-2.5 py-1 rounded-pill bg-white/15 text-[10px] font-mono uppercase tracking-widest-2">
                  主推
                </span>
              )}
              <p className="eyebrow-light opacity-80 mb-3">充 ¥{t.amount.toLocaleString()}</p>
              <p className="font-display font-black text-5xl tracking-tightest leading-none mb-3 text-sage-300">
                ¥{t.total.toLocaleString()}
              </p>
              <p className="text-sm text-white/65 font-mono mb-6">
                送 ¥{t.bonus.toLocaleString()} · {t.discount}
              </p>

              <div className="h-px bg-white/10 my-5" />

              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-sage-300 flex-shrink-0 mt-0.5" />
                  实得 ¥{t.total.toLocaleString()} 元课程
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-sage-300 flex-shrink-0 mt-0.5" />
                  可上 {t.classCount} 节{t.refCourse} · 折后约 ¥{t.perClass} / 节
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-sage-300 flex-shrink-0 mt-0.5" />
                  无使用期限，随时可退
                </li>
              </ul>
            </article>
          ))}
        </div>

        <p className="mt-8 text-white/45 text-xs font-mono">
          * 退款无忧 — 个人工作室无销售提成，剩余金额随时退。
        </p>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   Method — economics of one-person studio (using real numbers)
   -------------------------------------------------------------------------- */
function Method() {
  const netMonthly = studioAnalytics.monthlyAvgRevenue - studioAnalytics.monthlyFixedCost;
  const monthsToBreakEven = studioAnalytics.totalInvestment / netMonthly;

  return (
    <section id="method" className="bg-ink-900 text-white section grain relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-ink-900 via-ink-900 to-ink-800" />
      <div className="relative container-x">
        <div className="flex items-center justify-between mb-16 sm:mb-20">
          <p className="eyebrow-light">06 — 经济模型 / METHOD</p>
          <p className="eyebrow-light hidden sm:block">¥ ¥ ¥</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <h2 className="font-display font-black text-display-xl tracking-tightest text-white leading-[0.95]">
              算得过来，
              <br />
              <span className="italic font-medium text-sage-300">才开得下去</span>。
            </h2>
            <div className="mt-10 space-y-6 text-white/65 text-lg leading-relaxed max-w-lg">
              <p>
                我把真实数字摊开 ——
                累计收款、月均、固定成本、单节均价、回本周期。
                数字比情怀重要。
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-px bg-white/8 border border-white/10 rounded-2xl overflow-hidden">
            <Row label="开馆时长" value={`${studioAnalytics.monthsInOperation} 个月`} note="2025.12.01 至今" />
            <Row label="累计收款" value={`¥${studioAnalytics.cumulativeRevenue.toLocaleString()}`} note="真实小程序流水" accent />
            <Row label="总投资" value={`¥${studioAnalytics.totalInvestment.toLocaleString()}`} note={studioAnalytics.totalInvestmentNote} accent />
            <Row label="月度固定成本" value={`¥${studioAnalytics.monthlyFixedCost.toLocaleString()}`} note={studioAnalytics.monthlyFixedCostNote} />
            <Row label="月均营收" value={`¥${studioAnalytics.monthlyAvgRevenue.toLocaleString()}`} note="开业 7 个月均值" accent />
            <Row label="月净盈余" value={`+¥${netMonthly.toLocaleString()}`} note="营收 − 固定成本 · 个人时间不计" accent />
            <Row
              label="实际回本周期"
              value={`${monthsToBreakEven.toFixed(1)} 个月`}
              note="总投资 ÷ 月净盈余 · 线性估算"
            />
          </div>
        </div>

        {/* Lessons learned */}
        <div className="mt-20 sm:mt-24">
          <p className="eyebrow-light mb-8">07 — 我做对了什么 / 踩过什么坑</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/8 border border-white/10 rounded-2xl overflow-hidden">
            <Lesson type="good" title="一人一馆 7 个月跑通模型" body="没有合伙人、没有员工、一个人撑住 452 节私教，月均 ¥19,454。" />
            <Lesson type="good" title="充 6,000 实得 11,000 是利润底盘" body="大部分 6-9 个月耗完，现金流稳定，老学员自动续。" />
            <Lesson type="good" title="春季提前 2 周布局减肥笔记" body="3 月单月做到 ¥27,000，是开业以来最高峰。" />
            <Lesson type="bad" title="2 月没恐慌促销" body="春节淡季营收只有 ¥3,000，没发大促海报，反而用这段时间写了所有会员档案。" />
            <Lesson type="bad" title="1 月连上 6 节私教" body="睡前两条腿打颤。一人一馆体力上限是每天 4 节，不能透支。" />
            <Lesson type="bad" title="首月大数迷思" body="7 位真会员比 70 位薅体验课的强 10 倍 — 留存率是根本。" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ label, value, note, accent }: { label: string; value: string; note?: string; accent?: boolean }) {
  return (
    <div className="bg-ink-900 p-6 sm:p-7 grid grid-cols-12 gap-4 items-baseline">
      <p className="col-span-12 sm:col-span-4 text-white/55 text-sm">{label}</p>
      <p
        className={`col-span-12 sm:col-span-3 font-mono tabular-nums font-bold tracking-tight text-2xl sm:text-3xl ${
          accent ? 'text-sage-300' : 'text-white'
        }`}
      >
        {value}
      </p>
      <p className="col-span-12 sm:col-span-5 text-white/45 text-sm font-mono leading-relaxed">{note}</p>
    </div>
  );
}

function Lesson({ type, title, body }: { type: 'good' | 'bad'; title: string; body: string }) {
  return (
    <div className="bg-ink-900 p-7 sm:p-8">
      <div className="flex items-center gap-2 mb-4">
        {type === 'good' ? (
          <CheckCircle2 className="w-4 h-4 text-sage-300" />
        ) : (
          <CircleAlert className="w-4 h-4 text-clay-300" />
        )}
        <span className={`eyebrow ${type === 'good' ? 'text-sage-300' : 'text-clay-300'}`}>
          {type === 'good' ? '做对了' : '踩坑了'}
        </span>
      </div>
      <h4 className="font-display font-bold text-xl text-white mb-2">{title}</h4>
      <p className="text-white/65 text-sm leading-relaxed">{body}</p>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Page
   -------------------------------------------------------------------------- */
export default function Home() {
  return (
    <div className="bg-cream">
      <Hero />
      <Marquee />
      <SloganBanner />
      <SubNav items={homeSubNav} />
      <Dashboard />
      <Teacher />
      <Features />
      <PriceList />
      <RechargeTiers />
      <Method />
    </div>
  );
}