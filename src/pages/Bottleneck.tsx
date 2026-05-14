import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, GitBranch, Target, Copy, Check,
  Sparkles, ChevronDown, AlertTriangle, Clock,
  TrendingUp, Shield, Zap, CheckSquare,
  Flame, CircleDot,
} from 'lucide-react';
import Layout from '@/components/Layout';
import {
  bottleneckTypes, rootCauses, phaseStrategies, contingencyPlans,
  severityConfig, difficultyConfig, todayActions, coreConclusions,
} from '@/data/bottleneckMockData';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const tabs = [
  { key: 'identify', label: '瓶颈定位', icon: Search },
  { key: 'root', label: '根源拆解', icon: GitBranch },
  { key: 'strategy', label: '攻坚策略', icon: Target },
  { key: 'contingency', label: '应急方案', icon: Shield },
] as const;

// ============ Bottleneck Identification ============
function BottleneckIdentification({ onSelect }: { onSelect: (id: string) => void }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Status dashboard */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: '项目阶段', value: '方案评估', color: '#F59E0B', bg: '#FEF3C7', icon: CircleDot },
          { label: '整体进度', value: '45%', color: '#3B82F6', bg: '#DBEAFE', icon: TrendingUp },
          { label: '风险等级', value: '中等', color: '#F59E0B', bg: '#FEF3C7', icon: AlertTriangle },
          { label: '预计成交', value: 'Q2', color: '#10B981', bg: '#F0FDF4', icon: Clock },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4, ease }}
              className="bg-white rounded-xl border border-[#E2E8F0] p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: item.bg }}>
                  <Icon className="w-4 h-4" style={{ color: item.color }} />
                </div>
                <span className="text-xs text-[#94A3B8]">{item.label}</span>
              </div>
              <p className="text-xl font-bold text-[#0F172A]">{item.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Bottleneck cards */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-[#F59E0B]" />
          <h3 className="text-lg font-semibold text-[#0F172A]">AI识别的项目瓶颈</h3>
          <span className="text-xs px-2 py-1 rounded-full bg-[#DBEAFE] text-[#1E40AF] font-medium">AI分析</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {bottleneckTypes.map((bn, i) => {
            const sev = severityConfig[bn.severity];
            const diff = difficultyConfig[bn.difficulty];
            const isSelected = selectedId === bn.id;
            return (
              <motion.div
                key={bn.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4, ease }}
                className={`bg-white rounded-xl border p-5 cursor-pointer transition-all hover:shadow-md ${
                  isSelected ? 'border-[#1E40AF] ring-1 ring-[#1E40AF]' : 'border-[#E2E8F0]'
                }`}
                style={{ borderLeftWidth: 4, borderLeftColor: sev.color }}
                onClick={() => { setSelectedId(isSelected ? null : bn.id); onSelect(bn.id); }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ backgroundColor: sev.bg, color: sev.color }}>
                      {sev.label}
                    </span>
                    {bn.isPrimary && (
                      <span className="text-xs px-2 py-1 rounded-full bg-[#FEF2F2] text-[#EF4444] font-medium">核心瓶颈</span>
                    )}
                  </div>
                  <span className="text-xs text-[#94A3B8]">{bn.category}</span>
                </div>
                <h4 className="text-base font-semibold text-[#0F172A] mb-2">{bn.name}</h4>
                <p className="text-sm text-[#475569] leading-relaxed mb-3">{bn.description}</p>

                {/* Progress */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-[#94A3B8]">突破进度</span>
                    <span className="text-xs font-medium text-[#1E40AF]">{bn.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${bn.progress}%`, backgroundColor: sev.color }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ backgroundColor: diff.bg, color: diff.color }}>
                    {bn.difficulty}
                  </span>
                  <div className="flex items-center gap-1 text-[#94A3B8]">
                    <ChevronDown className={`w-4 h-4 transition-transform ${isSelected ? 'rotate-180' : ''}`} />
                  </div>
                </div>

                {/* Expanded evidence */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 pt-3 border-t border-[#E2E8F0]">
                        <p className="text-xs font-medium text-[#475569] mb-2">佐证信息:</p>
                        {bn.evidence.map((ev, j) => (
                          <div key={j} className="flex items-start gap-2 mb-1.5">
                            <div className="w-1 h-1 rounded-full bg-[#94A3B8] mt-1.5 shrink-0" />
                            <p className="text-xs text-[#475569] italic">"{ev}"</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============ Fishbone Diagram ============
function FishboneDiagram() {
  const [deepMode, setDeepMode] = useState(false);

  const categoryPositions = [
    { x: 120, y: 80, angle: -30 },
    { x: 280, y: 80, angle: -30 },
    { x: 440, y: 80, angle: -30 },
    { x: 120, y: 320, angle: 30 },
    { x: 280, y: 320, angle: 30 },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#F59E0B]" />
          <h3 className="text-lg font-semibold text-[#0F172A]">根因分析鱼骨图</h3>
          <span className="text-xs px-2 py-1 rounded-full bg-[#DBEAFE] text-[#1E40AF] font-medium">AI生成</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDeepMode(false)}
            className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${!deepMode ? 'bg-[#1E40AF] text-white' : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'}`}
          >
            表层原因
          </button>
          <button
            onClick={() => setDeepMode(true)}
            className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${deepMode ? 'bg-[#1E40AF] text-white' : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'}`}
          >
            深层原因
          </button>
        </div>
      </div>

      {/* SVG Fishbone */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 overflow-x-auto">
        <svg viewBox="0 0 640 400" className="w-full min-h-[400px]">
          {/* Spine */}
          <line x1="20" y1="200" x2="540" y2="200" stroke="#475569" strokeWidth="3" />

          {/* Fish head */}
          <rect x="540" y="160" width="90" height="80" rx="12" fill="#FEF2F2" stroke="#EF4444" strokeWidth="2" />
          <text x="585" y="195" textAnchor="middle" fill="#EF4444" fontSize="13" fontWeight="600">项目推进受阻</text>
          <text x="585" y="215" textAnchor="middle" fill="#94A3B8" fontSize="10">华夏科技</text>

          {/* Tail */}
          <polygon points="0,200 20,180 20,220" fill="#475569" />

          {rootCauses.map((rc, i) => {
            const pos = categoryPositions[i];
            const isTop = i < 3;
            const causes = deepMode ? rc.deepCauses : rc.surfaceCauses;

            return (
              <g key={rc.id}>
                {/* Bone line */}
                <line
                  x1={pos.x}
                  y1={isTop ? pos.y + 40 : pos.y - 40}
                  x2={pos.x + 60}
                  y2="200"
                  stroke={rc.categoryColor}
                  strokeWidth="2"
                />

                {/* Category label */}
                <rect
                  x={pos.x - 20}
                  y={isTop ? pos.y : pos.y - 24}
                  width="80"
                  height="24"
                  rx="6"
                  fill={rc.categoryColor}
                  opacity="0.15"
                />
                <text
                  x={pos.x + 20}
                  y={isTop ? pos.y + 16 : pos.y - 8}
                  textAnchor="middle"
                  fill={rc.categoryColor}
                  fontSize="12"
                  fontWeight="600"
                >
                  {rc.category}
                </text>

                {/* Sub-causes */}
                {causes.map((cause, j) => {
                  const cy = isTop ? pos.y + 50 + j * 35 : pos.y - 50 - j * 35;
                  return (
                    <g key={j}>
                      <rect
                        x={pos.x - 30}
                        y={cy - 12}
                        width="100"
                        height="24"
                        rx="6"
                        fill="white"
                        stroke={rc.categoryColor}
                        strokeWidth="1"
                        opacity="0.9"
                      />
                      <text
                        x={pos.x + 20}
                        y={cy + 4}
                        textAnchor="middle"
                        fill={deepMode ? '#1E40AF' : '#475569'}
                        fontSize="10"
                        fontWeight={deepMode ? '600' : '400'}
                      >
                        {cause.length > 10 ? cause.substring(0, 10) + '...' : cause}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Root Cause Detail Cards */}
      <div className="grid grid-cols-2 gap-4">
        {rootCauses.map((rc, i) => {
          const causes = deepMode ? rc.deepCauses : rc.surfaceCauses;
          return (
            <motion.div
              key={rc.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4, ease }}
              className="bg-white rounded-xl border border-[#E2E8F0] p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: rc.categoryColor }} />
                <h4 className="text-sm font-semibold text-[#0F172A]">{rc.category}</h4>
              </div>
              <div className="space-y-2">
                {causes.map((cause, j) => (
                  <div key={j} className="flex items-start gap-2 p-2 rounded-lg bg-[#F8FAFC]">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: rc.categoryColor }} />
                    <p className={`text-xs leading-relaxed ${deepMode ? 'text-[#1E40AF] font-medium' : 'text-[#475569]'}`}>
                      {cause}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ============ Attack Strategy ============
function AttackStrategy() {
  const [checkedActions, setCheckedActions] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState<string | null>(null);

  const toggleAction = useCallback((id: string) => {
    setCheckedActions((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const copyAction = useCallback((content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-[#F59E0B]" />
        <h3 className="text-lg font-semibold text-[#0F172A]">分阶段攻坚策略</h3>
        <span className="text-xs px-2 py-1 rounded-full bg-[#DBEAFE] text-[#1E40AF] font-medium">AI生成</span>
      </div>

      {/* Phase Timeline Header */}
      <div className="flex items-center gap-0 bg-white rounded-xl border border-[#E2E8F0] p-4">
        {phaseStrategies.map((phase, i) => (
          <div key={phase.phase} className="flex-1 flex items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
                style={{ backgroundColor: phase.color }}>
                {phase.phase}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0F172A]">{phase.name}</p>
                <p className="text-xs text-[#94A3B8]">{phase.timeline}</p>
              </div>
            </div>
            {i < phaseStrategies.length - 1 && (
              <div className="flex-1 h-0.5 bg-[#E2E8F0] mx-4" />
            )}
          </div>
        ))}
      </div>

      {/* Phase Detail Cards */}
      <div className="space-y-4">
        {phaseStrategies.map((phase, pi) => (
          <motion.div
            key={phase.phase}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: pi * 0.1, duration: 0.4, ease }}
            className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden"
            style={{ borderLeftWidth: 4, borderLeftColor: phase.color }}
          >
            <div className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: phase.color }}>
                  {phase.phase}
                </div>
                <div>
                  <h4 className="text-base font-semibold text-[#0F172A]">{phase.name}</h4>
                  <p className="text-xs text-[#94A3B8]">{phase.timeline}</p>
                </div>
                <span className="ml-auto text-xs text-[#475569] bg-[#F1F5F9] px-3 py-1 rounded-full">
                  {phase.objective}
                </span>
              </div>

              <div className="space-y-2">
                {phase.actions.map((action) => {
                  const isChecked = checkedActions.has(action.id);
                  return (
                    <div
                      key={action.id}
                      className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                        isChecked ? 'bg-[#F0FDF4]' : 'bg-[#F8FAFC] hover:bg-[#F1F5F9]'
                      }`}
                    >
                      <button
                        onClick={() => toggleAction(action.id)}
                        className="mt-0.5 shrink-0"
                      >
                        {isChecked ? (
                          <CheckSquare className="w-5 h-5 text-[#10B981]" />
                        ) : (
                          <div className="w-5 h-5 rounded border-2 border-[#CBD5E1] hover:border-[#1E40AF] transition-colors" />
                        )}
                      </button>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm ${isChecked ? 'line-through text-[#94A3B8]' : 'text-[#0F172A]'}`}>
                          {action.content}
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-[#94A3B8]">负责人: {action.owner}</span>
                          <span className="text-xs text-[#94A3B8]">截止: {action.dueDate}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => copyAction(action.content, action.id)}
                        className="p-1.5 hover:bg-[#E2E8F0] rounded-md transition-colors shrink-0"
                      >
                        {copied === action.id ? (
                          <Check className="w-3.5 h-3.5 text-[#10B981]" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 text-[#94A3B8]" />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ============ Contingency Plans ============
function ContingencyPlans() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-5 h-5 text-[#1E40AF]" />
        <h3 className="text-lg font-semibold text-[#0F172A]">应急备选方案</h3>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {contingencyPlans.map((plan, i) => {
          const isSelected = selectedPlan === plan.id;
          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4, ease }}
              className={`bg-white rounded-xl border cursor-pointer transition-all hover:shadow-md ${
                isSelected ? 'border-[#1E40AF] ring-1 ring-[#1E40AF]' : 'border-[#E2E8F0]'
              }`}
              onClick={() => setSelectedPlan(isSelected ? null : plan.id)}
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-[#0F172A]">{plan.name}</h4>
                  <span className="text-xs px-2 py-1 rounded-full font-medium"
                    style={{ backgroundColor: plan.riskColor + '20', color: plan.riskColor }}>
                    {plan.riskLevel}
                  </span>
                </div>
                <p className="text-sm text-[#475569] leading-relaxed mb-3">{plan.description}</p>
                <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
                  <Zap className="w-3.5 h-3.5" />
                  <span>触发条件: {plan.triggerCondition}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Selected plan detail */}
      <AnimatePresence>
        {selectedPlan && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease }}
            className="bg-white rounded-xl border border-[#E2E8F0] p-5"
          >
            {(() => {
              const plan = contingencyPlans.find((p) => p.id === selectedPlan);
              if (!plan) return null;
              return (
                <>
                  <h4 className="text-base font-semibold text-[#0F172A] mb-3">{plan.name} — 执行步骤</h4>
                  <div className="space-y-3">
                    {plan.steps.map((step, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#EFF6FF] text-[#1E40AF] flex items-center justify-center text-xs font-semibold shrink-0">
                          {i + 1}
                        </div>
                        <p className="text-sm text-[#475569] pt-0.5">{step}</p>
                      </div>
                    ))}
                  </div>
                </>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============ Right Panel ============
function BottleneckRightPanel() {
  return (
    <div className="p-4 space-y-4">
      {/* Core Conclusions */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-4">
        <div className="flex items-center gap-2 mb-3">
          <Flame className="w-4 h-4 text-[#EF4444]" />
          <h4 className="text-sm font-semibold text-[#0F172A]">攻坚核心结论</h4>
        </div>
        <div className="space-y-2">
          {coreConclusions.map((conclusion, i) => (
            <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-[#FEF2F2]">
              <div className="w-5 h-5 rounded-full bg-[#EF4444] text-white flex items-center justify-center text-[10px] font-semibold shrink-0 mt-0.5">
                {i + 1}
              </div>
              <p className="text-xs text-[#475569] leading-relaxed">{conclusion}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Actions */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-4">
        <div className="flex items-center gap-2 mb-3">
          <CheckSquare className="w-4 h-4 text-[#10B981]" />
          <h4 className="text-sm font-semibold text-[#0F172A]">今日可执行动作</h4>
        </div>
        <div className="space-y-2">
          {todayActions.map((action, i) => (
            <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-[#F0FDF4]">
              <div className="w-4 h-4 rounded border-2 border-[#10B981] shrink-0 mt-0.5" />
              <p className="text-xs text-[#475569] leading-relaxed">{action}</p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-4">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-[#F59E0B]" />
          <h4 className="text-sm font-semibold text-[#0F172A]">AI建议</h4>
        </div>
        <div className="space-y-2">
          <p className="text-xs text-[#475569] leading-relaxed bg-[#F8FAFC] p-3 rounded-lg">
            建议优先攻克<span className="font-semibold text-[#EF4444]">预算审批瓶颈</span>，准备好灵活的付款方案和ROI测算报告。
          </p>
          <p className="text-xs text-[#475569] leading-relaxed bg-[#F8FAFC] p-3 rounded-lg">
            <span className="font-semibold text-[#1E40AF]">CTO王磊</span>是技术层面的突破口，可借助其推动整体决策。
          </p>
          <p className="text-xs text-[#475569] leading-relaxed bg-[#F8FAFC] p-3 rounded-lg">
            考虑采用"<span className="font-semibold">试点先行</span>"策略，降低客户决策风险。
          </p>
        </div>
      </div>
    </div>
  );
}

// ============ Main Component ============
export default function Bottleneck() {
  const [activeTab, setActiveTab] = useState<typeof tabs[number]['key']>('identify');

  return (
    <Layout
      title="项目瓶颈与攻坚策略"
      breadcrumb="首页 / 项目瓶颈与攻坚策略"
      showRightPanel
    >
      {/* Tab Navigation */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] mb-6">
        <div className="flex border-b border-[#E2E8F0]">
          {tabs.map((tab) => {
            const TabIcon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-5 py-3 text-sm font-medium transition-all border-b-2 ${
                  isActive
                    ? 'text-[#1E40AF] border-[#1E40AF] bg-[#EFF6FF]'
                    : 'text-[#94A3B8] border-transparent hover:text-[#475569] hover:bg-[#F8FAFC]'
                }`}
              >
                <TabIcon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-6">
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            {activeTab === 'identify' && (
              <motion.div
                key="identify"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease }}
              >
                <BottleneckIdentification onSelect={() => {}} />
              </motion.div>
            )}
            {activeTab === 'root' && (
              <motion.div
                key="root"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease }}
              >
                <FishboneDiagram />
              </motion.div>
            )}
            {activeTab === 'strategy' && (
              <motion.div
                key="strategy"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease }}
              >
                <AttackStrategy />
              </motion.div>
            )}
            {activeTab === 'contingency' && (
              <motion.div
                key="contingency"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease }}
              >
                <ContingencyPlans />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Panel */}
        <div className="w-80 shrink-0">
          <div className="bg-white rounded-xl border border-[#E2E8F0] sticky top-4">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#E2E8F0]">
              <Target className="w-4 h-4 text-[#1E40AF]" />
              <h3 className="text-sm font-semibold text-[#0F172A]">攻坚助手</h3>
            </div>
            <BottleneckRightPanel />
          </div>
        </div>
      </div>
    </Layout>
  );
}
