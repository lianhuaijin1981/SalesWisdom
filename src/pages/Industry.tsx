import Layout from '@/components/Layout';

export default function Industry() {
  return (
    <Layout title="行业洞察" breadcrumb="行业洞察">
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-[#FFFBEB] flex items-center justify-center mb-4">
          <span className="text-3xl text-[#F59E0B]">📊</span>
        </div>
        <h2 className="text-xl font-semibold text-[#0F172A] mb-2">行业洞察与战略 - Industry Insights</h2>
        <p className="text-sm text-[#94A3B8] max-w-md">
          该模块正在开发中，将提供行业分析与战略需求诊断功能。
        </p>
      </div>
    </Layout>
  );
}
