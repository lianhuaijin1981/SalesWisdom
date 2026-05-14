import Layout from '@/components/Layout';

export default function Topics() {
  return (
    <Layout title="谈资话术" breadcrumb="谈资话术">
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-[#ECFEFF] flex items-center justify-center mb-4">
          <span className="text-3xl text-[#06B6D4]">💬</span>
        </div>
        <h2 className="text-xl font-semibold text-[#0F172A] mb-2">专属谈资与话术 - Topics & Scripts</h2>
        <p className="text-sm text-[#94A3B8] max-w-md">
          该模块正在开发中，将提供AI生成行业话题与销售话术功能。
        </p>
      </div>
    </Layout>
  );
}
