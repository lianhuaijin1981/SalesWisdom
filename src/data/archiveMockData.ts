// ============ Customer Archive Records ============
export interface ArchiveCustomer {
  id: string;
  name: string;
  company: string;
  position: string;
  phone: string;
  email: string;
  stage: '线索' | '初访' | '跟进中' | '意向' | '成交' | '流失';
  tags: string[];
  lastFollowUp: string;
  followUpCount: number;
  notes?: string;
}

export const archiveCustomers: ArchiveCustomer[] = [
  {
    id: '1', name: '张明德', company: '华夏科技', position: 'CEO',
    phone: '138****5678', email: 'zhangmd@huaxia.com',
    stage: '成交', tags: ['决策者', '技术背景', '价格敏感', 'Q2采购'],
    lastFollowUp: '2小时前', followUpCount: 12, notes: '对数字化转型有明确需求，预算待确认',
  },
  {
    id: '2', name: '李雪梅', company: '鼎盛集团', position: '采购总监',
    phone: '139****1234', email: 'lixm@dingfeng.com',
    stage: '意向', tags: ['关键人', '价格导向'],
    lastFollowUp: '昨天', followUpCount: 8, notes: '正在进行供应商评估',
  },
  {
    id: '3', name: '王建国', company: '创联科技', position: '技术总监',
    phone: '137****9876', email: 'wangjg@chuanglian.com',
    stage: '跟进中', tags: ['技术评估', '方案阶段'],
    lastFollowUp: '3天前', followUpCount: 5, notes: '技术方案测试中',
  },
  {
    id: '4', name: '赵志强', company: '远景投资', position: '合伙人',
    phone: '136****2468', email: 'zhaozq@yuanjing.com',
    stage: '初访', tags: ['高层对接', '长期潜力'],
    lastFollowUp: '今天', followUpCount: 2, notes: '初步接触，需求待挖掘',
  },
  {
    id: '5', name: '陈丽华', company: '智慧城建', position: '项目经理',
    phone: '135****1357', email: 'chenlh@zhihui.com',
    stage: '线索', tags: ['项目初期', '待跟进'],
    lastFollowUp: '2周前', followUpCount: 1, notes: '招投标阶段',
  },
  {
    id: '6', name: '刘大军', company: '天虹商贸', position: '总经理',
    phone: '133****7890', email: 'liudj@tianhong.com',
    stage: '跟进中', tags: ['决策者', '复购客户'],
    lastFollowUp: '5天前', followUpCount: 7, notes: '二期项目洽谈中',
  },
  {
    id: '7', name: '周雅琪', company: '星辰物流', position: '运营总监',
    phone: '132****6543', email: 'zhouyq@xingchen.com',
    stage: '意向', tags: ['运营需求', '预算充足'],
    lastFollowUp: '昨天', followUpCount: 4, notes: '对智能调度系统感兴趣',
  },
  {
    id: '8', name: '吴文博', company: '瑞康医疗', position: '信息部主任',
    phone: '131****8765', email: 'wuwb@ruikang.com',
    stage: '初访', tags: ['技术对接', '合规要求'],
    lastFollowUp: '4天前', followUpCount: 3, notes: '关注数据安全合规',
  },
];

// ============ Enterprise Archive Records ============
export interface ArchiveEnterprise {
  id: string;
  name: string;
  industry: string;
  scale: string;
  region: string;
  coreBusiness: string;
  projectCount: number;
  customerCount: number;
  status: '合作中' | '潜在' | '终止';
  tags: string[];
  description?: string;
}

