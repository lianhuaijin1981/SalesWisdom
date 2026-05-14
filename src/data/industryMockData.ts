// Industry Mock Data - 智能制造 (Smart Manufacturing)

export interface IndustryOption {
  value: string;
  label: string;
}

export const industryOptions: IndustryOption[] = [
  { value: 'all', label: '全部行业' },
  { value: 'internet', label: '互联网科技' },
  { value: 'finance', label: '金融服务' },
  { value: 'smart-manufacturing', label: '智能制造' },
  { value: 'healthcare', label: '医疗健康' },
  { value: 'education', label: '教育培训' },
  { value: 'retail', label: '零售消费' },
  { value: 'realestate', label: '房地产' },
  { value: 'energy', label: '能源环保' },
];

// Tab 1: 行业洞察 - Trend data
export interface TrendDataPoint {
  year: string;
  marketSize: number;
  growthRate: number;
  industryAvg: number;
}

export const trendData: TrendDataPoint[] = [
  { year: '2020', marketSize: 1.8, growthRate: 8.5, industryAvg: 6.2 },
  { year: '2021', marketSize: 2.1, growthRate: 16.7, industryAvg: 9.1 },
  { year: '2022', marketSize: 2.5, growthRate: 19.0, industryAvg: 10.5 },
  { year: '2023', marketSize: 2.9, growthRate: 16.0, industryAvg: 11.2 },
  { year: '2024', marketSize: 3.2, growthRate: 10.3, industryAvg: 9.8 },
];

// Tab 1: 行业洞察 - Policy data
export interface PolicyItem {
  id: string;
  title: string;
  source: string;
  date: string;
  impact: 'positive' | 'negative' | 'neutral';
  impactLabel: string;
  summary: string;
}

export const policyData: PolicyItem[] = [
  {
    id: '1',
    title: '《智能制造发展规划(2024-2028)》发布',
    source: '工信部',
    date: '2024-03-15',
    impact: 'positive',
    impactLabel: '利好',
    summary: '明确提出到2028年智能制造装备产业规模突破5万亿元，推动行业进入黄金发展期',
  },
  {
    id: '2',
    title: '工业数据安全管理办法正式实施',
    source: '网信办',
    date: '2024-06-01',
    impact: 'positive',
    impactLabel: '利好',
    summary: '规范工业数据采集、存储和传输，利好工业互联网安全解决方案提供商',
  },
  {
    id: '3',
    title: '制造业增值税加计抵减政策延续',
    source: '财政部',
    date: '2024-01-20',
    impact: 'positive',
    impactLabel: '利好',
    summary: '先进制造业企业增值税加计抵减5%政策延续至2027年底，降低企业税负',
  },
  {
    id: '4',
    title: '环保排放标准再次提高',
    source: '生态环境部',
    date: '2024-05-10',
    impact: 'neutral',
    impactLabel: '中性',
    summary: '新增10项工业污染物排放标准，部分中小企业面临产线升级压力',
  },
  {
    id: '5',
    title: '进口替代清单扩大，核心零部件国产化加速',
    source: '发改委',
    date: '2024-02-28',
    impact: 'positive',
    impactLabel: '利好',
    summary: '新增50项关键工业零部件进口替代清单，国产供应商迎来巨大机遇',
  },
];

// Tab 1: 行业洞察 - Competitor data
export interface CompetitorItem {
  name: string;
  marketShare: number;
  coreProduct: string;
  advantage: string;
  disadvantage: string;
}

export const competitorData: CompetitorItem[] = [
  { name: '华为智能制造', marketShare: 22, coreProduct: '工业互联网平台', advantage: '技术生态完整', disadvantage: '价格较高' },
  { name: '西门子中国', marketShare: 18, coreProduct: '数字化工厂方案', advantage: '品牌知名度高', disadvantage: '本地化不足' },
  { name: '海尔COSMO', marketShare: 15, coreProduct: '大规模定制平台', advantage: '模式创新', disadvantage: '适用范围有限' },
  { name: '用友精智', marketShare: 12, coreProduct: '工业云平台', advantage: '客户基础好', disadvantage: '技术深度不足' },
  { name: '其他厂商', marketShare: 33, coreProduct: '分散', advantage: '灵活', disadvantage: '规模小' },
];

// Tab 1: 行业洞察 - Pain points
export interface PainPoint {
  label: string;
  count: number;
  severity: 'high' | 'medium' | 'low';
}

