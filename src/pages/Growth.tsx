import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Radar as RadarIcon,
  Brain,
  AlertTriangle,
  BookOpen,
  CheckSquare,
  TrendingUp,
  TrendingDown,
  Award,
  ChevronRight,
  Star,
  CheckCircle,
  Clock,
  Zap,
  Lightbulb,
  ArrowRight,
  Target,
  BarChart3,
} from 'lucide-react';
import Layout from '@/components/Layout';
import {
  radarData,
  dimensionScores,
  scoreSummary,
  topStrengths,
  topWeaknesses,
  thinkingLevels,
  currentLevel,
  nextLevelUpgradePath,
  thinkingObstacles,
  thinkingTemplates,
  caseStudies,
  caseCategories,
  practiceTasks,
} from '@/data/growthMockData';
import type { CaseCategory, TaskStatus } from '@/data/growthMockData';

const tabs = [
  { id: 'radar', label: '能力雷达', icon: RadarIcon },
  { id: 'thinking', label: '思维层级', icon: Brain },
  { id: 'weakness', label: '短板诊断', icon: AlertTriangle },
  { id: 'cases', label: '案例拆解', icon: BookOpen },
  { id: 'practice', label: '刻意练习', icon: CheckSquare },
];

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

/* ========== Tab 1: Capability Radar ========== */
function CapabilityRadarTab() {
  const [showComparison, setShowComparison] = useState(false);

  const getScoreColor = (score: number) => {
    if (score >= 8) return '#10B981';
    if (score >= 6) return '#1E40AF';
    return '#F59E0B';
  };

  return (
    <div className="space-y-5">
      {/* Radar Chart Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-[#E2E8F0] rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-[#0F172A]">八维能力雷达图</h3>
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="text-sm text-[#1E40AF] hover:text-[#1D4ED8] font-medium transition-colors"
          >
            {showComparison ? '隐藏对比' : '本月 vs 上月'}
          </button>
        </div>
        <div className="relative" style={{ height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
              <PolarGrid stroke="#E2E8F0" />
              <PolarAngleAxis
                dataKey="dimension"
                tick={{ fontSize: 13, fill: '#475569', fontWeight: 500 }}
              />
              <PolarRadiusAxis angle={30} domain={[0, 10]} tick={{ fontSize: 11, fill: '#94A3B8' }} />
              <Radar
                name="本次测评"
                dataKey="本次测评"
                stroke="#1E40AF"
                fill="#1E40AF"
                fillOpacity={0.25}
                strokeWidth={2}
              />
              {showComparison && (
                <>
                  <Radar
                    name="上次测评"
                    dataKey="上次测评"
                    stroke="#94A3B8"
                    fill="#94A3B8"
                    fillOpacity={0.1}
                    strokeWidth={2}
                    strokeDasharray="6 4"
                  />
                  <Radar
                    name="团队平均"
                    dataKey="团队平均"
                    stroke="#10B981"
                    fill="#10B981"
                    fillOpacity={0.1}
                    strokeWidth={2}
                    strokeDasharray="2 4"
                  />
                </>
              )}
            </RadarChart>
          </ResponsiveContainer>
          {/* Center Score Overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center bg-white/80 rounded-full w-24 h-24 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-[#1E40AF]">{scoreSummary.average}</span>
              <span className="text-xs text-[#94A3B8]">综合得分</span>
            </div>
          </div>
        </div>
        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#1E40AF]" />
            <span className="text-xs text-[#475569]">本次测评</span>
          </div>
          {showComparison && (
            <>
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-[#94A3B8] border-dashed" style={{ borderTop: '2px dashed #94A3B8', background: 'transparent' }} />
                <span className="text-xs text-[#475569]">上次测评</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-[#10B981]" style={{ borderTop: '2px dotted #10B981', background: 'transparent' }} />
                <span className="text-xs text-[#475569]">团队平均</span>
              </div>
            </>
          )}
        </div>
      </motion.div>

      {/* Score Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: '综合得分', value: scoreSummary.average, suffix: '分', icon: BarChart3, color: '#1E40AF', trend: scoreSummary.trend },
          { label: '最高维度', value: scoreSummary.highest.score, suffix: '分', icon: TrendingUp, color: '#10B981', sub: scoreSummary.highest.dimension },
          { label: '最低维度', value: scoreSummary.lowest.score, suffix: '分', icon: TrendingDown, color: '#EF4444', sub: scoreSummary.lowest.dimension },
          { label: '较上月', value: `+${scoreSummary.trend}`, suffix: '', icon: Target, color: '#3B82F6', sub: '持续提升' },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="bg-white border border-[#E2E8F0] rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#94A3B8]">{item.label}</span>
              <item.icon className="w-4 h-4" style={{ color: item.color }} />
            </div>
            <div className="text-2xl font-bold" style={{ color: item.color }}>
              {item.value}
              {item.suffix && <span className="text-sm ml-0.5">{item.suffix}</span>}
            </div>
            {item.sub && <p className="text-xs text-[#94A3B8] mt-1">{item.sub}</p>}
          </motion.div>
        ))}
      </div>

      {/* Top Strengths & Weaknesses */}
      <div className="grid grid-cols-2 gap-4">
        {/* Strengths */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border border-[#E2E8F0] rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-4 h-4 text-[#10B981]" />
            <h3 className="text-sm font-semibold text-[#0F172A]">TOP3 优势</h3>
          </div>
          <div className="space-y-2.5">
            {topStrengths.map((s, i) => (
              <div key={s.dimension} className="flex items-center gap-3">
                <span className="text-xs font-medium text-[#10B981] w-5">{i + 1}</span>
                <span className="flex-1 text-sm text-[#0F172A]">{s.dimension}</span>
                <span className="text-sm font-semibold text-[#10B981]">{s.score}分</span>
                <div className="w-20 h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#10B981] rounded-full"
                    style={{ width: `${(s.score / 10) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Weaknesses */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white border border-[#E2E8F0] rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-[#EF4444]" />
            <h3 className="text-sm font-semibold text-[#0F172A]">TOP3 短板</h3>
          </div>
          <div className="space-y-2.5">
            {topWeaknesses.map((w, i) => (
              <div key={w.dimension} className="flex items-center gap-3">
                <span className="text-xs font-medium text-[#EF4444] w-5">{i + 1}</span>
                <span className="flex-1 text-sm text-[#0F172A]">{w.dimension}</span>
                <span className="text-sm font-semibold text-[#EF4444]">{w.score}分</span>
                <div className="w-20 h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#EF4444] rounded-full"
                    style={{ width: `${(w.score / 10) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Dimension Detail Cards */}
      <div className="grid grid-cols-4 gap-3">
        {dimensionScores.map((ds, i) => (
          <motion.div
            key={ds.dimension}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="bg-white border border-[#E2E8F0] rounded-xl p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-[#0F172A]">{ds.dimension}</span>
            </div>
            <div className="text-xl font-bold mb-1.5" style={{ color: getScoreColor(ds.current) }}>
              {ds.current}
              <span className="text-xs text-[#94A3B8] ml-1">/ 10</span>
            </div>
            <div className="w-full h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden mb-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(ds.current / 10) * 100}%` }}
                transition={{ delay: i * 0.08 + 0.3, duration: 0.6 }}
                className="h-full rounded-full"
                style={{ backgroundColor: getScoreColor(ds.current) }}
              />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className={ds.current > ds.previous ? 'text-[#10B981]' : 'text-[#EF4444]'}>
                {ds.current > ds.previous ? '+' : ''}{(ds.current - ds.previous).toFixed(1)} vs 上月
              </span>
              <span className="text-[#94A3B8]">团队 {ds.teamAverage}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ========== Tab 2: Thinking Level ========== */
function ThinkingLevelTab() {
  const levelColors: Record<string, string> = {
    completed: '#10B981',
    current: '#1E40AF',
    pending: '#CBD5E1',
  };

  return (
    <div className="space-y-5">
      {/* Staircase */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-[#E2E8F0] rounded-xl p-6"
      >
        <div className="flex items-center gap-2 mb-6">
          <Brain className="w-5 h-5 text-[#1E40AF]" />
          <h3 className="text-base font-semibold text-[#0F172A]">销售思维层级评估</h3>
          <span className="text-xs bg-[#DBEAFE] text-[#1E40AF] px-2 py-0.5 rounded-full font-medium">AI评估</span>
        </div>

        <div className="space-y-3">
          {thinkingLevels.map((level, i) => (
            <motion.div
              key={level.level}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: (thinkingLevels.length - 1 - i) * 0.12, duration: 0.4 }}
              className="flex justify-center"
            >
              <div
                className="relative flex items-center gap-4 rounded-xl border-2 px-5 py-4 transition-all"
                style={{
                  width: level.width,
                  borderColor: level.status === 'current' ? '#1E40AF' : level.status === 'completed' ? '#10B981' : '#E2E8F0',
                  backgroundColor: level.status === 'current' ? '#EFF6FF' : level.status === 'completed' ? '#F0FDF4' : '#F8FAFC',
                  boxShadow: level.status === 'current' ? '0 0 0 3px rgba(30, 64, 175, 0.15)' : 'none',
                }}
              >
                {/* Level Number */}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                  style={{ backgroundColor: levelColors[level.status] }}
                >
                  {level.level}
                </div>
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-semibold text-[#0F172A]">{level.name}</span>
                    {level.status === 'current' && (
                      <span className="text-xs bg-[#1E40AF] text-white px-2 py-0.5 rounded-full">当前层级</span>
                    )}
                    {level.status === 'completed' && (
                      <CheckCircle className="w-4 h-4 text-[#10B981]" />
                    )}
                    {level.status === 'pending' && (
                      <Clock className="w-4 h-4 text-[#CBD5E1]" />
                    )}
                  </div>
                  <p className="text-xs text-[#475569] mt-1 truncate">{level.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Current Level Detail */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white border border-[#E2E8F0] rounded-xl p-5"
        >
          <h3 className="text-sm font-semibold text-[#0F172A] mb-3">
            {currentLevel.level} {currentLevel.name} — 详细评估
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-[#94A3B8] mb-1">核心特征</p>
              <div className="flex flex-wrap gap-2">
                {currentLevel.keyTraits.map((trait) => (
                  <span key={trait} className="text-xs bg-[#EFF6FF] text-[#1E40AF] px-2.5 py-1 rounded-full">
                    {trait}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-[#94A3B8] mb-1">盲点提示</p>
              <ul className="space-y-1">
                {currentLevel.blindSpots.map((spot) => (
                  <li key={spot} className="text-xs text-[#475569] flex items-start gap-1.5">
                    <span className="text-[#F59E0B] mt-0.5">•</span>
                    {spot}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Upgrade Path */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-gradient-to-br from-[#EFF6FF] to-white border border-[#1E40AF]/20 rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-[#1E40AF]" />
            <h3 className="text-sm font-semibold text-[#0F172A]">升级到下一级的破局路径</h3>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs text-[#475569]">{nextLevelUpgradePath.currentLevel}</span>
            <ArrowRight className="w-3 h-3 text-[#94A3B8]" />
            <span className="text-xs font-medium text-[#1E40AF]">{nextLevelUpgradePath.targetLevel}</span>
          </div>
          <ul className="space-y-2">
            {nextLevelUpgradePath.requirements.map((req, i) => (
              <li key={i} className="text-xs text-[#475569] flex items-start gap-2">
                <ChevronRight className="w-3 h-3 text-[#1E40AF] mt-0.5 shrink-0" />
                {req}
              </li>
            ))}
          </ul>
          <p className="text-xs text-[#94A3B8] mt-3">
            预计 <span className="text-[#1E40AF] font-medium">{nextLevelUpgradePath.estimatedWeeks}周</span> 可达标
          </p>
        </motion.div>
      </div>
    </div>
  );
}

/* ========== Tab 3: Weakness Diagnosis ========== */
function WeaknessDiagnosisTab() {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return { bg: 'bg-[#FEF2F2]', text: 'text-[#EF4444]', label: '高' };
      case 'medium': return { bg: 'bg-[#FEF3C7]', text: 'text-[#92400E]', label: '中' };
      case 'low': return { bg: 'bg-[#F0FDF4]', text: 'text-[#166534]', label: '低' };
      default: return { bg: 'bg-[#F1F5F9]', text: 'text-[#475569]', label: '' };
    }
  };

  return (
    <div className="space-y-5">
      {/* Thinking Obstacles */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-[#E2E8F0] rounded-xl p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-[#F59E0B]" />
          <h3 className="text-base font-semibold text-[#0F172A]">思维障碍诊断</h3>
        </div>
        <div className="space-y-3">
          {thinkingObstacles.map((ob, i) => {
            const sev = getSeverityColor(ob.severity);
            return (
              <motion.div
                key={ob.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="border border-[#E2E8F0] rounded-lg p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${sev.bg} ${sev.text}`}>
                      严重程度 {sev.label}
                    </span>
                    <span className="text-sm font-semibold text-[#0F172A]">{ob.name}</span>
                  </div>
                  <span className="text-xs text-[#94A3B8]">改善进度 {ob.progress}%</span>
                </div>
                <p className="text-xs text-[#475569] mb-1">{ob.description}</p>
                <p className="text-xs text-[#EF4444] mb-2 flex items-start gap-1">
                  <AlertTriangle className="w-3 h-3 mt-0.5 shrink-0" />
                  {ob.impact}
                </p>
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-3 h-3 text-[#1E40AF] shrink-0" />
                  <p className="text-xs text-[#1E40AF]">{ob.solution}</p>
                </div>
                <div className="w-full h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden mt-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${ob.progress}%` }}
                    transition={{ delay: i * 0.1 + 0.3, duration: 0.8 }}
                    className="h-full bg-[#1E40AF] rounded-full"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Thinking Templates */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white border border-[#E2E8F0] rounded-xl p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-[#1E40AF]" />
          <h3 className="text-base font-semibold text-[#0F172A]">思考模板</h3>
          <span className="text-xs text-[#94A3B8]">结构化思考框架练习</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {thinkingTemplates.map((tmpl, i) => (
            <motion.div
              key={tmpl.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="border border-[#E2E8F0] rounded-lg p-4 hover:border-[#1E40AF]/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-[#0F172A]">{tmpl.title}</span>
                <span className="text-xs bg-[#EFF6FF] text-[#1E40AF] px-2 py-0.5 rounded-full">{tmpl.category}</span>
              </div>
              <p className="text-xs text-[#475569] mb-2">{tmpl.description}</p>
              <ol className="space-y-1">
                {tmpl.steps.map((step, j) => (
                  <li key={j} className="text-xs text-[#475569] flex items-start gap-1.5">
                    <span className="text-[#1E40AF] font-medium text-[10px] w-4 shrink-0">{j + 1}.</span>
                    <span className="truncate">{step}</span>
                  </li>
                ))}
              </ol>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ========== Tab 4: Case Study Library ========== */
function CaseStudyTab() {
  const [activeCategory, setActiveCategory] = useState<CaseCategory | '全部'>('全部');
  const [cases, setCases] = useState(caseStudies);

  const filteredCases = activeCategory === '全部'
    ? cases
    : cases.filter((c) => c.category === activeCategory);

  const toggleFavorite = (id: string) => {
    setCases(prev => prev.map(c => c.id === id ? { ...c, isFavorited: !c.isFavorited } : c));
  };

  const toggleLearned = (id: string) => {
    setCases(prev => prev.map(c => c.id === id ? { ...c, isLearned: !c.isLearned } : c));
  };

  return (
    <div className="space-y-5">
      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-[#E2E8F0] rounded-xl p-4"
      >
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setActiveCategory('全部')}
            className={`text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${
              activeCategory === '全部'
                ? 'bg-[#1E40AF] text-white'
                : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
            }`}
          >
            全部
          </button>
          {caseCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${
                activeCategory === cat
                  ? 'bg-[#1E40AF] text-white'
                  : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Case Cards */}
      <div className="space-y-3">
        {filteredCases.map((cs, i) => (
          <motion.div
            key={cs.id}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="bg-white border border-[#E2E8F0] rounded-xl p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs bg-[#DBEAFE] text-[#1E40AF] px-2 py-0.5 rounded-full font-medium">
                  {cs.category}
                </span>
                <h4 className="text-sm font-semibold text-[#0F172A]">{cs.title}</h4>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleFavorite(cs.id)}
                  className="p-1 rounded-lg hover:bg-[#F1F5F9] transition-colors"
                >
                  <Star
                    className={`w-4 h-4 ${cs.isFavorited ? 'text-[#F59E0B] fill-[#F59E0B]' : 'text-[#CBD5E1]'}`}
                  />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-[#F8FAFC] rounded-lg p-3">
                <p className="text-[10px] text-[#94A3B8] mb-1 font-medium">场景背景</p>
                <p className="text-xs text-[#475569]">{cs.background}</p>
              </div>
              <div className="bg-[#FEF2F2] rounded-lg p-3">
                <p className="text-[10px] text-[#EF4444] mb-1 font-medium">浅层误区</p>
                <p className="text-xs text-[#475569]">{cs.shallowMistake}</p>
              </div>
              <div className="bg-[#EFF6FF] rounded-lg p-3">
                <p className="text-[10px] text-[#1E40AF] mb-1 font-medium">破局策略</p>
                <p className="text-xs text-[#475569]">{cs.breakthroughStrategy}</p>
              </div>
            </div>

            <div className="mt-3 bg-[#F0FDF4] rounded-lg p-3">
              <p className="text-[10px] text-[#10B981] mb-1 font-medium">高阶拆解</p>
              <p className="text-xs text-[#475569]">{cs.advancedAnalysis}</p>
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#F1F5F9]">
              <label className="flex items-center gap-2 cursor-pointer">
                <div
                  onClick={() => toggleLearned(cs.id)}
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors cursor-pointer ${
                    cs.isLearned
                      ? 'bg-[#10B981] border-[#10B981]'
                      : 'border-[#E2E8F0] hover:border-[#CBD5E1]'
                  }`}
                >
                  {cs.isLearned && <CheckCircle className="w-3 h-3 text-white" />}
                </div>
                <span className={`text-xs ${cs.isLearned ? 'text-[#10B981]' : 'text-[#94A3B8]'}`}>
                  {cs.isLearned ? '已学习' : '标记已学习'}
                </span>
              </label>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ========== Tab 5: Deliberate Practice ========== */
function DeliberatePracticeTab() {
  const [tasks, setTasks] = useState(practiceTasks);
  const [filter, setFilter] = useState<TaskStatus | '全部'>('全部');

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' as TaskStatus }
          : t
      )
    );
  };

  const filteredTasks = filter === '全部' ? tasks : tasks.filter((t) => t.status === filter);

  const statusCounts = {
    pending: tasks.filter((t) => t.status === 'pending').length,
    completed: tasks.filter((t) => t.status === 'completed').length,
    overdue: tasks.filter((t) => t.status === 'overdue').length,
  };

  const getStatusStyle = (status: TaskStatus) => {
    switch (status) {
      case 'pending': return { bg: 'bg-[#FFF7ED]', border: 'border-[#FED7AA]', badge: '待完成', badgeColor: 'text-[#C2410C] bg-[#FFF7ED]' };
      case 'completed': return { bg: 'bg-[#F0FDF4]', border: 'border-[#BBF7D0]', badge: '已完成', badgeColor: 'text-[#166534] bg-[#F0FDF4]' };
      case 'overdue': return { bg: 'bg-[#FEF2F2]', border: 'border-[#FECACA]', badge: '逾期', badgeColor: 'text-[#991B1B] bg-[#FEF2F2]' };
    }
  };

  // Weekly progress ring data
  const completedCount = statusCounts.completed;
  const totalCount = tasks.length;
  const ringData = [
    { name: '已完成', value: completedCount, color: '#10B981' },
    { name: '未完成', value: totalCount - completedCount, color: '#E2E8F0' },
  ];

  return (
    <div className="space-y-5">
      {/* Filter Bar + Weekly Progress */}
      <div className="grid grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-2 bg-white border border-[#E2E8F0] rounded-xl p-4"
        >
          <h3 className="text-sm font-semibold text-[#0F172A] mb-3">任务筛选</h3>
          <div className="flex items-center gap-2">
            {([
              { key: '全部', label: '全部', count: tasks.length },
              { key: 'pending', label: '待完成', count: statusCounts.pending },
              { key: 'completed', label: '已完成', count: statusCounts.completed },
              { key: 'overdue', label: '逾期', count: statusCounts.overdue },
            ] as const).map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${
                  filter === f.key
                    ? 'bg-[#1E40AF] text-white'
                    : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
                }`}
              >
                {f.label}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${filter === f.key ? 'bg-white/20' : 'bg-[#E2E8F0]'}`}>
                  {f.count}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Weekly Progress Ring */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-[#E2E8F0] rounded-xl p-4 flex items-center gap-4"
        >
          <div style={{ width: 80, height: 80 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ringData}
                  cx="50%"
                  cy="50%"
                  innerRadius={25}
                  outerRadius={38}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {ringData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div>
            <p className="text-xs text-[#94A3B8]">本周完成率</p>
            <p className="text-xl font-bold text-[#0F172A]">
              {Math.round((completedCount / totalCount) * 100)}%
            </p>
            <p className="text-xs text-[#94A3B8]">{completedCount}/{totalCount} 任务</p>
          </div>
        </motion.div>
      </div>

      {/* Task List */}
      <div className="space-y-2">
        {filteredTasks.map((task, i) => {
          const style = getStatusStyle(task.status);
          return (
            <motion.div
              key={task.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className={`${style.bg} ${style.border} border rounded-lg p-4 flex items-center gap-4`}
            >
              {/* Checkbox */}
              <button
                onClick={() => toggleTask(task.id)}
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                  task.status === 'completed'
                    ? 'bg-[#10B981] border-[#10B981]'
                    : task.status === 'overdue'
                    ? 'border-[#EF4444]'
                    : 'border-[#E2E8F0] hover:border-[#1E40AF]'
                }`}
              >
                {task.status === 'completed' && <CheckCircle className="w-3.5 h-3.5 text-white" />}
              </button>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${task.status === 'completed' ? 'text-[#94A3B8] line-through' : 'text-[#0F172A]'}`}>
                  {task.title}
                </p>
                <p className="text-xs text-[#94A3B8] truncate">{task.description}</p>
              </div>

              {/* Tags */}
              <span className="text-xs bg-white/70 text-[#475569] px-2 py-0.5 rounded-full shrink-0">
                {task.category}
              </span>
              <span className="text-xs text-[#94A3B8] shrink-0 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {task.estimatedTime}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${style.badgeColor}`}>
                {style.badge}
              </span>

              {/* Due date */}
              <span className={`text-xs shrink-0 ${task.status === 'overdue' ? 'text-[#EF4444]' : 'text-[#94A3B8]'}`}>
                {task.dueDate}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ========== Main Growth Page ========== */
export default function Growth() {
  const [activeTab, setActiveTab] = useState('radar');

  const renderTab = () => {
    switch (activeTab) {
      case 'radar': return <CapabilityRadarTab />;
      case 'thinking': return <ThinkingLevelTab />;
      case 'weakness': return <WeaknessDiagnosisTab />;
      case 'cases': return <CaseStudyTab />;
      case 'practice': return <DeliberatePracticeTab />;
      default: return <CapabilityRadarTab />;
    }
  };

  return (
    <Layout title="能力成长" breadcrumb="能力成长">
      <div className="space-y-5">
        {/* User Selector Bar */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-[#E2E8F0] rounded-xl px-5 py-3 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] flex items-center justify-center text-white text-sm font-semibold">
              李
            </div>
            <div>
              <p className="text-sm font-semibold text-[#0F172A]">我的能力档案</p>
              <p className="text-xs text-[#94A3B8]">李销售 — 高级销售经理</p>
            </div>
          </div>
          <span className="text-xs text-[#94A3B8]">最近测评: 2024-01-15</span>
        </motion.div>

        {/* Tab Navigation */}
        <div className="border-b border-[#E2E8F0]">
          <div className="flex items-center gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-all border-b-2 -mb-px ${
                    activeTab === tab.id
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
        </div>

        {/* Tab Content */}
        {renderTab()}
      </div>
    </Layout>
  );
}
