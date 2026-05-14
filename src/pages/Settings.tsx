import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Database,
  Sliders,
  ScrollText,
  Server,
  Lock,
  Smartphone,
  Mail,
  Key,
  Eye,
  EyeOff,
  Check,
  Minus,
  ChevronDown,
  ChevronUp,
  Download,
  RotateCcw,
  Save,
  RotateCcw as RestoreIcon,
  Filter,
  Cloud,
  HardDrive,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Globe,
  Monitor,
  Moon,
  Sun,
  Type,
  Bot,
  Bell,
  Trash2,
  Edit3,
} from 'lucide-react';
import PageLayout from '@/components/Layout';
import {
  currentUser,
  loginDevices,
  loginHistory,
  roles,
  permissionMatrix,
  userAccounts,
  defaultSettings,
  backupRecords,
  backupSettings,
  operationLogs,
  deploymentConfig,
} from '@/data/settingsMockData';
import type { PermissionItem } from '@/data/settingsMockData';

const tabs = [
  { id: 'account', label: '账号安全', icon: Lock },
  { id: 'permissions', label: '权限管理', icon: Shield },
  { id: 'global', label: '全局配置', icon: Sliders },
  { id: 'backup', label: '数据备份', icon: Database },
  { id: 'logs', label: '操作日志', icon: ScrollText },
  { id: 'deploy', label: '部署配置', icon: Server },
];

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

/* ========== Custom Switch Component ========== */
function Switch({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-10 h-5 rounded-full transition-colors ${checked ? 'bg-[#1E40AF]' : 'bg-[#CBD5E1]'}`}
    >
      <div
        className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`}
      />
    </button>
  );
}

