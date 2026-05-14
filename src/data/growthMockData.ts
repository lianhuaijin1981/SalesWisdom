// ============ 8-Dimension Radar Data ============

export const dimensions = [
  '商业认知',
  '客户洞察',
  '项目推进',
  '沟通共情',
  '人际经营',
  '执行落地',
  '情绪心态',
  '学习迭代',
] as const;

export type Dimension = (typeof dimensions)[number];

export interface DimensionScore {
  dimension: Dimension;
  current: number;
  previous: number;
  teamAverage: number;
}

export const dimensionScores: DimensionScore[] = [
  { dimension: '商业认知', current: 7.2, previous: 6.5, teamAverage: 6.8 },
  { dimension: '客户洞察', current: 8.5, previous: 7.8, teamAverage: 7.5 },
  { dimension: '项目推进', current: 7.8, previous: 7.2, teamAverage: 7.4 },
  { dimension: '沟通共情', current: 8.8, previous: 8.2, teamAverage: 7.9 },
  { dimension: '人际经营', current: 6.5, previous: 6.0, teamAverage: 7.1 },
  { dimension: '执行落地', current: 7.0, previous: 6.8, teamAverage: 7.2 },
  { dimension: '情绪心态', current: 8.2, previous: 7.5, teamAverage: 7.6 },
  { dimension: '学习迭代', current: 6.8, previous: 6.2, teamAverage: 7.0 },
];

// Radar chart data (0-10 scale)
export const radarData = dimensions.map((dim) => {
  const score = dimensionScores.find((s) => s.dimension === dim)!;
  return {
    dimension: dim,
    本次测评: score.current,
    上次测评: score.previous,
    团队平均: score.teamAverage,
    fullMark: 10,
  };
});

// Score summary
export const scoreSummary = {
  average: 7.6,
  highest: { dimension: '沟通共情' as Dimension, score: 8.8 },
  lowest: { dimension: '人际经营' as Dimension, score: 6.5 },
  trend: '+0.6',
  overallLevel: 'L3 需求洞察型',
};

// Top strengths and weaknesses
export const topStrengths = dimensionScores
  .sort((a, b) => b.current - a.current)
  .slice(0, 3)
  .map((s) => ({ dimension: s.dimension, score: s.current }));

export const topWeaknesses = dimensionScores
  .sort((a, b) => a.current - b.current)
  .slice(0, 3)
  .map((s) => ({ dimension: s.dimension, score: s.current }));

// ============ 5-Level Thinking Assessment ============

export interface ThinkingLevel {
  level: number;
  name: string;
  description: string;
  keyTraits: string[];
  blindSpots: string[];
  status: 'completed' | 'current' | 'pending';
  width: string;
}

export const thinkingLevels: ThinkingLevel[] = [
  {
    level: 1,
    name: '浅层执行型',
    description: '按照既定流程和话术执行，关注完成任务本身，缺乏对客户深层需求的理解。',
    keyTraits: ['严格执行销售流程', '依赖标准话术', '关注短期成交'],
    blindSpots: ['忽视客户真实需求', '缺乏灵活应变', '难以建立长期关系'],
    status: 'completed',
    width: '55%',
  },
  {
    level: 2,
    name: '问题应对型',
    description: '能够识别客户表面问题并提供解决方案，开始关注客户的显式需求。',
    keyTraits: ['主动发现问题', '提供针对性方案', '具备一定的应变能力'],
    blindSpots: ['停留在表面问题', '缺乏系统性思考', '容易被客户牵着走'],
    status: 'completed',
    width: '65%',
  },
  {
    level: 3,
    name: '需求洞察型',
    description: '能够挖掘客户深层需求和隐性痛点，从业务视角理解客户真实目标。',
    keyTraits: ['洞察隐性需求', '理解业务目标', '建立需求层次'],
    blindSpots: ['视角局限于单个项目', '缺乏全局把控', '战略高度不足'],
    status: 'current',
    width: '75%',
  },
  {
    level: 4,
    name: '全局系统型',
    description: '从客户组织全局出发，系统性地分析决策链、利益格局和长期价值。',
    keyTraits: ['系统性分析', '全局视野', '长期价值导向', '多方利益平衡'],
    blindSpots: ['对行业趋势把握不足', '战略布局能力待提升'],
    status: 'pending',
    width: '85%',
  },
  {
    level: 5,
    name: '布局控局型',
    description: '能够预判市场趋势，主动布局资源，控制销售节奏，实现战略级成交。',
    keyTraits: ['战略预判', '资源整合', '节奏控制', '价值共创'],
    blindSpots: ['—'],
    status: 'pending',
    width: '100%',
  },
];

