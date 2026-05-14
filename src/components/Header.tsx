import { Search, Bell, Plus, Sparkles } from 'lucide-react';

interface HeaderProps {
  title: string;
  breadcrumb?: string;
  onMenuClick?: () => void;
}

export default function Header({ title, breadcrumb }: HeaderProps) {
  return (
    <header className="fixed top-0 right-0 z-40 bg-white border-b border-[#E2E8F0] flex items-center justify-between px-6"
      style={{ height: 56, left: 260 }}
    >
      {/* Left: Title + Breadcrumb */}
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-semibold text-[#0F172A]">{title}</h1>
        {breadcrumb && (
          <>
            <span className="text-[#94A3B8] mx-1">/</span>
            <span className="text-sm text-[#94A3B8]">{breadcrumb}</span>
          </>
        )}
      </div>

      {/* Right: Search, Notifications, Actions */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="搜索..."
            className="w-60 h-9 pl-9 pr-3 text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#1E40AF] focus:ring-2 focus:ring-[#1E40AF]/20 transition-all"
          />
        </div>

        {/* AI Assistant Toggle */}
        <button className="flex items-center justify-center w-9 h-9 rounded-lg border border-[#E2E8F0] text-[#1E40AF] hover:bg-[#EFF6FF] transition-colors">
          <Sparkles className="w-4 h-4" />
        </button>

        {/* Notification Bell */}
        <button className="relative flex items-center justify-center w-9 h-9 rounded-lg border border-[#E2E8F0] text-[#475569] hover:bg-[#F8FAFC] transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#EF4444] text-white text-[10px] font-medium rounded-full flex items-center justify-center">
            3
          </span>
        </button>

        {/* Quick Action */}
        <button className="flex items-center gap-1.5 h-9 px-4 bg-[#1E40AF] text-white text-sm font-medium rounded-lg hover:bg-[#1D4ED8] active:scale-[0.97] transition-all">
          <Plus className="w-4 h-4" />
          <span>新建跟进</span>
        </button>
      </div>
    </header>
  );
}
