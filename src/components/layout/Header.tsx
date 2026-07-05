import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navItems = [
  { path: '/', label: '首页' },
  { path: '/model', label: '轻舟模式' },
  { path: '/affairs', label: '馆内事务' },
  { path: '/operations', label: '运营数据' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Hero is dark — header is transparent on top, becomes cream on scroll
  const isDarkHero = location.pathname === '/';
  const transparent = isDarkHero && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        transparent
          ? 'bg-transparent'
          : 'bg-cream/85 backdrop-blur-md border-b border-ink-200/70'
      }`}
    >
      <div className="container-x">
        <div className="h-16 sm:h-20 flex items-center justify-between">
          {/* Wordmark */}
          <Link to="/" className="group flex items-center gap-2.5">
            <img
              src="/logo-sm.png"
              alt="轻舟瑜伽 · 普拉提"
              className={`h-9 sm:h-10 w-auto object-contain transition-opacity ${
                transparent ? 'brightness-110 contrast-110' : ''
              }`}
            />
            <span
              className={`hidden md:inline-block text-[10px] font-mono uppercase tracking-widest-2 transition-colors ${
                transparent ? 'text-white/50' : 'text-muted'
              }`}
            >
              LIGHTBOAT
            </span>
          </Link>

          {/* Desktop nav — pills */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-pill text-sm font-medium transition-all ${
                    transparent
                      ? `text-white/70 hover:text-white ${
                          isActive ? 'text-white bg-white/10' : ''
                        }`
                      : `text-ink-600 hover:text-ink-900 hover:bg-ink-100 ${
                          isActive ? 'text-ink-900 bg-ink-100' : ''
                        }`
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-2">
            <Link
              to="/affairs"
              className={`hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-pill text-sm font-semibold transition-all ${
                transparent
                  ? 'bg-white text-ink-900 hover:bg-cream'
                  : 'bg-ink-900 text-cream hover:bg-ink-800'
              }`}
            >
              公开账本
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="menu"
              className={`md:hidden p-2 rounded-pill transition-colors ${
                transparent ? 'text-white hover:bg-white/10' : 'text-ink-900 hover:bg-ink-100'
              }`}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sheet */}
      {open && (
        <div className="md:hidden bg-cream border-t border-ink-200 animate-fade-in">
          <nav className="container-x py-4 flex flex-col">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive ? 'text-sage bg-sage/5' : 'text-ink-700 hover:bg-ink-100'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              to="/affairs"
              className="mt-2 px-3 py-3 rounded-xl text-base font-semibold text-white bg-ink-900 text-center"
            >
              公开账本
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}