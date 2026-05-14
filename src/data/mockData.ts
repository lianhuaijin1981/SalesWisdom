// ============ Customer Records ============
export interface Customer {
  id: string;
  name: string;
  company: string;
  position: string;
  phone: string;
  email: string;
  industry: string;
  status: 'active' | 'archived' | 'potential';
  lastContact: string;
  avatar?: string;
}

export const customers: Customer[] = [
  { id: '1', name: '张明德', company: '华夏科技', position: '采购总监', phone: '138****1234', email: 'zhangmd@huaxia.com', industry: '互联网', status: 'active', lastContact: '2024-01-15' },
  { id: '2', name: '李建国', company: '鼎盛集团', position: '总经理', phone: '139****5678', email: 'lijg@dingfeng.com', industry: '制造业', status: 'active', lastContact: '2024-01-14' },
  { id: '3', name: '王秀芳', company: '创联科技', position: '技术VP', phone: '137****9012', email: 'wangxf@chuanglian.com', industry: '互联网', status: 'active', lastContact: '2024-01-13' },
  { id: '4', name: '陈志强', company: '博远投资', position: '合伙人', phone: '136****3456', email: 'chenzq@boyuan.com', industry: '金融', status: 'potential', lastContact: '2024-01-10' },
  { id: '5', name: '刘雅琴', company: '智慧教育', position: '运营总监', phone: '135****7890', email: 'liuyq@zhihui.com', industry: '教育', status: 'active', lastContact: '2024-01-12' },
  { id: '6', name: '赵伟', company: '东方制造', position: '生产经理', phone: '134****2468', email: 'zhaow@dongfang.com', industry: '制造业', status: 'archived', lastContact: '2023-12-28' },
  { id: '7', name: '孙丽华', company: '星辰物流', position: '财务总监', phone: '133****1357', email: 'sunlh@xingchen.com', industry: '物流', status: 'potential', lastContact: '2024-01-08' },
  { id: '8', name: '周海涛', company: '云天数据', position: 'CTO', phone: '132****9753', email: 'zhouht@yuntian.com', industry: '互联网', status: 'active', lastContact: '2024-01-15' },
  { id: '9', name: '吴静', company: '瑞康医疗', position: '采购经理', phone: '131****8642', email: 'wuj@ruikang.com', industry: '医疗', status: 'active', lastContact: '2024-01-11' },
  { id: '10', name: '郑文涛', company: '金盾安全', position: '销售总监', phone: '130****7531', email: 'zhengwt@jindun.com', industry: '安全', status: 'potential', lastContact: '2024-01-09' },
];

// ============ Enterprise Records ============
export interface Enterprise {
  id: string;
  name: string;
  industry: string;
  scale: string;
  region: string;
  contactPerson: string;
  cooperationStatus: 'cooperating' | 'potential' | 'terminated';
  projectCount: number;
  lastFollowUp: string;
}

export const enterprises: Enterprise[] = [
  { id: '1', name: '华夏科技有限公司', industry: '互联网', scale: '500-1000人', region: '北京', contactPerson: '张明德', cooperationStatus: 'cooperating', projectCount: 3, lastFollowUp: '2024-01-15' },
  { id: '2', name: '鼎盛集团股份有限公司', industry: '制造业', scale: '2000+人', region: '上海', contactPerson: '李建国', cooperationStatus: 'cooperating', projectCount: 2, lastFollowUp: '2024-01-14' },
  { id: '3', name: '创联科技（深圳）有限公司', industry: '互联网', scale: '100-500人', region: '深圳', contactPerson: '王秀芳', cooperationStatus: 'cooperating', projectCount: 1, lastFollowUp: '2024-01-13' },
  { id: '4', name: '博远投资有限公司', industry: '金融', scale: '50-100人', region: '上海', contactPerson: '陈志强', cooperationStatus: 'potential', projectCount: 0, lastFollowUp: '2024-01-10' },
  { id: '5', name: '智慧教育科技集团', industry: '教育', scale: '1000-2000人', region: '广州', contactPerson: '刘雅琴', cooperationStatus: 'cooperating', projectCount: 2, lastFollowUp: '2024-01-12' },
];

