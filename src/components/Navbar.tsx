import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import {
  Mic,
  FolderOpen,
  BarChart3,
  UserCircle,
  Network,
  Target,
  MessageSquare,
  TrendingUp,
  Settings,
  ChevronLeft,
  ChevronRight,
  Brain,
  LogOut,
  Home,
} from 'lucide-react';
import { navGroups } from '@/data/mockData';

const iconMap: Record<string, React.ElementType> = {
  Mic,
  FolderOpen,
  BarChart3,
  UserCircle,
  Network,
  Target,
  MessageSquare,
  TrendingUp,
  Settings,
  Brain,
  Home,
};

export default function Navbar() {
  const [collapsed, setCollapsed] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (route: string) => {
    if (route === '/' && location.pathname === '/') return true;
    if (route !== '/' && location.pathname.startsWith(route)) return true;
    return false;
  };

  return (
    <aside
      className="fixed left-0 top-0 z-50 h-full bg-[#0F172A] transition-all duration-300 ease-in-out flex flex-col"
      style={{ width: collapsed ? 64 : 260 }}
    >
      {/* Logo Area */}
      <div className="flex items-center gap-3 px-5" style={{ height: 64 }}>
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#1E40AF] shrink-0">
          <Brain className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white font-bold text-base tracking-wide whitespace-nowrap"
          >
            SalesWisdom
          </motion.span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-2">
        {/* Home item */}
        <button
          key="home"
          onClick={() => navigate('/')}
          className={`w-full flex items-center gap-3 px-3 rounded-lg transition-all duration-150 mb-1 ${
            isActive('/')
              ? 'bg-[#1E40AF] text-white'
              : 'text-[#94A3B8] hover:bg-white/5 hover:text-white'
          }`}
          style={{ height: 44 }}
        >
          <Home className="w-5 h-5 shrink-0" />
          {!collapsed && <span className="text-sm font-medium whitespace-nowrap">首页</span>}
        </button>

        {/* Grouped items */}
        {navGroups.map((group) => (
          <div key={group.label} className="mt-4">
            {!collapsed && (
              <div className="px-3 mb-1.5">
                <span
                  className="text-[11px] font-medium text-[#64748B] uppercase tracking-[0.1em]"
                >
                  {group.label}
                </span>
              </div>
            )}
            {collapsed && <div className="h-px bg-white/10 mx-3 my-2" />}
            {group.items.map((item) => {
              const IconComp = iconMap[item.icon] || Brain;
              const active = isActive(item.route);
              return (
                <button
                  key={item.route}
                  onClick={() => navigate(item.route)}
                  className={`w-full flex items-center gap-3 px-3 rounded-lg transition-all duration-150 mb-0.5 ${
                    active
                      ? 'bg-[#1E40AF] text-white'
                      : 'text-[#94A3B8] hover:bg-white/5 hover:text-white'
                  }`}
                  style={{ height: 44 }}
                >
                  <IconComp className="w-5 h-5 shrink-0" />
                  {!collapsed && (
                    <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User Profile Section */}
      <div className="px-3 pb-2">
        <button
          onClick={() => setUserMenuOpen(!userMenuOpen)}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] flex items-center justify-center text-white text-xs font-semibold shrink-0">
            李
          </div>
          {!collapsed && (
            <div className="flex-1 text-left min-w-0">
              <p className="text-sm font-medium text-white truncate">李销售</p>
              <p className="text-xs text-[#94A3B8] truncate">高级销售经理</p>
            </div>
          )}
        </button>

        {userMenuOpen && !collapsed && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 py-1 bg-[#1E293B] rounded-lg border border-white/10"
          >
            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors">
              <Settings className="w-4 h-4" />
              <span>个人设置</span>
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors">
              <LogOut className="w-4 h-4" />
              <span>退出登录</span>
            </button>
          </motion.div>
        )}

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 mt-1 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          {!collapsed && <span className="text-xs">收起侧边栏</span>}
        </button>
      </div>
    </aside>
  );
}
