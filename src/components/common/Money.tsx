import { useEffect, useRef, useState } from 'react';

/**
 * Money — highlights currency amounts with the v2.1 `.money` styling and
 * animates the numeric portion from 0 → value when the element scrolls
 * into view.
 *
 * Usage:
 *   <Money value={136180} />
 *   <Money value={72940.04} decimals={2} variant="warm" size="lg" />
 */
export interface MoneyProps {
  value: number;
  decimals?: number;
  variant?: 'default' | 'warm' | 'peach' | 'on-dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  prefix?: string;
  className?: string;
  trigger?: boolean; // when false, skip animation (e.g. shown above the fold)
}

const sizeMap = {
  sm: 'text-2xl sm:text-3xl',
  md: 'text-3xl sm:text-4xl',
  lg: 'money-lg',
  xl: 'money-xl',
};

export default function Money({
  value,
  decimals = 0,
  variant = 'default',
  size = 'md',
  prefix = '¥',
  className = '',
  trigger = true,
}: MoneyProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const startedRef = useRef(false);

  // Animate when in view
  useEffect(() => {
    if (!trigger) {
      setDisplay(value);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting || startedRef.current) return;
          startedRef.current = true;
          const start = performance.now();
          const duration = 1600;
          const tick = (t: number) => {
            const p = Math.min((t - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setDisplay(value * eased);
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
  }, [value, trigger]);

  const variantClass =
    variant === 'warm'
      ? 'money-warm'
      : variant === 'peach'
        ? 'money-peach'
        : variant === 'on-dark'
          ? 'money-on-dark'
          : '';

  const sizeClass = size === 'lg' || size === 'xl' ? sizeMap[size] : sizeMap[size];

  const formatted =
    decimals > 0
      ? display.toFixed(decimals)
      : Math.floor(display).toLocaleString('en-US');

  return (
    <span
      ref={ref}
      className={`money ${variantClass} ${sizeClass} ${className}`}
      data-count={value}
    >
      <span className="symbol">{prefix}</span>
      <span className="num">{formatted}</span>
    </span>
  );
}