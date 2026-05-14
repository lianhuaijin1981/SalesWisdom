// ============ Bottleneck Mock Data ============

export type Severity = 'severe' | 'moderate' | 'minor';
export type Difficulty = '易突破' | '中等' | '高难度' | '暂时无解';

export interface BottleneckType {
  id: string;
  name: string;
  description: string;
  severity: Severity;
  difficulty: Difficulty;
  progress: number;
  isPrimary: boolean;
  category: string;
  evidence: string[];
}

export interface RootCause {
  id: string;
  category: string;
  categoryColor: string;
  surfaceCauses: string[];
  deepCauses: string[];
}

export interface StrategyAction {
  id: string;
  content: string;
  owner: string;
  dueDate: string;
  completed: boolean;
}

export interface PhaseStrategy {
  phase: number;
  name: string;
  timeline: string;
  color: string;
  objective: string;
  actions: StrategyAction[];
}

export interface ContingencyPlan {
  id: string;
  name: string;
  description: string;
  riskLevel: string;
  riskColor: string;
  triggerCondition: string;
  steps: string[];
}

export const bottleneckTypes: BottleneckType[] = [
  {
    id: 'b1',
    name: '预算审批瓶颈',
    description: '项目预算卡在采购总监赵敏环节，对方认为现有供应商已能满足需求，缺乏切换动力。预算审批流程冗长且存在多重关卡。',
    severity: 'severe',
    difficulty: '高难度',
    progress: 35,
    isPrimary: true,
    category: '资金',
    evidence: [
      '赵敏在会议上明确表示"现有系统运行稳定，没有必要更换"',
      '采购流程需要经过三级审批，预计耗时4-6周',
    ],
  },
  {
    id: 'b2',
    name: '决策链瓶颈',
    description: 'CEO陈建国尚未明确表态，决策链中的关键人物态度分化，VP李伟强支持但采购总监赵敏反对，导致决策陷入僵局。',
    severity: 'severe',
    difficulty: '高难度',
    progress: 25,
    isPrimary: false,
    category: '决策',
    evidence: [
      '陈建国在汇报会后表示"需要再考虑考虑"',
      '李伟强和赵敏在预算问题上意见不一致',
    ],
  },
  {
    id: 'b3',
    name: '需求匹配瓶颈',
    description: '客户部分定制化需求与标准产品存在差距，技术方案的可扩展性论证不够充分，客户对长期价值存疑。',
    severity: 'moderate',
    difficulty: '中等',
    progress: 50,
    isPrimary: false,
    category: '技术',
    evidence: [
      'CTO王磊提出"系统能否支撑未来3年的业务增长"',
      '技术团队要求补充同行业大规模部署案例',
    ],
  },
  {
    id: 'b4',
    name: '信任关系瓶颈',
    description: '与客户合作时间较短，尚未建立深度信任关系。客户对我们公司的实施能力和售后服务存在顾虑。',
    severity: 'moderate',
    difficulty: '中等',
    progress: 45,
    isPrimary: false,
    category: '关系',
    evidence: [
      '客户反复询问售后响应时间和技术支持能力',
      '客户要求参观我们的成功案例现场',
    ],
  },
  {
    id: 'b5',
    name: '战略不匹配瓶颈',
    description: '客户当前的战略重心偏向市场扩张，内部IT投入的优先级相对靠后。项目未能与客户的战略重点形成强绑定。',
    severity: 'moderate',
    difficulty: '暂时无解',
    progress: 20,
    isPrimary: false,
    category: '战略',
    evidence: [
      '客户年度预算重心偏向销售和市场部门',
      'IT部门的项目审批明显更为严格',
    ],
  },
  {
    id: 'b6',
    name: '流程制度瓶颈',
    description: '客户内部的采购流程复杂、层级多、周期长，且缺乏明确的推进时间表。采购部门对流程合规性要求极高。',
    severity: 'minor',
    difficulty: '中等',
    progress: 60,
    isPrimary: false,
    category: '流程',
    evidence: [
      '采购专员马小军表示"需要补齐所有文档才能走流程"',
      '客户内部缺乏数字化采购的快速通道机制',
    ],
  },
  {
    id: 'b7',
    name: '个人心态瓶颈',
    description: '采购总监赵敏对引入新供应商持谨慎甚至抵触态度，担心新系统带来额外管理负担和潜在风险。',
    severity: 'severe',
    difficulty: '高难度',
    progress: 30,
    isPrimary: false,
    category: '心态',
    evidence: [
      '赵敏多次提到"换系统的风险太大"',
      '赵敏私下表示"现在的供应商虽然不完美但省心"',
    ],
  },
];

