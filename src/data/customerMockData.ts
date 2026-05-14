// Customer Mock Data - 4 Business Personas

export interface CustomerProfile {
  id: string;
  name: string;
  company: string;
  position: string;
  department: string;
  avatar: string;
  isDefault?: boolean;
}

export const customerProfiles: CustomerProfile[] = [
  { id: '1', name: '张明德', company: '华夏科技有限公司', position: 'CEO', department: '总经办', isDefault: true, avatar: '张' },
  { id: '2', name: '王志强', company: '华东重工集团', position: 'CTO', department: '技术部', avatar: '王' },
  { id: '3', name: '李雪梅', company: '盛世能源股份', position: '采购总监', department: '采购部', avatar: '李' },
  { id: '4', name: '陈建华', company: '东海制造集团', position: '生产副总', department: '生产部', avatar: '陈' },
];

// Tab 1: 职位业务诉求
export interface PositionInfo {
  customerId: string;
  name: string;
  position: string;
  company: string;
  department: string;
  tenure: string;
  span: string;
  reportsTo: string;
  background: string;
  decisionPower: number;
  decisionSegments: { label: string; active: boolean }[];
  influenceFactors: { label: string; score: number }[];
  kpis: { label: string; target: string; current: string; progress: number }[];
  departmentPains: string[];
  orgConstraints: { label: string; value: string }[];
  careerTrajectory: { year: string; title: string; highlight?: string }[];
}

