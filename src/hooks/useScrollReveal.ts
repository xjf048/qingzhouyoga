import { useEffect } from 'react';

/**
 * useScrollReveal — wires up v2.1 scroll-driven animations globally:
 *  - `.reveal` / `.reveal-stagger` -> add `.in` when intersecting
 *  - `.bar-grow` -> set inline height = data-bar (%)
 *  - `.bar-grow-h` -> set inline width = data-bar (%)
 *  - `.draw-path` -> add `.drawn` (CSS handles stroke-dashoffset)
 *  - `.draw-area` -> add `.drawn`
 *  - `.draw-dot` -> add `.drawn` with stagger
 *  - `.ring-fill` -> set stroke-dashoffset = data-offset (when provided)
 *  - `[data-count]` -> count-up the .num child (eased cubic) when triggered
 *  - `#progress-top` -> width = scroll percent
 *
 * Components opt-in by adding the relevant class/data attribute.
 */
export default function useScrollReveal() {
  useEffect(() => {
    // ---- Top scroll progress ----
    const progress = document.getElementById('progress-top');
    const onScroll = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      if (progress) progress.style.width = `${Math.max(0, Math.min(100, pct))}%`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    // ---- Count-up helper ----
    const countUp = (el: HTMLElement, target: number, duration: number) => {
      const numEl = el.querySelector('.num') as HTMLElement | null;
      if (!numEl) return;
      const decimals = parseInt(el.dataset.decimals || '0', 10);
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min((t - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const v = target * eased;
        numEl.textContent =
          decimals > 0 ? v.toFixed(decimals) : Math.floor(v).toLocaleString('en-US');
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    // ---- Reveal / count / bar / draw / ring observer ----
    const triggers = document.querySelectorAll(
      '.reveal, .reveal-stagger, .chart-reveal',
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const root = entry.target as HTMLElement;

          // Mark reveal
          if (root.classList.contains('reveal') || root.classList.contains('reveal-stagger')) {
            root.classList.add('in');
          }

          // Count-up
          root.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
            if (el.dataset.run) return;
            el.dataset.run = '1';
            const target = parseFloat(el.dataset.count || '0');
            countUp(el, target, 1600);
          });

          // Bar grow (vertical)
          root.querySelectorAll<HTMLElement>('.bar-grow').forEach((bar) => {
            if (bar.dataset.run) return;
            bar.dataset.run = '1';
            const h = bar.dataset.bar;
            if (h) setTimeout(() => { bar.style.height = `${h}%`; }, 120);
          });

          // Bar grow (horizontal)
          root.querySelectorAll<HTMLElement>('.bar-grow-h').forEach((bar) => {
            if (bar.dataset.run) return;
            bar.dataset.run = '1';
            const w = bar.dataset.bar;
            if (w) setTimeout(() => { bar.style.width = `${w}%`; }, 120);
          });

          // SVG line / area / dots
          root.querySelectorAll<HTMLElement>('.draw-path').forEach((p) => p.classList.add('drawn'));
          root.querySelectorAll<HTMLElement>('.draw-area').forEach((p) => p.classList.add('drawn'));
          root.querySelectorAll<HTMLElement>('.draw-dot').forEach((p, i) =>
            setTimeout(() => p.classList.add('drawn'), 200 + i * 80),
          );

          // Ring fill (offset from data-offset, or stroke length default)
          root.querySelectorAll<HTMLElement>('.ring-fill').forEach((r) => {
            if (r.dataset.run) return;
            r.dataset.run = '1';
            const offset = r.dataset.offset;
            if (offset) r.style.strokeDashoffset = offset;
          });

          observer.unobserve(root);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
    );
    triggers.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      observer.disconnect();
    };
  }, []);
}