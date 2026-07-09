import { useEffect, useRef, useState } from 'react';

/**
 * ProgressBar — a 0 → target% growing bar, with optional count-up label.
 *
 * Usage:
 *   <ProgressBar percent={78} tone="sage" />
 *   <ProgressBar percent={53.6} decimals={1} suffix="%" tone="warm" />
 */
export interface ProgressBarProps {
  percent: number; // 0-100
  decimals?: number;
  suffix?: string;
  prefix?: string;
  tone?: 'sage' | 'warm' | 'peach' | 'lavender' | 'clay' | 'ink';
  height?: 'thin' | 'normal';
  showLabel?: boolean;
  className?: string;
}

const toneClass: Record<NonNullable<ProgressBarProps['tone']>, string> = {
  sage: 'from-sage-400 to-sage-500',
  warm: 'from-blush-300 to-blush-400',
  peach: 'from-peach-300 to-peach-400',
  lavender: 'from-lavender-300 to-lavender-400',
  clay: 'from-clay-300 to-clay-400',
  ink: 'from-ink-300 to-ink-400',
};

export default function ProgressBar({
  percent,
  decimals = 0,
  suffix = '',
  prefix = '',
  tone = 'sage',
  height = 'normal',
  showLabel = false,
  className = '',
}: ProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  const target = Math.max(0, Math.min(100, percent));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting || started.current) return;
          started.current = true;
          setTimeout(() => setWidth(target), 120);
          const start = performance.now();
          const duration = 1600;
          const tick = (t: number) => {
            const p = Math.min((t - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setDisplay(target * eased);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          obs.unobserve(e.target);
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -40px 0px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  const formatted =
    decimals > 0 ? display.toFixed(decimals) : Math.floor(display).toLocaleString('en-US');

  const h = height === 'thin' ? 'h-2' : 'h-2.5';

  return (
    <div ref={ref} className={`w-full ${className}`}>
      <div className={`w-full ${h} bg-ink-100 rounded-full overflow-hidden`}>
        <div
          className={`h-full bg-gradient-to-r ${toneClass[tone]} rounded-full bar-grow-h`}
          data-bar={target}
          style={{ width: `${width}%` }}
        />
      </div>
      {showLabel && (
        <p className="mt-2 font-mono tabular-nums text-xs text-muted">
          {prefix}
          {formatted}
          {suffix}
        </p>
      )}
    </div>
  );
}