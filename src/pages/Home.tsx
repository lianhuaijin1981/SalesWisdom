import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import {
  Users,
  PhoneCall,
  Brain,
  Clock,
  ChevronRight,
  Mic,
  FolderOpen,
  BarChart3,
  UserCircle,
  Network,
  Target,
  MessageSquare,
  TrendingUp,
  Settings,
  Sparkles,
  ArrowRight,
  TrendingDown,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import Layout from '@/components/Layout';
import {
  kpiData,
  subsystems,
  activities,
  tasks,
  followUpTrend,
  industryDistribution,
  aiInsight,
} from '@/data/mockData';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const kpiCards = [
  { label: '累计客户数', value: kpiData.totalCustomers.toLocaleString(), icon: Users, iconBg: '#EFF6FF', iconColor: '#1E40AF', trend: kpiData.totalCustomersTrend, trendUp: true },
  { label: '本月跟进次数', value: kpiData.thisMonthFollowUps.toString(), icon: PhoneCall, iconBg: '#F0FDF4', iconColor: '#10B981', trend: kpiData.thisMonthFollowUpsTrend, trendUp: true },
  { label: 'AI分析报告', value: kpiData.aiAnalysisCount.toLocaleString(), icon: Brain, iconBg: '#FEF3C7', iconColor: '#F59E0B', trend: kpiData.aiAnalysisTrend, trendUp: true },
  { label: '待处理任务', value: kpiData.pendingTasks.toString(), icon: Clock, iconBg: '#FEF2F2', iconColor: '#EF4444', trend: kpiData.pendingTasksTrend, trendUp: false },
];

const iconMap: Record<string, React.ElementType> = {
  Mic, FolderOpen, BarChart3, UserCircle, Network, Target, MessageSquare, TrendingUp, Settings,
};

const statusPillClass = (status: string) => {
  if (status === '已启用') return 'bg-[#F0FDF4] text-[#166534]';
  return 'bg-[#F1F5F9] text-[#475569]';
};

const priorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'bg-[#EF4444]';
    case 'medium': return 'bg-[#F59E0B]';
    case 'low': return 'bg-[#3B82F6]';
    default: return 'bg-[#94A3B8]';
  }
};

const dueTypeColor = (type: string) => {
  switch (type) {
    case 'today':
    case 'urgent': return 'text-[#EF4444]';
    case 'tomorrow': return 'text-[#F59E0B]';
    case 'week': return 'text-[#94A3B8]';
    default: return 'text-[#94A3B8]';
  }
};

const activityIconBg = (type: string, icon?: string) => {
  if (icon === 'TrendingUp') return 'bg-[#FEF3C7]';
  if (type === 'ai') return 'bg-[#EFF6FF]';
  if (type === 'system') return 'bg-[#F1F5F9]';
  return 'bg-[#EFF6FF]';
};

const activityIconColor = (type: string, icon?: string) => {
  if (icon === 'TrendingUp') return '#F59E0B';
  if (type === 'ai') return '#1E40AF';
  if (type === 'system') return '#475569';
  return '#1E40AF';
};

const statusPill = (statusType?: string) => {
  switch (statusType) {
    case 'ai': return { text: 'AI分析', className: 'bg-[#DBEAFE] text-[#1E40AF]' };
    case 'completed': return { text: '已完成', className: 'bg-[#F0FDF4] text-[#166534]' };
    case 'pending': return { text: '+2.3分', className: 'bg-[#FEF3C7] text-[#92400E]' };
    default: return null;
  }
};

