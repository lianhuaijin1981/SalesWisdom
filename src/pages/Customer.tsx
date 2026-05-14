import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase,
  User,
  Heart,
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  TrendingUp,
  Users,
  Clock,
  BarChart3,
  Database,
  ShieldAlert,
  XCircle,
  Ban,
  Zap,
  Sparkles,
  AlertOctagon,
} from 'lucide-react';
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import Layout from '@/components/Layout';
import {
  customerProfiles,
  positionDataMap,
  personalityDataMap,
  coreValuesDataMap,
  redLineDataMap,
} from '@/data/customerMockData';
import type { CustomerProfile } from '@/data/customerMockData';

const severityConfig = {
  strict: { color: '#EF4444', bg: '#FEF2F2', border: '#FECACA', label: '严禁' },
  caution: { color: '#F59E0B', bg: '#FFFBEB', border: '#FDE68A', label: '谨慎' },
  attention: { color: '#EAB308', bg: '#FEFCE8', border: '#FEF08A', label: '注意' },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } }),
};

// ---- Tab 1: 职位业务诉求 ----
function PositionAnalysisTab({ customerId }: { customerId: string }) {
  const data = positionDataMap[customerId];
  if (!data) return null;

  return (
    <div className="space-y-5">
      {/* Position Info + Decision Power */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Position Info */}
        <motion.div custom={0} variants={cardVariants} initial="hidden" animate="visible" className="lg:col-span-3 bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="w-4 h-4 text-[#1E40AF]" />
            <h3 className="text-base font-semibold text-[#0F172A]">职位信息</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: '姓名', value: data.name },
              { label: '职位', value: data.position },
              { label: '公司', value: data.company },
              { label: '部门', value: data.department },
              { label: '入职年限', value: data.tenure },
              { label: '管理幅度', value: data.span },
              { label: '汇报对象', value: data.reportsTo },
              { label: '职业背景', value: data.background },
            ].map((item, i) => (
              <div key={i}>
                <p className="text-xs text-[#94A3B8] mb-0.5">{item.label}</p>
                <p className="text-sm font-medium text-[#0F172A]">{item.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Decision Power */}
        <motion.div custom={1} variants={cardVariants} initial="hidden" animate="visible" className="lg:col-span-2 bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-card">
          <h3 className="text-base font-semibold text-[#0F172A] mb-4">决策权限分析</h3>
          {/* Gauge */}
          <div className="flex items-center justify-center mb-4">
            <div className="relative w-36 h-20 overflow-hidden">
              <svg className="w-36 h-20" viewBox="0 0 144 80">
                <path d="M 12 72 A 60 60 0 0 1 132 72" fill="none" stroke="#F1F5F9" strokeWidth="12" strokeLinecap="round" />
                <motion.path
                  d="M 12 72 A 60 60 0 0 1 132 72"
                  fill="none"
                  stroke="#1E40AF"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={`${(data.decisionPower / 100) * 188} 188`}
                  initial={{ strokeDashoffset: 188 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </svg>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
                <span className="text-2xl font-bold text-[#1E40AF]">{data.decisionPower}</span>
                <span className="text-sm text-[#94A3B8]">%</span>
              </div>
            </div>
          </div>
          <p className="text-center text-sm text-[#475569] mb-3">决策影响力</p>
          <div className="flex items-center justify-center gap-2 mb-4">
            {data.decisionSegments.map((seg) => (
              <span
                key={seg.label}
                className={`text-xs font-medium px-2.5 py-1 rounded-full ${seg.active ? 'bg-[#DBEAFE] text-[#1E40AF]' : 'bg-[#F1F5F9] text-[#94A3B8]'}`}
              >
                {seg.label}
              </span>
            ))}
          </div>
          {/* Influence Factors */}
          <div className="space-y-2">
            {data.influenceFactors.map((f) => (
              <div key={f.label} className="flex items-center gap-2">
                <span className="text-xs text-[#475569] w-14 shrink-0">{f.label}</span>
                <div className="flex-1 h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${f.score}%` }}
                    transition={{ duration: 0.8 }}
                    className="h-full bg-[#1E40AF] rounded-full"
                  />
                </div>
                <span className="text-xs font-medium text-[#0F172A] w-8 text-right">{f.score}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* KPI Pressure */}
      <motion.div custom={2} variants={cardVariants} initial="hidden" animate="visible" className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-card">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-[#1E40AF]" />
          <h3 className="text-base font-semibold text-[#0F172A]">KPI压力分析</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {data.kpis.map((kpi, i) => (
            <div key={i} className="p-4 rounded-lg border border-[#F1F5F9]">
              <p className="text-xs text-[#94A3B8] mb-1">{kpi.label}</p>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-lg font-bold text-[#0F172A]">{kpi.current}</span>
                <span className="text-xs text-[#94A3B8]">/ {kpi.target}</span>
              </div>
              <div className="h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(kpi.progress, 100)}%` }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: kpi.progress >= 90 ? '#10B981' : kpi.progress >= 60 ? '#F59E0B' : '#EF4444' }}
                />
              </div>
              <p className="text-xs text-[#94A3B8] mt-1">达成度 {kpi.progress}%</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Department Pains */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <motion.div custom={3} variants={cardVariants} initial="hidden" animate="visible" className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />
            <h3 className="text-base font-semibold text-[#0F172A]">部门痛点</h3>
          </div>
          <ul className="space-y-2.5">
            {data.departmentPains.map((pain, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[#475569]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] mt-2 shrink-0" />
                {pain}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div custom={4} variants={cardVariants} initial="hidden" animate="visible" className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <ShieldAlert className="w-4 h-4 text-[#EF4444]" />
            <h3 className="text-base font-semibold text-[#0F172A]">组织约束</h3>
          </div>
          <div className="space-y-3">
            {data.orgConstraints.map((c, i) => (
              <div key={i} className="p-3 rounded-lg border border-[#F1F5F9]">
                <p className="text-xs text-[#94A3B8] mb-0.5">{c.label}</p>
                <p className="text-sm font-medium text-[#0F172A]">{c.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Career Trajectory */}
      <motion.div custom={5} variants={cardVariants} initial="hidden" animate="visible" className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-card">
        <h3 className="text-base font-semibold text-[#0F172A] mb-5">职业发展轨迹</h3>
        <div className="flex items-start">
          {data.careerTrajectory.map((step, i) => (
            <div key={i} className="flex-1 relative flex flex-col items-center text-center">
              {i < data.careerTrajectory.length - 1 && (
                <div className="absolute top-3 left-1/2 w-full h-0.5 bg-[#E2E8F0]" />
              )}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.15, duration: 0.3 }}
                className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  i === data.careerTrajectory.length - 1 ? 'bg-[#1E40AF] text-white ring-4 ring-[#DBEAFE]' : 'bg-[#1E40AF] text-white'
                }`}
              >
                {i + 1}
              </motion.div>
              <p className="text-xs text-[#94A3B8] mt-2">{step.year}</p>
              <p className="text-xs font-medium text-[#0F172A] mt-0.5">{step.title}</p>
              {step.highlight && <p className="text-[10px] text-[#1E40AF] mt-0.5 max-w-[80px]">{step.highlight}</p>}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ---- Tab 2: 个人性格特质 ----
function PersonalityTab({ customerId }: { customerId: string }) {
  const data = personalityDataMap[customerId];
  if (!data) return null;

  const radarData = data.dimensions.map((d) => ({
    dimension: d.label,
    客户得分: d.score,
    行业平均: Math.round(d.score * (0.85 + Math.random() * 0.2)),
  }));

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Radar Chart */}
        <motion.div custom={0} variants={cardVariants} initial="hidden" animate="visible" className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-card">
          <h3 className="text-base font-semibold text-[#0F172A] mb-4">性格特质雷达图</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart cx="50%" cy="50%" outerRadius="65%" data={radarData}>
              <PolarGrid stroke="#E2E8F0" />
              <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 12, fill: '#475569' }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 11, fill: '#94A3B8' }} />
              <Radar name="客户得分" dataKey="客户得分" stroke="#1E40AF" fill="#1E40AF" fillOpacity={0.2} strokeWidth={2} />
              <Radar name="行业平均" dataKey="行业平均" stroke="#94A3B8" fill="#94A3B8" fillOpacity={0.1} strokeWidth={1} strokeDasharray="4 4" />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #E2E8F0', fontSize: 12 }} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Trait Cards */}
        <motion.div custom={1} variants={cardVariants} initial="hidden" animate="visible" className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-[#1E40AF]" />
            <h3 className="text-base font-semibold text-[#0F172A]">性格特征解读</h3>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[#DBEAFE] text-[#1E40AF]">AI分析</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {data.tags.map((tag, i) => (
              <span
                key={i}
                className={`text-xs font-medium px-3 py-1 rounded-full ${
                  tag.type === 'primary' ? 'bg-[#DBEAFE] text-[#1E40AF]' :
                  tag.type === 'secondary' ? 'bg-[#F0FDF4] text-[#166534]' :
                  'bg-[#FEF3C7] text-[#92400E]'
                }`}
              >
                {tag.label}
              </span>
            ))}
          </div>

          <div className="space-y-3">
            {data.dimensions.map((dim, i) => (
              <div key={i} className="p-3 rounded-lg border border-[#F1F5F9]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-[#0F172A]">{dim.label}</span>
                  <span className="text-sm font-bold text-[#1E40AF]">{dim.score}%</span>
                </div>
                <div className="h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${dim.score}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className="h-full bg-[#1E40AF] rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Communication Style */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <motion.div custom={2} variants={cardVariants} initial="hidden" animate="visible" className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-card">
          <h3 className="text-base font-semibold text-[#0F172A] mb-3">沟通风格</h3>
          <p className="text-sm text-[#475569] mb-4">{data.communicationStyle}</p>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#94A3B8]">风险承受度</span>
            <div className="flex-1 h-2.5 bg-[#F1F5F9] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${data.riskTolerance}%` }}
                transition={{ duration: 0.8 }}
                className="h-full rounded-full"
                style={{ backgroundColor: data.riskTolerance > 60 ? '#EF4444' : data.riskTolerance > 40 ? '#F59E0B' : '#10B981' }}
              />
            </div>
            <span className="text-sm font-bold text-[#0F172A]">{data.riskTolerance}%</span>
          </div>
        </motion.div>

        <motion.div custom={3} variants={cardVariants} initial="hidden" animate="visible" className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-card">
          <h3 className="text-base font-semibold text-[#0F172A] mb-4">沟通偏好分析</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Users, label: '首选沟通方式', value: data.communicationPreferences.preferredChannel },
              { icon: Clock, label: '最佳沟通时段', value: data.communicationPreferences.bestTime },
              { icon: BarChart3, label: '信息接收偏好', value: data.communicationPreferences.infoPreference },
              { icon: Database, label: '决策风格', value: data.communicationPreferences.decisionStyle },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg border border-[#F1F5F9]">
                <item.icon className="w-5 h-5 text-[#1E40AF] mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-[#94A3B8]">{item.label}</p>
                  <p className="text-sm font-medium text-[#0F172A]">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* AI Description */}
      <motion.div custom={4} variants={cardVariants} initial="hidden" animate="visible" className="bg-[#EFF6FF] border border-[#DBEAFE] rounded-xl p-5">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-[#1E40AF]" />
          <h3 className="text-sm font-semibold text-[#1E40AF]">AI性格画像</h3>
        </div>
        <p className="text-sm text-[#475569] leading-relaxed">{data.description}</p>
      </motion.div>
    </div>
  );
}

// ---- Tab 3: 底层价值观 ----
function CoreValuesTab({ customerId }: { customerId: string }) {
  const data = coreValuesDataMap[customerId];
  if (!data) return null;

  const sizeMap: Record<string, string> = {
    xl: 'text-xl px-5 py-2.5',
    lg: 'text-lg px-4 py-2',
    md: 'text-sm px-3 py-1.5',
    sm: 'text-xs px-2.5 py-1',
  };

  const opacityMap: Record<string, string> = {
    xl: 'bg-[#1E40AF] text-white',
    lg: 'bg-[#3B82F6] text-white',
    md: 'bg-[#93C5FD] text-white',
    sm: 'bg-[#DBEAFE] text-[#1E40AF]',
  };

  return (
    <div className="space-y-5">
      {/* Word Cloud */}
      <motion.div custom={0} variants={cardVariants} initial="hidden" animate="visible" className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-card">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-[#1E40AF]" />
          <h3 className="text-base font-semibold text-[#0F172A]">核心价值观词云</h3>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[#DBEAFE] text-[#1E40AF]">AI分析</span>
        </div>
        <div className="flex flex-wrap gap-3 items-center justify-center min-h-[120px]">
          {data.wordCloud.map((item, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className={`rounded-full font-medium cursor-default transition-transform hover:scale-110 ${sizeMap[item.size]} ${opacityMap[item.size]}`}
            >
              {item.word}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Value Assessment Cards */}
      <motion.div custom={1} variants={cardVariants} initial="hidden" animate="visible" className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-card">
        <h3 className="text-base font-semibold text-[#0F172A] mb-4">价值观深度评估</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.values.map((v, i) => (
            <div key={i} className="p-4 rounded-lg border border-[#E2E8F0] hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-[#0F172A]">{v.label}</h4>
                <span className="text-sm font-bold text-[#1E40AF]">{v.score}%</span>
              </div>
              <div className="h-2 bg-[#F1F5F9] rounded-full overflow-hidden mb-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${v.score}%` }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="h-full bg-[#1E40AF] rounded-full"
                />
              </div>
              <div className="space-y-1.5 mb-3">
                {v.evidence.map((e, j) => (
                  <p key={j} className="text-xs text-[#475569] flex items-start gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[#94A3B8] mt-1.5 shrink-0" />
                    {e}
                  </p>
                ))}
              </div>
              <div className="p-2.5 rounded-md bg-[#EFF6FF] border border-[#DBEAFE]">
                <p className="text-xs text-[#1E40AF]">
                  <span className="font-medium">销售启示: </span>{v.implication}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Value Trade-offs */}
      <motion.div custom={2} variants={cardVariants} initial="hidden" animate="visible" className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-card">
        <h3 className="text-base font-semibold text-[#0F172A] mb-4">价值权衡分析</h3>
        <div className="space-y-5">
          {data.tradeOffs.map((to, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-[#0F172A]">{to.left}</span>
                <span className="text-xs text-[#94A3B8]">{to.dimension}</span>
                <span className="text-sm font-medium text-[#0F172A]">{to.right}</span>
              </div>
              <div className="relative h-3 bg-gradient-to-r from-[#1E40AF] to-[#10B981] rounded-full">
                <motion.div
                  initial={{ left: '50%' }}
                  animate={{ left: `${to.bias}%` }}
                  transition={{ duration: 0.8, delay: i * 0.15 }}
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-[#1E40AF] rounded-full shadow-md"
                />
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-[#94A3B8]">{100 - to.bias}%</span>
                <span className="text-xs font-medium text-[#1E40AF]">{to.bias}% 偏向{to.bias > 50 ? to.right : to.left}</span>
                <span className="text-xs text-[#94A3B8]">{to.bias}%</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Cooperation Type */}
      <motion.div custom={3} variants={cardVariants} initial="hidden" animate="visible" className="bg-[#EFF6FF] border border-[#DBEAFE] rounded-xl p-5">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-4 h-4 text-[#1E40AF]" />
          <h3 className="text-sm font-semibold text-[#1E40AF]">合作期望类型</h3>
        </div>
        <p className="text-base font-medium text-[#0F172A]">{data.cooperationType}</p>
      </motion.div>
    </div>
  );
}

// ---- Tab 4: 合作红线 ----
function RedLinesTab({ customerId }: { customerId: string }) {
  const data = redLineDataMap[customerId];
  if (!data) return null;

  return (
    <div className="space-y-5">
      {/* Warning Banner */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="p-4 rounded-xl bg-[#FEF2F2] border border-[#FECACA]">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-[#EF4444] mt-0.5 shrink-0" />
          <div>
            <h3 className="text-sm font-semibold text-[#EF4444] mb-1">合作禁忌提示</h3>
            <p className="text-sm text-[#DC2626]">以下为客户明确表达过的合作禁忌，务必注意避免触碰。违反这些红线可能导致合作终止或客户流失。</p>
          </div>
        </div>
      </motion.div>

      {/* Red Line Cards */}
      <motion.div custom={1} variants={cardVariants} initial="hidden" animate="visible" className="space-y-3">
        {data.redLines.map((rl, i) => {
          const config = severityConfig[rl.severity];
          return (
            <motion.div
              key={rl.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="flex items-start gap-4 p-4 rounded-lg border bg-white"
              style={{ borderLeftWidth: 4, borderLeftColor: config.color, borderColor: config.border }}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: config.bg }}>
                <ShieldAlert className="w-5 h-5" style={{ color: config.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-semibold text-[#0F172A]">{rl.title}</h4>
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: config.bg, color: config.color }}
                  >
                    {rl.severityLabel}
                  </span>
                </div>
                <p className="text-sm text-[#475569] mb-1">{rl.description}</p>
                <p className="text-xs text-[#94A3B8]">来源: {rl.source}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Communication Taboos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <motion.div custom={2} variants={cardVariants} initial="hidden" animate="visible" className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <Ban className="w-4 h-4 text-[#EF4444]" />
            <h3 className="text-base font-semibold text-[#0F172A]">沟通禁忌</h3>
          </div>
          <ul className="space-y-2.5">
            {data.taboos.map((t, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[#475569]">
                <XCircle className="w-4 h-4 text-[#EF4444] mt-0.5 shrink-0" />
                {t}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div custom={3} variants={cardVariants} initial="hidden" animate="visible" className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <AlertOctagon className="w-4 h-4 text-[#F59E0B]" />
            <h3 className="text-base font-semibold text-[#0F172A]">敏感话题</h3>
          </div>
          <ul className="space-y-2.5">
            {data.sensitiveTopics.map((t, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[#475569]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] mt-2 shrink-0" />
                {t}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Decision Logic */}
      <motion.div custom={4} variants={cardVariants} initial="hidden" animate="visible" className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-card">
        <div className="flex items-center gap-2 mb-3">
          <Database className="w-4 h-4 text-[#1E40AF]" />
          <h3 className="text-base font-semibold text-[#0F172A]">决策逻辑总结</h3>
        </div>
        <p className="text-sm text-[#475569] leading-relaxed">{data.decisionLogic}</p>
      </motion.div>

      {/* Positive Triggers */}
      <motion.div custom={5} variants={cardVariants} initial="hidden" animate="visible">
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle className="w-4 h-4 text-[#10B981]" />
          <h3 className="text-base font-semibold text-[#10B981]">正面触发因素</h3>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[#F0FDF4] text-[#166534]">加分项</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {data.positiveTriggers.map((pt, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
              className="p-4 rounded-lg border border-[#D1FAE5] bg-[#F0FDF4]"
            >
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="w-4 h-4 text-[#10B981] shrink-0" />
                <h4 className="text-sm font-semibold text-[#166534]">{pt.title}</h4>
              </div>
              <p className="text-xs text-[#475569] ml-6">{pt.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ---- Main Customer Page ----
const tabs = [
  { key: 'position', label: '职位业务诉求', icon: Briefcase },
  { key: 'personality', label: '个人性格特质', icon: User },
  { key: 'values', label: '底层价值观', icon: Heart },
  { key: 'redlines', label: '合作红线', icon: AlertTriangle },
];

export default function Customer() {
  const [activeTab, setActiveTab] = useState('position');
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerProfile>(
    customerProfiles.find((c) => c.isDefault) || customerProfiles[0]
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <Layout title="客户个人多维分析" breadcrumb="客户个人多维分析">
      {/* Customer Selector */}
      <div className="mb-5 p-4 bg-white border border-[#E2E8F0] rounded-xl shadow-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div
                className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] flex items-center justify-center text-white text-sm font-semibold cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {selectedCustomer.avatar}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#10B981] rounded-full border-2 border-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-semibold text-[#0F172A]">{selectedCustomer.name}</span>
                <span className="text-xs text-[#94A3B8]">{selectedCustomer.company}</span>
              </div>
              <p className="text-xs text-[#94A3B8]">{selectedCustomer.position} · {selectedCustomer.department}</p>
            </div>
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1 h-8 px-3 text-sm bg-[#F1F5F9] text-[#475569] rounded-lg hover:bg-[#E2E8F0] transition-colors"
              >
                切换客户
                <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-lg border border-[#E2E8F0] py-1 z-50"
                >
                  {customerProfiles.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => { setSelectedCustomer(c); setDropdownOpen(false); }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors ${
                        c.id === selectedCustomer.id ? 'bg-[#EFF6FF] text-[#1E40AF]' : 'text-[#475569] hover:bg-[#F8FAFC]'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] flex items-center justify-center text-white text-xs font-semibold shrink-0">
                        {c.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{c.name}</p>
                        <p className="text-xs text-[#94A3B8]">{c.company}</p>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#DBEAFE] text-[#1E40AF]">分析完成</span>
        </div>
      </div>

      {/* Internal Tabs */}
      <div className="flex items-center gap-0 border-b border-[#E2E8F0] mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-all ${
                active
                  ? 'text-[#1E40AF] border-[#1E40AF]'
                  : 'text-[#94A3B8] border-transparent hover:text-[#475569]'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'position' && <PositionAnalysisTab customerId={selectedCustomer.id} />}
      {activeTab === 'personality' && <PersonalityTab customerId={selectedCustomer.id} />}
      {activeTab === 'values' && <CoreValuesTab customerId={selectedCustomer.id} />}
      {activeTab === 'redlines' && <RedLinesTab customerId={selectedCustomer.id} />}
    </Layout>
  );
}