export const positionDataMap: Record<string, PositionInfo> = {
  '1': {
    customerId: '1',
    name: '张明德',
    position: 'CEO',
    company: '华夏科技有限公司',
    department: '总经办',
    tenure: '6年',
    span: '200+人',
    reportsTo: '董事会',
    background: '技术出身→管理',
    decisionPower: 85,
    decisionSegments: [
      { label: '建议权', active: true },
      { label: '影响权', active: true },
      { label: '决策权', active: true },
    ],
    influenceFactors: [
      { label: '职位层级', score: 95 },
      { label: '任职年限', score: 90 },
      { label: '汇报层级', score: 100 },
      { label: '专业背景', score: 80 },
    ],
    kpis: [
      { label: '年度营收增长', target: '20%', current: '18%', progress: 90 },
      { label: '净利润率', target: '15%', current: '13.5%', progress: 90 },
      { label: '新产品收入占比', target: '30%', current: '25%', progress: 83 },
      { label: '客户续约率', target: '95%', current: '92%', progress: 97 },
      { label: '人效提升', target: '10%', current: '8%', progress: 80 },
    ],
    departmentPains: [
      '各部门数据孤岛严重，决策缺乏实时数据支撑',
      '跨部门协作效率低，项目推进周期过长',
      '技术人才招聘困难，核心岗位空缺率高',
      '现有IT系统老化，维护成本逐年攀升',
      '市场竞争加剧，客户对交付速度要求越来越高',
    ],
    orgConstraints: [
      { label: '年度IT预算', value: '¥950万（已用65%）' },
      { label: '采购审批流程', value: '技术评估→财务审核→CEO审批' },
      { label: '项目决策周期', value: '2-3个月' },
      { label: '供应商准入要求', value: '行业案例≥3个，注册资本≥5000万' },
    ],
    careerTrajectory: [
      { year: '2012', title: '技术工程师', highlight: '加入华夏科技' },
      { year: '2015', title: '技术主管' },
      { year: '2017', title: '技术总监', highlight: '主导核心系统架构升级' },
      { year: '2019', title: 'CTO' },
      { year: '2022', title: 'CEO', highlight: '全面负责公司运营管理' },
    ],
  },
  '2': {
    customerId: '2',
    name: '王志强',
    position: 'CTO',
    company: '华东重工集团',
    department: '技术部',
    tenure: '8年',
    span: '120人',
    reportsTo: 'CEO',
    background: '纯技术路线',
    decisionPower: 78,
    decisionSegments: [
      { label: '建议权', active: true },
      { label: '影响权', active: true },
      { label: '决策权', active: false },
    ],
    influenceFactors: [
      { label: '职位层级', score: 85 },
      { label: '任职年限', score: 95 },
      { label: '汇报层级', score: 80 },
      { label: '专业背景', score: 98 },
    ],
    kpis: [
      { label: '系统可用性', target: '99.9%', current: '99.7%', progress: 99.8 },
      { label: '项目按时交付率', target: '90%', current: '82%', progress: 91 },
      { label: '技术创新指标', target: '6项/年', current: '4项', progress: 67 },
      { label: 'IT成本控制', target: '-5%', current: '-2%', progress: 40 },
      { label: '团队人效', target: '提升15%', current: '提升10%', progress: 67 },
    ],
    departmentPains: [
      '老旧系统技术债累积，重构压力大',
      '技术团队加班频繁，人员流失率偏高',
      '业务部门需求变更频繁，项目范围难控制',
      '新技术选型缺乏评估标准，决策困难',
      '技术文档缺失严重，知识传承困难',
    ],
    orgConstraints: [
      { label: '年度IT预算', value: '¥1,200万（已用70%）' },
      { label: '采购审批流程', value: '技术评估→CTO审批→财务审核→CEO签批' },
      { label: '项目决策周期', value: '1-2个月（技术类）' },
      { label: '供应商准入要求', value: '技术认证+安全评估+案例考察' },
    ],
    careerTrajectory: [
      { year: '2010', title: '软件工程师', highlight: '加入华东重工' },
      { year: '2013', title: '高级开发工程师' },
      { year: '2015', title: '架构师', highlight: '主导核心平台重构' },
      { year: '2018', title: '技术总监' },
      { year: '2020', title: 'CTO', highlight: '全面负责集团技术战略' },
    ],
  },
  '3': {
    customerId: '3',
    name: '李雪梅',
    position: '采购总监',
    company: '盛世能源股份',
    department: '采购部',
    tenure: '5年',
    span: '35人',
    reportsTo: 'CFO',
    background: '商务出身',
    decisionPower: 65,
    decisionSegments: [
      { label: '建议权', active: true },
      { label: '影响权', active: true },
      { label: '决策权', active: false },
    ],
    influenceFactors: [
      { label: '职位层级', score: 75 },
      { label: '任职年限', score: 80 },
      { label: '汇报层级', score: 70 },
      { label: '专业背景', score: 85 },
    ],
    kpis: [
      { label: '采购成本降幅', target: '-8%', current: '-5%', progress: 62 },
      { label: '供应商准时交付率', target: '95%', current: '91%', progress: 96 },
      { label: '采购流程效率', target: '缩短20%', current: '缩短12%', progress: 60 },
      { label: '合规采购占比', target: '100%', current: '98%', progress: 98 },
      { label: '供应商满意度', target: '85分', current: '80分', progress: 94 },
    ],
    departmentPains: [
      '供应商数量多，管理难度大',
      '采购流程繁琐，审批节点过多',
      '价格谈判空间越来越小',
      '供应商交付质量不稳定',
      '合规要求越来越严格，审计压力大',
    ],
    orgConstraints: [
      { label: '年度采购预算', value: '¥5,000万（已用55%）' },
      { label: '采购审批权限', value: '≤50万自主决策，>50万需CFO审批' },
      { label: '供应商引入流程', value: '资质审核→样品测试→商务谈判→合同签署' },
      { label: '招投标要求', value: '≥200万必须公开招标' },
    ],
    careerTrajectory: [
      { year: '2014', title: '采购专员', highlight: '加入盛世能源' },
      { year: '2016', title: '采购主管' },
      { year: '2018', title: '采购经理', highlight: '主导供应商体系重组' },
      { year: '2021', title: '采购总监' },
    ],
  },
  '4': {
    customerId: '4',
    name: '陈建华',
    position: '生产副总',
    company: '东海制造集团',
    department: '生产部',
    tenure: '12年',
    span: '800+人',
    reportsTo: '总经理',
    background: '生产管理出身',
    decisionPower: 72,
    decisionSegments: [
      { label: '建议权', active: true },
      { label: '影响权', active: true },
      { label: '决策权', active: false },
    ],
    influenceFactors: [
      { label: '职位层级', score: 88 },
      { label: '任职年限', score: 98 },
      { label: '汇报层级', score: 85 },
      { label: '专业背景', score: 75 },
    ],
    kpis: [
      { label: '产能达成率', target: '100%', current: '95%', progress: 95 },
      { label: '良品率', target: '99.5%', current: '99.2%', progress: 99.7 },
      { label: '交付准时率', target: '98%', current: '95%', progress: 97 },
      { label: '单位能耗降低', target: '-10%', current: '-7%', progress: 70 },
      { label: '安全生产事故', target: '0起', current: '1起', progress: 0 },
    ],
    departmentPains: [
      '产线设备老化，故障率逐年上升',
      '订单波动大，产能规划困难',
      '一线工人流失率高，招工困难',
      '生产数据采集不及时，排产靠经验',
      '质量追溯体系不完善，客诉处理慢',
    ],
    orgConstraints: [
      { label: '年度设备预算', value: '¥2,000万（已用60%）' },
      { label: '设备采购审批', value: '生产部申请→总经理审批→董事会(>500万)' },
      { label: '项目决策周期', value: '2-4个月' },
      { label: '供应商合作要求', value: '本地化服务团队，24小时响应' },
    ],
    careerTrajectory: [
      { year: '2008', title: '车间主任', highlight: '加入东海制造' },
      { year: '2012', title: '生产经理' },
      { year: '2015', title: '生产总监', highlight: '主导精益生产改革' },
      { year: '2018', title: '生产副总', highlight: '全面负责生产制造' },
    ],
  },
};

