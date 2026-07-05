import { useMemo, useState } from 'react';
import { Filter, Search } from 'lucide-react';
import SubNav from '../../components/layout/SubNav';
import { useTransactionStore } from '../../stores/transactionStore';
import { Transaction, TransactionCategory } from '../../types';

const categoryOptions: Array<TransactionCategory | '全部'> = [
  '全部',
  '场地',
  '证件',
  '装修',
  '物品',
  '装饰',
  '运营',
];

/* --------------------------------------------------------------------------
   页面二级导航 — 跳到对应 phase
   -------------------------------------------------------------------------- */
const affairsSubNav = [
  { label: '01 · 选址', href: '#phase-1' },
  { label: '02 · 注册', href: '#phase-2' },
  { label: '03 · 装修', href: '#phase-3' },
  { label: '04 · 开业', href: '#phase-4' },
  { label: '05 · 完善', href: '#phase-5' },
];

/* Phase boundaries based on chronological entry index */
const PHASES = [
  { from: 0,  to: 2,  label: 'PHASE 01', title: '选址与签约',  color: '#3D5A3D' },
  { from: 3,  to: 3,  label: 'PHASE 02', title: '注册',        color: '#5D4E37' },
  { from: 4,  to: 4,  label: 'PHASE 03', title: '装修',        color: '#7BA05B' },
  { from: 5,  to: 5,  label: 'PHASE 04', title: '开业',        color: '#94AD85' },
  { from: 6,  to: 7,  label: 'PHASE 05', title: '持续完善',    color: '#C8A786' },
];

function phaseForIndex(i: number): typeof PHASES[number] {
  return PHASES.find((p) => i >= p.from && i <= p.to) ?? PHASES[PHASES.length - 1];
}

function formatDate(s: string) {
  // "2025-10-15" → "2025 / 10 / 15"
  const [y, m, d] = s.split('-');
  return { y, m: `${parseInt(m)}月`, d };
}

