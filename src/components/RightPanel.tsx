import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  ChevronLeft,
  Brain,
  CircleDot,
  Plus,
  Mic,
  BarChart3,
} from 'lucide-react';

export default function RightPanel() {
  const [collapsed, setCollapsed] = useState(false);

  if (collapsed) {
    return (
      <aside className="fixed right-0 top-14 bottom-0 z-30 bg-white border-l border-[#E2E8F0] shadow-panel flex flex-col items-center py-4 gap-3"
        style={{ width: 48 }}
      >
        <button
          onClick={() => setCollapsed(false)}
          className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-[#F1F5F9] transition-colors text-[#94A3B8]"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="w-6 h-px bg-[#E2E8F0]" />
        <Brain className="w-5 h-5 text-[#1E40AF]" />
        <CircleDot className="w-5 h-5 text-[#10B981]" />
        <CircleDot className="w-5 h-5 text-[#F59E0B]" />
        <CircleDot className="w-5 h-5 text-[#3B82F6]" />
      </aside>
    );
  }

  return (
    <aside
      className="fixed right-0 top-14 bottom-0 z-30 bg-white border-l border-[#E2E8F0] shadow-panel overflow-y-auto"
      style={{ width: 320 }}
    >
      <div className="p-5">
        {/* Collapse Toggle */}
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-semibold text-[#0F172A]">智能助手</h3>
          <button
            onClick={() => setCollapsed(true)}
            className="flex items-center justify-center w-7 h-7 rounded-md hover:bg-[#F1F5F9] transition-colors text-[#94A3B8]"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* AI Assistant Status */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] rounded-xl border border-[#1E40AF]/10 mb-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="relative">
              <Brain className="w-6 h-6 text-[#1E40AF]" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#10B981] rounded-full border-2 border-[#EFF6FF] animate-pulse-dot" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#0F172A]">AI助手在线</p>
              <p className="text-xs text-[#475569]">已分析 1,204 份客户数据</p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-[#475569]">AI辅助</span>
            <div className="w-9 h-5 bg-[#1E40AF] rounded-full relative cursor-pointer">
              <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-5"
        >
          <h4 className="text-sm font-medium text-[#475569] mb-3">快捷操作</h4>
          <div className="flex flex-col gap-2">
            <button className="flex items-center justify-center gap-2 w-full h-10 bg-[#1E40AF] text-white text-sm font-medium rounded-lg hover:bg-[#1D4ED8] active:scale-[0.98] transition-all">
              <Plus className="w-4 h-4" />
              新建客户跟进
            </button>
            <button className="flex items-center justify-center gap-2 w-full h-10 bg-white border border-[#E2E8F0] text-[#475569] text-sm font-medium rounded-lg hover:bg-[#F8FAFC] transition-all">
              <Mic className="w-4 h-4" />
              开始语音采集
            </button>
            <button className="flex items-center justify-center gap-2 w-full h-10 bg-white border border-[#E2E8F0] text-[#475569] text-sm font-medium rounded-lg hover:bg-[#F8FAFC] transition-all">
              <BarChart3 className="w-4 h-4" />
              生成分析报告
            </button>
          </div>
        </motion.div>

        {/* Priority Reminders */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h4 className="text-sm font-medium text-[#475569] mb-3">优先级提醒</h4>
          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-3 p-3 bg-[#FEF2F2] rounded-lg border border-[#FECACA]">
              <CircleDot className="w-4 h-4 text-[#EF4444] mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-[#0F172A]">华夏科技</p>
                <p className="text-xs text-[#EF4444]">今天需跟进</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-[#FFFBEB] rounded-lg border border-[#FDE68A]">
              <CircleDot className="w-4 h-4 text-[#F59E0B] mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-[#0F172A]">鼎盛集团</p>
                <p className="text-xs text-[#D97706]">决策链待更新</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-[#EFF6FF] rounded-lg border border-[#BFDBFE]">
              <CircleDot className="w-4 h-4 text-[#3B82F6] mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-[#0F172A]">创联科技</p>
                <p className="text-xs text-[#2563EB]">话术待生成</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-5"
        >
          <h4 className="text-sm font-medium text-[#475569] mb-3">关键指标</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
              <p className="text-xl font-bold text-[#0F172A]">2,847</p>
              <p className="text-xs text-[#94A3B8]">累计客户</p>
            </div>
            <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
              <p className="text-xl font-bold text-[#0F172A]">186</p>
              <p className="text-xs text-[#94A3B8]">本月跟进</p>
            </div>
          </div>
        </motion.div>
      </div>
    </aside>
  );
}
