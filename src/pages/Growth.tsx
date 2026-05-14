import Layout from '@/components/Layout';

export default function Growth() {
  return (
    <Layout title="能力成长" breadcrumb="能力成长">
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-[#F0FDFA] flex items-center justify-center mb-4">
          <span className="text-3xl text-[#14B8A6]">📈</span>
        </div>
        <h2 className="text-xl font-semibold text-[#0F172A] mb-2">销售能力测评 - Sales Growth</h2>
        <p className="text-sm text-[#94A3B8] max-w-md">
          该模块正在开发中，将提供销售能力多维度评估与提升功能。
        </p>
      </div>
    </Layout>
  );
}
