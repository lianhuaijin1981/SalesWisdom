import Layout from '@/components/Layout';

export default function Customer() {
  return (
    <Layout title="客户分析" breadcrumb="客户分析">
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-[#FAF5FF] flex items-center justify-center mb-4">
          <span className="text-3xl text-[#8B5CF6]">👤</span>
        </div>
        <h2 className="text-xl font-semibold text-[#0F172A] mb-2">客户多维分析 - Customer Analysis</h2>
        <p className="text-sm text-[#94A3B8] max-w-md">
          该模块正在开发中，将提供客户画像与多维特征分析功能。
        </p>
      </div>
    </Layout>
  );
}