// ============ Project Records ============
export interface Project {
  id: string;
  name: string;
  customer: string;
  enterprise: string;
  status: 'in_progress' | 'completed' | 'pending' | 'on_hold';
  progress: number;
  startDate: string;
  endDate: string;
  amount: number;
  responsible: string;
}

export const projects: Project[] = [
  { id: '1', name: '华夏科技云平台升级项目', customer: '张明德', enterprise: '华夏科技', status: 'in_progress', progress: 68, startDate: '2023-11-01', endDate: '2024-03-31', amount: 2800000, responsible: '李销售' },
  { id: '2', name: '鼎盛集团智能制造系统', customer: '李建国', enterprise: '鼎盛集团', status: 'in_progress', progress: 45, startDate: '2023-12-01', endDate: '2024-06-30', amount: 5200000, responsible: '王经理' },
  { id: '3', name: '创联科技数据中台建设', customer: '王秀芳', enterprise: '创联科技', status: 'pending', progress: 15, startDate: '2024-01-15', endDate: '2024-08-31', amount: 1800000, responsible: '李销售' },
  { id: '4', name: '智慧教育在线学习平台', customer: '刘雅琴', enterprise: '智慧教育', status: 'in_progress', progress: 82, startDate: '2023-10-01', endDate: '2024-02-28', amount: 1500000, responsible: '赵专员' },
  { id: '5', name: '博远投资风控系统', customer: '陈志强', enterprise: '博远投资', status: 'pending', progress: 5, startDate: '2024-02-01', endDate: '2024-05-31', amount: 960000, responsible: '王经理' },
  { id: '6', name: '云天数据安全审计', customer: '周海涛', enterprise: '云天数据', status: 'completed', progress: 100, startDate: '2023-09-01', endDate: '2023-12-31', amount: 750000, responsible: '李销售' },
  { id: '7', name: '瑞康医疗供应链优化', customer: '吴静', enterprise: '瑞康医疗', status: 'in_progress', progress: 55, startDate: '2023-12-15', endDate: '2024-04-30', amount: 1200000, responsible: '赵专员' },
  { id: '8', name: '星辰物流智能调度系统', customer: '孙丽华', enterprise: '星辰物流', status: 'on_hold', progress: 30, startDate: '2023-11-15', endDate: '2024-07-31', amount: 2100000, responsible: '王经理' },
];

// ============ KPI Statistics ============
export interface KpiData {
  totalCustomers: number;
  totalCustomersTrend: number;
  activeProjects: number;
  activeProjectsTrend: number;
  followUpRate: number;
  followUpRateTrend: number;
  dealsClosed: number;
  dealsClosedTrend: number;
  aiAnalysisCount: number;
  aiAnalysisTrend: number;
  pendingTasks: number;
  pendingTasksTrend: number;
  thisMonthFollowUps: number;
  thisMonthFollowUpsTrend: number;
}

export const kpiData: KpiData = {
  totalCustomers: 2847,
  totalCustomersTrend: 12.5,
  activeProjects: 186,
  activeProjectsTrend: 8.3,
  followUpRate: 94.2,
  followUpRateTrend: 3.1,
  dealsClosed: 42,
  dealsClosedTrend: 15.2,
  aiAnalysisCount: 1204,
  aiAnalysisTrend: 23.1,
  pendingTasks: 14,
  pendingTasksTrend: -2,
  thisMonthFollowUps: 186,
  thisMonthFollowUpsTrend: 8.3,
};

// ============ Activity Feed ============
export interface ActivityItem {
  id: string;
  type: 'ai' | 'user' | 'system';
  description: string;
  time: string;
  status?: string;
  statusType?: 'ai' | 'manual' | 'pending' | 'completed';
  icon?: string;
}

