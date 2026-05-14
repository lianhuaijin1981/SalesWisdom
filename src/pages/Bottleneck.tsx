import Layout from '@/components/Layout';

export default function Bottleneck() {
  return (
    <Layout title="瓶颈攻坚" breadcrumb="瓶颈攻坚">
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-[#FDF2F8] flex items-center justify-center mb-4">
          <span className="text-3xl text-[#EC4899]">🎯</span>
        </div>
        <h2 className="text-xl font-semibold text-[#0F172A] mb-2">项目瓶颈与攻坚 - Bottleneck Strategy</h2>
        <p className="text-sm text-[#94A3B8] max-w-md">
          该模块正在开发中，将提供项目瓶颈识别与突破策略功能。
        </p>
      </div>
    </Layout>
  );
}