// Tab 2: 个人性格特质
export interface PersonalityData {
  customerId: string;
  dimensions: { label: string; score: number }[];
  tags: { label: string; type: 'primary' | 'secondary' | 'warning' }[];
  communicationStyle: string;
  riskTolerance: number;
  description: string;
  communicationPreferences: {
    preferredChannel: string;
    bestTime: string;
    infoPreference: string;
    decisionStyle: string;
  };
}

export const personalityDataMap: Record<string, PersonalityData> = {
  '1': {
    customerId: '1',
    dimensions: [
      { label: '开放性', score: 72 },
      { label: '尽责性', score: 88 },
      { label: '外向性', score: 65 },
      { label: '宜人性', score: 70 },
      { label: '情绪稳定性', score: 82 },
    ],
    tags: [
      { label: '务实理性', type: 'primary' },
      { label: '数据驱动', type: 'primary' },
      { label: '稳健保守', type: 'secondary' },
      { label: '完美主义', type: 'secondary' },
    ],
    communicationStyle: '结果导向型，偏好数据支撑的论证方式',
    riskTolerance: 45,
    description: '张明德是一位务实理性的决策者，注重数据分析和事实依据。他性格稳健，决策谨慎但执行力强。在沟通中偏好简洁有力的表达，对细节有较高要求。',
    communicationPreferences: {
      preferredChannel: '面对面会议',
      bestTime: '上午 9:00-11:00',
      infoPreference: '数据图表+案例分析',
      decisionStyle: '数据驱动型',
    },
  },
  '2': {
    customerId: '2',
    dimensions: [
      { label: '开放性', score: 85 },
      { label: '尽责性', score: 92 },
      { label: '外向性', score: 55 },
      { label: '宜人性', score: 60 },
      { label: '情绪稳定性', score: 78 },
    ],
    tags: [
      { label: '完美主义', type: 'primary' },
      { label: '技术极客', type: 'primary' },
      { label: '务实理性', type: 'secondary' },
      { label: '激进开拓', type: 'secondary' },
    ],
    communicationStyle: '技术型，偏好深度技术交流，关注实现细节',
    riskTolerance: 65,
    description: '王志强是典型的技术专家型性格，对技术细节有极高的追求。他开放性强，愿意尝试新技术，但在产品选型上极其严格。沟通中需要充分展示技术深度。',
    communicationPreferences: {
      preferredChannel: '技术演示+文档',
      bestTime: '下午 14:00-17:00',
      infoPreference: '技术白皮书+架构图',
      decisionStyle: '技术评估型',
    },
  },
  '3': {
    customerId: '3',
    dimensions: [
      { label: '开放性', score: 58 },
      { label: '尽责性', score: 82 },
      { label: '外向性', score: 75 },
      { label: '宜人性', score: 85 },
      { label: '情绪稳定性', score: 70 },
    ],
    tags: [
      { label: '人情世故', type: 'primary' },
      { label: '稳健保守', type: 'primary' },
      { label: '务实理性', type: 'secondary' },
      { label: '宜人性强', type: 'secondary' },
    ],
    communicationStyle: '关系导向型，重视人情往来和信任建立',
    riskTolerance: 35,
    description: '李雪梅是一位人情练达的商务型决策者，非常重视与供应商的关系维护。她性格温和，但在商务谈判中非常精明。建立个人信任是合作的关键前提。',
    communicationPreferences: {
      preferredChannel: '商务宴请+微信',
      bestTime: '下午 15:00-17:00',
      infoPreference: '商务方案+报价对比',
      decisionStyle: '综合评估型',
    },
  },
  '4': {
    customerId: '4',
    dimensions: [
      { label: '开放性', score: 48 },
      { label: '尽责性', score: 90 },
      { label: '外向性', score: 60 },
      { label: '宜人性', score: 72 },
      { label: '情绪稳定性', score: 88 },
    ],
    tags: [
      { label: '稳健保守', type: 'primary' },
      { label: '务实理性', type: 'primary' },
      { label: '完美主义', type: 'secondary' },
      { label: '经验导向', type: 'secondary' },
    ],
    communicationStyle: '经验型，偏好同行推荐和实地案例考察',
    riskTolerance: 25,
    description: '陈建华是一位经验丰富的实干家，做事稳重可靠。他对新事物接受度较低，更倾向于选择经过验证的方案。同行推荐和实地考察是打动他的关键方式。',
    communicationPreferences: {
      preferredChannel: '工厂实地拜访',
      bestTime: '上午 8:30-10:30',
      infoPreference: '同行案例+现场演示',
      decisionStyle: '经验验证型',
    },
  },
};

