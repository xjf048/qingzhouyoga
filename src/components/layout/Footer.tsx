import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const navGroups = [
  {
    title: '公开',
    items: [
      { label: '建馆日志', path: '/affairs' },
      { label: '经营数据', path: '/operations' },
      { label: '轻舟模式', path: '/model' },
    ],
  },
  {
    title: '同行',
    items: [
      { label: '资料库', path: '/model' },
      { label: '经验分享', path: '/model' },
      { label: '合作加入', path: '/model' },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-900 text-white relative overflow-hidden">
      {/* Top hairline */}
      <div className="absolute top-0 inset-x-0 h-px bg-white/8" />

      <div className="container-x pt-24 pb-10">
        {/* Logo + tagline */}
        <div className="mb-20 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
          <div>
            <img
              src="/logo-sm.png"
              alt="轻舟瑜伽 · 普拉提"
              className="h-20 sm:h-24 w-auto object-contain"
            />
            <p className="eyebrow-light mt-6">LIGHTBOAT YOGA & PILATES · 一人一馆</p>
          </div>
          <h2 className="font-display font-black text-display-xl text-white leading-[0.95] tracking-tightest max-w-md">
            我把过程摆给你看。
            <br />
            <span className="text-sage-300">给也想开馆的你。</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-9 gap-10 md:gap-12 pb-16 border-b border-white/8">
          {/* Address */}
          <div className="col-span-2 md:col-span-4">
            <p className="eyebrow-light mb-4">到访</p>
            <p className="text-white/85 text-lg leading-relaxed mb-6 max-w-sm">
              湖南省长沙市宁乡市
              <br />
              老街 · 玉潭公园旁
            </p>
            <p className="text-white/55 text-sm font-mono">周一 — 周日 · 09:00 – 21:00</p>
          </div>

          {/* Nav groups */}
          {navGroups.map((group) => (
            <div key={group.title} className="col-span-1 md:col-span-2">
              <p className="eyebrow-light mb-4">{group.title}</p>
              <ul className="space-y-3">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.path}
                      className="text-white/85 hover:text-white inline-flex items-center gap-1 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Right column — placeholder for future */}
          <div className="col-span-2 md:col-span-1">
            <p className="eyebrow-light mb-4">联系</p>
            <p className="text-white/45 text-xs font-mono leading-relaxed">
              见馆主
              <br />
              来访预约
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-white/40 text-xs font-mono">
            © {year} 轻舟瑜伽普拉提馆 · 保留所有权利
          </p>
          <div className="flex items-center gap-6 text-xs text-white/40 font-mono">
            <span className="text-white/30">湖南 · 宁乡 · 老街</span>
          </div>
        </div>
      </div>

      {/* Bottom mega-wordmark */}
      <div className="border-t border-white/8 py-10 overflow-hidden">
        <p className="font-display font-black text-white/5 text-[18vw] leading-none tracking-tightest text-center whitespace-nowrap select-none">
          轻舟瑜伽 · 普拉提
        </p>
      </div>
    </footer>
  );
}