export const archiveEnterprises: ArchiveEnterprise[] = [
  {
    id: '1', name: '华夏科技有限公司', industry: '互联网/金融科技',
    scale: '500-1000人', region: '北京', coreBusiness: '金融科技解决方案',
    projectCount: 3, customerCount: 3, status: '合作中',
    tags: ['核心客户', '数字化转型', '金融行业'],
    description: '国内领先的金融科技解决方案提供商，专注于银行、保险行业的数字化升级。',
  },
  {
    id: '2', name: '鼎盛集团股份有限公司', industry: '制造业',
    scale: '2000+人', region: '上海', coreBusiness: '智能制造设备',
    projectCount: 2, customerCount: 2, status: '合作中',
    tags: ['大型制造', '智能化升级'],
    description: '综合性制造集团，业务覆盖机械、电子、新材料等多个领域。',
  },
  {
    id: '3', name: '创联科技（深圳）有限公司', industry: '软件服务',
    scale: '100-500人', region: '深圳', coreBusiness: '企业软件开发',
    projectCount: 1, customerCount: 1, status: '合作中',
    tags: ['技术合作', '敏捷开发'],
    description: '专注于企业级软件开发和云服务的创新科技公司。',
  },
  {
    id: '4', name: '远景投资有限公司', industry: '金融投资',
    scale: '50-100人', region: '北京', coreBusiness: '风险投资管理',
    projectCount: 0, customerCount: 2, status: '潜在',
    tags: ['投资机构', '高净值'],
    description: '专注于科技领域早期投资的风险投资公司。',
  },
  {
    id: '5', name: '智慧城建集团有限公司', industry: '城市建设',
    scale: '1000-2000人', region: '广州', coreBusiness: '智慧城市解决方案',
    projectCount: 2, customerCount: 1, status: '合作中',
    tags: ['智慧城市', '政府项目'],
    description: '专注于智慧城市建设的大型综合性企业集团。',
  },
  {
    id: '6', name: '云天数据科技有限公司', industry: '云计算/大数据',
    scale: '200-500人', region: '杭州', coreBusiness: '云计算服务',
    projectCount: 1, customerCount: 1, status: '合作中',
    tags: ['云计算', '数据服务'],
    description: '国内知名的云计算和大数据服务提供商。',
  },
];

// ============ Project Archive Records ============
export type ProjectStage = '新建' | '初访' | '跟进中' | '意向' | '待审批' | '成交';

export interface ArchiveProject {
  id: string;
  name: string;
  client: string;
  enterprise: string;
  value: number;
  stage: ProjectStage;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  responsible: string;
  team: string[];
  description?: string;
}

export const archiveProjects: ArchiveProject[] = [
  {
    id: '1', name: '华夏科技数字化平台项目', client: '张明德',
    enterprise: '华夏科技', value: 180, stage: '成交',
    dueDate: '2024-06-30', priority: 'high', responsible: '李销售',
    team: ['李销售', '王顾问', '张工程师'],
    description: '企业级数字化转型平台，包含数据中台、业务中台等核心模块。',
  },
  {
    id: '2', name: '鼎盛智能制造升级', client: '李雪梅',
    enterprise: '鼎盛集团', value: 320, stage: '意向',
    dueDate: '2024-08-15', priority: 'high', responsible: '王经理',
    team: ['王经理', '赵工程师'],
    description: '智能制造产线升级，MES系统部署及IoT设备接入。',
  },
  {
    id: '3', name: '创联数据中台建设', client: '王建国',
    enterprise: '创联科技', value: 95, stage: '跟进中',
    dueDate: '2024-07-20', priority: 'medium', responsible: '李销售',
    team: ['李销售', '陈分析师'],
    description: '企业数据中台建设，实现数据统一管理和分析。',
  },
  {
    id: '4', name: '远景投资风控系统', client: '赵志强',
    enterprise: '远景投资', value: 65, stage: '初访',
    dueDate: '2024-09-30', priority: 'medium', responsible: '赵专员',
    team: ['赵专员'],
    description: '投资风险评估管理系统，支持多维度风险分析。',
  },
  {
    id: '5', name: '智慧城建IoT平台', client: '陈丽华',
    enterprise: '智慧城建', value: 450, stage: '新建',
    dueDate: '2024-12-31', priority: 'high', responsible: '王经理',
    team: ['王经理', '李销售', '张工程师', '刘设计师'],
    description: '城市级IoT物联网管理平台，覆盖智慧交通、环境监测等场景。',
  },
  {
    id: '6', name: '瑞康医疗供应链优化', client: '周雅琪',
    enterprise: '瑞康医疗', value: 78, stage: '跟进中',
    dueDate: '2024-08-30', priority: 'low', responsible: '赵专员',
    team: ['赵专员', '王顾问'],
    description: '医疗供应链智能优化系统，提升采购和库存效率。',
  },
  {
    id: '7', name: '星辰物流智能调度', client: '周海涛',
    enterprise: '星辰物流', value: 135, stage: '待审批',
    dueDate: '2024-07-15', priority: 'high', responsible: '李销售',
    team: ['李销售', '张工程师'],
    description: '物流智能调度系统，基于AI算法优化配送路径。',
  },
  {
    id: '8', name: '云天数据安全审计', client: '孙丽华',
    enterprise: '云天数据', value: 45, stage: '成交',
    dueDate: '2024-05-30', priority: 'medium', responsible: '王经理',
    team: ['王经理'],
    description: '企业数据安全审计服务，满足等保2.0合规要求。',
  },
  {
    id: '9', name: '天虹商贸ERP升级', client: '刘大军',
    enterprise: '天虹商贸', value: 210, stage: '意向',
    dueDate: '2024-10-30', priority: 'medium', responsible: '李销售',
    team: ['李销售', '陈分析师', '赵工程师'],
    description: '企业ERP系统升级换代，支持多渠道业务协同。',
  },
];

