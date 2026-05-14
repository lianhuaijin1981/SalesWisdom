import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Stethoscope,
  Target,
  BookOpen,
  TrendingUp,
  FileText,
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  Edit3,
  Download,
  Sparkles,
  Lightbulb,
  Zap,
  Globe,
  Settings,
  ArrowRight,
  Save,
  RotateCcw,
  Plus,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import Layout from '@/components/Layout';
import {
  industryOptions,
  trendData,
  policyData,
  competitorData,
  painPointsData,
  opportunitiesData,
  enterpriseRadarData,
  radarChartData,
  diagnosisReport,
  strategyInfo,
  strategyTypeConfig,
  strategicNeeds,
  strategicTimeline,
  cooperationValues,
  coreConclusions,
  knowledgeTemplates,
} from '@/data/industryMockData';
import type { KnowledgeTemplate } from '@/data/industryMockData';

const chartColors = ['#1E40AF', '#3B82F6', '#38BDF8', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } }),
};

// ---- Tab 1: 行业洞察 ----
function IndustryInsightTab() {
  const [selectedIndustry, setSelectedIndustry] = useState('smart-manufacturing');
  const [timeRange, setTimeRange] = useState('5年');
  const [impactFilter, setImpactFilter] = useState<string>('all');

  const filteredPolicies = impactFilter === 'all'
    ? policyData
    : policyData.filter((p) => p.impact === impactFilter);

  return (
    <div className="space-y-5">
      {/* Industry Selector */}
      <motion.div custom={0} variants={cardVariants} initial="hidden" animate="visible" className="flex items-center gap-3 flex-wrap">
        <span className="text-sm font-medium text-[#475569]">选择行业:</span>
        <div className="relative">
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="h-9 pl-3 pr-8 text-sm bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:border-[#1E40AF] focus:ring-2 focus:ring-[#1E40AF]/20 appearance-none cursor-pointer"
          >
            {industryOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8] pointer-events-none" />
        </div>
        <button className="flex items-center gap-1 h-9 px-3 text-sm text-[#1E40AF] border border-dashed border-[#1E40AF]/30 rounded-lg hover:bg-[#EFF6FF] transition-colors">
          <Plus className="w-3.5 h-3.5" />
          <span>添加关注</span>
        </button>
      </motion.div>

      {/* 5 Analysis Dimension Cards - 2x3 grid, last spanning */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Card 1: 发展趋势 */}
        <motion.div custom={1} variants={cardVariants} initial="hidden" animate="visible" className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#1E40AF]" />
              <h3 className="text-base font-semibold text-[#0F172A]">发展趋势</h3>
            </div>
            <div className="flex items-center gap-1">
              {['1年', '3年', '5年'].map((r) => (
                <button
                  key={r}
                  onClick={() => setTimeRange(r)}
                  className={`h-7 px-2.5 text-xs font-medium rounded-full transition-all ${timeRange === r ? 'bg-[#1E40AF] text-white' : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'}`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={{ stroke: '#E2E8F0' }} />
              <YAxis yAxisId="left" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={{ stroke: '#E2E8F0' }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={{ stroke: '#E2E8F0' }} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #E2E8F0', fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line yAxisId="left" type="monotone" dataKey="marketSize" name="市场规模(万亿)" stroke="#1E40AF" strokeWidth={2} dot={{ fill: '#1E40AF', r: 4 }} />
              <Line yAxisId="right" type="monotone" dataKey="growthRate" name="增长率(%)" stroke="#10B981" strokeWidth={2} dot={{ fill: '#10B981', r: 4 }} />
              <Line yAxisId="right" type="monotone" dataKey="industryAvg" name="行业平均(%)" stroke="#94A3B8" strokeWidth={1} strokeDasharray="5 5" dot={false} />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-end gap-2 mt-3">
            <button className="flex items-center gap-1 text-xs text-[#475569] hover:text-[#1E40AF] transition-colors">
              <Edit3 className="w-3 h-3" /> 编辑
            </button>
            <button className="flex items-center gap-1 text-xs text-[#475569] hover:text-[#1E40AF] transition-colors">
              <Download className="w-3 h-3" /> 导出
            </button>
          </div>
        </motion.div>

        {/* Card 2: 政策环境 */}
        <motion.div custom={2} variants={cardVariants} initial="hidden" animate="visible" className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#1E40AF]" />
              <h3 className="text-base font-semibold text-[#0F172A]">政策环境</h3>
            </div>
            <div className="flex items-center gap-1">
              {[
                { key: 'all', label: '全部' },
                { key: 'positive', label: '利好' },
                { key: 'neutral', label: '中性' },
                { key: 'negative', label: '利空' },
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setImpactFilter(f.key)}
                  className={`h-7 px-2.5 text-xs font-medium rounded-full transition-all ${impactFilter === f.key ? 'bg-[#1E40AF] text-white' : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'}`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-3 max-h-[240px] overflow-y-auto pr-1">
            {filteredPolicies.map((policy) => (
              <div key={policy.id} className="flex items-start gap-3 p-3 rounded-lg border border-[#F1F5F9] hover:border-[#E2E8F0] transition-colors">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${policy.impact === 'positive' ? 'bg-[#F0FDF4]' : policy.impact === 'negative' ? 'bg-[#FEF2F2]' : 'bg-[#F1F5F9]'}`}>
                  <FileText className={`w-4 h-4 ${policy.impact === 'positive' ? 'text-[#10B981]' : policy.impact === 'negative' ? 'text-[#EF4444]' : 'text-[#94A3B8]'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#0F172A] truncate">{policy.title}</p>
                  <p className="text-xs text-[#94A3B8] mt-0.5">{policy.source} · {policy.date}</p>
                  <p className="text-xs text-[#475569] mt-1 line-clamp-2">{policy.summary}</p>
                </div>
                <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${
                  policy.impact === 'positive' ? 'bg-[#F0FDF4] text-[#166534]' :
                  policy.impact === 'negative' ? 'bg-[#FEF2F2] text-[#EF4444]' :
                  'bg-[#F1F5F9] text-[#475569]'
                }`}>
                  {policy.impactLabel}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-end gap-2 mt-3">
            <button className="flex items-center gap-1 text-xs text-[#475569] hover:text-[#1E40AF] transition-colors">
              <Edit3 className="w-3 h-3" /> 编辑
            </button>
            <button className="flex items-center gap-1 text-xs text-[#475569] hover:text-[#1E40AF] transition-colors">
              <Download className="w-3 h-3" /> 导出
            </button>
          </div>
        </motion.div>

        {/* Card 3: 竞争格局 */}
        <motion.div custom={3} variants={cardVariants} initial="hidden" animate="visible" className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#1E40AF]" />
              <h3 className="text-base font-semibold text-[#0F172A]">竞争格局</h3>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={competitorData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis type="number" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={{ stroke: '#E2E8F0' }} />
              <YAxis dataKey="name" type="category" width={90} tick={{ fontSize: 11, fill: '#475569' }} axisLine={{ stroke: '#E2E8F0' }} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #E2E8F0', fontSize: 12 }} formatter={(value: number) => [`${value}%`, '市场份额']} />
              <Bar dataKey="marketShare" name="市场份额(%)" radius={[0, 4, 4, 0]} barSize={24}>
                {competitorData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-3">
            {competitorData.slice(0, 4).map((c, i) => (
              <div key={c.name} className="flex items-center gap-2 text-xs">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: chartColors[i] }} />
                <span className="text-[#475569]">{c.name}: {c.marketShare}%</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-end gap-2 mt-3">
            <button className="flex items-center gap-1 text-xs text-[#475569] hover:text-[#1E40AF] transition-colors">
              <Edit3 className="w-3 h-3" /> 编辑
            </button>
            <button className="flex items-center gap-1 text-xs text-[#475569] hover:text-[#1E40AF] transition-colors">
              <Download className="w-3 h-3" /> 导出
            </button>
          </div>
        </motion.div>

        {/* Card 4: 共性痛点 */}
        <motion.div custom={4} variants={cardVariants} initial="hidden" animate="visible" className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#1E40AF]" />
              <h3 className="text-base font-semibold text-[#0F172A]">共性痛点</h3>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 max-h-[240px] overflow-y-auto content-start">
            {painPointsData.map((pain, i) => (
              <div
                key={pain.label}
                className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-all hover:scale-105 cursor-default ${
                  i < 3 ? 'bg-[#FEF2F2] text-[#EF4444] border border-[#FECACA]' :
                  i < 6 ? 'bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]' :
                  'bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0]'
                }`}
                style={{ fontSize: pain.count > 80 ? 15 : pain.count > 60 ? 14 : 13 }}
              >
                {pain.label}
                <span className="ml-1.5 text-xs opacity-70">({pain.count})</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-end gap-2 mt-3">
            <button className="flex items-center gap-1 text-xs text-[#475569] hover:text-[#1E40AF] transition-colors">
              <Edit3 className="w-3 h-3" /> 编辑
            </button>
            <button className="flex items-center gap-1 text-xs text-[#475569] hover:text-[#1E40AF] transition-colors">
              <Download className="w-3 h-3" /> 导出
            </button>
          </div>
        </motion.div>

        {/* Card 5: 发展机遇 - spans full width on second row */}
        <motion.div custom={5} variants={cardVariants} initial="hidden" animate="visible" className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-card lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#1E40AF]" />
              <h3 className="text-base font-semibold text-[#0F172A]">发展机遇</h3>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
            {opportunitiesData.map((opp) => (
              <div key={opp.id} className="relative p-4 rounded-lg border border-[#E2E8F0] hover:border-[#1E40AF]/30 hover:shadow-md transition-all group">
                <div className="absolute top-3 left-3 w-6 h-6 rounded-full bg-[#1E40AF] text-white text-xs font-bold flex items-center justify-center">
                  {opp.id}
                </div>
                <div className="mt-8">
                  <h4 className="text-sm font-semibold text-[#0F172A] mb-1">{opp.title}</h4>
                  <p className="text-xs text-[#475569] line-clamp-2 mb-3">{opp.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-[#94A3B8]">影响度</span>
                      <div className="w-16 h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${opp.impactScore}%`, backgroundColor: opp.impactScore >= 90 ? '#EF4444' : opp.impactScore >= 80 ? '#F59E0B' : '#10B981' }} />
                      </div>
                      <span className="text-xs font-semibold text-[#0F172A]">{opp.impactScore}</span>
                    </div>
                    <span className="text-xs text-[#94A3B8]">{opp.timeline}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-end gap-2 mt-3">
            <button className="flex items-center gap-1 text-xs text-[#475569] hover:text-[#1E40AF] transition-colors">
              <Edit3 className="w-3 h-3" /> 编辑
            </button>
            <button className="flex items-center gap-1 text-xs text-[#475569] hover:text-[#1E40AF] transition-colors">
              <Download className="w-3 h-3" /> 导出
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ---- Tab 2: 企业经营分析 ----
function EnterpriseAnalysisTab() {
  const overallScore = Math.round(
    enterpriseRadarData.reduce((sum, d) => sum + d.score, 0) / enterpriseRadarData.length
  );
  const scoreColor = overallScore >= 80 ? '#10B981' : overallScore >= 60 ? '#1E40AF' : '#F59E0B';
  const scoreLabel = overallScore >= 80 ? '优秀' : overallScore >= 70 ? '良好' : overallScore >= 60 ? '一般' : '需改善';

  return (
    <div className="space-y-5">
      {/* Radar + Score */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Stethoscope className="w-4 h-4 text-[#1E40AF]" />
            <h3 className="text-base font-semibold text-[#0F172A]">企业运营健康度诊断</h3>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Radar Chart */}
          <ResponsiveContainer width="100%" height={320}>
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarChartData}>
              <PolarGrid stroke="#E2E8F0" />
              <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 12, fill: '#475569' }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 11, fill: '#94A3B8' }} />
              <Radar name="企业得分" dataKey="企业得分" stroke="#1E40AF" fill="#1E40AF" fillOpacity={0.2} strokeWidth={2} />
              <Radar name="行业平均" dataKey="行业平均" stroke="#94A3B8" fill="#94A3B8" fillOpacity={0.1} strokeWidth={1} strokeDasharray="4 4" />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #E2E8F0', fontSize: 12 }} />
            </RadarChart>
          </ResponsiveContainer>

          {/* Score Breakdown */}
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-[#F8FAFC]">
              <div className="text-center">
                <div className="text-4xl font-bold" style={{ color: scoreColor }}>{overallScore}</div>
                <div className="text-xs text-[#94A3B8] mt-0.5">/100</div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg font-semibold text-[#0F172A]">{scoreLabel}</span>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: `${scoreColor}20`, color: scoreColor }}>
                    {scoreLabel}
                  </span>
                </div>
                <p className="text-xs text-[#475569]">基于6个维度的综合评估</p>
              </div>
            </div>

            <div className="space-y-2.5">
              {enterpriseRadarData.map((d) => (
                <div key={d.dimension} className="flex items-center gap-3">
                  <span className="text-sm text-[#475569] w-16 shrink-0">{d.dimension}</span>
                  <div className="flex-1 h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${d.score}%` }}
                      transition={{ duration: 0.8, delay: 0.1 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: d.score >= 80 ? '#10B981' : d.score >= 60 ? '#1E40AF' : '#F59E0B' }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-[#0F172A] w-8 text-right">{d.score}</span>
                  <span className={`text-xs font-medium shrink-0 ${d.status === '达标' ? 'text-[#10B981]' : d.status === '警告' ? 'text-[#F59E0B]' : 'text-[#EF4444]'}`}>
                    {d.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Diagnosis Report */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-card">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-[#1E40AF]" />
          <h3 className="text-base font-semibold text-[#0F172A]">AI诊断报告</h3>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[#DBEAFE] text-[#1E40AF]">AI分析</span>
        </div>
        <p className="text-sm text-[#475569] leading-relaxed mb-4">{diagnosisReport.summary}</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Strengths */}
          <div className="p-4 rounded-lg border border-[#D1FAE5] bg-[#F0FDF4]">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-4 h-4 text-[#10B981]" />
              <span className="text-sm font-semibold text-[#166534]">核心优势</span>
            </div>
            <ul className="space-y-2">
              {diagnosisReport.strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-[#166534]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] mt-1.5 shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}
          <div className="p-4 rounded-lg border border-[#FECACA] bg-[#FEF2F2]">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-[#EF4444]" />
              <span className="text-sm font-semibold text-[#DC2626]">待改善</span>
            </div>
            <ul className="space-y-2">
              {diagnosisReport.weaknesses.map((w, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-[#DC2626]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] mt-1.5 shrink-0" />
                  {w}
                </li>
              ))}
            </ul>
          </div>

          {/* Recommendations */}
          <div className="p-4 rounded-lg border border-[#DBEAFE] bg-[#EFF6FF]">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-4 h-4 text-[#1E40AF]" />
              <span className="text-sm font-semibold text-[#1E40AF]">改进建议</span>
            </div>
            <ul className="space-y-2">
              {diagnosisReport.weaknesses.map((_, i) => {
                const recs = [
                  '建议加大市场拓展力度，重点关注华东和华南区域',
                  '建立完善的人才培养和激励机制，降低核心人才流失率',
                  '加强与高校和科研院所的合作，加速创新成果转化',
                  '引入敏捷开发模式，缩短产品迭代周期至8周以内',
                ];
                return (
                  <li key={i} className="flex items-start gap-2 text-xs text-[#1E40AF]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1E40AF] mt-1.5 shrink-0" />
                    {recs[i] || ''}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Internal / External Pressures */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <div className="p-4 rounded-lg border border-[#F1F5F9]">
            <div className="flex items-center gap-2 mb-3">
              <Settings className="w-4 h-4 text-[#475569]" />
              <span className="text-sm font-semibold text-[#0F172A]">内部压力</span>
            </div>
            <ul className="space-y-2">
              {diagnosisReport.internalPressures.map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-[#475569]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#94A3B8] mt-1.5 shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 rounded-lg border border-[#F1F5F9]">
            <div className="flex items-center gap-2 mb-3">
              <Globe className="w-4 h-4 text-[#475569]" />
              <span className="text-sm font-semibold text-[#0F172A]">外部压力</span>
            </div>
            <ul className="space-y-2">
              {diagnosisReport.externalPressures.map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-[#475569]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#94A3B8] mt-1.5 shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Short-term Goals */}
        <div className="mt-4 p-4 rounded-lg border border-[#F1F5F9]">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-4 h-4 text-[#1E40AF]" />
            <span className="text-sm font-semibold text-[#0F172A]">短期目标清单</span>
          </div>
          <div className="space-y-2">
            {diagnosisReport.shortTermGoals.map((g, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded flex items-center justify-center ${g.completed ? 'bg-[#10B981]' : 'bg-[#F1F5F9] border border-[#E2E8F0]'}`}>
                  {g.completed && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                </div>
                <span className={`text-sm ${g.completed ? 'text-[#94A3B8] line-through' : 'text-[#0F172A]'}`}>{g.goal}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ---- Tab 3: 战略诉求 ----
function StrategicNeedsTab() {
  const config = strategyTypeConfig[strategyInfo.type];
  const circumference = 2 * Math.PI * 36;
  const matchProgress = (strategyInfo.matchScore / 10) * circumference;

  return (
    <div className="space-y-5">
      {/* Strategy Type + Match Score */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Strategy Type Badge */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-card">
          <h3 className="text-sm font-medium text-[#475569] mb-3">战略类型</h3>
          <span
            className="inline-flex items-center px-4 py-2 rounded-full text-lg font-bold"
            style={{ backgroundColor: config.bg, color: config.color }}
          >
            {strategyInfo.type}
          </span>
          <p className="text-sm text-[#475569] mt-3">{strategyInfo.description}</p>
        </div>

        {/* Match Score Circle */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-card flex items-center gap-5">
          <div className="relative w-24 h-24 shrink-0">
            <svg className="w-24 h-24 -rotate-90" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="36" fill="none" stroke="#F1F5F9" strokeWidth="6" />
              <circle
                cx="40" cy="40" r="36" fill="none" stroke="#1E40AF" strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${matchProgress} ${circumference}`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-bold text-[#1E40AF]">{strategyInfo.matchScore}</span>
              <span className="text-xs text-[#94A3B8]">/10</span>
            </div>
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#0F172A]">战略匹配度</h3>
            <p className="text-sm text-[#475569] mt-1">我司产品/服务与该客户战略需求的匹配程度</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[#DBEAFE] text-[#1E40AF]">高匹配</span>
              <span className="text-xs text-[#94A3B8]">建议重点跟进</span>
            </div>
          </div>
        </div>

        {/* Cooperation Value */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-card">
          <h3 className="text-sm font-medium text-[#475569] mb-3">合作价值分析</h3>
          <ul className="space-y-2">
            {cooperationValues.map((v, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-[#475569]">
                <ArrowRight className="w-3 h-3 text-[#1E40AF] mt-0.5 shrink-0" />
                {v}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Strategic Timeline */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-card">
        <div className="flex items-center gap-2 mb-5">
          <Target className="w-4 h-4 text-[#1E40AF]" />
          <h3 className="text-base font-semibold text-[#0F172A]">战略目标时间线</h3>
        </div>
        <div className="flex items-start gap-0">
          {strategicTimeline.map((phase, i) => (
            <div key={i} className="flex-1 relative">
              {/* Timeline connector */}
              {i < strategicTimeline.length - 1 && (
                <div className="absolute top-3 left-[calc(50%+12px)] right-[calc(50%-12px)] h-0.5 bg-[#E2E8F0]" />
              )}
              <div className="flex flex-col items-center text-center">
                <div className="w-6 h-6 rounded-full bg-[#1E40AF] text-white text-xs font-bold flex items-center justify-center z-10">
                  {i + 1}
                </div>
                <h4 className="text-sm font-semibold text-[#0F172A] mt-2">{phase.phase}</h4>
                <ul className="mt-2 space-y-1">
                  {phase.goals.map((g, j) => (
                    <li key={j} className="text-xs text-[#475569] px-2">{g}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Needs Matrix Cards */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }} className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-card">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-4 h-4 text-[#1E40AF]" />
          <h3 className="text-base font-semibold text-[#0F172A]">战略需求优先级矩阵</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {strategicNeeds.map((need) => (
            <div key={need.id} className="relative p-4 rounded-lg border border-[#E2E8F0] hover:shadow-md transition-all overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1" style={{
                backgroundColor: need.importance >= 85 && need.urgency >= 80 ? '#EF4444' :
                  need.importance >= 80 ? '#1E40AF' : need.urgency >= 75 ? '#F59E0B' : '#94A3B8'
              }} />
              <div className="mt-2">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[#F1F5F9] text-[#475569]">{need.category}</span>
                  <span className="text-xs text-[#94A3B8]">¥{need.budget}万</span>
                </div>
                <h4 className="text-sm font-semibold text-[#0F172A] mb-1">{need.name}</h4>
                <p className="text-xs text-[#475569] line-clamp-2 mb-2">{need.description}</p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-[#94A3B8]">重要性</span>
                    <div className="w-12 h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                      <div className="h-full bg-[#1E40AF] rounded-full" style={{ width: `${need.importance}%` }} />
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-[#94A3B8]">紧迫性</span>
                    <div className="w-12 h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                      <div className="h-full bg-[#EF4444] rounded-full" style={{ width: `${need.urgency}%` }} />
                    </div>
                  </div>
                </div>
                <p className="text-xs text-[#94A3B8] mt-2">{need.timeline}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Core Conclusions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {coreConclusions.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
            className="bg-[#EFF6FF] border border-[#DBEAFE] rounded-xl p-5"
          >
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-4 h-4 text-[#1E40AF]" />
              <h4 className="text-sm font-semibold text-[#1E40AF]">{c.title}</h4>
            </div>
            <p className="text-xs text-[#475569] leading-relaxed">{c.content}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ---- Tab 4: 行业知识库 ----
function KnowledgeBaseTab() {
  const [selectedTemplate, setSelectedTemplate] = useState<KnowledgeTemplate>(knowledgeTemplates[0]);
  const [editingField, setEditingField] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');
  const [templates, setTemplates] = useState<KnowledgeTemplate[]>(knowledgeTemplates);

  const handleSave = (fieldIdx: number) => {
    const updated = { ...selectedTemplate };
    updated.fields = updated.fields.map((f, i) => i === fieldIdx ? { ...f, value: editValue } : f);
    setSelectedTemplate(updated);
    setTemplates(templates.map((t) => t.id === updated.id ? updated : t));
    setEditingField(null);
  };

  return (
    <div className="space-y-5">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#1E40AF]" />
            <h3 className="text-base font-semibold text-[#0F172A]">行业知识库</h3>
          </div>
          <span className="text-xs text-[#94A3B8]">可编辑模板</span>
        </div>

        {/* Template Selector */}
        <div className="flex items-center gap-2 mb-5 flex-wrap">
          {templates.map((t) => (
            <button
              key={t.id}
              onClick={() => { setSelectedTemplate(t); setEditingField(null); }}
              className={`h-9 px-4 text-sm font-medium rounded-lg transition-all ${
                selectedTemplate.id === t.id
                  ? 'bg-[#1E40AF] text-white'
                  : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>

        {/* Template Fields */}
        <div className="space-y-3">
          {selectedTemplate.fields.map((field, i) => (
            <div key={i} className="p-4 rounded-lg border border-[#F1F5F9] hover:border-[#E2E8F0] transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-[#0F172A]">{field.label}</h4>
                {editingField === i ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSave(i)}
                      className="flex items-center gap-1 text-xs text-[#10B981] hover:opacity-80"
                    >
                      <Save className="w-3 h-3" /> 保存
                    </button>
                    <button
                      onClick={() => setEditingField(null)}
                      className="flex items-center gap-1 text-xs text-[#94A3B8] hover:text-[#475569]"
                    >
                      <RotateCcw className="w-3 h-3" /> 取消
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => { setEditingField(i); setEditValue(field.value); }}
                    className="flex items-center gap-1 text-xs text-[#475569] hover:text-[#1E40AF]"
                  >
                    <Edit3 className="w-3 h-3" /> 编辑
                  </button>
                )}
              </div>
              {editingField === i ? (
                <textarea
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-full h-20 p-3 text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:border-[#1E40AF] focus:ring-2 focus:ring-[#1E40AF]/20 resize-none"
                />
              ) : (
                <p className="text-sm text-[#475569] leading-relaxed">{field.value}</p>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ---- Main Industry Page ----
const tabs = [
  { key: 'insight', label: '行业洞察', icon: BarChart3 },
  { key: 'enterprise', label: '企业经营分析', icon: Stethoscope },
  { key: 'strategy', label: '战略诉求', icon: Target },
  { key: 'knowledge', label: '行业知识库', icon: BookOpen },
];

export default function Industry() {
  const [activeTab, setActiveTab] = useState('insight');

  return (
    <Layout title="行业洞察与战略分析" breadcrumb="行业洞察与战略分析">
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
      {activeTab === 'insight' && <IndustryInsightTab />}
      {activeTab === 'enterprise' && <EnterpriseAnalysisTab />}
      {activeTab === 'strategy' && <StrategicNeedsTab />}
      {activeTab === 'knowledge' && <KnowledgeBaseTab />}
    </Layout>
  );
}
