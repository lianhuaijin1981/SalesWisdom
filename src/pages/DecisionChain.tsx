import Layout from '@/components/Layout';

export default function DecisionChain() {
  return (
    <Layout title="决策链图谱" breadcrumb="决策链图谱">
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-[#FEF2F2] flex items-center justify-center mb-4">
          <span className="text-3xl text-[#EF4444]">🕸️</span>
        </div>
        <h2 className="text-xl font-semibold text-[#0F172A] mb-2">决策链关系图谱 - Decision Chain Graph</h2>
        <p className="text-sm text-[#94A3B8] max-w-md">
          该模块正在开发中，将提供决策链人际关系网络可视化功能。
        </p>
      </div>
    </Layout>
  );
}