export const rootCauses: RootCause[] = [
  {
    id: 'rc1',
    category: '人员因素',
    categoryColor: '#F59E0B',
    surfaceCauses: ['采购总监对新供应商缺乏信任', '决策层参与度不够深入', '一线人员担心变革'],
    deepCauses: ['采购总监的个人风险偏好保守', '缺乏有效的变革管理和沟通机制', 'KPI考核体系未能与项目目标对齐'],
  },
  {
    id: 'rc2',
    category: '流程因素',
    categoryColor: '#3B82F6',
    surfaceCauses: ['采购审批层级过多', '预算申请流程不透明', '缺乏明确的时间节点'],
    deepCauses: ['组织层级臃肿导致决策缓慢', '数字化程度低导致流程依赖人工', '跨部门协作机制不健全'],
  },
  {
    id: 'rc3',
    category: '技术因素',
    categoryColor: '#38BDF8',
    surfaceCauses: ['技术方案可扩展性论证不足', '缺少同行业大规模案例', 'POC测试范围有限'],
    deepCauses: ['产品在某些边界场景的性能验证不充分', '技术白皮书的行业针对性不够强', '客户IT架构复杂度高导致集成挑战大'],
  },
  {
    id: 'rc4',
    category: '资源因素',
    categoryColor: '#10B981',
    surfaceCauses: ['预算被其他项目占用', '人力资源紧张', '实施周期与业务旺季冲突'],
    deepCauses: ['客户对ROI的期望过高而预算有限', '竞品价格压力迫使压缩利润空间', '宏观经济环境导致客户缩减IT开支'],
  },
  {
    id: 'rc5',
    category: '外部因素',
    categoryColor: '#8B5CF6',
    surfaceCauses: ['竞品价格压力大', '行业政策变化不确定性', '客户内部优先级调整'],
    deepCauses: ['竞品采取了更激进的商务策略', '行业监管趋严增加了客户决策风险', '客户业务波动影响了IT投入确定性'],
  },
];

export const phaseStrategies: PhaseStrategy[] = [
  {
    phase: 1,
    name: '短期突破',
    timeline: '1-3天',
    color: '#3B82F6',
    objective: '快速建立信任基础，收集关键情报',
    actions: [
      { id: 'a1', content: '通过行政主管吴芳安排与CTO王磊的咖啡聊天', owner: '李销售', dueDate: '第1天', completed: false },
      { id: 'a2', content: '准备同行业成功案例PPT（重点突出ROI数据）', owner: '市场部', dueDate: '第2天', completed: false },
      { id: 'a3', content: '邀请技术经理张涛参加产品体验会', owner: '李销售', dueDate: '第3天', completed: false },
    ],
  },
  {
    phase: 2,
    name: '中期攻坚',
    timeline: '1-2周',
    color: '#1E40AF',
    objective: '攻克关键决策人，突破技术和商务障碍',
    actions: [
      { id: 'a4', content: '安排CTO王磊参观标杆客户现场', owner: '李销售', dueDate: '第5天', completed: false },
      { id: 'a5', content: '提交技术可扩展性深度论证报告', owner: '技术部', dueDate: '第7天', completed: false },
      { id: 'a6', content: '与VP李伟强进行商务条款预沟通', owner: '张总监', dueDate: '第10天', completed: false },
      { id: 'a7', content: '为采购总监赵敏准备差异化价值分析报告', owner: '李销售', dueDate: '第12天', completed: false },
    ],
  },
  {
    phase: 3,
    name: '长期培育',
    timeline: '2-4周',
    color: '#10B981',
    objective: '巩固成果，推动最终签约',
    actions: [
      { id: 'a8', content: '安排CEO与CEO层面的战略对话', owner: '张总监', dueDate: '第14天', completed: false },
      { id: 'a9', content: '制定详细的风险控制和售后支持方案', owner: '服务部', dueDate: '第18天', completed: false },
      { id: 'a10', content: '提供灵活的付款方案降低预算审批阻力', owner: '商务部', dueDate: '第21天', completed: false },
    ],
  },
];