export const currentLevel = thinkingLevels.find((l) => l.status === 'current')!;

export const nextLevelUpgradePath = {
  currentLevel: 'L3 需求洞察型',
  targetLevel: 'L4 全局系统型',
  requirements: [
    '建立系统性客户分析框架，每月完成1个客户全景分析',
    '练习从组织层面理解客户决策机制',
    '掌握多方利益相关者分析方法',
    '完成至少3个跨部门协调案例复盘',
  ],
  estimatedWeeks: 6,
};

// ============ Weakness Diagnosis ============

export interface ThinkingObstacle {
  id: string;
  name: string;
  severity: 'high' | 'medium' | 'low';
  description: string;
  impact: string;
  solution: string;
  progress: number;
}

export const thinkingObstacles: ThinkingObstacle[] = [
  {
    id: '1',
    name: '线性思维',
    severity: 'high',
    description: '习惯于按固定顺序推进，缺乏并行思考和灵活调整能力',
    impact: '面对复杂销售场景时应变能力弱，容易在突发情况下手足无措',
    solution: '练习多角度思考，使用MECE法则分解问题，每周复盘1个非线性成功案例',
    progress: 35,
  },
  {
    id: '2',
    name: '表象思维',
    severity: 'medium',
    description: '容易被客户表面诉求迷惑，难以挖掘真实深层需求',
    impact: '方案匹配度不高，客户满意度低，复购率下降',
    solution: '使用5WHY追问法，每次客户沟通后做需求层次分析',
    progress: 50,
  },
  {
    id: '3',
    name: '短期思维',
    severity: 'medium',
    description: '过度关注当期业绩，忽视长期客户价值培育',
    impact: '客户生命周期价值低，难以建立可持续的合作关系',
    solution: '建立客户分级长期跟进计划，每月投入20%精力在高潜长期客户',
    progress: 45,
  },
  {
    id: '4',
    name: '局部思维',
    severity: 'low',
    description: '只关注自己负责的范围，对客户整体业务理解不全面',
    impact: '难以与客户高层对话，错失交叉销售和upsell机会',
    solution: '定期研究客户行业报告，绘制客户业务全景图',
    progress: 60,
  },
  {
    id: '5',
    name: '被动思维',
    severity: 'high',
    description: '等待客户提出问题再响应，缺乏主动引导和预判意识',
    impact: '失去销售主动权，被竞争对手抢占先机',
    solution: '建立客户问题预判清单，每次拜访前准备3个前瞻性话题',
    progress: 25,
  },
];

export interface ThinkingTemplate {
  id: string;
  title: string;
  description: string;
  steps: string[];
  category: string;
}

export const thinkingTemplates: ThinkingTemplate[] = [
  {
    id: '1',
    title: '5WHY 需求深挖法',
    description: '通过连续追问5个"为什么"，挖掘客户真实需求',
    steps: ['客户说："我们需要一个更快的系统"', 'WHY1：为什么需要更快？→ 当前效率低', 'WHY2：为什么效率低？→ 流程冗余', 'WHY3：为什么流程冗余？→ 部门协调不畅', 'WHY4：为什么协调不畅？→ 缺乏统一平台', 'WHY5：根因：需要协同办公平台'],
    category: '需求分析',
  },
  {
    id: '2',
    title: '利益相关者地图',
    description: '系统梳理客户组织内的决策链和影响链',
    steps: ['列出所有涉及的人员', '分析每个人的角色（决策/影响/执行）', '评估每个人的支持度', '识别潜在的阻力和支持者', '制定针对性的沟通策略'],
    category: '关系分析',
  },
  {
    id: '3',
    title: 'SWOT 客户分析',
    description: '从客户角度分析其优势、劣势、机会、威胁',
    steps: ['了解客户的业务优势和核心竞争力', '识别客户面临的市场挑战', '分析行业趋势带来的机会', '评估竞争威胁', '将产品价值与客户SWOT对应'],
    category: '策略分析',
  },
  {
    id: '4',
    title: 'ROI 价值量化法',
    description: '将产品价值转化为可量化的投资回报',
    steps: ['明确客户的投入成本', '量化直接收益（效率提升、成本节约）', '量化间接收益（风险降低、品牌提升）', '计算回收周期', '用客户的数据验证'],
    category: '价值呈现',
  },
];

