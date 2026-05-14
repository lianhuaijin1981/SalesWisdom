import Layout from '@/components/Layout';

export default function SettingsPage() {
  return (
    <Layout title="系统设置" breadcrumb="系统设置">
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-[#F8FAFC] flex items-center justify-center mb-4">
          <span className="text-3xl text-[#64748B]">⚙️</span>
        </div>
        <h2 className="text-xl font-semibold text-[#0F172A] mb-2">系统总控配置 - System Settings</h2>
        <p className="text-sm text-[#94A3B8] max-w-md">
          该模块正在开发中，将提供权限管理与系统配置功能。
        </p>
      </div>
    </Layout>
  );
}