export const activities: ActivityItem[] = [
  { id: '1', type: 'ai', description: 'AI完成客户**张明德**的多维画像分析', time: '10分钟前', status: 'AI分析', statusType: 'ai' },
  { id: '2', type: 'user', description: '**李销售**更新了华夏科技的项目跟进记录', time: '32分钟前' },
  { id: '3', type: 'system', description: '语音采集完成 — **王总访谈录音**已转文字', time: '1小时前', status: '已完成', statusType: 'completed', icon: 'Mic' },
  { id: '4', type: 'ai', description: 'AI生成决策链关系图谱 — **鼎盛集团**', time: '2小时前', status: 'AI分析', statusType: 'ai' },
  { id: '5', type: 'user', description: '**王经理**新建了三档案 — **创联科技**', time: '3小时前' },
  { id: '6', type: 'ai', description: '项目瓶颈分析完成 — **智慧城市项目**', time: '5小时前', status: 'AI分析', statusType: 'ai' },
  { id: '7', type: 'ai', description: '生成12条专属谈资 — **张明德**', time: '昨天', status: 'AI生成', statusType: 'ai' },
  { id: '8', type: 'system', description: '销售能力测评更新 — 综合得分**86.5**', time: '昨天', status: '+2.3分', statusType: 'pending', icon: 'TrendingUp' },
];

// ============ Tasks ============
export interface Task {
  id: string;
  text: string;
  dueText: string;
  dueType: 'urgent' | 'today' | 'tomorrow' | 'week' | 'future';
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
}

export const tasks: Task[] = [
  { id: '1', text: '跟进华夏科技项目进展', dueText: '今天截止', dueType: 'today', priority: 'high', completed: false },
  { id: '2', text: '完成鼎盛集团决策链更新', dueText: '明天', dueType: 'tomorrow', priority: 'medium', completed: false },
  { id: '3', text: '准备创联科技下周拜访话术', dueText: '3天后', dueType: 'week', priority: 'low', completed: false },
  { id: '4', text: '回复张总关于报价的疑问', dueText: '今天截止', dueType: 'today', priority: 'high', completed: false },
  { id: '5', text: '更新语音采集信息标签', dueText: '本周内', dueType: 'week', priority: 'low', completed: false },
];

// ============ Subsystem Cards ============
export interface Subsystem {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  status: string;
  route: string;
}

export const subsystems: Subsystem[] = [
  { id: '1', title: '语音信息采集', description: 'AI语音识别与客户信息采集', icon: 'Mic', gradient: 'linear-gradient(135deg, #1E40AF, #3B82F6)', status: '已启用', route: '/voice' },
  { id: '2', title: '三档案智能建档', description: '客户/企业/项目档案管理', icon: 'FolderOpen', gradient: 'linear-gradient(135deg, #10B981, #34D399)', status: '已启用', route: '/archive' },
  { id: '3', title: '行业洞察与战略', description: '行业分析与战略需求诊断', icon: 'BarChart3', gradient: 'linear-gradient(135deg, #F59E0B, #FBBF24)', status: '已启用', route: '/industry' },
  { id: '4', title: '客户多维分析', description: '客户画像与多维特征分析', icon: 'UserCircle', gradient: 'linear-gradient(135deg, #8B5CF6, #A78BFA)', status: '已启用', route: '/customer' },
  { id: '5', title: '决策链关系图谱', description: '决策链人际关系网络可视化', icon: 'Network', gradient: 'linear-gradient(135deg, #EF4444, #F87171)', status: '已启用', route: '/decision-chain' },
  { id: '6', title: '项目瓶颈与攻坚', description: '项目瓶颈识别与突破策略', icon: 'Target', gradient: 'linear-gradient(135deg, #EC4899, #F472B6)', status: '已启用', route: '/bottleneck' },
  { id: '7', title: '专属谈资与话术', description: 'AI生成行业话题与销售话术', icon: 'MessageSquare', gradient: 'linear-gradient(135deg, #06B6D4, #22D3EE)', status: '已启用', route: '/topics' },
  { id: '8', title: '销售能力测评', description: '销售能力多维度评估与提升', icon: 'TrendingUp', gradient: 'linear-gradient(135deg, #14B8A6, #2DD4BF)', status: '已启用', route: '/growth' },
  { id: '9', title: '系统总控配置', description: '权限管理与系统配置', icon: 'Settings', gradient: 'linear-gradient(135deg, #64748B, #94A3B8)', status: '管理员', route: '/settings' },
];