export const contingencyPlans: ContingencyPlan[] = [
  {
    id: 'cp1',
    name: 'Plan B — 快速通道方案',
    description: '如果采购流程过于复杂，建议客户先以试点项目形式启动，绕过完整的采购审批流程。',
    riskLevel: '中等风险',
    riskColor: '#F59E0B',
    triggerCondition: '采购审批流程超过4周无进展',
    steps: [
      '提出"先试点后推广"的合作模式',
      '将项目拆分为小额试点合同',
      '利用试点成果推动正式采购流程',
      '为试点项目提供专属资源保障',
    ],
  },
  {
    id: 'cp2',
    name: 'Plan C — 高层介入方案',
    description: '如果中层持续阻挠，寻求VP李伟强协调，必要时推动双方CEO直接对话。',
    riskLevel: '较高风险',
    riskColor: '#EF4444',
    triggerCondition: '采购总监赵敏持续消极对待超过2周',
    steps: [
      '向VP李伟强汇报当前卡点',
      '请李伟强在内部推动协调',
      '安排双方CEO/CTO层面的交流',
      '准备CEO层面的战略合作提案',
    ],
  },
  {
    id: 'cp3',
    name: 'Plan D — 迂回包抄方案',
    description: '如果从采购部突破困难，先从技术部门和业务部门建立使用基础，形成自下而上的推动力量。',
    riskLevel: '低风险但周期长',
    riskColor: '#3B82F6',
    triggerCondition: '自上而下的推动策略效果不佳',
    steps: [
      '为技术部门提供免费试用环境',
      '帮助业务部门搭建小范围试点场景',
      '收集一线用户的使用好评和反馈',
      '用一线需求倒逼管理层决策',
    ],
  },
];

export const severityConfig: Record<Severity, { color: string; bg: string; label: string }> = {
  severe: { color: '#EF4444', bg: '#FEF2F2', label: '严重' },
  moderate: { color: '#F59E0B', bg: '#FEF3C7', label: '中等' },
  minor: { color: '#EAB308', bg: '#FEF9C3', label: '轻微' },
};

export const difficultyConfig: Record<Difficulty, { color: string; bg: string }> = {
  '易突破': { color: '#10B981', bg: '#F0FDF4' },
  '中等': { color: '#3B82F6', bg: '#EFF6FF' },
  '高难度': { color: '#F59E0B', bg: '#FEF3C7' },
  '暂时无解': { color: '#EF4444', bg: '#FEF2F2' },
};

export const todayActions = [
  '准备CTO王磊的行业案例PPT，重点突出ROI数据',
  '联系行政主管吴芳安排本周的拜访会议',
  '梳理竞品价格对比表，准备应对采购部质疑',
  '与技术团队确认可扩展性论证报告的完成时间',
];

export const coreConclusions = [
  '核心瓶颈是采购总监赵敏的态度，需要差异化价值论证+灵活商务条件双管齐下',
  'CTO王磊是关键盟友，应充分利用其技术影响力推动决策',
  '建议采用"试点先行"策略降低客户决策风险',
  '竞品价格优势明显，需要强化差异化价值而非陷入价格战',
];