export const painPointsData: PainPoint[] = [
  { label: '数据孤岛严重', count: 89, severity: 'high' },
  { label: '设备互联互通难', count: 76, severity: 'high' },
  { label: '技术人才短缺', count: 72, severity: 'high' },
  { label: '投资回报周期长', count: 68, severity: 'high' },
  { label: '系统集成复杂', count: 65, severity: 'medium' },
  { label: '安全风险担忧', count: 58, severity: 'medium' },
  { label: '供应商选型困难', count: 54, severity: 'medium' },
  { label: '组织架构不匹配', count: 48, severity: 'medium' },
  { label: '标准体系不完善', count: 42, severity: 'low' },
  { label: '管理层认知不足', count: 38, severity: 'low' },
];

// Tab 1: 行业洞察 - Opportunities
export interface Opportunity {
  id: number;
  title: string;
  description: string;
  impactScore: number;
  timeline: string;
}

export const opportunitiesData: Opportunity[] = [
  {
    id: 1,
    title: 'AI+质检场景快速落地',
    description: '视觉质检准确率已达99.5%，替代人工质检ROI周期缩短至8个月',
    impactScore: 95,
    timeline: '6-12个月',
  },
  {
    id: 2,
    title: '预测性维护市场爆发',
    description: '设备故障预测准确率提升至85%，可降低30%非计划停机损失',
    impactScore: 88,
    timeline: '3-6个月',
  },
  {
    id: 3,
    title: '数字孪生工厂建设加速',
    description: '头部企业开始全面部署数字孪生，虚拟调试效率提升40%',
    impactScore: 82,
    timeline: '12-24个月',
  },
  {
    id: 4,
    title: '柔性制造需求激增',
    description: '小批量多批次生产模式普及，柔性产线改造需求年增35%',
    impactScore: 78,
    timeline: '6-18个月',
  },
  {
    id: 5,
    title: '绿色制造政策驱动',
    description: '碳中和目标推动能耗监控和优化系统需求快速增长',
    impactScore: 72,
    timeline: '12-36个月',
  },
];

// Tab 2: 企业经营分析 - Radar chart data
export interface RadarDimension {
  dimension: string;
  score: number;
  industryAvg: number;
  status: '达标' | '警告' | '风险';
}

export const enterpriseRadarData: RadarDimension[] = [
  { dimension: '营收能力', score: 82, industryAvg: 70, status: '达标' },
  { dimension: '市场份额', score: 68, industryAvg: 65, status: '警告' },
  { dimension: '技术优势', score: 75, industryAvg: 68, status: '达标' },
  { dimension: '渠道覆盖', score: 71, industryAvg: 72, status: '警告' },
  { dimension: '品牌影响力', score: 79, industryAvg: 75, status: '达标' },
  { dimension: '组织效能', score: 65, industryAvg: 62, status: '警告' },
];

export const radarChartData = enterpriseRadarData.map((d) => ({
  dimension: d.dimension,
  企业得分: d.score,
  行业平均: d.industryAvg,
}));

// Diagnosis report
export interface DiagnosisReport {
  summary: string;
  strengths: string[];
  weaknesses: string[];
  internalPressures: string[];
  externalPressures: string[];
  shortTermGoals: { goal: string; completed: boolean }[];
}

export const diagnosisReport: DiagnosisReport = {
  summary:
    '该企业整体运营状况良好，营收能力和品牌影响力处于行业中上游水平。技术研发投入持续增加，但市场份额和组织效能仍有提升空间。在数字化转型趋势下，企业需加快技术商业化速度，同时优化内部管理流程以支撑业务扩张。',
  strengths: [
    '财务状况稳健，连续3年保持15%+营收增长',
    '技术研发投入占营收比重达12%，高于行业平均8%',
    '核心产品市场认可度高，客户续约率达92%',
    '品牌知名度在细分领域排名前三',
  ],
  weaknesses: [
    '市场份额在部分区域被竞争对手侵蚀',
    '组织效能偏低，跨部门协作效率待提升',
    '创新成果转化周期较长，平均14个月',
    '高端技术人才流失率偏高，达12%',
  ],
  internalPressures: [
    '产能利用率波动大，季度间差异达20%',
    '新产品研发投入回报周期延长',
    '内部数据系统尚未完全打通',
    '绩效考核体系与战略目标匹配度不足',
  ],
  externalPressures: [
    '主要竞争对手加大价格战力度',
    '上游原材料成本上涨15-20%',
    '客户对产品交付周期要求缩短30%',
    '行业监管政策趋严，合规成本上升',
  ],
  shortTermGoals: [
    { goal: '完成ERP系统升级上线', completed: true },
    { goal: 'Q4市场份额提升2个百分点', completed: false },
    { goal: '发布新一代智能产线产品', completed: true },
    { goal: '建立华东区域服务中心', completed: false },
    { goal: '核心人才流失率降至8%以下', completed: false },
  ],
};

