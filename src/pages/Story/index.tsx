import { Quote } from 'lucide-react';
import SubNav from '../../components/layout/SubNav';

/* --------------------------------------------------------------------------
   品牌故事 — 内容来自 创始人文档
   -------------------------------------------------------------------------- */
const storySubNav = [
  { label: '爱与名字',     href: '#love-and-name' },
  { label: '轻的理念',     href: '#light-philosophy' },
  { label: '优雅与自在',   href: '#grace-and-freedom' },
  { label: '轻舟愿景',     href: '#vision' },
  { label: '品牌概述',     href: '#overview' },
  { label: '品牌故事核心', href: '#core' },
  { label: '市场定位',     href: '#positioning' },
  { label: '品牌寄语',     href: '#message' },
];

export default function Story() {
  return (
    <div className="bg-cream">
      {/* ============== Hero ============== */}
      <section className="bg-ink-900 text-white pt-32 sm:pt-40 pb-20 sm:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900 via-ink-900 to-ink-800" />
        <div
          className="absolute inset-0 opacity-20 mix-blend-luminosity"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at 70% 30%, rgba(110,140,95,0.35), transparent 60%)',
          }}
        />
        <div className="relative container-x">
          <div className="flex items-center gap-3 mb-10 animate-fade-in">
            <span className="live-dot" />
            <span className="eyebrow-light">品牌故事 · BRAND STORY</span>
          </div>

          <h1 className="font-display font-black tracking-tightest leading-[0.92] text-[clamp(2.25rem,11vw,9rem)] text-balance">
            <span className="block animate-slide-up">轻舟已过</span>
            <span className="block animate-slide-up delay-100 italic font-medium text-sage-300">
              万重山。
            </span>
          </h1>

          <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end animate-fade-in delay-500">
            <p className="md:col-span-7 text-white/70 text-lg sm:text-xl leading-relaxed max-w-2xl">
              「轻舟」—— 两个字，轻盈而从容。它是一个名字，也是一种态度；
              是一段故事，也是一份期许。
            </p>
            <div className="md:col-span-4 flex flex-wrap gap-3 justify-start md:justify-end">
              <a href="#love-and-name" className="pill-light">爱与名字</a>
              <a href="#vision" className="pill-light">轻舟愿景</a>
              <a href="#message" className="pill-light">品牌寄语</a>
            </div>
          </div>
        </div>
      </section>

      {/* ============== 二级导航 ============== */}
      <SubNav items={storySubNav} />

      {/* ============== 一、爱与名字 ============== */}
      <Section id="love-and-name" eyebrow="01" title="爱与名字" dark>
        <p className="text-white/70 text-lg sm:text-xl leading-relaxed mb-6">
          每一个名字背后，都藏着一份深情。
        </p>
        <p className="text-white/70 text-lg leading-relaxed mb-6">
          我们的大女儿叫 <strong className="text-sage-300">卿卿</strong>，
          小儿子叫 <strong className="text-sage-300">粥粥</strong>。
          这两个名字，在唇齿间轻轻相碰，便化作了 ——
          <strong className="text-sage-300"> 轻舟 </strong>。
        </p>
        <p className="text-white/70 text-lg leading-relaxed mb-6">
          这不是刻意的创意，而是自然的巧合 ——
          如同两颗星星，在宇宙中相互吸引，汇聚成一道温柔的光。
          当我们决定开一家属于自己的瑜伽馆时，这个名字便自然而然地浮现了。
          它是我们给孩子的礼物，也是我们对这个小小天地的期许：
          愿每一位走进轻舟的人，都能感受到这份被爱包裹的轻盈。
        </p>
      </Section>

      {/* ============== 二、轻的理念 ============== */}
      <Section id="light-philosophy" eyebrow="02" title="轻的理念">
        <p className="text-ink-700 text-lg leading-relaxed mb-8">
          从一开始，我们就坚定地选择了私教路线。
        </p>
        <p className="text-ink-700 text-lg leading-relaxed mb-8">
          没有团课的喧嚣，没有小班课的纷扰。
          只有一对一的专业陪伴，只有关注每一个呼吸、每一个动作的专注。
          我们相信，瑜伽和普拉提是极其个人化的练习 ——
          每个人的身体不同，节奏不同，需求不同。
          唯有私教，才能真正做到量身定制。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink-200 border border-ink-200 rounded-2xl overflow-hidden my-12">
          <div className="bg-white p-7 sm:p-9">
            <p className="eyebrow mb-4">轻</p>
            <p className="font-display font-bold text-2xl text-ink-900 mb-4">生活方式</p>
            <p className="text-ink-700 leading-relaxed">
              以最小的启动资金，最轻的管理难度，最放松的心态，
              来享受这段创业旅程。不是不思进取，而是懂得取舍；
              不是畏难退缩，而是选择专注。
              「轻」，让我们能够真正地活在当下，感受每一个当下的美好。
            </p>
          </div>
          <div className="bg-cream p-7 sm:p-9">
            <p className="eyebrow mb-4">舟</p>
            <p className="font-display font-bold text-2xl text-ink-900 mb-4">面对世界的姿态</p>
            <p className="text-ink-700 leading-relaxed">
              小而美，精而稳。如同一叶轻舟，不求快，不追风，
              只愿稳稳地驶向自己想要去的方向。
              我们相信，最美的风景，不在终点，而在沿途的每一个呼吸。
            </p>
          </div>
        </div>
      </Section>

      {/* ============== 三、优雅与自在 ============== */}
      <Section id="grace-and-freedom" eyebrow="03" title="优雅与自在" dark>
        <p className="text-white/70 text-lg sm:text-xl leading-relaxed mb-6">
          瑜伽和普拉提，从来不是一场竞赛。
        </p>
        <p className="text-white/70 text-lg leading-relaxed mb-6">
          它是一种优雅而自在的运动，一种与自己和解的方式。
          在这里，没有比较，没有评判，没有「必须做到」的执念。
          我们鼓励每一位练习者：
        </p>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-7 my-8">
          <p className="font-display italic text-2xl sm:text-3xl text-sage-300 text-center leading-snug">
            「倾听身体的声音，尊重当下的状态，<br className="hidden sm:block" />
            享受练习的过程。」
          </p>
        </div>
        <p className="text-white/70 text-lg leading-relaxed">
          轻舟的课堂，是安静的、专注的、温柔的。
          我们希望每一位会员走出这里时，带走的不只是身体的改变，
          更是一份内心的平静与自信。
          无论外面的世界多么喧嚣，只要记得呼吸的方法，记得身体的感觉，
          就能随时找回那份属于自己的轻盈。
        </p>
      </Section>

      {/* ============== 四、轻舟愿景 ============== */}
      <Section id="vision" eyebrow="04" title="轻舟愿景">
        <p className="text-ink-700 text-lg sm:text-xl leading-relaxed mb-8">
          「轻舟已过万重山」—— 这是诗人李白的豁达，也是我们的人生哲学。
        </p>
        <p className="text-ink-700 text-lg leading-relaxed mb-8">
          生活总有许多山需要翻越，但我们可以选择以轻盈的姿态出发。
          不急，不躁，不放弃。用最轻松的方式，走最远的路。
        </p>
        <p className="text-ink-700 text-lg leading-relaxed">
          这就是轻舟。它是一个小小的瑜伽馆，也是一份大大的心意。
          愿每一位走进轻舟的人，都能在这里找到属于自己的轻盈与自在。
        </p>
      </Section>

      {/* ============== 品牌概述 (table) ============== */}
      <Section id="overview" eyebrow="05" title="品牌概述" dark>
        <div className="border border-white/10 rounded-2xl overflow-hidden">
          <table className="w-full">
            <tbody className="divide-y divide-white/10">
              {[
                ['品牌名称',   '轻舟'],
                ['英文名称',   'Qingzhou Yoga & Pilates Studio'],
                ['品牌定位',   '高端私教瑜伽普拉提工作室'],
                ['运营模式',   '纯私教模式（无团课、无小班课）'],
                ['核心理念',   '小而美、轻盈自在、量身定制'],
              ].map(([k, v]) => (
                <tr key={k}>
                  <td className="px-6 py-5 text-white/55 text-sm font-mono uppercase tracking-widest-2 w-40 shrink-0">
                    {k}
                  </td>
                  <td className="px-6 py-5 text-white text-base">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ============== 品牌故事核心 ============== */}
      <Section id="core" eyebrow="06" title="品牌故事核心">
        <p className="eyebrow-sage mb-8">「轻舟」承载的三重含义</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink-200 border border-ink-200 rounded-2xl overflow-hidden">
          {[
            {
              t: '爱的延续',
              d: '女儿「卿卿」+ 儿子「粥粥」= 轻舟谐音，两个孩子化作名字守护着这家馆。',
            },
            {
              t: '理念契合',
              d: '小而美的私教路线，「轻」是轻盈的起步，「舟」是稳稳的掌舵。',
            },
            {
              t: '精神共鸣',
              d: '瑜伽普拉提的优雅自在，与「轻舟已过万重山」的豁达从容不谋而合。',
            },
          ].map((c) => (
            <article key={c.t} className="bg-white p-7 sm:p-9">
              <p className="font-display font-bold text-2xl text-ink-900 mb-3 tracking-tightest">
                {c.t}
              </p>
              <p className="text-ink-700 leading-relaxed">{c.d}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* ============== 市场定位 ============== */}
      <Section id="positioning" eyebrow="07" title="市场定位" dark>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden">
          {/* 目标客群 */}
          <div className="bg-ink-900 p-8 sm:p-10">
            <p className="eyebrow-light mb-5">目标客群</p>
            <p className="font-display font-bold text-4xl sm:text-5xl text-white tracking-tightest mb-2">
              25-50<span className="text-sage-300 text-2xl ml-1">岁</span>
            </p>
            <p className="font-display text-xl text-white/85 mb-6">女性</p>
            <ul className="space-y-3 text-white/65">
              <li className="flex items-start gap-2.5 text-sm">
                <span className="w-1 h-1 rounded-full bg-sage-300 mt-2 flex-shrink-0" />
                追求生活品质，注重身心健康的自我投资
              </li>
              <li className="flex items-start gap-2.5 text-sm">
                <span className="w-1 h-1 rounded-full bg-sage-300 mt-2 flex-shrink-0" />
                愿意为专业私教服务付费的高端客户
              </li>
              <li className="flex items-start gap-2.5 text-sm">
                <span className="w-1 h-1 rounded-full bg-sage-300 mt-2 flex-shrink-0" />
                偏好安静、私密、个性化练习环境的客户
              </li>
            </ul>
          </div>

          {/* 差异化优势 */}
          <div className="bg-ink-900 p-8 sm:p-10">
            <p className="eyebrow-light mb-5">差异化优势</p>
            <div className="space-y-5">
              {[
                {
                  t: '纯私教模式',
                  d: '专注一对一服务，确保每个会员获得完整的关注与指导。',
                },
                {
                  t: '量身定制',
                  d: '根据每位客户的身体状况、目标与节奏，制定个性化练习方案。',
                },
                {
                  t: '小而美',
                  d: '精品化运营，私密安静的环境，专注品质而非规模。',
                },
                {
                  t: '品牌温度',
                  d: '以家庭之名出发，传递爱与温暖，不仅仅是练习场所。',
                },
              ].map((it) => (
                <div key={it.t} className="border-l-2 border-sage-300/60 pl-4">
                  <p className="font-display font-semibold text-white">{it.t}</p>
                  <p className="text-white/65 text-sm leading-relaxed mt-1">{it.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ============== 品牌寄语 ============== */}
      <section id="message" className="bg-cream section">
        <div className="container-x">
          <div className="max-w-3xl mx-auto text-center">
            <Quote className="w-10 h-10 text-sage mx-auto mb-8" />
            <p className="font-display font-black text-display-lg text-ink-900 leading-tight tracking-tightest mb-10 text-balance">
              「轻舟已过万重山」
            </p>
            <p className="text-ink-700 text-lg leading-relaxed mb-10">
              愿每一位走进轻舟的人，都能在这里找到属于自己的轻盈与自在。
            </p>
            <Link to="/" className="btn-primary">
              返回首页
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------- Helpers ---------- */
import { Link } from 'react-router-dom';

function Section({
  id,
  eyebrow,
  title,
  children,
  dark = false,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <section
      id={id}
      className={`${dark ? 'bg-ink-900 text-white' : 'bg-cream text-ink-900'} section relative overflow-hidden`}
    >
      {dark && (
        <div
          className="absolute inset-0 opacity-15 mix-blend-luminosity pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at 75% 20%, rgba(110,140,95,0.4), transparent 60%)',
          }}
        />
      )}
      <div className="relative container-x max-w-4xl">
        <p className={`eyebrow ${dark ? 'text-sage-300' : 'text-sage'} mb-4`}>{eyebrow}</p>
        <h2 className="font-display font-black text-display-lg tracking-tightest mb-10">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}