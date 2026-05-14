import Layout from '@/components/Layout';

export default function Voice() {
  return (
    <Layout title="语音信息采集" breadcrumb="语音信息采集">
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-[#EFF6FF] flex items-center justify-center mb-4">
          <span className="text-3xl text-[#1E40AF]">🎙️</span>
        </div>
        <h2 className="text-xl font-semibold text-[#0F172A] mb-2">语音信息采集 - Voice Info Collection</h2>
        <p className="text-sm text-[#94A3B8] max-w-md">
          该模块正在开发中，将提供AI语音识别与客户信息采集功能。
        </p>
      </div>
    </Layout>
  );
}