export default function Home() {
  const navigate = useNavigate();

  const cardVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.4, ease },
    }),
  };

  return (
    <Layout title="首页仪表盘" breadcrumb="首页">
      {/* Section 1: KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4, ease }}
            className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: card.iconBg }}
              >
                <card.icon className="w-5 h-5" style={{ color: card.iconColor }} />
              </div>
              <div className="flex items-center gap-1">
                {card.trendUp ? (
                  <TrendingUp className="w-3.5 h-3.5 text-[#10B981]" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5 text-[#EF4444]" />
                )}
                <span className={`text-xs font-medium ${card.trendUp ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                  {card.trendUp ? '+' : ''}{card.trend}%
                </span>
              </div>
            </div>
            <p className="text-[32px] font-bold text-[#0F172A] leading-tight">{card.value}</p>
            <p className="text-xs text-[#94A3B8] mt-1">{card.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Section 2: Quick Access - Subsystem Cards */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[22px] font-semibold text-[#0F172A]">功能模块</h2>
          <button className="text-sm text-[#1E40AF] hover:underline flex items-center gap-1">
            查看全部 <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {subsystems.map((sys, i) => {
            const IconComp = iconMap[sys.icon] || Settings;
            return (
              <motion.div
                key={sys.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                onClick={() => navigate(sys.route)}
                className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 hover:border-[#1E40AF] cursor-pointer transition-all duration-200 group"
              >
                <div className="flex items-start justify-between">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: sys.gradient }}
                  >
                    <IconComp className="w-6 h-6 text-white" />
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#1E40AF] group-hover:translate-x-0.5 transition-all" />
                </div>
                <h3 className="text-base font-semibold text-[#0F172A] mt-3">{sys.title}</h3>
                <p className="text-[13px] text-[#94A3B8] mt-1 line-clamp-2">{sys.description}</p>
                <div className="mt-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full ${statusPillClass(sys.status)}`}>
                    {sys.status}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Section 3: Recent Activity Feed + Tasks */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1.4fr_0.6fr] gap-6">
        {/* Left: Recent Activity */}
        <div>
          <div className="mb-4">
            <h2 className="text-[22px] font-semibold text-[#0F172A]">最近动态</h2>
            <p className="text-[13px] text-[#94A3B8] mt-0.5">系统内最近的操作与AI分析活动</p>
          </div>
          <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-card divide-y divide-[#F1F5F9]">
            {activities.map((item, i) => {
              const iconBg = activityIconBg(item.type, item.icon);
              const iconColor = activityIconColor(item.type, item.icon);
              const pill = statusPill(item.statusType);
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.3, ease }}
                  className="flex items-start gap-4 px-5 py-4 hover:bg-[#F8FAFC] transition-colors"
                >
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${iconBg}`}>
                    {item.type === 'user' ? (
                      <span className="text-xs font-semibold text-[#1E40AF]">李</span>
                    ) : item.icon && iconMap[item.icon] ? (
                      iconMap[item.icon] && <IconComponent name={item.icon} color={iconColor} />
                    ) : (
                      <Brain className="w-4 h-4" style={{ color: iconColor }} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm text-[#0F172A] leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: item.description
                          .replace(/\*\*(.*?)\*\*/g, '<span class="text-[#1E40AF] font-medium">$1</span>'),
                      }}
                    />
                    <p className="text-xs text-[#94A3B8] mt-1">{item.time}</p>
                  </div>
                  {pill && (
                    <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full shrink-0 ${pill.className}`}>
                      {pill.text}
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right: My Tasks */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-[22px] font-semibold text-[#0F172A]">我的待办</h2>
            <span className="inline-flex items-center justify-center w-5 h-5 bg-[#EF4444] text-white text-[11px] font-medium rounded-full">
              {tasks.length}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {tasks.map((task, i) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.3, ease }}
                className="bg-white rounded-lg border border-[#E2E8F0] p-3.5 flex items-start gap-3 hover:shadow-card transition-shadow"
              >
                <div className="mt-0.5">
                  <div className="w-5 h-5 rounded border-2 border-[#E2E8F0] hover:border-[#10B981] cursor-pointer transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#0F172A] leading-snug">{task.text}</p>
                  <p className={`text-xs mt-1 ${dueTypeColor(task.dueType)}`}>{task.dueText}</p>
                </div>
                <div className={`w-2.5 h-2.5 rounded-full mt-2 shrink-0 ${priorityColor(task.priority)}`} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 4: AI Quick Insights Banner */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5, ease }}
        className="mt-6 relative overflow-hidden rounded-2xl"
        style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E3A5F 60%, #1E40AF 100%)' }}
      >
        {/* Decorative floating circles */}
        <div className="absolute top-6 right-16 w-20 h-20 rounded-full bg-[#38BDF8]/20 blur-xl animate-float" />
        <div className="absolute bottom-4 right-32 w-14 h-14 rounded-full bg-[#1E40AF]/30 blur-lg animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-10 right-48 w-10 h-10 rounded-full bg-[#38BDF8]/15 blur-md animate-float" style={{ animationDelay: '2s' }} />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between p-7 lg:p-8 gap-6">
          {/* Left */}
          <div className="lg:w-[60%]">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span className="text-xs text-white font-medium">AI 智能洞察</span>
            </div>
            <h3 className="text-[22px] font-semibold text-white">{aiInsight.headline}</h3>
            <p
              className="mt-2 text-sm text-[#CBD5E1] leading-relaxed line-clamp-2"
              dangerouslySetInnerHTML={{
                __html: aiInsight.content.replace(/\*\*(.*?)\*\*/g, '<span class="text-white font-medium">$1</span>'),
              }}
            />
            <div className="flex items-center gap-3 mt-4">
              <button className="px-4 py-2 text-sm text-white border border-white/20 rounded-lg hover:bg-white/10 transition-colors">
                查看详细分析
              </button>
              <button className="px-4 py-2 text-sm font-medium bg-white text-[#1E40AF] rounded-lg hover:bg-white/90 transition-colors">
                生成拜访策略
              </button>
            </div>
          </div>

          {/* Right: Mini sparkline + stat */}
          <div className="lg:w-[40%] flex flex-col items-end">
            <div className="w-full max-w-[240px] h-[60px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={followUpTrend.slice(-14)}>
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#38BDF8"
                    strokeWidth={2}
                    fill="transparent"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <TrendingUp className="w-4 h-4 text-[#10B981]" />
              <span className="text-sm font-semibold text-white">本周客户活跃度 ↑{aiInsight.activeClientsChange}%</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Section 5: Data Visualization Preview */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6 pb-8">
        {/* Left: Sales Performance Area Chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4, ease }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-[#0F172A]">本月跟进趋势</h3>
            <button className="text-sm text-[#1E40AF] hover:underline flex items-center gap-1">
              查看完整报表 <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-card">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={followUpTrend}>
                  <defs>
                    <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.1} />
                      <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12, fill: '#94A3B8' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: '#94A3B8' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      borderRadius: 8,
                      border: '1px solid #E2E8F0',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      fontSize: 13,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#1E40AF"
                    strokeWidth={2}
                    fill="url(#areaFill)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-6 mt-4 pt-4 border-t border-[#F1F5F9]">
              <div>
                <span className="text-sm text-[#475569]">总计跟进: </span>
                <span className="text-sm font-semibold text-[#0F172A]">186次</span>
              </div>
              <div>
                <span className="text-sm text-[#475569]">日均: </span>
                <span className="text-sm text-[#94A3B8]">6.2次</span>
              </div>
              <div>
                <span className="text-sm text-[#475569]">较上月: </span>
                <span className="text-sm font-semibold text-[#10B981]">+8.3%</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Customer Distribution Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.4, ease }}
        >
          <h3 className="text-lg font-semibold text-[#0F172A] mb-3">客户行业分布</h3>
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-card">
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={industryDistribution}
                    cx="45%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                    animationBegin={0}
                    animationDuration={600}
                  >
                    {industryDistribution.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <text x="45%" y="48%" textAnchor="middle" dominantBaseline="middle" className="text-sm fill-[#0F172A] font-semibold">
                    12个行业
                  </text>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      borderRadius: 8,
                      border: '1px solid #E2E8F0',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      fontSize: 13,
                    }}
                    formatter={(value: number) => [`${value}%`, '占比']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              {industryDistribution.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-[#475569]">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-[#0F172A]">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}

// Helper for dynamic icon rendering in activity items
function IconComponent({ name, color }: { name: string; color: string }) {
  const Comp = iconMap[name];
  if (!Comp) return null;
  return <Comp className="w-4 h-4" style={{ color }} />;
}