/* ========== Tab 1: Account Security ========== */
function AccountSecurityTab() {
  const [showPassword, setShowPassword] = useState(false);
  const [twoFA, setTwoFA] = useState(currentUser.twoFactorEnabled);
  const [devices, setDevices] = useState(loginDevices);

  const removeDevice = (id: string) => {
    setDevices((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="space-y-5">
      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-[#E2E8F0] rounded-xl p-6"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] flex items-center justify-center text-white text-xl font-bold">
            {currentUser.name[0]}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#0F172A]">{currentUser.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs bg-[#DBEAFE] text-[#1E40AF] px-2 py-0.5 rounded-full">{currentUser.role}</span>
              <span className="text-xs text-[#94A3B8]">{currentUser.department}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-[#475569] mb-1.5 block">用户名</label>
            <div className="relative">
              <input
                type="text"
                defaultValue={currentUser.username}
                className="w-full h-10 px-3 text-sm bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:border-[#1E40AF] focus:ring-2 focus:ring-[#1E40AF]/20"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-[#475569] mb-1.5 block">手机号</label>
            <div className="relative">
              <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
              <input
                type="text"
                defaultValue={currentUser.phone}
                className="w-full h-10 pl-9 pr-3 text-sm bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:border-[#1E40AF] focus:ring-2 focus:ring-[#1E40AF]/20"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-[#475569] mb-1.5 block">邮箱</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
              <input
                type="email"
                defaultValue={currentUser.email}
                className="w-full h-10 pl-9 pr-3 text-sm bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:border-[#1E40AF] focus:ring-2 focus:ring-[#1E40AF]/20"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-[#475569] mb-1.5 block">修改密码</label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="输入新密码"
                className="w-full h-10 pl-9 pr-9 text-sm bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#1E40AF] focus:ring-2 focus:ring-[#1E40AF]/20"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#475569]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2FA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white border border-[#E2E8F0] rounded-xl p-5"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-[#1E40AF]" />
            <div>
              <h3 className="text-sm font-semibold text-[#0F172A]">双因素认证 (2FA)</h3>
              <p className="text-xs text-[#94A3B8]">开启后登录时需要额外验证码，提高账户安全性</p>
            </div>
          </div>
          <Switch checked={twoFA} onChange={setTwoFA} />
        </div>
      </motion.div>

      {/* Login Devices */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-white border border-[#E2E8F0] rounded-xl p-5"
      >
        <h3 className="text-sm font-semibold text-[#0F172A] mb-3">登录设备</h3>
        <div className="space-y-2">
          {devices.map((device) => (
            <div
              key={device.id}
              className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-[#F8FAFC]"
            >
              <div className="flex items-center gap-3">
                {device.deviceType === 'mobile' ? (
                  <Smartphone className="w-4 h-4 text-[#475569]" />
                ) : (
                  <Monitor className="w-4 h-4 text-[#475569]" />
                )}
                <div>
                  <p className="text-sm text-[#0F172A]">
                    {device.deviceName}
                    {device.isCurrent && (
                      <span className="text-xs bg-[#F0FDF4] text-[#166534] px-1.5 py-0.5 rounded-full ml-2">当前设备</span>
                    )}
                  </p>
                  <p className="text-xs text-[#94A3B8]">{device.location} · {device.lastActive}</p>
                </div>
              </div>
              {!device.isCurrent && (
                <button
                  onClick={() => removeDevice(device.id)}
                  className="text-xs text-[#EF4444] hover:text-red-700 px-2 py-1 rounded hover:bg-[#FEF2F2] transition-colors"
                >
                  下线
                </button>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Login History */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white border border-[#E2E8F0] rounded-xl p-5"
      >
        <h3 className="text-sm font-semibold text-[#0F172A] mb-3">登录历史</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E2E8F0]">
                <th className="text-left text-xs font-medium text-[#475569] py-2 px-3">时间</th>
                <th className="text-left text-xs font-medium text-[#475569] py-2 px-3">IP地址</th>
                <th className="text-left text-xs font-medium text-[#475569] py-2 px-3">设备</th>
                <th className="text-left text-xs font-medium text-[#475569] py-2 px-3">地点</th>
                <th className="text-left text-xs font-medium text-[#475569] py-2 px-3">状态</th>
              </tr>
            </thead>
            <tbody>
              {loginHistory.map((log) => (
                <tr key={log.id} className="border-b border-[#F1F5F9] hover:bg-[#F8FAFC]">
                  <td className="text-xs text-[#475569] py-2.5 px-3">{log.time}</td>
                  <td className="text-xs text-[#475569] py-2.5 px-3 font-mono">{log.ip}</td>
                  <td className="text-xs text-[#475569] py-2.5 px-3">{log.device}</td>
                  <td className="text-xs text-[#475569] py-2.5 px-3">{log.location}</td>
                  <td className="py-2.5 px-3">
                    {log.status === 'success' ? (
                      <span className="text-xs text-[#10B981] flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> 成功
                      </span>
                    ) : (
                      <span className="text-xs text-[#EF4444] flex items-center gap-1">
                        <XCircle className="w-3 h-3" /> 失败
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

/* ========== Tab 2: Permission Management ========== */
function PermissionManagementTab() {
  const [activeRole, setActiveRole] = useState('全部');
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const [perms, setPerms] = useState<PermissionItem[]>(permissionMatrix);

  const toggleGroup = (id: string) => {
    setExpandedGroups((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const togglePermission = (itemId: string, roleId: string) => {
    setPerms((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            permissions: { ...item.permissions, [roleId]: !item.permissions[roleId] },
          };
        }
        if (item.children) {
          const updatedChildren = item.children.map((child) => {
            if (child.id === itemId) {
              return {
                ...child,
                permissions: { ...child.permissions, [roleId]: !child.permissions[roleId] },
              };
            }
            return child;
          });
          return { ...item, children: updatedChildren };
        }
        return item;
      })
    );
  };

  const allRoles = ['super_admin', 'team_admin', 'sales'];
  const roleNames: Record<string, string> = { super_admin: '超级管理员', team_admin: '团队管理员', sales: '普通销售' };

  const getPermissionIcon = (value: boolean) => {
    if (value) return <Check className="w-4 h-4 text-[#10B981]" />;
    return <Minus className="w-4 h-4 text-[#E2E8F0]" />;
  };

  return (
    <div className="space-y-5">
      {/* Role Cards */}
      <div className="grid grid-cols-3 gap-4">
        {roles.map((role, i) => (
          <motion.div
            key={role.id}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            onClick={() => setActiveRole(activeRole === role.id ? '全部' : role.id)}
            className={`bg-white border rounded-xl p-4 cursor-pointer transition-all ${
              activeRole === role.id ? 'border-[#1E40AF] ring-1 ring-[#1E40AF]' : 'border-[#E2E8F0] hover:shadow-md'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" style={{ color: role.color }} />
                <span className="text-sm font-semibold text-[#0F172A]">{role.name}</span>
              </div>
              <span className="text-xs bg-[#F1F5F9] text-[#475569] px-2 py-0.5 rounded-full">{role.userCount}人</span>
            </div>
            <p className="text-xs text-[#94A3B8]">{role.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Permission Matrix */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-[#E2E8F0] rounded-xl p-5"
      >
        <h3 className="text-sm font-semibold text-[#0F172A] mb-4">权限矩阵</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E2E8F0]">
                <th className="text-left text-xs font-medium text-[#475569] py-2 px-3 w-48">功能模块</th>
                {allRoles.map((roleId) => (
                  <th key={roleId} className="text-center text-xs font-medium text-[#475569] py-2 px-3">
                    {roleNames[roleId]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {perms.map((item) => (
                <>
                  <tr
                    key={item.id}
                    className="border-b border-[#F1F5F9] hover:bg-[#F8FAFC] cursor-pointer"
                    onClick={() => item.children && toggleGroup(item.id)}
                  >
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-1.5">
                        {item.children && (
                          expandedGroups[item.id] ? (
                            <ChevronUp className="w-3 h-3 text-[#94A3B8]" />
                          ) : (
                            <ChevronDown className="w-3 h-3 text-[#94A3B8]" />
                          )
                        )}
                        <span className="text-sm font-medium text-[#0F172A]">{item.name}</span>
                      </div>
                    </td>
                    {allRoles.map((roleId) => (
                      <td key={roleId} className="text-center py-2.5 px-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            togglePermission(item.id, roleId);
                          }}
                          className="inline-flex items-center justify-center"
                        >
                          {getPermissionIcon(item.permissions[roleId])}
                        </button>
                      </td>
                    ))}
                  </tr>
                  {item.children && expandedGroups[item.id] && item.children.map((child) => (
                    <tr key={child.id} className="border-b border-[#F1F5F9] bg-[#F8FAFC]/50">
                      <td className="py-2 px-3 pl-8">
                        <span className="text-xs text-[#475569]">{child.name}</span>
                      </td>
                      {allRoles.map((roleId) => (
                        <td key={roleId} className="text-center py-2 px-3">
                          <button
                            onClick={() => togglePermission(child.id, roleId)}
                            className="inline-flex items-center justify-center"
                          >
                            {getPermissionIcon(child.permissions[roleId])}
                          </button>
                        </td>
                      ))}
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* User List */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white border border-[#E2E8F0] rounded-xl p-5"
      >
        <h3 className="text-sm font-semibold text-[#0F172A] mb-4">用户列表</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
                <th className="text-left text-xs font-medium text-[#475569] py-2.5 px-3">姓名</th>
                <th className="text-left text-xs font-medium text-[#475569] py-2.5 px-3">角色</th>
                <th className="text-left text-xs font-medium text-[#475569] py-2.5 px-3">部门</th>
                <th className="text-left text-xs font-medium text-[#475569] py-2.5 px-3">状态</th>
                <th className="text-left text-xs font-medium text-[#475569] py-2.5 px-3">最后登录</th>
                <th className="text-left text-xs font-medium text-[#475569] py-2.5 px-3">操作</th>
              </tr>
            </thead>
            <tbody>
              {userAccounts
                .filter((u) => activeRole === '全部' || u.role === roles.find((r) => r.id === activeRole)?.name)
                .map((user) => (
                  <tr key={user.id} className="border-b border-[#F1F5F9] hover:bg-[#F8FAFC]">
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] flex items-center justify-center text-white text-xs font-semibold">
                          {user.name[0]}
                        </div>
                        <span className="text-sm text-[#0F172A]">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-xs text-[#475569]">{user.role}</td>
                    <td className="py-2.5 px-3 text-xs text-[#475569]">{user.department}</td>
                    <td className="py-2.5 px-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        user.status === 'active'
                          ? 'bg-[#F0FDF4] text-[#166534]'
                          : 'bg-[#FEF2F2] text-[#991B1B]'
                      }`}>
                        {user.status === 'active' ? '活跃' : '停用'}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-xs text-[#94A3B8]">{user.lastLogin}</td>
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-1">
                        <button className="p-1 rounded hover:bg-[#F1F5F9] text-[#475569]" title="编辑">
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1 rounded hover:bg-[#FEF2F2] text-[#EF4444]" title="删除">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

/* ========== Tab 3: Global Configuration ========== */
function GlobalConfigTab() {
  const [settings, setSettings] = useState(defaultSettings);

  const updateNotification = (key: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: value },
    }));
  };

  return (
    <div className="space-y-5">
      {/* UI Settings */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-[#E2E8F0] rounded-xl p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Monitor className="w-4 h-4 text-[#1E40AF]" />
          <h3 className="text-sm font-semibold text-[#0F172A]">界面设置</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-[#475569] mb-2 block">主题模式</label>
            <div className="flex items-center gap-2">
              {([
                { key: 'light', label: '浅色', icon: Sun },
                { key: 'dark', label: '深色', icon: Moon },
                { key: 'auto', label: '自动', icon: Globe },
              ] as const).map((theme) => (
                <button
                  key={theme.key}
                  onClick={() => setSettings((prev) => ({ ...prev, theme: theme.key }))}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
                    settings.theme === theme.key
                      ? 'border-[#1E40AF] bg-[#EFF6FF] text-[#1E40AF]'
                      : 'border-[#E2E8F0] text-[#475569] hover:bg-[#F8FAFC]'
                  }`}
                >
                  <theme.icon className="w-3.5 h-3.5" />
                  {theme.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-[#475569] mb-2 block">字体大小</label>
            <div className="flex items-center gap-3">
              <Type className="w-4 h-4 text-[#94A3B8]" />
              <input
                type="range"
                min={12}
                max={18}
                value={settings.fontSize}
                onChange={(e) => setSettings((prev) => ({ ...prev, fontSize: Number(e.target.value) }))}
                className="flex-1 h-1.5 bg-[#E2E8F0] rounded-full appearance-none cursor-pointer accent-[#1E40AF]"
              />
              <span className="text-xs text-[#475569] w-8 text-right">{settings.fontSize}px</span>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-[#475569] mb-2 block">布局密度</label>
            <div className="flex items-center gap-2">
              {([
                { key: 'compact', label: '紧凑' },
                { key: 'normal', label: '标准' },
                { key: 'comfortable', label: '宽松' },
              ] as const).map((density) => (
                <button
                  key={density.key}
                  onClick={() => setSettings((prev) => ({ ...prev, layoutDensity: density.key }))}
                  className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
                    settings.layoutDensity === density.key
                      ? 'border-[#1E40AF] bg-[#EFF6FF] text-[#1E40AF]'
                      : 'border-[#E2E8F0] text-[#475569] hover:bg-[#F8FAFC]'
                  }`}
                >
                  {density.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* AI Settings */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white border border-[#E2E8F0] rounded-xl p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Bot className="w-4 h-4 text-[#1E40AF]" />
          <h3 className="text-sm font-semibold text-[#0F172A]">AI能力配置</h3>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-[#475569] mb-1.5 block">AI模型</label>
              <select
                value={settings.aiModel}
                onChange={(e) => setSettings((prev) => ({ ...prev, aiModel: e.target.value }))}
                className="w-full h-10 px-3 text-sm bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:border-[#1E40AF]"
              >
                <option>GPT-4</option>
                <option>GPT-3.5</option>
                <option>Claude</option>
                <option>自定义</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-[#475569] mb-1.5 block">内容长度</label>
              <div className="flex items-center gap-2">
                {([
                  { key: 'concise', label: '精简' },
                  { key: 'detailed', label: '详细' },
                ] as const).map((len) => (
                  <button
                    key={len.key}
                    onClick={() => setSettings((prev) => ({ ...prev, contentLength: len.key }))}
                    className={`flex-1 px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
                      settings.contentLength === len.key
                        ? 'border-[#1E40AF] bg-[#EFF6FF] text-[#1E40AF]'
                        : 'border-[#E2E8F0] text-[#475569] hover:bg-[#F8FAFC]'
                    }`}
                  >
                    {len.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-[#475569] mb-2 block">分析深度</label>
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#94A3B8]">快速</span>
              <input
                type="range"
                min={1}
                max={5}
                value={settings.aiDepth}
                onChange={(e) => setSettings((prev) => ({ ...prev, aiDepth: Number(e.target.value) }))}
                className="flex-1 h-1.5 bg-[#E2E8F0] rounded-full appearance-none cursor-pointer accent-[#1E40AF]"
              />
              <span className="text-xs text-[#94A3B8]">深度</span>
              <span className="text-xs text-[#1E40AF] font-medium w-4">{settings.aiDepth}</span>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-[#475569] mb-2 block">话术风格</label>
            <div className="flex items-center gap-2">
              {([
                { key: 'formal', label: '正式商务' },
                { key: 'friendly', label: '亲和人情' },
                { key: 'minimal', label: '极简干练' },
              ] as const).map((style) => (
                <button
                  key={style.key}
                  onClick={() => setSettings((prev) => ({ ...prev, speechStyle: style.key }))}
                  className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
                    settings.speechStyle === style.key
                      ? 'border-[#1E40AF] bg-[#EFF6FF] text-[#1E40AF]'
                      : 'border-[#E2E8F0] text-[#475569] hover:bg-[#F8FAFC]'
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Notification Settings */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white border border-[#E2E8F0] rounded-xl p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-4 h-4 text-[#1E40AF]" />
          <h3 className="text-sm font-semibold text-[#0F172A]">通知配置</h3>
        </div>
        <div className="space-y-3">
          {([
            { key: 'push', label: '推送通知', desc: '接收系统推送消息' },
            { key: 'email', label: '邮件通知', desc: '重要事件通过邮件发送' },
            { key: 'sms', label: '短信通知', desc: '紧急情况短信提醒' },
            { key: 'browser', label: '浏览器通知', desc: '桌面浏览器弹窗通知' },
            { key: 'aiComplete', label: 'AI任务完成', desc: 'AI分析完成后通知' },
            { key: 'backupComplete', label: '备份完成', desc: '数据备份完成后通知' },
            { key: 'systemAlert', label: '系统告警', desc: '系统异常时通知' },
          ] as const).map((item) => (
            <div key={item.key} className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm text-[#0F172A]">{item.label}</p>
                <p className="text-xs text-[#94A3B8]">{item.desc}</p>
              </div>
              <Switch
                checked={settings.notifications[item.key as keyof typeof settings.notifications] as boolean}
                onChange={(v) => updateNotification(item.key, v)}
              />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ========== Tab 4: Data Backup ========== */
function DataBackupTab() {
  const [autoBackup, setAutoBackup] = useState(backupSettings.autoBackup);
  const [frequency, setFrequency] = useState(backupSettings.frequency);
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [backupProgress, setBackupProgress] = useState(0);

  const startBackup = () => {
    setIsBackingUp(true);
    setBackupProgress(0);
    const interval = setInterval(() => {
      setBackupProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsBackingUp(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success': return <span className="text-xs text-[#10B981] flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> 成功</span>;
      case 'partial': return <span className="text-xs text-[#F59E0B] flex items-center gap-1"><AlertCircle className="w-3 h-3" /> 部分</span>;
      case 'failed': return <span className="text-xs text-[#EF4444] flex items-center gap-1"><XCircle className="w-3 h-3" /> 失败</span>;
      default: return null;
    }
  };

  return (
    <div className="space-y-5">
      {/* Status Cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: '上次备份', value: '2024-01-15 03:00', icon: Clock, color: '#10B981' },
          { label: '备份大小', value: '2.4 GB', icon: HardDrive, color: '#3B82F6' },
          { label: '备份频率', value: '每日自动', icon: Cloud, color: '#1E40AF' },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="bg-white border border-[#E2E8F0] rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <item.icon className="w-4 h-4" style={{ color: item.color }} />
              <span className="text-xs text-[#94A3B8]">{item.label}</span>
            </div>
            <p className="text-lg font-bold text-[#0F172A]">{item.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Backup Actions */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-[#E2E8F0] rounded-xl p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={startBackup}
              disabled={isBackingUp}
              className="flex items-center gap-1.5 h-9 px-4 bg-[#1E40AF] text-white text-sm font-medium rounded-lg hover:bg-[#1D4ED8] disabled:opacity-50 transition-all"
            >
              <Cloud className="w-4 h-4" />
              {isBackingUp ? '备份中...' : '立即备份'}
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-[#475569]">自动备份</span>
            <Switch checked={autoBackup} onChange={setAutoBackup} />
          </div>
        </div>

        {/* Progress Bar */}
        {isBackingUp && (
          <div className="mb-4">
            <div className="w-full h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#1E40AF] rounded-full"
                style={{ width: `${backupProgress}%` }}
              />
            </div>
            <p className="text-xs text-[#94A3B8] mt-1">{backupProgress}%</p>
          </div>
        )}

        {/* Backup Settings */}
        {autoBackup && (
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#F1F5F9]">
            <div>
              <label className="text-xs font-medium text-[#475569] mb-1.5 block">备份频率</label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full h-10 px-3 text-sm bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:border-[#1E40AF]"
              >
                <option value="hourly">每小时</option>
                <option value="6hours">每6小时</option>
                <option value="daily">每日</option>
                <option value="weekly">每周</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-[#475569] mb-1.5 block">备份时间</label>
              <input
                type="time"
                defaultValue="03:00"
                className="w-full h-10 px-3 text-sm bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:border-[#1E40AF]"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-[#475569] mb-1.5 block">保留份数</label>
              <input
                type="number"
                defaultValue={30}
                className="w-full h-10 px-3 text-sm bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:border-[#1E40AF]"
              />
            </div>
          </div>
        )}
      </motion.div>

      {/* Backup History */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white border border-[#E2E8F0] rounded-xl p-5"
      >
        <h3 className="text-sm font-semibold text-[#0F172A] mb-3">备份历史</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
                <th className="text-left text-xs font-medium text-[#475569] py-2.5 px-3">备份时间</th>
                <th className="text-left text-xs font-medium text-[#475569] py-2.5 px-3">类型</th>
                <th className="text-left text-xs font-medium text-[#475569] py-2.5 px-3">大小</th>
                <th className="text-left text-xs font-medium text-[#475569] py-2.5 px-3">状态</th>
                <th className="text-left text-xs font-medium text-[#475569] py-2.5 px-3">操作</th>
              </tr>
            </thead>
            <tbody>
              {backupRecords.map((record) => (
                <tr key={record.id} className="border-b border-[#F1F5F9] hover:bg-[#F8FAFC]">
                  <td className="text-xs text-[#475569] py-2.5 px-3">{record.date}</td>
                  <td className="text-xs text-[#475569] py-2.5 px-3">{record.type}</td>
                  <td className="text-xs text-[#475569] py-2.5 px-3 font-mono">{record.size}</td>
                  <td className="py-2.5 px-3">{getStatusBadge(record.status)}</td>
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-1">
                      <button className="p-1 rounded hover:bg-[#F1F5F9] text-[#475569]" title="下载">
                        <Download className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1 rounded hover:bg-[#EFF6FF] text-[#1E40AF]" title="恢复">
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

/* ========== Tab 5: Operation Logs ========== */
function OperationLogsTab() {
  const [typeFilter, setTypeFilter] = useState('全部');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const logTypes = ['全部', '数据操作', 'AI分析', '系统配置', '登录', '导出', '用户管理'];

  const filteredLogs = operationLogs.filter((log) => {
    const typeMatch = typeFilter === '全部' || log.type === typeFilter;
    return typeMatch;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case '数据操作': return 'bg-[#EFF6FF] text-[#1E40AF]';
      case 'AI分析': return 'bg-[#F0FDF4] text-[#166534]';
      case '系统配置': return 'bg-[#FEF3C7] text-[#92400E]';
      case '登录': return 'bg-[#F1F5F9] text-[#475569]';
      case '导出': return 'bg-[#F5F3FF] text-[#6D28D9]';
      case '用户管理': return 'bg-[#FFF7ED] text-[#C2410C]';
      default: return 'bg-[#F1F5F9] text-[#475569]';
    }
  };

  return (
    <div className="space-y-5">
      {/* Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-[#E2E8F0] rounded-xl p-4"
      >
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#94A3B8]" />
            <span className="text-xs font-medium text-[#475569]">操作类型</span>
          </div>
          {logTypes.map((type) => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`text-xs font-medium px-2.5 py-1 rounded-full transition-colors ${
                typeFilter === type
                  ? 'bg-[#1E40AF] text-white'
                  : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
              }`}
            >
              {type}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2">
            <button className="flex items-center gap-1.5 text-xs text-[#475569] px-3 py-1.5 border border-[#E2E8F0] rounded-lg hover:bg-[#F8FAFC]">
              <Download className="w-3 h-3" />
              导出
            </button>
          </div>
        </div>
      </motion.div>

      {/* Log Table */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-[#E2E8F0] rounded-xl p-5"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
                <th className="text-left text-xs font-medium text-[#475569] py-2.5 px-3">操作时间</th>
                <th className="text-left text-xs font-medium text-[#475569] py-2.5 px-3">操作人</th>
                <th className="text-left text-xs font-medium text-[#475569] py-2.5 px-3">操作类型</th>
                <th className="text-left text-xs font-medium text-[#475569] py-2.5 px-3">操作对象</th>
                <th className="text-left text-xs font-medium text-[#475569] py-2.5 px-3">操作详情</th>
                <th className="text-left text-xs font-medium text-[#475569] py-2.5 px-3">IP地址</th>
                <th className="text-left text-xs font-medium text-[#475569] py-2.5 px-3">结果</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <>
                  <tr
                    key={log.id}
                    className="border-b border-[#F1F5F9] hover:bg-[#F8FAFC] cursor-pointer"
                    onClick={() => setExpandedRow(expandedRow === log.id ? null : log.id)}
                  >
                    <td className="text-xs text-[#475569] py-2.5 px-3 whitespace-nowrap">{log.time}</td>
                    <td className="text-xs text-[#0F172A] py-2.5 px-3 font-medium">{log.operator}</td>
                    <td className="py-2.5 px-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getTypeColor(log.type)}`}>
                        {log.type}
                      </span>
                    </td>
                    <td className="text-xs text-[#475569] py-2.5 px-3">{log.target}</td>
                    <td className="text-xs text-[#475569] py-2.5 px-3 max-w-[200px] truncate">{log.detail}</td>
                    <td className="text-xs text-[#475569] py-2.5 px-3 font-mono">{log.ip}</td>
                    <td className="py-2.5 px-3">
                      {log.result === 'success' ? (
                        <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                      ) : (
                        <XCircle className="w-4 h-4 text-[#EF4444]" />
                      )}
                    </td>
                  </tr>
                  <AnimatePresence>
                    {expandedRow === log.id && (
                      <motion.tr
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <td colSpan={7} className="px-3 py-3 bg-[#F8FAFC]">
                          <div className="text-xs text-[#475569] font-mono bg-white border border-[#E2E8F0] rounded-lg p-3">
                            <p className="text-[#94A3B8] mb-1">操作参数详情:</p>
                            <pre className="text-[11px] overflow-x-auto">
                              {JSON.stringify({ id: log.id, operator: log.operator, type: log.type, target: log.target, detail: log.detail, ip: log.ip, time: log.time, result: log.result }, null, 2)}
                            </pre>
                          </div>
                        </td>
                      </motion.tr>
                    )}
                  </AnimatePresence>
                </>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#F1F5F9]">
          <span className="text-xs text-[#94A3B8]">共 {filteredLogs.length} 条记录</span>
          <div className="flex items-center gap-1">
            <button className="px-2 py-1 text-xs text-[#475569] border border-[#E2E8F0] rounded hover:bg-[#F8FAFC]">上一页</button>
            <button className="px-2 py-1 text-xs bg-[#1E40AF] text-white rounded">1</button>
            <button className="px-2 py-1 text-xs text-[#475569] border border-[#E2E8F0] rounded hover:bg-[#F8FAFC]">下一页</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ========== Tab 6: Deployment Config ========== */
function DeploymentConfigTab() {
  const [config, setConfig] = useState(deploymentConfig);
  const [saved, setSaved] = useState(false);

  const updateFeature = (key: string, value: boolean) => {
    setConfig((prev) => ({ ...prev, features: { ...prev.features, [key]: value } }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleRestore = () => {
    setConfig(deploymentConfig);
    setSaved(false);
  };

  return (
    <div className="space-y-5">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-[#E2E8F0] rounded-xl p-6"
      >
        <div className="flex items-center gap-2 mb-5">
          <Server className="w-5 h-5 text-[#1E40AF]" />
          <h3 className="text-base font-semibold text-[#0F172A]">部署配置</h3>
        </div>

        <div className="space-y-4">
          {/* API Endpoint */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-[#475569] mb-1.5 block">API 端点</label>
              <input
                type="text"
                value={config.apiEndpoint}
                onChange={(e) => { setConfig((p) => ({ ...p, apiEndpoint: e.target.value })); setSaved(false); }}
                className="w-full h-10 px-3 text-sm bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:border-[#1E40AF] focus:ring-2 focus:ring-[#1E40AF]/20"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-[#475569] mb-1.5 block">服务端口号</label>
              <input
                type="text"
                value={config.port}
                onChange={(e) => { setConfig((p) => ({ ...p, port: e.target.value })); setSaved(false); }}
                className="w-full h-10 px-3 text-sm bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:border-[#1E40AF] focus:ring-2 focus:ring-[#1E40AF]/20"
              />
            </div>
          </div>

          {/* Database */}
          <div className="pt-4 border-t border-[#F1F5F9]">
            <h4 className="text-xs font-semibold text-[#0F172A] mb-3">数据库连接</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-[#475569] mb-1.5 block">数据库主机</label>
                <input
                  type="text"
                  value={config.dbHost}
                  onChange={(e) => { setConfig((p) => ({ ...p, dbHost: e.target.value })); setSaved(false); }}
                  className="w-full h-10 px-3 text-sm bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:border-[#1E40AF]"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-[#475569] mb-1.5 block">数据库端口</label>
                <input
                  type="text"
                  value={config.dbPort}
                  onChange={(e) => { setConfig((p) => ({ ...p, dbPort: e.target.value })); setSaved(false); }}
                  className="w-full h-10 px-3 text-sm bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:border-[#1E40AF]"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-[#475569] mb-1.5 block">数据库名称</label>
                <input
                  type="text"
                  value={config.dbName}
                  onChange={(e) => { setConfig((p) => ({ ...p, dbName: e.target.value })); setSaved(false); }}
                  className="w-full h-10 px-3 text-sm bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:border-[#1E40AF]"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-[#475569] mb-1.5 block">数据库用户</label>
                <input
                  type="text"
                  value={config.dbUser}
                  onChange={(e) => { setConfig((p) => ({ ...p, dbUser: e.target.value })); setSaved(false); }}
                  className="w-full h-10 px-3 text-sm bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:border-[#1E40AF]"
                />
              </div>
            </div>
          </div>

          {/* Feature Toggles */}
          <div className="pt-4 border-t border-[#F1F5F9]">
            <h4 className="text-xs font-semibold text-[#0F172A] mb-3">功能开关</h4>
            <div className="space-y-3">
              {([
                { key: 'registration', label: '注册开关', desc: '允许新用户注册' },
                { key: 'guestMode', label: '游客模式', desc: '允许未登录用户浏览部分功能' },
                { key: 'cloudSync', label: '云端同步', desc: '数据自动同步到云端' },
              ] as const).map((feature) => (
                <div key={feature.key} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#0F172A]">{feature.label}</p>
                    <p className="text-xs text-[#94A3B8]">{feature.desc}</p>
                  </div>
                  <Switch
                    checked={config.features[feature.key as keyof typeof config.features] as boolean}
                    onChange={(v) => updateFeature(feature.key, v)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4 border-t border-[#F1F5F9]">
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 h-9 px-4 bg-[#1E40AF] text-white text-sm font-medium rounded-lg hover:bg-[#1D4ED8] transition-all"
            >
              <Save className="w-4 h-4" />
              保存配置
            </button>
            <button
              onClick={handleRestore}
              className="flex items-center gap-1.5 h-9 px-4 border border-[#E2E8F0] text-[#475569] text-sm font-medium rounded-lg hover:bg-[#F8FAFC] transition-all"
            >
              <RestoreIcon className="w-4 h-4" />
              恢复默认
            </button>
            {saved && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-[#10B981] flex items-center gap-1"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                已保存
              </motion.span>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ========== Main Settings Page ========== */
export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('account');

  const renderTab = () => {
    switch (activeTab) {
      case 'account': return <AccountSecurityTab />;
      case 'permissions': return <PermissionManagementTab />;
      case 'global': return <GlobalConfigTab />;
      case 'backup': return <DataBackupTab />;
      case 'logs': return <OperationLogsTab />;
      case 'deploy': return <DeploymentConfigTab />;
      default: return <AccountSecurityTab />;
    }
  };

  return (
    <PageLayout title="系统设置" breadcrumb="系统设置">
      <div className="space-y-5">
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
    </PageLayout>
  );
}