// Tab 3: 底层价值观
export interface CoreValuesData {
  customerId: string;
  values: { label: string; score: number; evidence: string[]; implication: string }[];
  tradeOffs: { dimension: string; left: string; right: string; bias: number }[];
  cooperationType: string;
  wordCloud: { word: string; size: 'xl' | 'lg' | 'md' | 'sm' }[];
}

export const coreValuesDataMap: Record<string, CoreValuesData> = {
  '1': {
    customerId: '1',
    values: [
      {
        label: '结果导向',
        score: 92,
        evidence: ['强调KPI达成，季度Review严格对标目标', '对无成果的过程投入容忍度低', '选择供应商首要看ROI数据'],
        implication: '沟通时务必量化价值，用数据和结果说话',
      },
      {
        label: '长期价值',
        score: 85,
        evidence: ['倾向于建立长期战略合作关系', '关注供应商的技术路线和长期发展', '合同倾向签3年框架而非1年'],
        implication: '展示公司长期发展愿景，强调合作的长远价值',
      },
      {
        label: '过程合规',
        score: 78,
        evidence: ['严格遵守采购流程和审批制度', '所有决策要求有据可查', '重视合同条款的规范性'],
        implication: '严格遵循客户的采购流程，文档要规范完整',
      },
      {
        label: '人情优先',
        score: 45,
        evidence: ['私人关系对商务决策影响较小', '更关注产品能力而非个人交情', '在利益面前关系让步'],
        implication: '专业能力和产品价值比私人关系更重要',
      },
    ],
    tradeOffs: [
      { dimension: '利益vs原则', left: '原则优先', right: '利益优先', bias: 30 },
      { dimension: '效率vs合规', left: '效率优先', right: '合规优先', bias: 55 },
      { dimension: '个人vs集体', left: '个人优先', right: '集体优先', bias: 75 },
    ],
    cooperationType: '战略伙伴型 — 追求长期价值共创，重视战略协同',
    wordCloud: [
      { word: '诚信', size: 'xl' },
      { word: '效率', size: 'lg' },
      { word: '创新', size: 'lg' },
      { word: '长期主义', size: 'lg' },
      { word: '数据驱动', size: 'md' },
      { word: '责任', size: 'md' },
      { word: '共赢', size: 'md' },
      { word: '专业', size: 'sm' },
      { word: '透明', size: 'sm' },
      { word: '品质', size: 'sm' },
    ],
  },
  '2': {
    customerId: '2',
    values: [
      {
        label: '结果导向',
        score: 75,
        evidence: ['关注技术方案的实际效果', '要求POC验证必须有明确结论'],
        implication: '技术方案要有可量化的效果指标',
      },
      {
        label: '长期价值',
        score: 68,
        evidence: ['关注技术架构的可扩展性', '考虑未来3-5年的技术演进'],
        implication: '展示产品的技术前瞻性和持续迭代能力',
      },
      {
        label: '过程合规',
        score: 88,
        evidence: ['严格遵守技术规范和标准', '要求完整的技术文档和测试报告'],
        implication: '技术文档要完整规范，流程要合规',
      },
      {
        label: '人情优先',
        score: 30,
        evidence: ['技术选型中个人关系影响最小', '更看重技术实力而非商务关系'],
        implication: '技术能力是核心，商务手段效果有限',
      },
    ],
    tradeOffs: [
      { dimension: '利益vs原则', left: '原则优先', right: '利益优先', bias: 25 },
      { dimension: '效率vs合规', left: '效率优先', right: '合规优先', bias: 35 },
      { dimension: '个人vs集体', left: '个人优先', right: '集体优先', bias: 80 },
    ],
    cooperationType: '技术合作型 — 追求技术最优解，重视专业深度',
    wordCloud: [
      { word: '技术卓越', size: 'xl' },
      { word: '完美主义', size: 'lg' },
      { word: '规范', size: 'lg' },
      { word: '创新', size: 'lg' },
      { word: '质量', size: 'md' },
      { word: '严谨', size: 'md' },
      { word: '开放', size: 'md' },
      { word: '专业', size: 'sm' },
      { word: '责任', size: 'sm' },
      { word: '精确', size: 'sm' },
    ],
  },
  '3': {
    customerId: '3',
    values: [
      {
        label: '结果导向',
        score: 65,
        evidence: ['关注采购成本控制结果', '也重视供应商的服务体验'],
        implication: '方案要有明确的价值体现',
      },
      {
        label: '长期价值',
        score: 90,
        evidence: ['偏好与供应商建立长期合作关系', '重视供应商的可持续发展能力'],
        implication: '强调长期合作意愿，展示公司稳定性',
      },
      {
        label: '过程合规',
        score: 82,
        evidence: ['严格遵守采购合规制度', '审计要求文档齐全'],
        implication: '合规是基础，所有流程要符合制度',
      },
      {
        label: '人情优先',
        score: 78,
        evidence: ['个人信任对合作影响很大', '偏好合作愉快的供应商'],
        implication: '注重关系维护，让商务合作有人情味',
      },
    ],
    tradeOffs: [
      { dimension: '利益vs原则', left: '原则优先', right: '利益优先', bias: 60 },
      { dimension: '效率vs合规', left: '效率优先', right: '合规优先', bias: 45 },
      { dimension: '个人vs集体', left: '个人优先', right: '集体优先', bias: 55 },
    ],
    cooperationType: '关系驱动型 — 重视信任和人情，追求合作共赢',
    wordCloud: [
      { word: '信任', size: 'xl' },
      { word: '合作', size: 'lg' },
      { word: '共赢', size: 'lg' },
      { word: '诚信', size: 'lg' },
      { word: '稳定', size: 'md' },
      { word: '服务', size: 'md' },
      { word: '品质', size: 'md' },
      { word: '关系', size: 'sm' },
      { word: '价值', size: 'sm' },
      { word: '长远', size: 'sm' },
    ],
  },
  '4': {
    customerId: '4',
    values: [
      {
        label: '结果导向',
        score: 70,
        evidence: ['关注生产指标达成', '重视实际产能和良品率提升'],
        implication: '方案要能直接改善生产指标',
      },
      {
        label: '长期价值',
        score: 55,
        evidence: ['偏好经过验证的成熟方案', '对新技术持观望态度'],
        implication: '用同行案例证明方案的长期可靠性',
      },
      {
        label: '过程合规',
        score: 75,
        evidence: ['遵守安全生产法规', '重视设备认证资质'],
        implication: '合规是基础，资质要齐全',
      },
      {
        label: '人情优先',
        score: 60,
        evidence: ['相信熟人推荐', '偏好本地供应商'],
        implication: '利用同行推荐建立信任，强调本地服务',
      },
    ],
    tradeOffs: [
      { dimension: '利益vs原则', left: '原则优先', right: '利益优先', bias: 40 },
      { dimension: '效率vs合规', left: '效率优先', right: '合规优先', bias: 50 },
      { dimension: '个人vs集体', left: '个人优先', right: '集体优先', bias: 70 },
    ],
    cooperationType: '务实合作型 — 关注实际效果，偏好经过验证的方案',
    wordCloud: [
      { word: '稳健', size: 'xl' },
      { word: '可靠', size: 'lg' },
      { word: '经验', size: 'lg' },
      { word: '品质', size: 'lg' },
      { word: '安全', size: 'md' },
      { word: '实干', size: 'md' },
      { word: '诚信', size: 'md' },
      { word: '传统', size: 'sm' },
      { word: '责任', size: 'sm' },
      { word: '效率', size: 'sm' },
    ],
  },
};

