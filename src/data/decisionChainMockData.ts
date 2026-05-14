// ============ Decision Chain Mock Data ============

export type LayerType = 'top' | 'direct' | 'review' | 'frontline' | 'peripheral';
export type StanceType = 'support' | 'neutral' | 'oppose';
export type EdgeType = 'hierarchy' | 'ally' | 'conflict' | 'balance';

export interface PersonNode {
  id: string;
  name: string;
  position: string;
  department: string;
  layer: LayerType;
  layerName: string;
  stance: StanceType;
  influence: number; // 1-3
  isBottleneck: boolean;
  avatar?: string;
  dimensions: {
    identityPower: string;      // 身份权责
    businessAppeal: string;     // 业务诉求
    personalAppeal: string;     // 个人诉求
    coreValues: string;         // 核心价值观
    projectStance: string;      // 项目立场
    relationships: string;      // 人际关联
    bottleneckImpact: string;   // 瓶颈影响
    behaviorPrediction: string; // 行为推演
  };
}

export interface Edge {
  id: string;
  source: string;
  target: string;
  type: EdgeType;
  label: string;
}

export interface LayerConfig {
  key: LayerType;
  name: string;
  color: string;
  yPosition: number;
}

export const layerConfigs: LayerConfig[] = [
  { key: 'top', name: '顶层决策层', color: '#1E40AF', yPosition: 80 },
  { key: 'direct', name: '直接对接层', color: '#3B82F6', yPosition: 200 },
  { key: 'review', name: '职能评审层', color: '#38BDF8', yPosition: 320 },
  { key: 'frontline', name: '一线使用层', color: '#94A3B8', yPosition: 440 },
  { key: 'peripheral', name: '外围影响层', color: '#CBD5E1', yPosition: 560 },
];

export const stanceColors: Record<StanceType, string> = {
  support: '#10B981',
  neutral: '#94A3B8',
  oppose: '#EF4444',
};

export const stanceLabels: Record<StanceType, string> = {
  support: '支持',
  neutral: '中立',
  oppose: '反对',
};

export const edgeTypeConfig: Record<EdgeType, { stroke: string; strokeDasharray?: string; label: string }> = {
  hierarchy: { stroke: '#475569', label: '上下级' },
  ally: { stroke: '#3B82F6', label: '利益同盟' },
  conflict: { stroke: '#EF4444', strokeDasharray: '6,4', label: '观点对立' },
  balance: { stroke: '#94A3B8', strokeDasharray: '4,2', label: '相互制衡' },
};