// Tab 3: 战略诉求
export type StrategyType = '扩张型' | '稳健型' | '转型型' | '收缩型';

export interface StrategicNeed {
  id: string;
  name: string;
  urgency: number;
  importance: number;
  category: string;
  budget: number;
  description: string;
  timeline: string;
}

export const strategyInfo = {
  type: '扩张型' as StrategyType,
  matchScore: 7.5,
  description: '企业正处于快速扩张期，重点关注市场拓展和产能提升',
};

export const strategyTypeConfig: Record<StrategyType, { color: string; bg: string }> = {
  扩张型: { color: '#1E40AF', bg: '#DBEAFE' },
  稳健型: { color: '#10B981', bg: '#D1FAE5' },
  转型型: { color: '#F59E0B', bg: '#FEF3C7' },
  收缩型: { color: '#EF4444', bg: '#FEE2E2' },
};

export const strategicNeeds: StrategicNeed[] = [
  { id: '1', name: '智能工厂整体升级', urgency: 90, importance: 95, category: '数字化', budget: 500, description: '建设全链路数字化智能工厂，实现生产全流程可视化', timeline: '12-18个月' },
  { id: '2', name: 'CRM系统升级', urgency: 85, importance: 88, category: '营销', budget: 120, description: '替换现有CRM，实现销售全流程数字化管理', timeline: '3-6个月' },
  { id: '3', name: '数据中台建设', urgency: 80, importance: 90, category: '数据', budget: 300, description: '打通各业务系统数据，构建统一数据中台', timeline: '6-12个月' },
  { id: '4', name: '人才培养体系', urgency: 60, importance: 85, category: '人力', budget: 80, description: '建立内部培训和人才梯队建设体系', timeline: '12-24个月' },
  { id: '5', name: 'IT安全加固', urgency: 75, importance: 70, category: '安全', budget: 50, description: '提升工业网络安全防护能力，满足等保2.0要求', timeline: '3-6个月' },
  { id: '6', name: '办公环境改造', urgency: 30, importance: 40, category: '行政', budget: 30, description: '升级研发中心办公环境，提升员工满意度', timeline: '6-12个月' },
];

export const strategicTimeline = [
  { phase: '短期(0-6月)', goals: ['CRM系统升级', 'IT安全加固', '产能扩充20%'] },
  { phase: '中期(6-12月)', goals: ['数据中台一期', '华东市场拓展', '新产品发布'] },
  { phase: '长期(12-24月)', goals: ['智能工厂完工', '人才培养体系', 'IPO准备'] },
];

export const cooperationValues = [
  '预计未来12个月IT投入预算达¥950万，采购意愿强烈',
  '决策链路清晰，技术部门具有核心话语权',
  '对供应商技术实力和长期服务能力要求高',
  '偏好与行业头部供应商建立战略合作关系',
  '项目交付质量是关键决策因素，价格敏感度中等',
];

export const coreConclusions = [
  { title: '最佳切入点', content: '智能工厂升级项目预算最大(¥500万)，且与核心竞争力高度匹配，建议作为首要突破点' },
  { title: '关键决策者', content: 'CTO张明主导技术选型，CEO李强最终拍板，需双线并行推进关系' },
  { title: '竞争优势', content: '我司在智能产线领域案例丰富，技术匹配度高，战略匹配度评分7.5/10' },
];

// Tab 4: 行业知识库
export interface KnowledgeTemplate {
  id: string;
  name: string;
  industry: string;
  fields: { label: string; value: string }[];
  isDefault?: boolean;
}

