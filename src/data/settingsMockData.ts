// ============ User Profile & Account ============

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  avatar: string;
  role: string;
  department: string;
  phone: string;
  email: string;
  twoFactorEnabled: boolean;
}

export const currentUser: UserProfile = {
  id: '1',
  name: '李销售',
  username: 'lixs',
  avatar: '',
  role: '高级销售经理',
  department: '销售部',
  phone: '138****1234',
  email: 'lixs@company.com',
  twoFactorEnabled: false,
};

export interface LoginDevice {
  id: string;
  deviceName: string;
  deviceType: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

export const loginDevices: LoginDevice[] = [
  { id: '1', deviceName: 'MacBook Pro', deviceType: 'desktop', location: '北京', lastActive: '当前在线', isCurrent: true },
  { id: '2', deviceName: 'iPhone 15 Pro', deviceType: 'mobile', location: '北京', lastActive: '2小时前', isCurrent: false },
  { id: '3', deviceName: 'Windows PC', deviceType: 'desktop', location: '上海', lastActive: '3天前', isCurrent: false },
];

export interface LoginHistoryItem {
  id: string;
  time: string;
  ip: string;
  device: string;
  location: string;
  status: 'success' | 'failed';
}

export const loginHistory: LoginHistoryItem[] = [
  { id: '1', time: '2024-01-15 09:32:15', ip: '192.168.1.45', device: 'MacBook Pro', location: '北京', status: 'success' },
  { id: '2', time: '2024-01-15 08:15:30', ip: '192.168.1.45', device: 'MacBook Pro', location: '北京', status: 'success' },
  { id: '3', time: '2024-01-14 21:45:10', ip: '10.0.0.23', device: 'iPhone 15 Pro', location: '北京', status: 'success' },
  { id: '4', time: '2024-01-14 18:22:05', ip: '192.168.1.52', device: 'Windows PC', location: '上海', status: 'failed' },
  { id: '5', time: '2024-01-14 09:10:00', ip: '192.168.1.45', device: 'MacBook Pro', location: '北京', status: 'success' },
];

// ============ Roles & Permissions ============

export interface Role {
  id: string;
  name: string;
  description: string;
  userCount: number;
  color: string;
}

export const roles: Role[] = [
  { id: 'super_admin', name: '超级管理员', description: '系统全部权限，可管理所有模块', userCount: 2, color: '#1E40AF' },
  { id: 'team_admin', name: '团队管理员', description: '管理团队及查看全部数据', userCount: 3, color: '#3B82F6' },
  { id: 'sales', name: '普通销售', description: '客户跟进、个人数据管理', userCount: 24, color: '#10B981' },
];

export interface PermissionItem {
  id: string;
  name: string;
  category: string;
  permissions: Record<string, boolean>;
  children?: PermissionItem[];
}

export const permissionMatrix: PermissionItem[] = [
  {
    id: 'customer',
    name: '客户档案',
    category: '档案管理',
    permissions: { super_admin: true, team_admin: true, sales: true },
    children: [
      { id: 'customer_view', name: '查看', category: '档案管理', permissions: { super_admin: true, team_admin: true, sales: true } },
      { id: 'customer_edit', name: '编辑', category: '档案管理', permissions: { super_admin: true, team_admin: true, sales: true } },
      { id: 'customer_delete', name: '删除', category: '档案管理', permissions: { super_admin: true, team_admin: true, sales: false } },
    ],
  },
  {
    id: 'enterprise',
    name: '企业档案',
    category: '档案管理',
    permissions: { super_admin: true, team_admin: true, sales: true },
    children: [
      { id: 'enterprise_view', name: '查看', category: '档案管理', permissions: { super_admin: true, team_admin: true, sales: true } },
      { id: 'enterprise_edit', name: '编辑', category: '档案管理', permissions: { super_admin: true, team_admin: true, sales: false } },
      { id: 'enterprise_delete', name: '删除', category: '档案管理', permissions: { super_admin: true, team_admin: false, sales: false } },
    ],
  },
  {
    id: 'project',
    name: '项目档案',
    category: '档案管理',
    permissions: { super_admin: true, team_admin: true, sales: true },
    children: [
      { id: 'project_view', name: '查看', category: '档案管理', permissions: { super_admin: true, team_admin: true, sales: true } },
      { id: 'project_edit', name: '编辑', category: '档案管理', permissions: { super_admin: true, team_admin: true, sales: true } },
      { id: 'project_delete', name: '删除', category: '档案管理', permissions: { super_admin: true, team_admin: true, sales: false } },
    ],
  },
  {
    id: 'map',
    name: '图谱管理',
    category: '分析工具',
    permissions: { super_admin: true, team_admin: true, sales: true },
    children: [
      { id: 'map_view', name: '查看', category: '分析工具', permissions: { super_admin: true, team_admin: true, sales: true } },
      { id: 'map_edit', name: '编辑', category: '分析工具', permissions: { super_admin: true, team_admin: true, sales: false } },
    ],
  },
  {
    id: 'report',
    name: '报告管理',
    category: '分析工具',
    permissions: { super_admin: true, team_admin: true, sales: false },
    children: [
      { id: 'report_view', name: '查看', category: '分析工具', permissions: { super_admin: true, team_admin: true, sales: false } },
      { id: 'report_edit', name: '编辑', category: '分析工具', permissions: { super_admin: true, team_admin: true, sales: false } },
      { id: 'report_export', name: '导出', category: '分析工具', permissions: { super_admin: true, team_admin: true, sales: false } },
    ],
  },
  {
    id: 'notes',
    name: '私密手记',
    category: '个人工具',
    permissions: { super_admin: true, team_admin: true, sales: true },
    children: [
      { id: 'notes_view', name: '查看', category: '个人工具', permissions: { super_admin: true, team_admin: false, sales: true } },
      { id: 'notes_edit', name: '编辑', category: '个人工具', permissions: { super_admin: true, team_admin: false, sales: true } },
    ],
  },
  {
    id: 'growth',
    name: '成长测评',
    category: '个人工具',
    permissions: { super_admin: true, team_admin: true, sales: true },
    children: [
      { id: 'growth_view', name: '查看', category: '个人工具', permissions: { super_admin: true, team_admin: true, sales: true } },
      { id: 'growth_edit', name: '编辑', category: '个人工具', permissions: { super_admin: true, team_admin: true, sales: true } },
    ],
  },
];

export interface UserAccount {
  id: string;
  name: string;
  username: string;
  role: string;
  department: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}

export const userAccounts: UserAccount[] = [
  { id: '1', name: '系统管理员', username: 'admin', role: '超级管理员', department: 'IT部', status: 'active', lastLogin: '2分钟前' },
  { id: '2', name: '张经理', username: 'zhangjl', role: '团队管理员', department: '销售部', status: 'active', lastLogin: '1小时前' },
  { id: '3', name: '李销售', username: 'lixs', role: '普通销售', department: '销售部', status: 'active', lastLogin: '30分钟前' },
  { id: '4', name: '王销售', username: 'wangxs', role: '普通销售', department: '销售部', status: 'active', lastLogin: '3小时前' },
  { id: '5', name: '陈销售', username: 'chenxs', role: '普通销售', department: '销售部', status: 'inactive', lastLogin: '昨天' },
  { id: '6', name: '赵销售', username: 'zhaoxs', role: '普通销售', department: '销售部', status: 'inactive', lastLogin: '2周前' },
];

// ============ Global Settings ============

export interface GlobalSettings {
  theme: 'light' | 'dark' | 'auto';
  fontSize: number;
  layoutDensity: 'compact' | 'normal' | 'comfortable';
  aiModel: string;
  aiDepth: number;
  contentLength: 'concise' | 'detailed';
  speechStyle: 'formal' | 'friendly' | 'minimal';
  notifications: {
    push: boolean;
    email: boolean;
    sms: boolean;
    browser: boolean;
    aiComplete: boolean;
    backupComplete: boolean;
    systemAlert: boolean;
  };
}

export const defaultSettings: GlobalSettings = {
  theme: 'light',
  fontSize: 14,
  layoutDensity: 'normal',
  aiModel: 'GPT-4',
  aiDepth: 3,
  contentLength: 'detailed',
  speechStyle: 'friendly',
  notifications: {
    push: true,
    email: true,
    sms: false,
    browser: true,
    aiComplete: true,
    backupComplete: true,
    systemAlert: true,
  },
};

// ============ Backup Data ============

export interface BackupRecord {
  id: string;
  date: string;
  type: string;
  size: string;
  status: 'success' | 'partial' | 'failed';
}

export const backupRecords: BackupRecord[] = [
  { id: '1', date: '2024-01-15 03:00', type: '自动全量', size: '2.4 GB', status: 'success' },
  { id: '2', date: '2024-01-14 03:00', type: '自动增量', size: '156 MB', status: 'success' },
  { id: '3', date: '2024-01-13 03:00', type: '自动增量', size: '203 MB', status: 'success' },
  { id: '4', date: '2024-01-12 15:30', type: '手动全量', size: '2.3 GB', status: 'success' },
  { id: '5', date: '2024-01-11 03:00', type: '自动增量', size: '178 MB', status: 'success' },
  { id: '6', date: '2024-01-10 03:00', type: '自动全量', size: '2.2 GB', status: 'partial' },
];

export interface BackupSettings {
  autoBackup: boolean;
  frequency: string;
  backupTime: string;
  keepCount: number;
  backupType: string;
  storage: string;
}

export const backupSettings: BackupSettings = {
  autoBackup: true,
  frequency: 'daily',
  backupTime: '03:00',
  keepCount: 30,
  backupType: 'mixed',
  storage: 'local',
};

// ============ Operation Logs ============

export type OperationType = '数据操作' | 'AI分析' | '系统配置' | '登录' | '导出' | '用户管理';

export interface OperationLog {
  id: string;
  operator: string;
  time: string;
  type: OperationType;
  target: string;
  detail: string;
  ip: string;
  result: 'success' | 'failed';
}

export const operationLogs: OperationLog[] = [
  { id: '1', operator: 'lixs', time: '2024-01-15 14:32:10', type: '数据操作', target: '客户档案', detail: '新建客户"华夏科技-张明德"', ip: '192.168.1.45', result: 'success' },
  { id: '2', operator: 'lixs', time: '2024-01-15 14:28:05', type: 'AI分析', target: '客户分析', detail: '生成张明德多维画像分析', ip: '192.168.1.45', result: 'success' },
  { id: '3', operator: 'wangxs', time: '2024-01-15 14:15:22', type: '数据操作', target: '企业档案', detail: '更新鼎盛集团企业信息', ip: '192.168.1.52', result: 'success' },
  { id: '4', operator: 'zhangjl', time: '2024-01-15 13:58:00', type: 'AI分析', target: '行业洞察', detail: '生成制造业趋势报告', ip: '192.168.1.40', result: 'success' },
  { id: '5', operator: 'admin', time: '2024-01-15 13:45:18', type: '系统配置', target: '备份设置', detail: '修改备份频率为每日', ip: '192.168.1.10', result: 'success' },
  { id: '6', operator: 'chenxs', time: '2024-01-15 12:30:05', type: '导出', target: '决策链', detail: '导出决策链图谱PDF', ip: '192.168.1.60', result: 'success' },
  { id: '7', operator: 'lixs', time: '2024-01-15 11:20:33', type: '登录', target: '系统', detail: '用户登录成功', ip: '192.168.1.45', result: 'success' },
  { id: '8', operator: 'zhaoxs', time: '2024-01-15 10:15:00', type: '登录', target: '系统', detail: '登录失败（密码错误）', ip: '192.168.1.70', result: 'failed' },
  { id: '9', operator: 'admin', time: '2024-01-15 09:45:12', type: '用户管理', target: '用户账号', detail: '新建用户账号"sunxs"', ip: '192.168.1.10', result: 'success' },
  { id: '10', operator: 'zhangjl', time: '2024-01-15 08:20:00', type: '数据操作', target: '项目档案', detail: '创建新项目"智能制造二期"', ip: '192.168.1.40', result: 'success' },
];

// ============ Deployment Config ============

export interface DeploymentConfig {
  apiEndpoint: string;
  port: string;
  dbHost: string;
  dbPort: string;
  dbName: string;
  dbUser: string;
  features: {
    registration: boolean;
    guestMode: boolean;
    cloudSync: boolean;
  };
}

export const deploymentConfig: DeploymentConfig = {
  apiEndpoint: 'https://api.saleswisdom.com',
  port: '8080',
  dbHost: 'localhost',
  dbPort: '5432',
  dbName: 'saleswisdom_db',
  dbUser: 'sw_admin',
  features: {
    registration: true,
    guestMode: false,
    cloudSync: true,
  },
};

// ============ Right Panel System Status ============

export const systemStatus = {
  syncStatus: '正常' as const,
  lastBackup: '2024-01-15 03:00',
  storageUsed: '2.4 GB',
  storageTotal: '10 GB',
  storagePercent: 24,
  apiConnected: true,
  onlineUsers: 12,
  todayOperations: 256,
};