export const personNodes: PersonNode[] = [
  {
    id: 'p1',
    name: '陈建国',
    position: 'CEO',
    department: '总裁办',
    layer: 'top',
    layerName: '顶层决策层',
    stance: 'neutral',
    influence: 3,
    isBottleneck: false,
    dimensions: {
      identityPower: '公司最高决策者，拥有最终签字权和战略决策权',
      businessAppeal: '希望提升企业整体运营效率，降低管理成本',
      personalAppeal: '追求行业影响力，希望打造标杆企业',
      coreValues: '结果导向、长期主义、人才第一',
      projectStance: '尚未表态，关注ROI和落地效果',
      relationships: '与副总李伟强为校友，信任度高；对CTO王磊技术判断较依赖',
      bottleneckImpact: '不直接构成瓶颈，但其态度将决定项目成败',
      behaviorPrediction: '倾向于等待下属汇报后再做判断，需要通过影响其周边人员间接推动',
    },
  },
  {
    id: 'p2',
    name: '李伟强',
    position: '副总裁',
    department: '总裁办',
    layer: 'direct',
    layerName: '直接对接层',
    stance: 'support',
    influence: 3,
    isBottleneck: false,
    dimensions: {
      identityPower: '分管业务运营，直接向CEO汇报，掌握预算初审权',
      businessAppeal: '推动数字化转型，提升部门协同效率',
      personalAppeal: '希望在任期内做出突出业绩',
      coreValues: '务实高效、数据驱动',
      projectStance: '明确支持，已多次表达合作意向',
      relationships: '与CEO私交甚笃；与采购总监赵敏存在预算审批权分歧',
      bottleneckImpact: '是关键推动力量，但权力受制于预算流程',
      behaviorPrediction: '会继续推动项目，但需要解决预算流程障碍',
    },
  },
  {
    id: 'p3',
    name: '赵敏',
    position: '采购总监',
    department: '采购部',
    layer: 'direct',
    layerName: '直接对接层',
    stance: 'oppose',
    influence: 2,
    isBottleneck: true,
    dimensions: {
      identityPower: '掌控采购预算审批和供应商评估流程',
      businessAppeal: '降低采购成本，优化供应商管理体系',
      personalAppeal: '维护采购流程的权威性和个人话语权',
      coreValues: '流程合规、风险控制、成本意识',
      projectStance: '持保留态度，认为现有供应商已能满足需求',
      relationships: '与CFO孙婷关系紧密；对销售方存在天然的议价对抗心理',
      bottleneckImpact: '是核心瓶颈人物，掌握预算审批第一道关卡',
      behaviorPrediction: '会严格审视报价条款，需要充分的差异化价值论证',
    },
  },
  {
    id: 'p4',
    name: '王磊',
    position: 'CTO',
    department: '技术部',
    layer: 'review',
    layerName: '职能评审层',
    stance: 'support',
    influence: 3,
    isBottleneck: false,
    dimensions: {
      identityPower: '技术架构最终决策者，负责技术方案评审和选型',
      businessAppeal: '引入先进技术栈，提升技术团队能力',
      personalAppeal: '追求技术创新，希望建立技术驱动的企业形象',
      coreValues: '技术领先、开放包容、持续学习',
      projectStance: '技术层面高度认可，积极推动技术方案落地',
      relationships: '与技术经理张涛为多年搭档；对CFO孙婷的保守态度有所不满',
      bottleneckImpact: '虽然支持，但技术评审流程较长可能影响进度',
      behaviorPrediction: '会继续推进技术方案评审，是我们可以借助的重要力量',
    },
  },
  {
    id: 'p5',
    name: '孙婷',
    position: 'CFO',
    department: '财务部',
    layer: 'review',
    layerName: '职能评审层',
    stance: 'neutral',
    influence: 2,
    isBottleneck: false,
    dimensions: {
      identityPower: '财务预算最终审批权，掌握资金拨付节奏',
      businessAppeal: '确保投资回报率，控制财务风险',
      personalAppeal: '维护财务纪律的严肃性',
      coreValues: '稳健经营、风险可控、数据说话',
      projectStance: '要求先看到详细的ROI测算报告再做决定',
      relationships: '与采购总监赵敏立场一致；对VP李伟强的激进风格有所顾虑',
      bottleneckImpact: '如果ROI论证不充分，可能在终审环节卡住',
      behaviorPrediction: '会重点关注财务数据和回报周期，需要用数据说话',
    },
  },
  {
    id: 'p6',
    name: '张涛',
    position: '技术经理',
    department: '技术部',
    layer: 'frontline',
    layerName: '一线使用层',
    stance: 'support',
    influence: 2,
    isBottleneck: false,
    dimensions: {
      identityPower: '负责具体技术方案的实施和日常运维管理',
      businessAppeal: '提升系统稳定性，减轻运维工作量',
      personalAppeal: '希望获得技术成长空间和团队认可',
      coreValues: '务实落地、团队协作',
      projectStance: '一线使用方，非常认可产品易用性和稳定性',
      relationships: '直接向CTO王磊汇报；与运营主管刘洋协作密切',
      bottleneckImpact: '作为一线使用者，其使用反馈将直接影响后续采购',
      behaviorPrediction: '会继续提供积极的产品反馈，是内部口碑的重要传播者',
    },
  },
  {
    id: 'p7',
    name: '刘洋',
    position: '运营主管',
    department: '运营部',
    layer: 'frontline',
    layerName: '一线使用层',
    stance: 'neutral',
    influence: 1,
    isBottleneck: false,
    dimensions: {
      identityPower: '负责业务运营流程，是产品的日常重度使用者',
      businessAppeal: '优化运营流程，提升人效',
      personalAppeal: '减少重复性工作，提升工作满意度',
      coreValues: '效率优先、用户至上',
      projectStance: '持观望态度，担心学习成本和过渡期效率下降',
      relationships: '与技术经理张涛配合较多；对运营总监周丽的决策高度服从',
      bottleneckImpact: '如果抵触使用，可能在一线形成负面反馈',
      behaviorPrediction: '需要充分的培训和使用支持，打消对变更的顾虑',
    },
  },
  {
    id: 'p8',
    name: '周丽',
    position: '运营总监',
    department: '运营部',
    layer: 'review',
    layerName: '职能评审层',
    stance: 'support',
    influence: 2,
    isBottleneck: false,
    dimensions: {
      identityPower: '运营部门负责人，对业务流程优化有决策权',
      businessAppeal: '提升运营效率，降低人力成本',
      personalAppeal: '希望打造高效运营团队',
      coreValues: '结果导向、持续改进',
      projectStance: '支持，认为产品能显著提升运营效率',
      relationships: '向VP李伟强汇报；对下属刘洋有较强影响力',
      bottleneckImpact: '积极推动者，可以帮助化解一线使用顾虑',
      behaviorPrediction: '会继续支持项目推进，并可帮助协调运营部门配合',
    },
  },
  {
    id: 'p9',
    name: '马小军',
    position: '采购专员',
    department: '采购部',
    layer: 'peripheral',
    layerName: '外围影响层',
    stance: 'neutral',
    influence: 1,
    isBottleneck: false,
    dimensions: {
      identityPower: '负责采购流程的具体执行和文档整理',
      businessAppeal: '简化采购流程，提升工作效率',
      personalAppeal: '减少繁琐的文档工作',
      coreValues: '流程规范、细心负责',
      projectStance: '按照上级指示执行，没有明显个人倾向',
      relationships: '直属采购总监赵敏管理；与各部门对接人保持工作联系',
      bottleneckImpact: '虽非决策者，但掌握着流程推进的节奏',
      behaviorPrediction: '会严格执行上级指令，可以通过影响其态度间接加快流程',
    },
  },
  {
    id: 'p10',
    name: '吴芳',
    position: '行政主管',
    department: '行政部',
    layer: 'peripheral',
    layerName: '外围影响层',
    stance: 'support',
    influence: 1,
    isBottleneck: false,
    dimensions: {
      identityPower: '负责会议安排、接待等行政事务',
      businessAppeal: '提升行政服务效率',
      personalAppeal: '希望在各部门中获得好口碑',
      coreValues: '服务至上、细致周到',
      projectStance: '友善支持，可以帮助我们安排关键会议',
      relationships: '与各部门秘书层关系密切，是非正式信息的流通节点',
      bottleneckImpact: '虽非业务决策人员，但掌握着会议和接待的安排权',
      behaviorPrediction: '态度友好，愿意配合安排拜访和会议',
    },
  },
  {
    id: 'p11',
    name: '郑伟',
    position: 'IT工程师',
    department: '技术部',
    layer: 'peripheral',
    layerName: '外围影响层',
    stance: 'neutral',
    influence: 1,
    isBottleneck: false,
    dimensions: {
      identityPower: '负责技术评估和POC测试执行',
      businessAppeal: '解决实际技术问题，提升系统性能',
      personalAppeal: '积累技术经验，提升个人能力',
      coreValues: '技术为本、实事求是',
      projectStance: '技术中立，关注产品性能本身',
      relationships: '向技术经理张涛汇报；与技术部同事交流密切',
      bottleneckImpact: 'POC测试报告将直接影响技术评审结论',
      behaviorPrediction: '会客观评价产品性能，需要在POC阶段充分展现产品优势',
    },
  },
  {
    id: 'p12',
    name: '黄静',
    position: 'HR总监',
    department: '人力资源',
    layer: 'peripheral',
    layerName: '外围影响层',
    stance: 'neutral',
    influence: 1,
    isBottleneck: false,
    dimensions: {
      identityPower: '负责人力资源规划和培训体系',
      businessAppeal: '员工效能提升与人才发展规划',
      personalAppeal: '建立完善的员工发展体系',
      coreValues: '以人为本、组织发展',
      projectStance: '中立，关注新系统对员工的培训成本和接受度',
      relationships: '与各部门负责人保持沟通，了解团队状态',
      bottleneckImpact: '如果提出培训成本过高的顾虑，可能影响决策',
      behaviorPrediction: '重点关注变革管理和人员适应问题，需要准备完善的培训方案',
    },
  },
];