// ============ Archive Statistics ============
export interface ArchiveStats {
  customerCount: number;
  customerThisWeek: number;
  enterpriseCount: number;
  enterpriseThisWeek: number;
  projectCount: number;
  projectThisWeek: number;
  completionRate: number;
  completionTrend: number;
}

export const archiveStats: ArchiveStats = {
  customerCount: 156,
  customerThisWeek: 5,
  enterpriseCount: 48,
  enterpriseThisWeek: 2,
  projectCount: 73,
  projectThisWeek: 3,
  completionRate: 92,
  completionTrend: 1.5,
};

// ============ Recent Updates ============
export interface RecentUpdate {
  id: string;
  text: string;
  time: string;
}

export const recentUpdates: RecentUpdate[] = [
  { id: '1', text: '李雪梅 的档案刚刚更新', time: '5分钟前' },
  { id: '2', text: '华夏科技企业信息已更新', time: '30分钟前' },
  { id: '3', text: '智慧城市项目阶段变更为"意向"', time: '1小时前' },
  { id: '4', text: '新增客户档案：吴文博', time: '2小时前' },
  { id: '5', text: '鼎盛集团项目跟进记录更新', time: '3小时前' },
];

// ============ Follow-up Timeline ============
export interface FollowUpRecord {
  id: string;
  date: string;
  type: '电话' | '邮件' | '拜访' | '会议' | '微信';
  content: string;
  result: string;
}

export const followUpTimeline: FollowUpRecord[] = [
  { id: '1', date: '2024-01-15 14:30', type: '拜访', content: '初次需求访谈，了解数字化转型规划', result: '客户表达明确兴趣，约定Q2启动评估' },
  { id: '2', date: '2024-01-10 10:00', type: '电话', content: '电话回访，确认需求方向', result: '约面访时间' },
  { id: '3', date: '2024-01-05 16:00', type: '邮件', content: '发送产品介绍资料', result: '客户已查收' },
  { id: '4', date: '2024-01-02 09:30', type: '微信', content: '新年问候，建立联系', result: '客户回复，表示有需求' },
];

// ============ Stage Configurations ============
export const customerStageConfig: Record<string, { color: string; bg: string }> = {
  '线索': { color: '#94A3B8', bg: '#F1F5F9' },
  '初访': { color: '#3B82F6', bg: '#EFF6FF' },
  '跟进中': { color: '#F59E0B', bg: '#FEF3C7' },
  '意向': { color: '#8B5CF6', bg: '#F3E8FF' },
  '成交': { color: '#10B981', bg: '#F0FDF4' },
  '流失': { color: '#EF4444', bg: '#FEF2F2' },
};

export const projectStageConfig: Record<ProjectStage, { color: string; bg: string }> = {
  '新建': { color: '#94A3B8', bg: '#F1F5F9' },
  '初访': { color: '#3B82F6', bg: '#EFF6FF' },
  '跟进中': { color: '#F59E0B', bg: '#FEF3C7' },
  '意向': { color: '#8B5CF6', bg: '#F3E8FF' },
  '待审批': { color: '#EC4899', bg: '#FDF2F8' },
  '成交': { color: '#10B981', bg: '#F0FDF4' },
};

export const kanbanColumns: ProjectStage[] = ['新建', '初访', '跟进中', '意向', '待审批', '成交'];

// ============ Detail Tab Options ============
export const customerDetailTabs = ['基本信息', '跟进记录', '关联分析'];
export const enterpriseDetailTabs = ['企业概况', '关联客户', '关联项目'];
export const projectDetailTabs = ['项目概况', '里程碑', '跟进记录'];