// ============ Case Study Library ============

export type CaseCategory =
  | '预算卡点'
  | '已读不回'
  | '高层不决策'
  | '内部阻力'
  | '客户推辞'
  | '谈判僵局';

export const caseCategories: CaseCategory[] = [
  '预算卡点',
  '已读不回',
  '高层不决策',
  '内部阻力',
  '客户推辞',
  '谈判僵局',
];

export interface CaseStudy {
  id: string;
  title: string;
  category: CaseCategory;
  background: string;
  shallowMistake: string;
  advancedAnalysis: string;
  breakthroughStrategy: string;
  isFavorited: boolean;
  isLearned: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    id: '1',
    title: '客户说"预算不足"的真实含义',
    category: '预算卡点',
    background: '华夏科技采购总监表示明年预算已用完，无法启动新项目',
    shallowMistake: '直接放弃或要求降价，没有深入探究"预算不足"背后的真实原因',
    advancedAnalysis:
      '"预算不足"通常是优先级排序问题。客户愿意为高优先级事项找到预算。需要判断是真的没钱，还是项目ROI没有被充分认知，或者是你的方案没有进入高优先级清单。',
    breakthroughStrategy:
      '1. 询问客户当前预算分配结构 2. 帮助客户计算项目ROI和成本延迟损失 3. 探讨分期付款或从其他预算科目调配的可能性 4. 将项目与客户KPI直接挂钩提升优先级',
    isFavorited: true,
    isLearned: false,
  },
  {
    id: '2',
    title: '微信消息已读不回怎么办',
    category: '已读不回',
    background: '给鼎盛集团李总发了方案后，消息显示已读但48小时未回复',
    shallowMistake: '连续追问"您看了吗""有决定了吗"，给客户造成压力',
    advancedAnalysis:
      '已读不回通常不是拒绝，而是：① 内容太长没有优先级 ② 需要时间评估 ③ 不是当前最紧急事项 ④ 内部需要讨论。追要有策略，不是逼。',
    breakthroughStrategy:
      '1. 发送简短摘要（3行以内）降低阅读成本 2. 提供明确的下一步建议而非开放式询问 3. 48小时后发送价值补充信息 4. 创造线下见面机会重新激活',
    isFavorited: false,
    isLearned: true,
  },
  {
    id: '3',
    title: '技术VP同意但CEO不拍板',
    category: '高层不决策',
    background: '创联科技技术VP王总完全认可方案，但上报CEO后一直没有决策',
    shallowMistake: '反复催促王总去推动CEO，让中间人承担过多压力',
    advancedAnalysis:
      'CEO不决策通常因为：① 信息不充分 ② 风险顾虑 ③ 有更紧急事项 ④ 与王总关注点不同。需要直接触达CEO或提供CEO视角的决策材料。',
    breakthroughStrategy:
      '1. 制作CEO版本的一页决策摘要 2. 了解CEO近期的公开讲话和关注重点 3. 请求王总安排15分钟CEO直接沟通 4. 提供同行业CEO案例作为参考',
    isFavorited: true,
    isLearned: false,
  },
  {
    id: '4',
    title: '客户内部有人反对合作',
    category: '内部阻力',
    background: '博远投资项目推进过程中，客户财务部质疑报价合理性',
    shallowMistake: '直接反驳或绕过反对者，激化内部矛盾',
    advancedAnalysis:
      '内部阻力是B2B销售的常态。反对者的顾虑往往有合理性，将其转化为建设性意见反而能增强方案。关键是理解反对背后的真实动机。',
    breakthroughStrategy:
      '1. 主动邀请反对者参与方案讨论 2. 详细解释报价构成，提供透明化成本分析 3. 寻找双赢点，让反对者成为方案优化贡献者 4. 提供试点方案降低风险感知',
    isFavorited: false,
    isLearned: false,
  },
  {
    id: '5',
    title: '客户总说"我们再考虑考虑"',
    category: '客户推辞',
    background: '智慧教育运营总监刘总多次表示"再考虑考虑"，推进停滞',
    shallowMistake: '接受"考虑"被动等待，或过度施压导致反感',
    advancedAnalysis:
      '"考虑"往往是客户无法清晰表达顾虑的缓冲语。需要创造安全的沟通环境让客户说出真实顾虑，可能是价格、风险、信任或内部政治。',
    breakthroughStrategy:
      '1. 直接但礼貌地询问具体顾虑点 2. 提供对比分析帮助客户做决策 3. 设定合理的决策时间节点 4. 提供试用或小范围验证降低决策风险',
    isFavorited: true,
    isLearned: true,
  },
  {
    id: '6',
    title: '谈判陷入价格僵局',
    category: '谈判僵局',
    background: '与瑞康医疗采购谈判中，双方在价格上僵持不下，差距20%',
    shallowMistake: '直接降价或僵持不下，损害利润或失去客户',
    advancedAnalysis:
      '价格僵局的本质通常是价值感知不对等。客户认为不值得，或你的价值没有被充分认知。也可能对方只是测试你的底价。',
    breakthroughStrategy:
      '1. 回到价值重新定义讨论框架 2. 拆解价格和价值组成部分 3. 提供不同配置方案创造选择空间 4. 引入非价格交换条件（服务、账期、附加模块）',
    isFavorited: false,
    isLearned: false,
  },
];

