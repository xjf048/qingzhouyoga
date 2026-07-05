import { useEffect, useState } from 'react';

export interface SubNavItem {
  label: string;
  href: string;   // 形如 "#dashboard"
}

/**
 * 二级导航条：吸顶于主 Header 下方
 * - 用户浏览页面时始终可见
 * - 点击锚链接平滑滚动到对应 section
 * - 横向溢出滚动条样式，便于移动端滑动
 *
 * 父级页面传入当前页面包含的所有子区块。
 */
export default function SubNav({ items }: { items: SubNavItem[] }) {
  const [activeHref, setActiveHref] = useState<string>(items[0]?.href ?? '');

  useEffect(() => {
    if (!items.length) return;
    const sectionEls = items
      .map((it) => document.getElementById(it.href.slice(1)))
      .filter(Boolean) as HTMLElement[];

    if (!sectionEls.length) return;

    // 用 IntersectionObserver 高亮当前可见的 section
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveHref('#' + visible[0].target.id);
        }
      },
      { rootMargin: '-30% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sectionEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <div className="sticky top-16 sm:top-20 z-30 bg-cream/90 backdrop-blur-md border-b border-ink-200 pt-safe">
      <div className="container-x flex gap-1.5 overflow-x-auto py-3 scrollbar-hide">
        {items.map((it) => {
          const isActive = it.href === activeHref;
          return (
            <a
              key={it.href}
              href={it.href}
              className={`px-3.5 py-1.5 rounded-pill text-xs sm:text-sm font-medium whitespace-nowrap transition-colors min-h-[36px] flex items-center ${
                isActive
                  ? 'bg-ink-900 text-cream'
                  : 'bg-white text-ink-700 border border-ink-200 hover:bg-ink-100 hover:text-ink-900'
              }`}
            >
              {it.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}