export default function AffairsPage() {
  const { selectedCategory, setSelectedCategory, searchQuery, setSearchQuery, getFilteredTransactions } = useTransactionStore();
  const filtered = getFilteredTransactions();

  // 排序：早 → 晚
  const transactions = useMemo(
    () => [...filtered].sort((a, b) => a.createdAt.localeCompare(b.createdAt)),
    [filtered]
  );

  // 总投入 / 累计数
  const totalSpent = transactions.reduce((s, t) => s + (t.cost || 0), 0);
  const totalDays = transactions.length
    ? Math.max(
        1,
        Math.ceil(
          (new Date(transactions[transactions.length - 1].createdAt).getTime() -
            new Date(transactions[0].createdAt).getTime()) /
            86400000
        ) + 1
      )
    : 0;

  return (
    <div className="min-h-screen bg-cream">
      {/* ====== Hero ====== */}
      <section className="bg-ink-900 text-white pt-32 sm:pt-40 pb-20 sm:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900 via-ink-900 to-ink-800" />
        <div className="absolute inset-0 opacity-20 mix-blend-luminosity"
             style={{ backgroundImage: 'radial-gradient(ellipse at 70% 30%, rgba(110,140,95,0.4), transparent 55%)' }} />
        <div className="relative container-x">
          <div className="flex items-center gap-3 mb-10 animate-fade-in">
            <span className="live-dot" />
            <span className="eyebrow-light">建馆日志 · CHRONICLE</span>
          </div>

          <h1 className="font-display font-black tracking-tightest leading-[0.92] text-[clamp(2.5rem,8vw,6rem)] max-w-5xl mb-10">
            <span className="block animate-slide-up">从一把钥匙</span>
            <span className="block animate-slide-up delay-100">到一间馆，</span>
            <span className="block animate-slide-up delay-200 italic font-medium text-sage-300">
              每一步都公开。
            </span>
          </h1>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden max-w-3xl">
            {[
              { l: '起始日期',  v: transactions[0]?.createdAt.slice(0, 7) ?? '—', s: '' },
              { l: '日志条数',  v: transactions.length,                    p: '', s: '条' },
              { l: '跨度天数',  v: totalDays,                                p: '', s: '天' },
              { l: '累计投入',  v: totalSpent.toLocaleString(),              p: '¥', s: '' },
            ].map((it) => (
              <div key={it.l} className="bg-ink-900 p-5">
                <p className="eyebrow-light text-[10px] mb-2">{it.l}</p>
                <p className="font-mono tabular-nums text-2xl sm:text-3xl font-bold text-white">
                  {it.p}{it.v}<span className="text-white/45 text-lg ml-1 font-normal">{it.s}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== Filter bar ====== */}
      <section className="sticky top-16 sm:top-20 z-30 bg-cream/85 backdrop-blur-md border-b border-ink-200 py-4">
        <div className="container-x flex flex-col md:flex-row gap-4 items-stretch md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              placeholder="搜索事务…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-pill bg-white border border-ink-200 text-sm focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categoryOptions.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3.5 py-1.5 rounded-pill text-xs font-medium transition-all ${
                  selectedCategory === c
                    ? 'bg-ink-900 text-cream'
                    : 'bg-white text-ink-700 border border-ink-200 hover:bg-ink-100'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <SubNav items={affairsSubNav} />

      {/* ====== Timeline ====== */}
      <section className="relative pb-24">
        {/* Center vertical line */}
        <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-ink-200 to-transparent sm:-translate-x-1/2" />

        <div className="container-x relative">
          {transactions.length === 0 && (
            <div className="text-center py-24">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-ink-100 flex items-center justify-center">
                <Filter className="w-7 h-7 text-muted" />
              </div>
              <p className="text-ink-700">暂无匹配的事务</p>
            </div>
          )}

          {transactions.map((t, i) => (
            <TimelineEntry key={t.id} entry={t} index={i} phase={phaseForIndex(i)} />
          ))}

          {transactions.length > 0 && (
            <div className="relative pt-12 pl-12 sm:pl-0 sm:text-center">
              <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-0 w-3 h-3 rounded-full bg-ink-300 ring-4 ring-cream" />
              <p className="text-sm text-muted font-mono">—— 仍在更新中 ——</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

/* ---------- 单条时间线节点 ---------- */
function TimelineEntry({
  entry,
  index,
  phase,
}: {
  entry: Transaction;
  index: number;
  phase: typeof PHASES[number];
}) {
  // 偶数索引：图片在左 / 文字在右
  // 奇数索引：图片在右 / 文字在左
  const photoOnLeft = index % 2 === 0;
  const { y, m, d } = formatDate(entry.createdAt);
  const showPhaseHeader = index === phase.from;

  return (
    <article id={showPhaseHeader ? `phase-${phase.from + 1}` : undefined} className="relative">
      {/* Phase 标题（仅在该 phase 第一条出现） */}
      {showPhaseHeader && (
        <div className="relative pl-12 sm:pl-0 mb-10 sm:mb-14 mt-16 first:mt-0">
          <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-2 w-3 h-3 rounded-full ring-4 ring-cream z-10" style={{ backgroundColor: phase.color }} />
          {/* 移动端：左侧文字 */}
          <div className="sm:hidden pl-2">
            <p className="eyebrow font-mono uppercase tracking-widest-2 text-[10px]" style={{ color: phase.color }}>
              {phase.label}
            </p>
            <p className="font-display font-black text-2xl text-ink-900 mt-1">{phase.title}</p>
          </div>
          {/* 桌面端：居中 */}
          <div className="hidden sm:block text-center">
            <p className="eyebrow font-mono uppercase tracking-widest-2 text-[10px]" style={{ color: phase.color }}>
              {phase.label}
            </p>
            <p className="font-display font-black text-3xl text-ink-900 mt-2 tracking-tightest">{phase.title}</p>
          </div>
        </div>
      )}

      {/* 主行：左 / 右 */}
      <div className={`relative grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12 mb-12 sm:mb-16 pl-12 sm:pl-0`}>
        {/* Center dot + date column */}
        <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-3 flex flex-col items-center z-10">
          <div
            className="w-3 h-3 rounded-full ring-4 ring-cream"
            style={{ backgroundColor: phase.color }}
          />
        </div>
        {/* Date (mobile only — shown inline next to dot) */}
        <div className="sm:hidden absolute left-12 top-0 -translate-y-0.5">
          <p className="font-mono text-[10px] tabular-nums text-muted">{y}.{m}.{d}</p>
        </div>

        {/* Photo side */}
        <div className={`${photoOnLeft ? 'sm:order-1' : 'sm:order-2'} sm:pr-12`}>
          <PhotoCard entry={entry} />
        </div>

        {/* Text side */}
        <div className={`${photoOnLeft ? 'sm:order-2 sm:pl-12' : 'sm:order-1 sm:pr-12'}`}>
          <TextCard entry={entry} date={{ y, m, d }} phaseColor={phase.color} />
        </div>
      </div>
    </article>
  );
}

/* ---------- 图片卡片 ---------- */
function PhotoCard({ entry }: { entry: Transaction }) {
  return (
    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-ink-100 border border-ink-200 group">
      <img
        src={entry.coverImage}
        alt={entry.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute top-4 left-4">
        <span className="px-2.5 py-1 rounded-pill bg-white/95 backdrop-blur-sm text-[10px] font-mono uppercase tracking-widest-2 text-ink-900">
          {entry.category}
        </span>
      </div>
    </div>
  );
}

/* ---------- 文字卡片 ---------- */
function TextCard({
  entry,
  date,
  phaseColor,
}: {
  entry: Transaction;
  date: { y: string; m: string; d: string };
  phaseColor: string;
}) {
  return (
    <div className="space-y-4">
      {/* Date + category eyebrow */}
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs tabular-nums text-muted">
          {date.y} · {date.m} · {date.d}
        </span>
        <span className="h-px flex-1 bg-ink-200 max-w-[80px]" />
        <span
          className="text-[10px] font-mono uppercase tracking-widest-2"
          style={{ color: phaseColor }}
        >
          {entry.category}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-display font-bold text-xl sm:text-2xl text-ink-900 leading-snug tracking-tightest">
        {entry.title}
      </h3>

      {/* Description — multi-paragraph, \"**xxx**\" highlighted bold, \\n\\n split paragraphs */}
      <DescriptionContent text={entry.content} />

      {/* Cost chip + lesson */}
      <div className="pt-2 space-y-3">
        {entry.cost != null && entry.cost > 0 && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-pill bg-ink-100 border border-ink-200">
            <span className="text-[10px] font-mono uppercase tracking-widest-2 text-muted">花费</span>
            <span className="font-mono tabular-nums font-bold text-sm text-ink-900">
              ¥{entry.cost.toLocaleString()}
            </span>
          </div>
        )}
        {entry.lesson && (
          <p className="text-sm text-muted italic border-l-2 pl-3" style={{ borderColor: phaseColor }}>
            "{entry.lesson}"
          </p>
        )}
      </div>

      {/* Stats footer */}
      <div className="flex items-center gap-4 text-[11px] font-mono text-muted pt-2">
        <span>{entry.viewCount} 浏览</span>
        <span>·</span>
        <span>{entry.likeCount} 喜欢</span>
      </div>
    </div>
  );
}

/* ---------- 富文本描述渲染 ----------
 * - "\\n\\n" 切段落
 * - "\\n" 软换行（紧凑 list）
 * - "**xxx**" 加粗
 * - "1." "2." 自动识别有序 list
 */
function DescriptionContent({ text }: { text: string }) {
  const paragraphs = text.split('\n\n').filter(Boolean);
  return (
    <div className="space-y-4 text-ink-700 leading-relaxed text-[15px]">
      {paragraphs.map((p, i) => {
        // Detect ordered list paragraph: "1. xxx\\n2. xxx"
        const isList = /^\d+\.\s/m.test(p);
        if (isList) {
          const items = p.split('\n').map((line) => line.replace(/^\d+\.\s*/, '').trim()).filter(Boolean);
          return (
            <ol key={i} className="space-y-2 pl-5 list-decimal marker:text-sage marker:font-mono marker:text-sm">
              {items.map((it, j) => (
                <li key={j} dangerouslySetInnerHTML={{ __html: boldify(it) }} />
              ))}
            </ol>
          );
        }
        // Detect unordered list: "- xxx" or "— xxx"
        if (/^[-—]\s/m.test(p)) {
          const items = p.split('\n').map((line) => line.replace(/^[-—]\s*/, '').trim()).filter(Boolean);
          return (
            <ul key={i} className="space-y-2 pl-5 list-disc marker:text-sage">
              {items.map((it, j) => (
                <li key={j} dangerouslySetInnerHTML={{ __html: boldify(it) }} />
              ))}
            </ul>
          );
        }
        // Detect soft-broken lines (no blank line, just \\n) -> join with <br>
        const html = boldify(p).replace(/\n/g, '<br/>');
        return (
          <p key={i} dangerouslySetInnerHTML={{ __html: html }} />
        );
      })}
    </div>
  );
}

// 把 **xxx** 转换成 <strong class="text-ink-900 font-semibold">xxx</strong>
function boldify(s: string) {
  return s.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-ink-900 font-semibold">$1</strong>');
}