// ============ Deliberate Practice Tasks ============

export type TaskStatus = 'pending' | 'completed' | 'overdue';

export interface PracticeTask {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  category: string;
  status: TaskStatus;
  dueDate: string;
}

export const practiceTasks: PracticeTask[] = [
  {
    id: '1',
    title: '模拟客户需求挖掘对话',
    description: '使用AI对话模拟器练习需求挖掘技巧，完成3轮对话',
    estimatedTime: '30分钟',
    category: '客户洞察',
    status: 'pending',
    dueDate: '今天',
  },
  {
    id: '2',
    title: '阅读《SPIN销售法》第1-3章',
    description: '学习SPIN提问法，记录3个可在下次拜访中使用的问题',
    estimatedTime: '45分钟',
    category: '商业认知',
    status: 'completed',
    dueDate: '今天',
  },
  {
    id: '3',
    title: '完成异议处理场景测试',
    description: '针对5个常见客户异议进行应对练习并获得反馈',
    estimatedTime: '20分钟',
    category: '沟通共情',
    status: 'pending',
    dueDate: '明天',
  },
  {
    id: '4',
    title: '复盘上周华夏科技项目推进',
    description: '使用项目复盘模板，分析成功点和可改进之处',
    estimatedTime: '25分钟',
    category: '项目推进',
    status: 'overdue',
    dueDate: '昨天',
  },
  {
    id: '5',
    title: '练习情绪管理：压力场景模拟',
    description: '通过AI模拟高压客户场景，练习保持冷静和专业',
    estimatedTime: '15分钟',
    category: '情绪心态',
    status: 'pending',
    dueDate: '本周',
  },
  {
    id: '6',
    title: '更新3个关键客户的关系图谱',
    description: '完善客户组织内的决策链和关系网络信息',
    estimatedTime: '30分钟',
    category: '人际经营',
    status: 'completed',
    dueDate: '本周',
  },
  {
    id: '7',
    title: '学习行业报告：金融科技2024趋势',
    description: '阅读行业趋势报告，提炼3个与客户相关的洞察',
    estimatedTime: '40分钟',
    category: '学习迭代',
    status: 'pending',
    dueDate: '本周',
  },
  {
    id: '8',
    title: '执行落地：完成本周跟进计划',
    description: '确保所有计划内的客户跟进任务按时完成',
    estimatedTime: '60分钟',
    category: '执行落地',
    status: 'overdue',
    dueDate: '昨天',
  },
  {
    id: '9',
    title: '沟通共情练习：倾听反馈',
    description: '录制自己的客户沟通音频，分析倾听和共情的表现',
    estimatedTime: '25分钟',
    category: '沟通共情',
    status: 'pending',
    dueDate: '明天',
  },
  {
    id: '10',
    title: '商业认知：竞品分析练习',
    description: '分析2个主要竞争对手的方案优劣势，准备应对话术',
    estimatedTime: '35分钟',
    category: '商业认知',
    status: 'completed',
    dueDate: '本周',
  },
];

// ============ Right Panel Data ============

export const growthOverview = {
  currentLevel: 'L3 需求洞察型',
  averageScore: 7.6,
  completedTasks: 3,
  totalTasks: 10,
  weeklyGrowthTrend: [6.8, 7.0, 7.2, 7.3, 7.5, 7.6],
  strongestDimension: '沟通共情',
  weakestDimension: '人际经营',
};