// ============ Industry Distribution ============
export interface IndustryDistribution {
  name: string;
  value: number;
  color: string;
}

export const industryDistribution: IndustryDistribution[] = [
  { name: '制造业', value: 35, color: '#1E40AF' },
  { name: '互联网', value: 25, color: '#3B82F6' },
  { name: '金融', value: 20, color: '#38BDF8' },
  { name: '教育', value: 12, color: '#10B981' },
  { name: '其他', value: 8, color: '#F59E0B' },
];

// ============ Monthly Follow-up Trend ============
export interface FollowUpTrend {
  date: string;
  count: number;
}

export const followUpTrend: FollowUpTrend[] = [
  { date: '1日', count: 4 }, { date: '2日', count: 6 }, { date: '3日', count: 3 },
  { date: '4日', count: 8 }, { date: '5日', count: 5 }, { date: '6日', count: 7 },
  { date: '7日', count: 4 }, { date: '8日', count: 9 }, { date: '9日', count: 6 },
  { date: '10日', count: 5 }, { date: '11日', count: 7 }, { date: '12日', count: 8 },
  { date: '13日', count: 4 }, { date: '14日', count: 6 }, { date: '15日', count: 9 },
  { date: '16日', count: 5 }, { date: '17日', count: 7 }, { date: '18日', count: 8 },
  { date: '19日', count: 6 }, { date: '20日', count: 4 }, { date: '21日', count: 9 },
  { date: '22日', count: 7 }, { date: '23日', count: 5 }, { date: '24日', count: 8 },
  { date: '25日', count: 6 }, { date: '26日', count: 7 }, { date: '27日', count: 4 },
  { date: '28日', count: 9 }, { date: '29日', count: 6 }, { date: '30日', count: 8 },
];

// ============ AI Insight Data ============
export const aiInsight = {
  headline: '本周关键洞察',
  content: '基于近期跟进数据分析，**华夏科技**和**鼎盛集团**两个客户项目进入关键决策期。建议优先安排高层拜访，AI已为您生成针对性拜访策略和专属谈资。',
  activeClientsChange: 23,
};

// ============ Navigation Groups ============
export interface NavGroup {
  label: string;
  items: NavItem[];
}

export interface NavItem {
  icon: string;
  label: string;
  route: string;
}

export const navGroups: NavGroup[] = [
  {
    label: '核心功能',
    items: [
      { icon: 'Mic', label: '语音信息采集', route: '/voice' },
      { icon: 'FolderOpen', label: '三档案管理', route: '/archive' },
      { icon: 'BarChart3', label: '行业洞察', route: '/industry' },
      { icon: 'UserCircle', label: '客户分析', route: '/customer' },
    ],
  },
  {
    label: '策略工具',
    items: [
      { icon: 'Network', label: '决策链图谱', route: '/decision-chain' },
      { icon: 'Target', label: '瓶颈攻坚', route: '/bottleneck' },
      { icon: 'MessageSquare', label: '谈资话术', route: '/topics' },
    ],
  },
  {
    label: '成长与系统',
    items: [
      { icon: 'TrendingUp', label: '能力成长', route: '/growth' },
      { icon: 'Settings', label: '系统设置', route: '/settings' },
    ],
  },
];