export const edges: Edge[] = [
  { id: 'e1', source: 'p1', target: 'p2', type: 'hierarchy', label: '直接汇报' },
  { id: 'e2', source: 'p1', target: 'p3', type: 'hierarchy', label: '间接管理' },
  { id: 'e3', source: 'p1', target: 'p4', type: 'hierarchy', label: '战略协作' },
  { id: 'e4', source: 'p2', target: 'p5', type: 'conflict', label: '预算分歧' },
  { id: 'e5', source: 'p2', target: 'p8', type: 'ally', label: '战略同盟' },
  { id: 'e6', source: 'p3', target: 'p5', type: 'ally', label: '流程同盟' },
  { id: 'e7', source: 'p4', target: 'p5', type: 'balance', label: '技术vs财务' },
  { id: 'e8', source: 'p4', target: 'p6', type: 'hierarchy', label: '直接汇报' },
  { id: 'e9', source: 'p6', target: 'p7', type: 'ally', label: '协作关系' },
  { id: 'e10', source: 'p7', target: 'p8', type: 'hierarchy', label: '直接汇报' },
  { id: 'e11', source: 'p3', target: 'p9', type: 'hierarchy', label: '直接管理' },
  { id: 'e12', source: 'p4', target: 'p11', type: 'hierarchy', label: '技术管理' },
  { id: 'e13', source: 'p6', target: 'p11', type: 'ally', label: '技术协作' },
  { id: 'e14', source: 'p2', target: 'p4', type: 'ally', label: '战略一致' },
  { id: 'e15', source: 'p5', target: 'p8', type: 'balance', label: '部门制衡' },
];

