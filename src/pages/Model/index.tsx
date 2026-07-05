import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Banknote,
  Check,
  CircleAlert,
  Compass,
  HandCoins,
  HeartHandshake,
  Lightbulb,
  MapPin,
  MessageCircle,
  Quote,
  Rocket,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Users,
} from 'lucide-react';
import { IMAGES } from '../../data/images';

/* --------------------------------------------------------------------------
   1. Hero — 轻舟模式封面
   -------------------------------------------------------------------------- */
function Hero() {
  return (
    <section className="relative min-h-[80vh] bg-ink-900 text-white overflow-hidden grain">
      <div className="absolute inset-0 bg-gradient-to-b from-ink-900 via-ink-900 to-ink-800" />
      <div
        className="absolute inset-0 opacity-20 mix-blend-luminosity"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 70% 30%, rgba(110,140,95,0.4), transparent 55%)',
        }}
      />
      <div className="relative container-x pt-32 sm:pt-40 pb-20">
        <div className="flex items-center gap-3 mb-10 animate-fade-in">
          <span className="live-dot" />
          <span className="eyebrow-light">轻舟模式 · 为瑜伽私教馆创业持续赋能</span>
        </div>

        <h1 className="font-display font-black tracking-tightest leading-[0.92] text-[clamp(2.25rem,11vw,9rem)] max-w-5xl text-balance">
          <span className="block animate-slide-up">小而美，</span>
          <span className="block animate-slide-up delay-100">高盈利。</span>
          <span className="block animate-slide-up delay-200 italic font-medium text-sage-300">
            一人一馆。
          </span>
        </h1>

        <div className="mt-12 max-w-2xl animate-fade-in delay-500">
          <p className="text-white/70 text-lg sm:text-xl leading-relaxed">
            我把自己从 0 到 1 开馆的全部过程 ——
            选址、装修、定价、获客、复购 ——
            整理成一套可复制的轻资产方法。
            给每一个想开自己小馆的你。
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#story" className="pill-sage group">
              看完整案例
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#cooperation" className="pill-outline-light">
              <Rocket className="w-3.5 h-3.5" />
              合作加入
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   2. 关键词拆解
   -------------------------------------------------------------------------- */
