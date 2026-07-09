import { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  ArrowRight,
  Award,
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
import Money from '../../components/common/Money';

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

/* --------------------------------------------------------------------------
   Hero — v2.1 with ken-burns mock backdrop, warm gradients, money highlight
   -------------------------------------------------------------------------- */
function Hero() {
  const days = useStudioDays();
  const dayCount = useCountUp(days, 1800);
  const revenue = useCountUp(studioAnalytics.cumulativeRevenue);
  const members = useCountUp(studioAnalytics.totalMembers);
  const classes = useCountUp(studioAnalytics.totalPrivateClasses);
  const avgMember = useCountUp(studioAnalytics.avgMemberValue);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* v2.1 ken-burns backdrop */}
      <div className="absolute inset-0 mock-img animate-ken-burns" />
      <div className="absolute inset-0 bg-gradient-to-br from-cream-100/85 via-blush-50/55 to-lavender-50/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-cream-100 via-transparent to-transparent" />

      {/* floating decorative dots */}
      <div className="absolute top-32 right-32 w-3 h-3 rounded-full bg-blush-300 animate-float opacity-60" />
      <div className="absolute bottom-40 left-20 w-2 h-2 rounded-full bg-peach-400 animate-float opacity-70" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 right-1/4 w-2.5 h-2.5 rounded-full bg-lavender-300 animate-float opacity-60" style={{ animationDelay: '2s' }} />

      <div className="relative container-x pt-28 sm:pt-36 pb-16 sm:pb-20 min-h-screen flex flex-col">
        <div className="flex items-center gap-3 mb-10 sm:mb-12 animate-fade-in">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-sage-500 animate-pulse-soft" />
          <span className="eyebrow">2025.12.01 — 至今 · 湖南 · 宁乡 · 一人一馆</span>
          <span className="h-px flex-1 max-w-[120px] bg-ink-300" />
          <span className="eyebrow text-blush-500">v2.1 改版预览</span>
        </div>

        <div className="flex-1 flex flex-col justify-center max-w-6xl">
          <p className="eyebrow text-peach-500 mb-5 animate-fade-up">轻舟瑜伽 · 普拉提馆 · ONE-PERSON STUDIO</p>
          <h1 className="font-display font-black tracking-tightest leading-[0.92] text-[clamp(2.5rem,11vw,9rem)] text-ink-900 mb-6">
            <span className="block animate-fade-up" style={{ animationDelay: '100ms' }}>一人一馆，</span>
            <span className="block animate-fade-up" style={{ animationDelay: '200ms' }}>
              <span className="text-gradient-warm italic font-medium">全过程公开</span>。
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-ink-700 text-lg leading-relaxed font-body animate-fade-up" style={{ animationDelay: '350ms' }}>
            我是<span className="highlight">晨晨老师</span>，店主即老师。这是一间宁乡老街拐角的瑜伽普拉提馆，
            也是一份持续更新的运营档案 ——
            <span className="highlight-blush">写给同样想开一间小馆的同行</span>。
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-end animate-fade-up" style={{ animationDelay: '500ms' }}>
            <div className="md:col-span-5 flex flex-wrap items-center gap-3">
              <a href="#dashboard" className="btn-warm text-cream">
                看实时数据
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a href="#teacher" className="px-6 py-3.5 rounded-full border border-ink-300 text-ink-900 font-medium hover:bg-ink-900 hover:text-cream transition font-sans inline-flex items-center gap-2">
                <Award className="w-4 h-4" />
                认识馆主
              </a>
            </div>
            <div className="md:col-span-4 md:start-9 md:col-start-9 md:text-right">
              <p className="eyebrow text-muted mb-2">累计收款</p>
              <p className="money money-xl money-shadow">
                <span className="symbol">¥</span><span className="num">{revenue.toLocaleString()}</span>
              </p>
              <p className="eyebrow text-muted mt-2">开馆 {dayCount.toLocaleString()} 天 · 真实流水</p>
            </div>
          </div>
        </div>

        {/* 4 KPI tiles — v2.1 glass tiles */}
        <div className="mt-14 sm:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-3 animate-fade-up" style={{ animationDelay: '700ms' }}>
          {[
            { l: '累计收款', v: revenue, p: '¥', s: '', dot: 'bg-sage-500' },
            { l: '会员总数', v: members, p: '', s: '位', dot: 'bg-blush-400' },
            { l: '私教节数', v: classes, p: '', s: '节', dot: 'bg-peach-400' },
            { l: '客单价', v: avgMember, p: '¥', s: '/ 人', dot: 'bg-lavender-400' },
          ].map((it) => (
            <div key={it.l} className="glass rounded-2xl p-5 shadow-soft">
              <p className="eyebrow text-muted mb-2 flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${it.dot} animate-pulse-soft`} />
                {it.l}
              </p>
              <p className={`money text-3xl ${it.p === '¥' ? '' : '!text-ink-900'}`} style={{ color: it.p === '¥' ? undefined : '#1A1917' }}>
                {it.p && <span className="symbol">{it.p}</span>}
                <span className="num">{it.v.toLocaleString()}</span>
                <span className={`text-base font-normal text-muted ml-1`}>{it.s}</span>
              </p>
            </div>
          ))}
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
    '会员 36 位',
    '售卡 40 张',
    '人均消费 ¥3,783',
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
   Slogan banner — v2.1 with bg-dawn + drop-cap
   -------------------------------------------------------------------------- */
function SloganBanner() {
  return (
    <section className="relative py-28 md:py-36 bg-dawn overflow-hidden">
      <div className="absolute top-10 right-20 w-96 h-96 rounded-full blur-3xl opacity-30" style={{ background: 'radial-gradient(#F5C2C7,transparent)' }} />
      <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full blur-3xl opacity-30" style={{ background: 'radial-gradient(#D4C3E2,transparent)' }} />

      <div className="relative container-x text-center reveal">
        <p className="eyebrow text-blush-500 mb-6">轻舟寄语 · A WORD FROM QINGZHOU</p>
        <h2 className="font-display font-black text-[clamp(2.25rem,7vw,5rem)] text-ink-900 tracking-tightest leading-[1.05] mb-8">
          <span className="font-editorial italic text-gradient-blush">「轻舟已过万重山」</span>
        </h2>
        <p className="font-editorial italic text-2xl text-ink-700 leading-snug max-w-2xl mx-auto drop-cap">
          愿每一位走进轻舟的人，都能在这里找到属于自己的轻盈与自在。
        </p>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   MonthlyBars — DIV-based vertical bars (0→target height) for v2.1
   -------------------------------------------------------------------------- */
const monthlyBarTones: Array<'sage' | 'warm' | 'peach' | 'lavender'> = [
  'sage', 'warm', 'peach', 'lavender', 'sage', 'warm', 'peach', 'lavender',
];

function MonthlyBars() {
  const maxRev = Math.max(...monthlyHistory.map((m) => m.revenue));
  return (
    <div className="relative h-80 flex items-end gap-2 px-1">
      {monthlyHistory.map((m, i) => {
        const pct = Math.round((m.revenue / maxRev) * 100);
        const tone = monthlyBarTones[i % monthlyBarTones.length];
        const grad: Record<typeof tone, string> = {
          sage: 'linear-gradient(to top, #94AD85, #DCE5D6)',
          warm: 'linear-gradient(to top, #E07D8C, #F9E4E7)',
          peach: 'linear-gradient(to top, #C8894A, #FAE8D4)',
          lavender: 'linear-gradient(to top, #A684C0, #E8DEF0)',
        };
        const isPeak = m.revenue === maxRev;
        return (
          <div key={m.month} className="flex-1 flex flex-col items-center justify-end h-full group">
            {isPeak && (
              <span className="eyebrow text-lavender-500 mb-1">★ PEAK</span>
            )}
            <div className="relative w-full rounded-t-xl bar-grow" data-bar={pct} style={{ background: grad[tone] }}>
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 money text-xs font-bold whitespace-nowrap" data-count={m.revenue}>
                <span className="symbol">¥</span>
                <span className="num">0</span>
              </span>
            </div>
            <p className="eyebrow text-muted mt-2.5">{m.month.slice(5)}月</p>
            <p className="num-count text-[10px] text-muted mt-0.5" data-count={m.cardsSold}>
              <span className="num">0</span>张卡
            </p>
          </div>
        );
      })}
    </div>
  );
}

/* --------------------------------------------------------------------------
   Dashboard — real metrics + monthly chart
   -------------------------------------------------------------------------- */
function Dashboard() {
  // v2.1 8 KPI tiles
  const stats = [
    { l: '累计收款', v: studioAnalytics.cumulativeRevenue, p: '¥', s: '', trend: '开馆 7 个月', accent: true },
    { l: '月均营收', v: studioAnalytics.monthlyAvgRevenue, p: '¥', s: '', trend: '春季旺季拉动' },
    { l: '会员总数', v: studioAnalytics.totalMembers, p: '', s: '位', trend: '36 位独立会员' },
    { l: '私教节数', v: studioAnalytics.totalPrivateClasses, p: '', s: '节', trend: '馆主一人带' },
    { l: '客单价', v: studioAnalytics.avgMemberValue, p: '¥', s: '', trend: '人均累计消费', warm: true },
    { l: '私教单节均价', v: studioAnalytics.avgClassPrice, p: '¥', s: '', trend: '充值折扣后', peach: true },
    { l: '售卡总量', v: studioAnalytics.totalCardsSold, p: '', s: '张', trend: '活跃 37 张', lavender: true },
    { l: '剩余价值', v: studioAnalytics.balanceRemaining, p: '¥', s: '', trend: '已耗 53.6%' },
  ];

  return (
    <section id="dashboard" className="bg-cream section relative overflow-hidden">
      <div className="container-x">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16 reveal">
          <div className="md:col-span-4">
            <p className="eyebrow text-sage-500 mb-4">01 · DATA</p>
            <h2 className="font-display font-black text-[clamp(2rem,4.5vw,3.5rem)] text-ink-900 tracking-tightest leading-[1.05]">
              经营看板，
              <br />
              <span className="font-editorial italic text-gradient-leaf font-medium">真实流水</span>。
            </h2>
          </div>
          <div className="md:col-span-7 md:col-start-6 text-ink-700 text-lg leading-relaxed font-body">
            <p>
              下面每一个数字都来自店铺小程序后台的真实导出 ——
              累计 <span className="highlight">¥136,180</span>、月均 <span className="highlight">¥19,454</span>、私教 452 节、会员 36 位。
              不修饰、不粉饰。这是给同行看的一份工作档案。
            </p>
          </div>
        </div>

        {/* 8 KPI tiles — v2.1 tilt-card with money highlight */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 reveal-stagger mb-12">
          {stats.map((s) => {
            const cardClass = s.accent
              ? 'tilt-card relative bg-night text-white shadow-deep overflow-hidden'
              : s.warm
                ? 'tilt-card bg-blush-50 shadow-soft border border-blush-100'
                : s.peach
                  ? 'tilt-card bg-peach-50 shadow-soft border border-peach-100'
                  : s.lavender
                    ? 'tilt-card bg-lavender-50 shadow-soft border border-lavender-100'
                    : 'tilt-card bg-white shadow-soft border border-ink-100';

            const moneyVariant = s.accent ? 'on-dark' : s.warm ? 'warm' : s.peach ? 'peach' : s.lavender ? 'warm' : 'default';
            const numberColor = !s.accent && !s.warm && !s.peach && !s.lavender ? '#1A1917' : undefined;
            const eyebrowClass = s.accent ? 'text-sage-300' : s.warm ? 'text-blush-500' : s.peach ? 'text-peach-500' : s.lavender ? 'text-lavender-500' : '';

            return (
              <div key={s.l} className={`${cardClass} rounded-3xl p-7`}>
                {s.accent && (
                  <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-30" style={{ background: 'radial-gradient(#94AD85,transparent)' }} />
                )}
                <p className={`eyebrow mb-4 ${eyebrowClass}`}>{s.l}</p>
                {s.p === '¥' ? (
                  <Money
                    value={s.v}
                    variant={moneyVariant}
                    size="lg"
                    className="!leading-none"
                  />
                ) : (
                  <p
                    className="num-count font-bold text-4xl leading-none mb-3"
                    style={{ color: s.lavender ? '#8765A8' : numberColor }}
                  >
                    <span className="num">{s.v.toLocaleString()}</span>
                    <span className={`text-xl font-normal ml-1 ${s.lavender ? 'text-lavender-400' : 'text-muted'}`}>{s.s}</span>
                  </p>
                )}
                <p className={`text-xs font-mono mt-3 ${s.accent ? 'text-white/55' : 'text-muted'}`}>
                  {s.trend}
                </p>
              </div>
            );
          })}
        </div>

        {/* Monthly chart — DIV bars 0→target height */}
        <div className="bg-white rounded-3xl p-7 sm:p-10 shadow-soft border border-ink-100 reveal chart-reveal">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <div>
              <p className="eyebrow text-sage-500 mb-2">月度营收曲线 · MONTHLY REVENUE</p>
              <h3 className="font-display font-bold text-2xl text-ink-900">从 12 月开业到 7 月，8 个月的真实节奏</h3>
            </div>
            <p className="text-xs text-muted font-mono">更新于 {balanceSheet.updatedAt}</p>
          </div>

          <MonthlyBars />

          {/* Monthly detail table — 全部 8 行保留 + 金额高亮 */}
          <div className="mt-6 overflow-x-auto -mx-7 sm:-mx-10 px-7 sm:px-10 pt-6 border-t border-ink-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="eyebrow text-muted">
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
                  <tr key={m.month} className="hover:bg-cream">
                    <td className="py-2.5 num-count text-ink-900 font-medium text-xs">{m.label}</td>
                    <td className="py-2.5 text-right">
                      <Money value={m.revenue} size="sm" className="!text-base !font-bold" />
                    </td>
                    <td className="py-2.5 text-right num-count text-ink-700" data-count={m.newMembers}>
                      <span className="num">{m.newMembers}</span>
                    </td>
                    <td className="py-2.5 text-right num-count text-ink-700" data-count={m.cardsSold}>
                      <span className="num">{m.cardsSold}</span>
                    </td>
                    <td className="py-2.5 text-right num-count text-ink-700">
                      {m.privateClasses != null ? <span data-count={m.privateClasses}><span className="num">{m.privateClasses}</span></span> : '—'}
                    </td>
                    <td className="py-2.5 text-right">
                      {m.spent != null ? (
                        <Money value={m.spent} decimals={2} size="sm" className="!text-base" />
                      ) : '—'}
                    </td>
                    <td className="py-2.5 pl-4 text-xs text-muted">{m.note}</td>
                  </tr>
                ))}
                <tr className="bg-ink-900 text-white">
                  <td className="py-3 font-display font-bold text-xs">合计</td>
                  <td className="py-3 text-right">
                    <Money value={studioAnalytics.cumulativeRevenue} variant="on-dark" size="sm" className="!text-base !font-bold" />
                  </td>
                  <td className="py-3 text-right num-count">36</td>
                  <td className="py-3 text-right num-count">44</td>
                  <td className="py-3 text-right num-count">452</td>
                  <td className="py-3 text-right">
                    <Money value={studioAnalytics.balanceConsumed} decimals={2} variant="on-dark" size="sm" className="!text-base" />
                  </td>
                  <td className="py-3 pl-4 text-xs text-white/55">开馆 7 个月</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-xs text-muted font-mono text-center">
            v2.1 · 柱子 0→目标增长 + 顶部金额 count-up + 全部 8 个月明细保留
          </p>
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
    <section id="teacher" className="bg-cream section">
      <div className="container-x">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Portrait + headline */}
          <div className="lg:col-span-5 reveal">
            <p className="eyebrow text-blush-500 mb-4">04 · TEACHER</p>
            <h2 className="font-display font-black text-[clamp(2rem,4.5vw,3.5rem)] text-ink-900 tracking-tightest leading-[1.05] mb-8">
              把每位学员，
              <br />
              <span className="font-editorial italic text-gradient-blush font-medium">当作唯一的</span>那位。
            </h2>
            <div className="mock-img aspect-[4/5] rounded-3xl shadow-warm flex items-end p-7 relative overflow-hidden">
              <div className="absolute -bottom-12 -right-12 w-72 h-72 rounded-full blur-3xl opacity-50" style={{ background: 'radial-gradient(#E07D8C,transparent)' }} />
              <div className="relative">
                <p className="eyebrow text-ink-700/80 mb-2">主理人 · FOUNDER</p>
                <p className="font-display font-bold text-3xl text-ink-900">晨晨老师</p>
                <p className="text-ink-700/80 text-sm font-body">本名：李玲 · 8 年练习 / 5 年教学</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8 reveal">
            <p className="font-body text-lg text-ink-700 leading-relaxed drop-cap">
              8 年练习、5 年教学、2000+ 节私教时长。这家馆没有"我们"，
              只有我和来到这里的你 ——
              所以我必须够专业，也必须够了解你。
              <span className="highlight">一人一馆</span>不是营销口号，是一种生活方式。
            </p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { v: t.yearsPractice, s: '年专业练习', c: 'text-sage-500' },
                { v: t.yearsTeaching, s: '年教学经验', c: 'text-blush-500' },
                { v: `${t.hoursTaught}+`, s: '授课时长', c: 'text-peach-500' },
              ].map((s) => (
                <div key={s.s} className="bg-white rounded-2xl p-5 shadow-soft border border-ink-100">
                  <p className={`num-count font-bold text-3xl ${s.c}`} data-count={s.v}>
                    <span className="num">{s.v}</span>
                  </p>
                  <p className="text-xs text-muted mt-1 font-body">{s.s}</p>
                </div>
              ))}
            </div>

            <div>
              <p className="eyebrow text-muted mb-3">资质认证 · CERTIFICATIONS</p>
              <ul className="space-y-2.5 text-ink-700 text-base font-body">
                {t.certifications.map((c) => (
                  <li key={c} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sage-500 mt-2 flex-shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
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
    <section id="features" className="relative py-24 md:py-32 bg-sunset overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-30" style={{ background: 'radial-gradient(#F5C2C7,transparent)' }} />

      <div className="relative container-x">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16 reveal">
          <div className="md:col-span-5">
            <p className="eyebrow text-peach-500 mb-4">02 · FEATURES</p>
            <h2 className="font-display font-black text-[clamp(2rem,4.5vw,3.5rem)] text-ink-900 tracking-tightest leading-[1.05]">
              为什么是
              <br />
              <span className="font-editorial italic text-gradient-warm font-medium">一人一馆</span>？
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7 text-ink-700 text-lg leading-relaxed font-body">
            <p>
              这 6 条不是营销话术 ——
              是这家馆跑通 7 个月、累计收款 <span className="highlight">¥136,180</span> 之后沉淀下来的真实方法。
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 reveal-stagger">
          {[
            { i: '01', t: '馆主上课', d: '对每位会员的身体情况都足够熟悉和了解，不会有频繁换老师的困扰。', bg: 'border-sage-100', iconBg: 'bg-sage-100 text-sage-600 group-hover:bg-sage-500 group-hover:text-white', Icon: UserCheck },
            { i: '02', t: '没有套路', d: '更注重教学品质和会员运动表现力的培养，没有商业化的管理。', bg: 'border-blush-100', iconBg: 'bg-blush-100 text-blush-500 group-hover:bg-blush-400 group-hover:text-white', Icon: HandHeart },
            { i: '03', t: '私密性好', d: '以私教为主舒服自在，对社恐友好，不用担心受打扰。', bg: 'border-peach-100', iconBg: 'bg-peach-100 text-peach-500 group-hover:bg-peach-400 group-hover:text-white', Icon: Lock },
            { i: '04', t: '课包简单', d: '价格相比大馆更优惠且公开透明，不囤课可单节付费。', bg: 'border-lavender-100', iconBg: 'bg-lavender-100 text-lavender-500 group-hover:bg-lavender-400 group-hover:text-white', Icon: Package },
            { i: '05', t: '退款无忧', d: '个人工作室没有销售人员提成，剩余金额随时退。', bg: 'border-sage-100', iconBg: 'bg-sage-100 text-sage-500 group-hover:bg-sage-500 group-hover:text-white', Icon: ArrowRight },
            { i: '06', t: '精致用心', d: '馆内一草一木都是馆主的用心，打造静谧舒心的环境。', bg: 'border-clay-100', iconBg: 'bg-clay-100 text-clay-500 group-hover:bg-clay-400 group-hover:text-white', Icon: Sparkles },
          ].map((f) => {
            const Icon = f.Icon;
            return (
              <div key={f.t} className={`tilt-card bg-white rounded-3xl p-8 shadow-soft border ${f.bg} group`}>
                <div className={`w-12 h-12 rounded-2xl ${f.iconBg} flex items-center justify-center mb-5 transition`}>
                  <Icon className="w-5 h-5" />
                </div>
                <p className="eyebrow text-muted mb-2">{f.i}</p>
                <h3 className="font-display font-bold text-2xl text-ink-900 mb-3">{f.t}</h3>
                <p className="text-ink-700 leading-relaxed font-body text-[15px]">{f.d}</p>
              </div>
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
            <p className="eyebrow text-sage-500 mb-4">04 — 课程价目</p>
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
                  <span className="col-span-5 sm:col-span-2 text-right">
                    {p.price === 0 ? (
                      <span className="text-ink-500 font-mono font-bold">另议</span>
                    ) : (
                      <Money value={p.price} size="sm" className="!text-base !font-bold" />
                    )}
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
    <section id="recharge" className="bg-night text-white section grain relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-ink-900 via-ink-900 to-ink-800" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-25" style={{ background: 'radial-gradient(#94AD85,transparent)' }} />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-25" style={{ background: 'radial-gradient(#E07D8C,transparent)' }} />

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 reveal-stagger">
          {mockRechargeTiers.map((t) => (
            <article
              key={t.id}
              className={`tilt-card rounded-3xl p-7 ${
                t.highlight
                  ? 'relative bg-gradient-to-br from-sage-500 via-sage-600 to-sage-700 shadow-deep text-white'
                  : 'glass-dark text-white'
              }`}
            >
              {t.highlight && (
                <span className="absolute top-5 right-5 inline-flex items-center gap-1 px-2.5 py-1 rounded-pill bg-white/15 text-[10px] font-mono tracking-widest">★ 主推</span>
              )}
              <p className={`eyebrow mb-4 ${t.highlight ? 'text-sage-200' : 'text-white/55'}`}>
                充{' '}
                <Money value={t.amount} variant={t.highlight ? 'default' : 'on-dark'} size="sm" className={`!text-sm ml-1 ${t.highlight ? '!text-white' : ''}`} />
              </p>
              <Money value={t.total} variant={t.highlight ? 'default' : 'on-dark'} size="md" className={`!text-3xl mb-3 ${t.highlight ? '!text-white' : ''}`} />
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
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-30" style={{ background: 'radial-gradient(#94AD85,transparent)' }} />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl opacity-25" style={{ background: 'radial-gradient(#E07D8C,transparent)' }} />

      <div className="relative container-x">
        <div className="flex items-center justify-between mb-16 sm:mb-20 reveal">
          <p className="eyebrow-light">06 — 经济模型 / METHOD</p>
          <p className="eyebrow-light text-blush-300 hidden sm:block">¥ ¥ ¥</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5 reveal">
            <h2 className="font-display font-black text-display-xl tracking-tightest text-white leading-[0.95]">
              算得过来，
              <br />
              <span className="italic font-medium text-blush-300">才开得下去</span>。
            </h2>
            <div className="mt-10 space-y-6 text-white/65 text-lg leading-relaxed max-w-lg">
              <p>
                我把真实数字摊开 ——
                累计收款、月均、固定成本、单节均价、回本周期。
                数字比情怀重要。
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 glass-dark rounded-3xl overflow-hidden reveal-stagger">
            <Row label="开馆时长" value={`${studioAnalytics.monthsInOperation} 个月`} note="2025.12.01 至今" />
            <Row
              label="累计收款"
              moneyValue={studioAnalytics.cumulativeRevenue}
              note="真实小程序流水"
              accent
            />
            <Row
              label="总投资"
              moneyValue={studioAnalytics.totalInvestment}
              note={studioAnalytics.totalInvestmentNote}
              accent
            />
            <Row
              label="月度固定成本"
              moneyValue={studioAnalytics.monthlyFixedCost}
              note={studioAnalytics.monthlyFixedCostNote}
            />
            <Row
              label="月均营收"
              moneyValue={studioAnalytics.monthlyAvgRevenue}
              note="开业 7 个月均值"
              accent
            />
            <Row
              label="月净盈余"
              moneyValue={netMonthly}
              note="营收 − 固定成本 · 个人时间不计"
              accent
              prefix="+"
            />
            <Row
              label="实际回本周期"
              value={`${monthsToBreakEven.toFixed(1)} 个月`}
              note="总投资 ÷ 月净盈余 · 线性估算"
              warm
            />
          </div>
        </div>

        <p className="mt-8 text-xs text-white/45 font-mono text-center">
          v2.1 · 全部 7 行经济模型 · 金钱高亮 + count-up
        </p>
      </div>
    </section>
  );
}

function Row({
  label,
  value,
  moneyValue,
  note,
  accent,
  warm,
  prefix,
}: {
  label: string;
  value?: string;
  moneyValue?: number;
  note?: string;
  accent?: boolean;
  warm?: boolean;
  prefix?: string;
}) {
  return (
    <div className="px-7 py-6 border-b border-white/10 grid grid-cols-12 gap-4 items-baseline">
      <p className="col-span-12 sm:col-span-4 text-white/55 text-sm font-mono">{label}</p>
      <p
        className={`col-span-12 sm:col-span-3 text-2xl sm:text-3xl leading-none ${
          warm ? 'text-blush-300 num-count font-bold' : ''
        }`}
        {...(moneyValue !== undefined
          ? {
              // will be replaced below
            }
          : {})}
      >
        {moneyValue !== undefined ? (
          <Money value={moneyValue} variant="on-dark" size="md" prefix={prefix ? prefix + '¥' : '¥'} className="!text-2xl sm:!text-3xl !font-bold" />
        ) : (
          <span className={`font-mono tabular-nums font-bold tracking-tight ${accent ? 'text-sage-300' : 'text-white'}`}>{value}</span>
        )}
      </p>
      <p className="col-span-12 sm:col-span-5 text-white/45 text-xs font-mono leading-relaxed">{note}</p>
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