// Tab 4: 合作红线
export interface RedLineData {
  customerId: string;
  redLines: {
    id: string;
    severity: 'strict' | 'caution' | 'attention';
    severityLabel: string;
    title: string;
    description: string;
    source: string;
  }[];
  taboos: string[];
  sensitiveTopics: string[];
  decisionLogic: string;
  positiveTriggers: {
    title: string;
    description: string;
  }[];
}

export const redLineDataMap: Record<string, RedLineData> = {
  '1': {
    customerId: '1',
    redLines: [
      {
        id: '1',
        severity: 'strict',
        severityLabel: '严禁',
        title: '不接受任何形式的商业贿赂',
        description: '张总明确表示任何形式的回扣、礼品、宴请超过标准都是不可接受的',
        source: '初次访谈记录·2024-01-15',
      },
      {
        id: '2',
        severity: 'caution',
        severityLabel: '谨慎',
        title: '不接受未经预约的拜访',
        description: '非常看重时间管理，希望所有会面提前至少3天预约',
        source: '秘书沟通记录·2024-02-20',
      },
      {
        id: '3',
        severity: 'caution',
        severityLabel: '谨慎',
        title: '不接受电话推销',
        description: '明确表示不喜欢接到销售电话，偏好邮件或微信预约',
        source: '访谈记录·2024-01-15',
      },
      {
        id: '4',
        severity: 'attention',
        severityLabel: '注意',
        title: '不希望在周末收到工作消息',
        description: '周末是家庭时间，除非紧急情况不希望被打扰',
        source: '日常沟通·2024-03',
      },
      {
        id: '5',
        severity: 'attention',
        severityLabel: '注意',
        title: '不接受模糊的承诺',
        description: '所有的承诺必须有具体的时间节点和数据支撑，拒绝"大概""可能"等表述',
        source: '项目沟通·2024-04-10',
      },
    ],
    taboos: [
      '不要过度赞美或奉承，张总反感不真诚的客套',
      '不要承诺无法兑现的功能或交付时间',
      '不要在会议中使用太多营销话术',
      '不要频繁更换对接人员',
      '不要在非工作时间发起业务沟通',
    ],
    sensitiveTopics: [
      '公司股价和上市计划相关话题',
      '与前供应商的纠纷细节',
      '个人家庭隐私相关话题',
      '竞争对手的内部情报',
    ],
    decisionLogic: '张明德的决策逻辑是"数据论证→案例验证→ROI计算→风险评估"。他会先听取技术方案，然后要求看同行业案例，接着让财务团队做ROI测算，最后评估实施风险。整个过程通常需要2-3个月。',
    positiveTriggers: [
      { title: '数据支撑', description: '任何方案只要有详实的数据分析，都会认真考虑' },
      { title: '案例背书', description: '同行业头部企业的成功案例是强有力的说服工具' },
      { title: '长期价值', description: '展示产品的长期价值和持续迭代能力会得到认可' },
      { title: '专业团队', description: '对技术专家型的销售团队印象深刻，重视专业能力' },
    ],
  },
  '2': {
    customerId: '2',
    redLines: [
      {
        id: '1',
        severity: 'strict',
        severityLabel: '严禁',
        title: '不接受技术能力不足的供应商',
        description: '对技术架构和实现细节要求极高，技术面试不合格直接淘汰',
        source: '技术评估会议纪要·2024-01',
      },
      {
        id: '2',
        severity: 'strict',
        severityLabel: '严禁',
        title: '不接受封闭技术方案',
        description: '要求所有技术方案必须开放接口和文档，拒绝 Vendor Lock-in',
        source: '技术选型标准·2024-02',
      },
      {
        id: '3',
        severity: 'caution',
        severityLabel: '谨慎',
        title: '不接受没有POC的方案',
        description: '任何采购必须通过POC验证，不接受纯PPT方案',
        source: '采购流程文档·2024-03',
      },
      {
        id: '4',
        severity: 'attention',
        severityLabel: '注意',
        title: '不接受过度包装的商业话术',
        description: '反感过度营销，希望直接看代码和架构',
        source: '日常沟通·2024-04',
      },
    ],
    taboos: [
      '不要在技术讨论中夸大产品能力',
      '不要回避技术实现细节的问题',
      '不要频繁更换技术对接人',
      '不要绕过技术团队直接找领导',
    ],
    sensitiveTopics: [
      '公司内部技术架构的技术债细节',
      '技术团队人员流动情况',
      '对现有供应商的负面评价',
    ],
    decisionLogic: '王志强的决策逻辑是"技术深度评估→架构兼容性→POC验证→成本考量"。他会先评估技术方案的深度和创新性，检查与现有架构的兼容性，要求POC验证，最后才考虑成本。技术是第一要素。',
    positiveTriggers: [
      { title: '技术深度', description: '对架构设计和技术选型有独到见解会得到高度认可' },
      { title: '开放生态', description: '开放API、开源组件、标准化接口是加分项' },
      { title: '持续迭代', description: '产品迭代速度快、技术路线清晰会得到青睐' },
    ],
  },
  '3': {
    customerId: '3',
    redLines: [
      {
        id: '1',
        severity: 'strict',
        severityLabel: '严禁',
        title: '不接受任何形式的回扣',
        description: '公司有严格的廉洁制度，任何形式的回扣都会终止合作',
        source: '廉洁协议·2024-01',
      },
      {
        id: '2',
        severity: 'caution',
        severityLabel: '谨慎',
        title: '不接受服务态度差的供应商',
        description: '非常看重服务体验，响应不及时会大大降低评分',
        source: '供应商评估表·2024-02',
      },
      {
        id: '3',
        severity: 'attention',
        severityLabel: '注意',
        title: '不接受不透明的定价',
        description: '要求价格构成清晰透明，不接受隐性收费',
        source: '商务谈判记录·2024-03',
      },
    ],
    taboos: [
      '不要忽视售后服务承诺',
      '不要在商务宴请中过于铺张',
      '不要通过非正式渠道报价',
    ],
    sensitiveTopics: [
      '公司内部预算细节',
      '与其他供应商的价格对比',
      '个人利益相关话题',
    ],
    decisionLogic: '李雪梅的决策逻辑是"关系建立→综合评估→商务谈判→决策审批"。她非常看重与供应商的信任关系，会在综合评估产品和服务后进入商务谈判，最后走审批流程。整个过程需要建立良好的个人关系。',
    positiveTriggers: [
      { title: '优质服务', description: '响应速度快、服务态度好会得到高度认可' },
      { title: '诚信透明', description: '价格透明、合同规范会赢得信任' },
      { title: '长期合作', description: '表达长期合作意愿，提供持续增值服务' },
    ],
  },
  '4': {
    customerId: '4',
    redLines: [
      {
        id: '1',
        severity: 'strict',
        severityLabel: '严禁',
        title: '不接受没有同行业案例的方案',
        description: '坚持要求供应商必须有至少3个同行业成功案例',
        source: '供应商准入标准·2024-01',
      },
      {
        id: '2',
        severity: 'caution',
        severityLabel: '谨慎',
        title: '不接受远程服务为主的供应商',
        description: '要求供应商必须有本地服务团队，不接受纯远程支持',
        source: '服务协议模板·2024-02',
      },
      {
        id: '3',
        severity: 'attention',
        severityLabel: '注意',
        title: '不接受过于激进的技术方案',
        description: '偏好成熟稳定的技术，对前沿技术持观望态度',
        source: '技术评估记录·2024-03',
      },
    ],
    taboos: [
      '不要推荐未经市场验证的新技术',
      '不要夸大方案的稳定性',
      '不要忽视生产环境的安全要求',
    ],
    sensitiveTopics: [
      '公司生产线的具体问题数据',
      '与竞争对手的产能对比',
      '设备的具体故障率数据',
    ],
    decisionLogic: '陈建华的决策逻辑是"同行推荐→实地考察→案例验证→小范围试点→全面推广"。他会先听取同行推荐，然后实地考察供应商，验证案例真实性，要求小范围试点成功后才会全面推广。整个过程通常需要6个月以上。',
    positiveTriggers: [
      { title: '同行案例', description: '同行业成功案例是最有力的说服工具' },
      { title: '本地服务', description: '有本地服务团队，响应及时会大大加分' },
      { title: '稳定可靠', description: '产品成熟稳定，故障率低会得到高度认可' },
    ],
  },
};

// Right panel summary
export const customerRightPanel = {
  tags: [
    { label: '决策者', color: '#1E40AF' },
    { label: '数据驱动', color: '#10B981' },
    { label: '稳健保守', color: '#F59E0B' },
    { label: '长期主义', color: '#8B5CF6' },
  ],
  oneLineSummary: '张明德是一位数据驱动的务实型CEO，重视长期价值和专业能力，决策逻辑清晰。沟通时应以数据为支撑，展示长期合作价值，严格遵循采购流程。',
};