export const influenceMatrix: Record<string, Record<string, number>> = {
  p1: { p1: 5, p2: 4, p3: 3, p4: 4, p5: 3, p6: 2, p7: 1, p8: 3, p9: 1, p10: 1, p11: 2, p12: 2 },
  p2: { p1: 4, p2: 4, p3: 2, p4: 4, p5: 2, p6: 3, p7: 2, p8: 4, p9: 1, p10: 2, p11: 2, p12: 2 },
  p3: { p1: 2, p2: 1, p3: 4, p4: 1, p5: 4, p6: 1, p7: 1, p8: 1, p9: 4, p10: 1, p11: 1, p12: 1 },
  p4: { p1: 4, p2: 4, p3: 2, p4: 5, p5: 2, p6: 5, p7: 3, p8: 3, p9: 1, p10: 1, p11: 4, p12: 2 },
  p5: { p1: 3, p2: 2, p3: 4, p4: 2, p5: 4, p6: 2, p7: 2, p8: 2, p9: 3, p10: 1, p11: 1, p12: 3 },
  p6: { p1: 1, p2: 2, p3: 1, p4: 4, p5: 1, p6: 3, p7: 4, p8: 3, p9: 1, p10: 1, p11: 4, p12: 1 },
  p7: { p1: 1, p2: 1, p3: 1, p4: 2, p5: 1, p6: 3, p7: 2, p8: 4, p9: 1, p10: 2, p11: 1, p12: 2 },
  p8: { p1: 2, p2: 3, p3: 1, p4: 3, p5: 2, p6: 3, p7: 4, p8: 3, p9: 1, p10: 2, p11: 2, p12: 3 },
  p9: { p1: 1, p2: 1, p3: 3, p4: 1, p5: 2, p6: 1, p7: 1, p8: 1, p9: 2, p10: 1, p11: 1, p12: 1 },
  p10: { p1: 1, p2: 2, p3: 1, p4: 1, p5: 1, p6: 1, p7: 2, p8: 2, p9: 2, p10: 2, p11: 1, p12: 2 },
  p11: { p1: 1, p2: 1, p3: 1, p4: 3, p5: 1, p6: 4, p7: 2, p8: 2, p9: 1, p10: 1, p11: 2, p12: 1 },
  p12: { p1: 2, p2: 1, p3: 1, p4: 1, p5: 2, p6: 1, p7: 3, p8: 3, p9: 1, p10: 1, p11: 1, p12: 2 },
};

export const attackPath = [
  {
    step: 1,
    personId: 'p10',
    action: '通过行政主管吴芳安排与关键人员的会议，建立初步联系',
    difficulty: '易',
  },
  {
    step: 2,
    personId: 'p6',
    action: '与技术经理张涛深入交流产品功能，争取一线使用层口碑',
    difficulty: '易',
  },
  {
    step: 3,
    personId: 'p4',
    action: '借助张涛的引荐，向CTO王磊做技术方案深度汇报',
    difficulty: '中',
  },
  {
    step: 4,
    personId: 'p2',
    action: '联合王磊的技术认可，向VP李伟强推进商务谈判',
    difficulty: '中',
  },
  {
    step: 5,
    personId: 'p3',
    action: '最后攻克采购总监赵敏，提供充分的差异化价值和灵活商务条件',
    difficulty: '高',
  },
];

export const dimensionLabels: Record<string, string> = {
  identityPower: '身份权责',
  businessAppeal: '业务诉求',
  personalAppeal: '个人诉求',
  coreValues: '核心价值观',
  projectStance: '项目立场',
  relationships: '人际关联',
  bottleneckImpact: '瓶颈影响',
  behaviorPrediction: '行为推演',
};

export const dimensionIcons = [
  'Shield', 'Briefcase', 'Heart', 'Star', 'Flag', 'Users', 'AlertTriangle', 'Brain',
] as const;
