import Layout from '@/components/Layout';

export default function Archive() {
  return (
    <Layout title="三档案管理" breadcrumb="三档案管理">
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-[#F0FDF4] flex items-center justify-center mb-4">
          <span className="text-3xl text-[#10B981]">📁</span>
        </div>
        <h2 className="text-xl font-semibold text-[#0F172A] mb-2">三档案智能建档 - Three-Archive Management</h2>
        <p className="text-sm text-[#94A3B8] max-w-md">
          该模块正在开发中，将提供客户/企业/项目档案智能建档功能。
        </p>
      </div>
    </Layout>
  );
}
