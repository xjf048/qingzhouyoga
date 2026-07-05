import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, LayoutGrid, BarChart3, Users, Settings, FileText, PieChart } from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const menuItems = [
  { path: '/admin', label: '仪表盘', icon: LayoutGrid, exact: true },
  { path: '/admin/transactions', label: '事务管理', icon: FileText },
  { path: '/admin/operations', label: '运营数据', icon: BarChart3 },
  { path: '/admin/members', label: '会员管理', icon: Users },
  { path: '/admin/analytics', label: '数据分析', icon: PieChart },
  { path: '/admin/settings', label: '系统设置', icon: Settings },
];

export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const location = useLocation();

  const isActive = (item: typeof menuItems[0]) => {
    if (item.exact) {
      return location.pathname === item.path;
    }
    return location.pathname.startsWith(item.path);
  };

  return (
    <aside
      className={`fixed left-0 top-18 bottom-0 bg-white border-r border-secondary/10 transition-all duration-300 z-30 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full">
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  active
                    ? 'bg-primary text-white'
                    : 'text-accent hover:bg-secondary/20'
                } ${isCollapsed ? 'justify-center' : ''}`}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && (
                  <span className="font-medium truncate">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-secondary/10">
          <button
            onClick={onToggle}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-accent hover:bg-secondary/20 transition-all ${
              isCollapsed ? 'justify-center' : ''
            }`}
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <>
                <ChevronLeft className="w-5 h-5" />
                <span className="font-medium">收起</span>
              </>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}