function Keywords() {
  const items = [
    {
      icon: Sparkles,
      title: '小而美',
      desc: '店铺小、人员少、投资少，主打轻奢精致风格，营造舒适私密的练习环境。',
    },
    {
      icon: TrendingUp,
      title: '高盈利',
      desc: '高成交率与高客户粘性，平均两个月回本，实现长期稳定的盈利增长。',
    },
    {
      icon: Users,
      title: '瑜伽私教馆',
      desc: '专注一对一私教服务，提供多样化的个性化课程定制，满足客户独特需求。',
    },
  ];

  return (
    <section className="bg-cream section">
      <div className="container-x">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <p className="eyebrow-sage mb-4">01 — 关键词</p>
            <h2 className="font-display font-black text-display-lg text-ink-900 tracking-tightest">
              三个词，
              <br />
              说清楚<span className="text-sage">这件事</span>。
            </h2>
          </div>

          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-ink-200 mb-8">
              <img src={IMAGES.modelStudio} alt="轻舟瑜伽普拉提馆 教室" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="eyebrow-light opacity-80">店铺实景</p>
                <p className="font-display text-xl font-semibold">宁乡 · 金叶家园 · 一人一馆</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-ink-200 border border-ink-200 rounded-2xl overflow-hidden mt-12">
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <article key={it.title} className="bg-white p-7 sm:p-9">
                <div className="w-12 h-12 rounded-pill bg-sage/10 text-sage flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-2xl text-ink-900 mb-3">{it.title}</h3>
                <p className="text-ink-700 leading-relaxed">{it.desc}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   3. 项目切入点 — 痛点 vs 方案
   -------------------------------------------------------------------------- */
function PainPoints() {
  const pains = [
    { t: '收入与自由受限', d: '固定工时、要值班、业绩压力大，到手薪资普遍不高。' },
    { t: '想创业门槛高', d: '缺乏经验，对选址、装修、运营等环节感到迷茫。' },
    { t: '运营体系复杂', d: '营销、会员管理、续课率、自媒体运营等问题层出不穷。' },
  ];
  const solutions = [
    '从 0 到 1，全程手把手指导开馆落地',
    '提供数字化工具，轻松管理会员与约课',
    '营销赋能，持续引流与提升续课率',
    '搭建交流社群，助力技能与事业共同成长',
  ];

  return (
    <section className="bg-ink-900 text-white section grain relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-ink-900 via-ink-900 to-ink-800" />
      <div className="relative container-x">
        <div className="max-w-3xl mb-16">
          <p className="eyebrow-light mb-4">02 — 项目切入点</p>
          <h2 className="font-display font-black text-display-xl text-white tracking-tightest leading-[0.95]">
            瑜伽老师的
            <br />
            <span className="italic font-medium text-sage-300">3 个普遍痛点</span>。
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden">
          <div className="bg-ink-900 p-8 sm:p-10">
            <p className="eyebrow-light mb-6 text-clay-300">痛点</p>
            <ul className="space-y-6">
              {pains.map((p, i) => (
                <li key={p.t}>
                  <p className="flex items-start gap-3">
                    <CircleAlert className="w-5 h-5 text-clay-300 flex-shrink-0 mt-1" />
                    <span className="font-display font-semibold text-xl text-white">{p.t}</span>
                  </p>
                  <p className="text-white/55 text-sm leading-relaxed mt-2 ml-8">{p.d}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-ink-900 p-8 sm:p-10">
            <p className="eyebrow-light mb-6 text-sage-300">轻舟 · 一站式解决方案</p>
            <ul className="space-y-5">
              {solutions.map((s) => (
                <li key={s} className="flex items-start gap-3 text-white/85 text-lg">
                  <Check className="w-5 h-5 text-sage-300 flex-shrink-0 mt-1" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-6 border-t border-white/10 text-white/55 text-sm font-mono">
              这些问题，轻舟 将为您通通解决。
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   4. 案例介绍 — 李玲的故事
   -------------------------------------------------------------------------- */
function FounderStory() {
  return (
    <section id="story" className="bg-cream section">
      <div className="container-x">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          <div className="md:col-span-5">
            <p className="eyebrow-sage mb-4">03 — 案例</p>
            <h2 className="font-display font-black text-display-lg text-ink-900 tracking-tightest">
              二孩宝妈的
              <br />
              <span className="text-sage">私教馆尝试</span>。
            </h2>
          </div>
          <div className="md:col-span-7 md:col-start-6 text-ink-700 text-lg leading-relaxed space-y-4">
            <p>
              <strong className="text-ink-900">李玲</strong>，湖南永州人，34 岁，二孩宝妈。
              2018 年业余练习瑜伽，2020 年前是程序员，一孩后离职，转行到连锁瑜伽店当老师，
              月薪 4-6K，教学两年后离职，做家庭瑜伽馆。24 年怀二胎，25 年 12 月开始致力于打造个人的私人瑜伽普拉提馆。
            </p>
            <p>
              创业目标很朴素：拥有离家近、时间可控的私人场馆，实现个人价值与收入提升，摆脱传统雇佣关系的束缚。
            </p>
          </div>
        </div>

        {/* 转型时间线 */}
        <div className="border border-ink-200 rounded-2xl overflow-hidden bg-white">
          <div className="p-7 sm:p-9 border-b border-ink-200 flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="eyebrow-sage mb-2">从程序员到瑜伽馆主</p>
              <h3 className="font-display font-bold text-2xl text-ink-900">7 年转型路径</h3>
            </div>
            <p className="text-xs text-muted font-mono">待人真诚 · 教学经验丰富 · 商业落地是新课题</p>
          </div>

          <div className="overflow-x-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 min-w-[700px]">
              {[
                { y: '2018', t: '业余瑜伽练习' },
                { y: '2020 前', t: '程序员' },
                { y: '2020 后', t: '一孩后离职' },
                { y: '2021-22', t: '连锁瑜伽老师月薪 4-6K' },
                { y: '2023', t: '家庭瑜伽馆' },
                { y: '2024', t: '怀二胎' },
                { y: '2025.12', t: '创办轻舟瑜伽馆' },
              ].map((s, i) => (
                <div key={s.y} className="p-5 border-r last:border-r-0 border-ink-200">
                  <p className="font-mono font-bold text-lg text-ink-900 tabular-nums">{s.y}</p>
                  <p className="text-xs text-muted mt-1 leading-relaxed">{s.t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   5. 案例成果 — 店铺概况 + 30天核心成效
   -------------------------------------------------------------------------- */
function CaseResults() {
  return (
    <section className="bg-white section border-y border-ink-200">
      <div className="container-x">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-ink-200 border border-ink-200 rounded-2xl overflow-hidden">
          {/* 店铺概况 */}
          <div className="bg-white p-8 sm:p-10">
            <p className="eyebrow-sage mb-2">04 — 店铺概况</p>
            <h3 className="font-display font-bold text-2xl text-ink-900 mb-8">
              一间金叶家园二楼商铺
            </h3>

            <ul className="space-y-5">
              {[
                { icon: MapPin, t: '位置', v: '长沙市宁乡金叶家园小区商铺二楼（二环外非核心区）' },
                { icon: Compass, t: '面积', v: '约 90 平方米' },
                { icon: Banknote, t: '总投入', v: '6 万元（含一年房租）' },
              ].map((it) => {
                const Icon = it.icon;
                return (
                  <li key={it.t} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-pill bg-sage/10 text-sage flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-mono uppercase tracking-widest-2 text-muted">{it.t}</p>
                      <p className="text-ink-900 font-medium mt-1">{it.v}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* 核心成效 开业 30 天 */}
          <div className="bg-ink-900 text-white p-8 sm:p-10">
            <p className="eyebrow-light mb-2 text-sage-300">核心成效（开业 30 天）</p>
            <h3 className="font-display font-bold text-2xl text-white mb-8">
              从 0 到第一个月
            </h3>

            <div className="grid grid-cols-2 gap-px bg-white/8 border border-white/10 rounded-xl overflow-hidden">
              {[
                { l: '试课数', v: '24', u: '位' },
                { l: '成交率', v: '71', u: '%' },
                { l: '成交额', v: '4.2', u: '万元' },
                { l: '月收入', v: '1.5', u: '万元' },
              ].map((m) => (
                <div key={m.l} className="bg-ink-900 p-5">
                  <p className="text-xs text-white/55 mb-2">{m.l}</p>
                  <p className="font-mono tabular-nums font-bold text-3xl sm:text-4xl text-sage-300">
                    {m.v}
                    <span className="text-white/45 text-lg ml-1 font-normal">{m.u}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 6 个模式亮点 */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { t: '低投资门槛', desc: '6 万开店' },
            { t: '低客单价', desc: '¥150-180 / 节' },
            { t: '低会员数', desc: '10 人即活' },
            { t: '高试课成交率', desc: '71%' },
            { t: '高翻课率', desc: '服务到位' },
            { t: '高收入', desc: '月入 1.5 万+' },
          ].map((h) => (
            <div key={h.t} className="bg-ink-100 rounded-xl p-5 text-center hover:bg-sage/5 transition-colors">
              <p className="font-display font-bold text-lg text-ink-900">{h.t}</p>
              <p className="text-xs text-muted mt-1">{h.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   6. 店铺构建 — 6 个子段（选址 / 高装低价 / 成本 / 课程 / 服务 / 营销）
   -------------------------------------------------------------------------- */
function BuildLocation() {
  return (
    <section className="bg-cream section">
      <div className="container-x">
        <SectionHeader num="05" title="店铺构建" subtitle="就近选址" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink-200 border border-ink-200 rounded-2xl overflow-hidden">
          <div className="bg-white p-8 sm:p-10">
            <p className="eyebrow mb-5">选址策略</p>
            <ul className="space-y-5">
              {[
                { t: '离家近，社区环绕', d: '小区门口或十字路口，客源稳定且通勤便利。' },
                { t: '租金低，成本可控', d: '选择二楼商铺，租金显著低于临街一层。' },
                { t: '省装修，快速启动', d: '利用原有格局，减少硬装投入。' },
              ].map((s) => (
                <li key={s.t} className="flex items-start gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage mt-2.5 flex-shrink-0" />
                  <div>
                    <p className="font-display font-semibold text-ink-900">{s.t}</p>
                    <p className="text-ink-700 text-sm leading-relaxed mt-1">{s.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-8 sm:p-10">
            <p className="eyebrow mb-5">核心优势</p>
            <ul className="space-y-5">
              {[
                { t: '投资门槛低', d: '极大降低房租和装修成本，快速启动项目。' },
                { t: '兼顾生活事业', d: '离家近便于管理，工作生活两不误。' },
              ].map((s) => (
                <li key={s.t} className="flex items-start gap-4">
                  <Check className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-display font-semibold text-ink-900">{s.t}</p>
                    <p className="text-ink-700 text-sm leading-relaxed mt-1">{s.d}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8 p-5 rounded-xl bg-sage/5 border border-sage/20 text-sm text-ink-700">
              通过精细化选址策略，实现低成本启动，为高盈利奠定坚实基础。
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BuildRenovation() {
  const techniques = [
    '基础装修和结构保留，减少拆改费用。',
    '更换一体式玻璃，优化采光与视野。',
    '墙面局部重做墙板，经济且效果好。',
    '吊顶刷新漆，地面铺设地毯，快速焕新。',
  ];
  return (
    <section className="bg-white section border-t border-ink-200">
      <div className="container-x">
        <SectionHeader num="06" title="店铺构建" subtitle="高装低价" dark={false} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink-200 border border-ink-200 rounded-2xl overflow-hidden">
          <div className="bg-white p-8 sm:p-10">
            <p className="eyebrow mb-5">装修理念</p>
            <ul className="space-y-5">
              {[
                '全程专业把关，非必需项重复利用，最大化节省启动资金。',
                '全部自主设计与采购，确保店铺风格独特，贴合个人品牌。',
                '全部对接材料制作厂家和专业施工队，合理安排组织各队伍，5 人 4 天即基本完成施工。',
              ].map((s) => (
                <li key={s} className="flex items-start gap-4">
                  <Lightbulb className="w-5 h-5 text-clay-400 flex-shrink-0 mt-0.5" />
                  <p className="text-ink-700 leading-relaxed">{s}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-8 sm:p-10">
            <p className="eyebrow mb-5">省钱技巧</p>
            <ul className="space-y-4">
              {techniques.map((s) => (
                <li key={s} className="flex items-start gap-3 text-ink-700 leading-relaxed">
                  <Check className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-8 text-center text-sm text-muted font-mono">
          核心策略：在保证效果的前提下，通过精细化管理与创意改造，实现成本最优化。
        </p>
      </div>
    </section>
  );
}

function BuildCosts() {
  const items: [string, number][] = [
    ['房租（1 年）及店内空调装让等费用', 18000],
    ['一体式窗户、玻璃门、训练镜', 12000],
    ['墙板重装', 3500],
    ['吊顶修缮', 1000],
    ['灯光重装', 1500],
    ['水电调整', 1000],
    ['窗帘重装', 3300],
    ['地面地毯', 1000],
    ['装修辅材', 1000],
    ['训练器材', 4000],
    ['户外广告', 7500],
    ['线上店铺', 600],
    ['约课系统', 365],
    ['室内装饰', 4000],
    ['其他零碎', 1000],
  ];
  const total = items.reduce((a, [, v]) => a + v, 0);

  return (
    <section className="bg-cream section">
      <div className="container-x">
        <SectionHeader num="07" title="店铺构建" subtitle="成本明细" />
        <div className="border border-ink-200 rounded-2xl overflow-hidden bg-white">
          <div className="grid grid-cols-12 px-5 py-4 bg-ink-100 text-xs font-mono uppercase tracking-widest-2 text-muted">
            <span className="col-span-1">#</span>
            <span className="col-span-8 sm:col-span-9">类目</span>
            <span className="col-span-3 sm:col-span-2 text-right">金额（元）</span>
          </div>
          {items.map(([label, amount], i) => (
            <div
              key={label}
              className="grid grid-cols-12 px-5 py-3.5 border-t border-ink-200 items-baseline hover:bg-cream transition-colors text-sm"
            >
              <span className="col-span-1 font-mono text-xs text-muted tabular-nums">{String(i + 1).padStart(2, '0')}</span>
              <span className="col-span-8 sm:col-span-9 text-ink-900">{label}</span>
              <span className="col-span-3 sm:col-span-2 text-right font-mono tabular-nums text-ink-700">
                ¥{amount.toLocaleString()}
              </span>
            </div>
          ))}
          <div className="grid grid-cols-12 px-5 py-5 bg-ink-900 text-white border-t border-ink-200 items-baseline">
            <span className="col-span-1 font-mono text-xs text-white/45">∑</span>
            <span className="col-span-8 sm:col-span-9 font-display font-bold">总计</span>
            <span className="col-span-3 sm:col-span-2 text-right font-mono tabular-nums font-bold text-2xl text-sage-300">
              ¥{total.toLocaleString()}
            </span>
          </div>
        </div>
        <p className="mt-4 text-xs text-muted font-mono text-center">
          6 万元总投入 · 含一年房租 + 全部装修 + 设备 + 系统
        </p>
      </div>
    </section>
  );
}

function BuildCourses() {
  return (
    <section className="bg-white section border-t border-ink-200">
      <div className="container-x">
        <SectionHeader num="08" title="店铺构建" subtitle="课程规划" />

        <div className="relative aspect-[16/8] rounded-2xl overflow-hidden border border-ink-200 mb-12">
          <img src={IMAGES.modelPractice} alt="私教实拍" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 text-white">
            <p className="eyebrow-light opacity-80 mb-1">私教实拍</p>
            <p className="font-display text-xl font-semibold">1 小时课程 · 2 小时服务</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink-200 border border-ink-200 rounded-2xl overflow-hidden">
          <CourseGroup
            label="核心课程"
            items={[
              { name: '体态调整', d: '基础入门课程，矫正不良姿态' },
              { name: '减脂塑形', d: '满足市场热门需求，打造完美曲线' },
            ]}
            accent
          />
          <CourseGroup
            label="特色课程"
            items={[
              { name: '女子器械', d: '打造差异化优势' },
              { name: '产后修复', d: '提升客户价值' },
              { name: '女性私密', d: '建立长期信任' },
            ]}
          />
          <CourseGroup
            label="其他课程"
            items={[
              { name: '自由练习', d: '满足进阶会员' },
              { name: '自组小班', d: '持续提供服务' },
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function CourseGroup({ label, items, accent }: { label: string; items: { name: string; d: string }[]; accent?: boolean }) {
  return (
    <div className={`p-7 sm:p-9 ${accent ? 'bg-sage/5' : 'bg-white'}`}>
      <p className={`eyebrow mb-5 ${accent ? 'text-sage' : ''}`}>{label}</p>
      <ul className="space-y-5">
        {items.map((c) => (
          <li key={c.name}>
            <p className={`font-display font-bold text-xl ${accent ? 'text-sage-700' : 'text-ink-900'}`}>{c.name}</p>
            <p className="text-ink-700 text-sm mt-1">{c.d}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BuildService() {
  const stages = [
    { l: '课前准备', d: '了解会员情况与目标，建立个人档案；备好环境与饮品，营造舒适氛围。' },
    { l: '课中指导', d: '及时沟通调整动作，提供拍照等情绪价值，确保练习效果与体验。' },
    { l: '课后交流', d: '交流心得，预约下次课程，延伸服务价值。' },
  ];
  return (
    <section className="bg-cream section">
      <div className="container-x">
        <SectionHeader num="09" title="店铺构建" subtitle="贴心服务" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-4">服务理念</p>
            <h3 className="font-display font-bold text-display-md text-ink-900 leading-tight">
              围绕会员服务，
              <br />
              是<span className="text-sage">核心中的核心</span>。
            </h3>
            <div className="mt-8 p-6 bg-ink-900 text-white rounded-2xl">
              <p className="eyebrow-light mb-2 text-sage-300">轻舟服务标准</p>
              <p className="font-display font-black text-3xl sm:text-4xl tracking-tightest leading-tight">
                1 小时课程
                <span className="text-sage-300 mx-2">·</span>
                2 小时服务
              </p>
            </div>
          </div>
          <div className="lg:col-span-7 space-y-px bg-ink-200 border border-ink-200 rounded-2xl overflow-hidden">
            {stages.map((s) => (
              <div key={s.l} className="bg-white p-7">
                <p className="font-display font-bold text-2xl text-ink-900 mb-3">{s.l}</p>
                <p className="text-ink-700 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BuildMarketing() {
  return (
    <section className="bg-ink-900 text-white section grain relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-ink-900 via-ink-900 to-ink-800" />
      <div className="relative container-x">
        <div className="flex items-center justify-between mb-16">
          <p className="eyebrow-light">10 — 店铺构建 / 营销爆点</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <h2 className="font-display font-black text-display-xl text-white tracking-tightest leading-[0.95]">
              以
              <span className="italic font-medium text-sage-300">极致性价比</span>
              <br />
              获取用户。
            </h2>

            <div className="mt-10 space-y-6">
              <Block
                icon={TrendingDown}
                title="核心优势"
                desc="投资少，运营成本低，课程价格击穿行业底线。"
              />
              <Block
                icon={HandCoins}
                title="营销活动"
                items={[
                  '29.5 元私教试课，赠送瑜伽裤，快速获客。',
                  '"充多少送多少" 开业活动，锁定长期会员。',
                ]}
              />
              <Block
                icon={Sparkles}
                title="线上运营"
                desc="抖音、美团、高德等全渠道覆盖，精准引流。"
              />
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <p className="eyebrow-light mb-6">开业第一波活动</p>
              <div className="space-y-6">
                <div>
                  <p className="font-mono tabular-nums text-5xl text-sage-300 font-bold">¥29.5</p>
                  <p className="text-white/65 text-sm mt-2">私教试课 · 赠送瑜伽裤</p>
                </div>
                <div className="h-px bg-white/10" />
                <div>
                  <p className="font-mono text-2xl text-sage-300 font-bold">充多少送多少</p>
                  <p className="text-white/65 text-sm mt-2">开业活动 · 锁定长期会员</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Block({ icon: Icon, title, desc, items }: { icon: any; title: string; desc?: string; items?: string[] }) {
  return (
    <div className="flex items-start gap-5">
      <div className="w-11 h-11 rounded-pill bg-white/10 text-sage-300 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <p className="font-display font-semibold text-white text-lg">{title}</p>
        {desc && <p className="text-white/65 text-sm mt-1.5 leading-relaxed">{desc}</p>}
        {items && (
          <ul className="mt-3 space-y-2">
            {items.map((i) => (
              <li key={i} className="flex items-start gap-2 text-white/75 text-sm">
                <Check className="w-4 h-4 text-sage-300 flex-shrink-0 mt-0.5" />
                <span>{i}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   7. 案例成功原因
   -------------------------------------------------------------------------- */
function SuccessFactors() {
  const items = [
    {
      title: '店铺选址正确',
      desc: '在满足馆主近距离上班通勤的要求下，1 公里范围内选址，经多层次，多渠道考察，才找到该位置。',
    },
    {
      title: '装修设计合理，施工省钱',
      desc: '选址时已基本确认装修方案，非必需项基本不动，需要改动的项目也直接从生产厂家采购，专业队伍施工。做到不重复，不返工。',
    },
    {
      title: '户外广告简单大气，引导附近客户关注',
      desc: '选址时已确定户外广告方案，充分利用原有墙面，降低户外广告开支。',
    },
    {
      title: '针对不同客户定制私人化课程',
      desc: '不做任务式上课，课前老师提前半小时备课，制定今日课程训练手册，准备好相应器具。',
    },
    {
      title: '全心全意为会员服务',
      desc: '轻舟服务标准：一小时课程，两小时服务。课后半小时休息喝茶，沟通训练成果。',
    },
    {
      title: '极致性价比快速吸引客户',
      desc: '馆主在附近没有任何资源的前提下，通过超低价吸引客户到店咨询试课。',
    },
  ];

  return (
    <section className="bg-cream section">
      <div className="container-x">
        <SectionHeader num="11" title="案例成功原因" subtitle="6 个关键决策" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-ink-200 border border-ink-200 rounded-2xl overflow-hidden">
          {items.map((it, i) => (
            <article key={it.title} className="bg-white p-7 sm:p-8 hover:bg-cream transition-colors">
              <p className="font-mono text-xs text-muted mb-4">0{i + 1}</p>
              <h3 className="font-display font-bold text-lg text-ink-900 mb-3 leading-tight">{it.title}</h3>
              <p className="text-ink-700 text-sm leading-relaxed">{it.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   8. 模式对比 — 连锁店 vs 轻舟
   -------------------------------------------------------------------------- */
function Comparison() {
  const rows = [
    { d: '选址', a: '商场，商圈等人流量大的位置', b: '对选址要求不高，选在店主家附近，方便上下班' },
    { d: '面积', a: '180-300 平不等，需要多个教室多种分区', b: '60-100 平，仅需 1-2 个房间' },
    { d: '投资', a: '前期加盟费、租金、装修、器材、店员工资 30-100 万', b: '投资小，各项成本综合仅需 3-8 万元' },
    { d: '课程开设', a: '团课（10-20人）/ 小班（3-5人）/ 私教（1-2人）', b: '砍掉其他课程，专注私教，多样化定制私教课' },
    { d: '员工数量', a: '全职老师 3-4 名 + 兼职若干', b: '以馆主为核心，可搭配 1-2 名瑜伽老师' },
    { d: '运营成本', a: '高昂房租水电 + 多人工资 + 频繁营销活动', b: '运营成本非常低，房租低、水电少、店主即老师' },
    { d: '运营难度', a: '复杂的员工管理、课程安排、营销活动 + 维持新会员进入', b: '运营难度低，客户数量需求少' },
    { d: '会员数', a: '需要 200+ 会员池，40+ 活跃会员 + 不断新会员', b: '10 名会员保证运营良好，20+ 即需招老师或提价' },
    { d: '课程价格', a: '低价团课引流 199/周卡，小班 100-150，私教转化难 300-380/节', b: '私教初定 150-180/节，可灵活调整' },
    { d: '营销套路', a: '月卡/季卡/年卡 + 限期次卡，冲动消费后不来 = 沉淀池', b: '基本无套路，充值只是开始，还需督促会员上课' },
    { d: '跑路风险', a: '培训乱相丛生，提前收费 + 运营不当 = 跑路', b: '投资少、回款快、店主月入过万，无跑路风险' },
  ];

  return (
    <section className="bg-white section border-y border-ink-200">
      <div className="container-x">
        <SectionHeader num="12" title="模式对比" subtitle="连锁店 vs 轻舟模式" />

        <div className="border border-ink-200 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-12 bg-ink-100">
            <div className="col-span-3 px-5 py-4 text-xs font-mono uppercase tracking-widest-2 text-muted">维度</div>
            <div className="col-span-9 sm:col-span-4 px-5 py-4 text-sm font-mono text-muted border-l border-ink-200">连锁店瑜伽馆</div>
            <div className="col-span-9 sm:col-span-5 px-5 py-4 text-sm font-mono text-sage border-l border-ink-200 bg-sage/5">轻舟模式瑜伽馆</div>
          </div>

          {rows.map((r, i) => (
            <div key={r.d} className={`grid grid-cols-12 border-t border-ink-200 ${i % 2 === 0 ? 'bg-white' : 'bg-cream'}`}>
              <div className="col-span-3 px-5 py-4 text-sm font-medium text-ink-900">{r.d}</div>
              <div className="col-span-9 sm:col-span-4 px-5 py-4 text-sm text-ink-700 border-l border-ink-200">{r.a}</div>
              <div className="col-span-9 sm:col-span-5 px-5 py-4 text-sm text-ink-900 border-l border-ink-200 bg-sage/5">
                {r.b}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   9. 可复制性 + 风险
   -------------------------------------------------------------------------- */
function Reproducibility() {
  return (
    <section className="bg-cream section">
      <div className="container-x">
        <SectionHeader num="13" title="是否具有可复制性" subtitle="人群画像 + 痛点" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink-200 border border-ink-200 rounded-2xl overflow-hidden">
          <div className="bg-white p-8 sm:p-10">
            <p className="eyebrow mb-5">人群画像</p>
            <ul className="space-y-5">
              <li>
                <p className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-sage flex-shrink-0 mt-1" />
                  <span className="font-display font-semibold text-ink-900">身份</span>
                </p>
                <p className="text-ink-700 text-sm leading-relaxed mt-2 ml-8">
                  28-35 岁女性，瑜伽私教 2-5 年，有创业想法。
                </p>
              </li>
              <li>
                <p className="flex items-start gap-3">
                  <Banknote className="w-5 h-5 text-sage flex-shrink-0 mt-1" />
                  <span className="font-display font-semibold text-ink-900">收入</span>
                </p>
                <p className="text-ink-700 text-sm leading-relaxed mt-2 ml-8">
                  收入不高，面临业绩压力，想增加收入，上班时间自由。
                </p>
              </li>
              <li>
                <p className="flex items-start gap-3">
                  <Compass className="w-5 h-5 text-sage flex-shrink-0 mt-1" />
                  <span className="font-display font-semibold text-ink-900">目标</span>
                </p>
                <p className="text-ink-700 text-sm leading-relaxed mt-2 ml-8">
                  开设"小而美"的瑜伽私教馆，实现个人价值。
                </p>
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 sm:p-10">
            <p className="eyebrow mb-5">核心痛点与解决方案</p>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <CircleAlert className="w-5 h-5 text-clay-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-display font-semibold text-ink-900">痛点 1</p>
                  <p className="text-ink-700 text-sm leading-relaxed mt-1">
                    缺乏开店经验，不懂选址、装修、运营、搞定客户。
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CircleAlert className="w-5 h-5 text-clay-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-display font-semibold text-ink-900">痛点 2</p>
                  <p className="text-ink-700 text-sm leading-relaxed mt-1">
                    独自开店风险高，合伙经营利润被摊薄。
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-display font-semibold text-sage-700">方案</p>
                  <p className="text-ink-700 text-sm leading-relaxed mt-1">
                    提供一站式轻资产创业支持，降低门槛与风险。
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-10 text-center text-lg font-display italic text-ink-900">
          <HeartHandshake className="inline w-5 h-5 text-sage mr-2" />
          结论：目标明确、痛点清晰、方案可行，模式具备高度可复制性。
        </p>
      </div>
    </section>
  );
}

function Risks() {
  const challenges = [
    { t: '店铺选址错误、场馆格局不适', d: '位置选择是开馆第一道门槛，错配之后调整成本极高。' },
    { t: '关键环节过度外包', d: '设计、装修、运营、营销、自媒体等环节外包，难以把控质量与成本。' },
    { t: '运营维护体系缺失', d: '缺乏持续的培训、客户维护及续单策略。' },
  ];
  const risks = [
    { t: '成本失控，利润压缩', d: '外包溢价与管理成本增加，直接侵蚀利润空间。' },
    { t: '抗风险能力薄弱', d: '对业务细节不熟悉，难以应对突发状况，冗余不足。' },
    { t: '长期发展受限', d: '没有体系化沉淀，难以复制扩张或转型。' },
  ];

  return (
    <section className="bg-ink-900 text-white section grain relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-ink-900 via-ink-900 to-ink-800" />
      <div className="relative container-x">
        <div className="max-w-3xl mb-16">
          <p className="eyebrow-light mb-4">14 — 风险</p>
          <h2 className="font-display font-black text-display-xl text-white tracking-tightest leading-[0.95]">
            道理易懂，
            <br />
            <span className="italic font-medium text-clay-300">执行很难</span>。
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden">
          <div className="bg-ink-900 p-8 sm:p-10">
            <p className="eyebrow-light mb-6 text-clay-300">执行难点</p>
            <ul className="space-y-6">
              {challenges.map((c) => (
                <li key={c.t}>
                  <p className="flex items-start gap-3">
                    <CircleAlert className="w-5 h-5 text-clay-300 flex-shrink-0 mt-1" />
                    <span className="font-display font-semibold text-xl text-white">{c.t}</span>
                  </p>
                  <p className="text-white/55 text-sm leading-relaxed mt-2 ml-8">{c.d}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-ink-900 p-8 sm:p-10">
            <p className="eyebrow-light mb-6 text-clay-300">核心风险</p>
            <ul className="space-y-6">
              {risks.map((r) => (
                <li key={r.t}>
                  <p className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-clay-300 flex-shrink-0 mt-1" />
                    <span className="font-display font-semibold text-xl text-white">{r.t}</span>
                  </p>
                  <p className="text-white/55 text-sm leading-relaxed mt-2 ml-8">{r.d}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-12 text-center text-lg font-display italic text-white/85">
          瑜伽私教馆开馆简单，但仍存在很大创业失败风险。
        </p>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   10. 合作模式
   -------------------------------------------------------------------------- */
function Cooperation() {
  const steps = [
    { l: '前期咨询', d: '了解个人情况、创业要求及独立授课能力。', fee: '免费' },
    { l: '方案签署', d: '提供定制化开店方案，签署协议并支付意向金。', fee: '¥5,000' },
    { l: '选址装修', d: '协助完成店铺选址与改造装修，开业后支付第二笔。', fee: '¥5,000' },
    { l: '效果支付', d: '店铺运营效果达标后，支付第三笔费用。', fee: '¥5,000' },
    { l: '共享成长', d: '预留 10% 股份，持续后续运营服务。', fee: '长期' },
  ];
  return (
    <section id="cooperation" className="bg-cream section">
      <div className="container-x">
        <SectionHeader num="15" title="合作模式" subtitle="加入轻舟" />
        <p className="text-center text-lg text-ink-700 font-display italic mb-12">
          共用品牌，共同进步。齐心协力，合作共赢。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-px bg-ink-200 border border-ink-200 rounded-2xl overflow-hidden">
          {steps.map((s, i) => (
            <article key={s.l} className="bg-white p-6 sm:p-7 relative">
              <p className="font-mono text-xs text-sage mb-3">0{i + 1}</p>
              <h3 className="font-display font-bold text-lg text-ink-900 mb-2">{s.l}</h3>
              <p className="text-ink-700 text-sm leading-relaxed mb-5 min-h-[60px]">{s.d}</p>
              <p className="inline-block px-2.5 py-1 rounded-md bg-sage/10 text-sage text-xs font-mono">{s.fee}</p>
            </article>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-ink-900 text-white p-8 sm:p-10 rounded-2xl">
            <p className="eyebrow-light mb-3">前期筹备 · 我们帮你</p>
            <ul className="space-y-3 text-white/85">
              {[
                '店铺选址评估，租赁洽谈议价',
                '装修方案设计与施工落地',
                '户外广告投放，店内场景布置',
                '器械采购选型',
                '营销渠道对接，推广活动策划',
                '客户维护逻辑培训',
              ].map((s) => (
                <li key={s} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-sage-300 flex-shrink-0 mt-0.5" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-sage text-white p-8 sm:p-10 rounded-2xl">
            <p className="eyebrow-light mb-3 opacity-80">后期运营 · 我们陪你</p>
            <ul className="space-y-3">
              {[
                '私教课程体系优化',
                '抖音 / 美团等线上商铺维护',
                '自媒体账户打造',
                '瑜伽教培提升',
                '会员活动组织',
                '共同品牌维护',
              ].map((s) => (
                <li key={s} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link to="/affairs" className="btn-primary">
            留下你的开馆计划书
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   11. 轻舟模式能成功的必然性
   -------------------------------------------------------------------------- */
function WhyItWorks() {
  return (
    <section className="bg-ink-900 text-white section grain relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-ink-900 via-ink-900 to-ink-800" />
      <div className="relative container-x">
        <div className="max-w-3xl mb-16">
          <p className="eyebrow-light mb-4">16 — 必然性</p>
          <h2 className="font-display font-black text-display-xl text-white tracking-tightest leading-[0.95]">
            <span className="italic font-medium text-sage-300">三个极致</span>，
            <br />
            让这条路可以走通。
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden">
          {[
            {
              t: '极致的低成本',
              d: '从选址、装修、运营各方面节省成本，小投资，快回报。',
              icon: TrendingDown,
            },
            {
              t: '极致的低客单价',
              d: '提供高性价比的产品与服务，快速吸引并覆盖更广泛的用户群体。',
              icon: Banknote,
            },
            {
              t: '极致的私教服务',
              d: '关注用户体验的每一个细节，将普通客户转化为品牌的忠实粉丝。',
              icon: HeartHandshake,
            },
          ].map((it) => {
            const Icon = it.icon;
            return (
              <article key={it.t} className="bg-ink-900 p-8 sm:p-10">
                <div className="w-12 h-12 rounded-pill bg-sage/15 text-sage-300 flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-2xl text-white mb-4 leading-tight">{it.t}</h3>
                <p className="text-white/65 leading-relaxed">{it.d}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-20 max-w-3xl">
          <Quote className="w-8 h-8 text-sage-300/70 mb-6" />
          <p className="font-display text-2xl sm:text-3xl text-white leading-relaxed italic">
            一个人开一间馆，不是为了证明自己可以，
            而是为了证明 ——
            <span className="text-sage-300 not-italic font-semibold">这条路可以走通。</span>
          </p>
          <p className="eyebrow-light mt-6">— 晨晨老师 · 轻舟模式创始人</p>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   Helpers
   -------------------------------------------------------------------------- */
function SectionHeader({ num, title, subtitle, dark }: { num: string; title: string; subtitle: string; dark?: boolean }) {
  return (
    <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
      <div>
        <p className={`eyebrow mb-3 ${dark ? 'text-sage-300' : 'text-sage'}`}>{num} — {title}</p>
        <h2 className="font-display font-black text-display-lg text-ink-900 tracking-tightest">
          {subtitle}
        </h2>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Page
   -------------------------------------------------------------------------- */
export default function Model() {
  return (
    <div className="bg-cream">
      <Hero />
      <Keywords />
      <PainPoints />
      <FounderStory />
      <CaseResults />
      <BuildLocation />
      <BuildRenovation />
      <BuildCosts />
      <BuildCourses />
      <BuildService />
      <BuildMarketing />
      <SuccessFactors />
      <Comparison />
      <Reproducibility />
      <Risks />
      <Cooperation />
      <WhyItWorks />
    </div>
  );
}