export const knowledgeTemplates: KnowledgeTemplate[] = [
  {
    id: '1',
    name: '智能制造行业模板',
    industry: '智能制造',
    isDefault: true,
    fields: [
      { label: '行业定义与范围', value: '智能制造是指基于新一代信息技术，贯穿设计、生产、管理、服务等制造活动各个环节，具有自感知、自决策、自执行、自适应、自学习等特征的先进制造过程、系统与模式。' },
      { label: '市场规模与增速', value: '2024年中国智能制造市场规模达3.2万亿元，同比增长10.3%，预计未来5年CAGR保持12%以上。' },
      { label: '核心技术与趋势', value: '工业互联网、数字孪生、AI质检、预测性维护、柔性制造是当前五大核心技术方向。' },
      { label: '关键政策环境', value: '《智能制造发展规划(2024-2028)》、增值税加计抵减、进口替代清单等政策利好行业发展。' },
      { label: '主要竞争格局', value: '华为、西门子、海尔、用友等头部企业占据67%市场份额，其余为垂直领域专业厂商。' },
      { label: '典型客户需求', value: '降本增效(35%)、质量提升(28%)、柔性生产(22%)、绿色制造(15%)是四大核心诉求。' },
      { label: '采购决策特点', value: '决策周期6-12个月，技术评估占比40%，商务条款占比30%，服务配套占比30%。' },
      { label: '常见销售障碍', value: '投资回报周期长、技术人才短缺、数据安全担忧、系统集成复杂是四大主要障碍。' },
    ],
  },
  {
    id: '2',
    name: '互联网科技行业模板',
    industry: '互联网科技',
    fields: [
      { label: '行业定义与范围', value: '涵盖云计算、大数据、人工智能、SaaS服务等技术驱动的互联网产业。' },
      { label: '市场规模与增速', value: '2024年中国云计算市场规模达5,500亿元，同比增长35%。' },
      { label: '核心技术与趋势', value: '云原生、AIGC、边缘计算、低代码平台是四大技术热点。' },
      { label: '关键政策环境', value: '数据安全法、个人信息保护法对行业合规提出更高要求。' },
      { label: '主要竞争格局', value: '阿里云、腾讯云、华为云三家占据公有云市场70%份额。' },
      { label: '典型客户需求', value: '业务上云(40%)、数据治理(25%)、AI应用(20%)、安全合规(15%)。' },
      { label: '采购决策特点', value: '技术团队主导选型，POC验证是必要环节，价格敏感度较高。' },
      { label: '常见销售障碍', value: '厂商锁定担忧、迁移成本高、定制化需求多、技术债负担重。' },
    ],
  },
  {
    id: '3',
    name: '金融服务行业模板',
    industry: '金融服务',
    fields: [
      { label: '行业定义与范围', value: '涵盖银行、保险、证券、基金等持牌金融机构及金融科技公司。' },
      { label: '市场规模与增速', value: '金融科技投入达3,800亿元，其中IT基础设施占比45%。' },
      { label: '核心技术与趋势', value: '分布式核心系统、智能风控、数字人民币、隐私计算是四大方向。' },
      { label: '关键政策环境', value: '金融监管趋严，数据安全和个人信息保护要求大幅提高。' },
      { label: '主要竞争格局', value: '金融IT市场由恒生电子、宇信科技、长亮科技等头部厂商主导。' },
      { label: '典型客户需求', value: '系统稳定性(35%)、合规性(30%)、智能化(20%)、用户体验(15%)。' },
      { label: '采购决策特点', value: '严格的招投标流程，安全合规是准入门槛，决策周期长达12-18个月。' },
      { label: '常见销售障碍', value: '合规审批流程长、存量系统替换风险高、预算审批严格。' },
    ],
  },
];

// Right panel summary
export const industryRightPanel = {
  title: '智能制造行业速览',
  conclusions: [
    { label: '行业增长率', value: '12.8%', trend: '↑ +2.3% YoY' },
    { label: '市场规模', value: '¥3.2万亿', trend: '↑ +15% YoY' },
    { label: '平均客单价', value: '¥85万', trend: '↑ +5%' },
    { label: '竞争强度', value: '中等', trend: '→ 持平' },
  ],
  insights: [
    '智能制造行业正处于黄金发展期，政策利好持续释放',
    '客户数字化转型意愿强烈，IT预算年增15%以上',
    '建议重点关注智能工厂和数据中台两个高预算项目',
    '客户对供应商技术实力和长期服务能力要求较高',
  ],
  suggestions: [
    '以智能工厂升级项目为切入点展开沟通',
    '准备同行业标杆案例作为技术能力证明',
    '关注《智能制造发展规划》政策动态，作为话题切入点',
    '建议安排技术专家团队进行POC演示',
  ],
};
