import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import {
  Brain,
  Mic,
  Users,
  TrendingUp,
  User,
  Lock,
  Eye,
  EyeOff,
  MessageSquare,
} from 'lucide-react';

const featureHighlights = [
  { icon: Mic, title: '语音智能采集', description: 'AI语音识别与信息自动提取' },
  { icon: Users, title: '三档案管理', description: '客户/企业/项目档案智能建档' },
  { icon: Brain, title: 'AI策略引擎', description: '行业洞察与攻坚策略生成' },
  { icon: TrendingUp, title: '能力成长体系', description: '多维度销售能力测评与提升' },
];

const stats = [
  { number: '9', label: '智能子系统' },
  { number: '360°', label: '客户全景分析' },
  { number: '10x', label: '跟进效率提升' },
];

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('请输入用户名');
      return;
    }
    if (!password.trim()) {
      setError('请输入密码');
      return;
    }

    setLoading(true);
    // Simulate login
    setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <div className="min-h-[100dvh] flex">
      {/* Left Panel - Brand */}
      <div
        className="hidden md:flex w-[55%] flex-col relative overflow-hidden"
        style={{ background: '#0F172A' }}
      >
        {/* Decorative gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 30% 50%, rgba(30,64,175,0.3) 0%, transparent 60%)',
          }}
        />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3 p-10">
          <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#1E40AF]">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-[22px] font-bold text-white tracking-wide">SalesWisdom</h2>
            <p className="text-sm text-[#94A3B8]">销售客户跟进智能助手</p>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-10 max-w-[520px]">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[32px] font-bold text-white leading-tight"
          >
            让每一次客户跟进都更有智慧
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-4 text-base text-[#CBD5E1] leading-relaxed max-w-[420px]"
          >
            AI驱动的B2B销售全流程管理，从信息采集到策略生成，全方位赋能销售团队
          </motion.p>

          {/* Feature Highlights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="mt-12 grid grid-cols-2 gap-4"
          >
            {featureHighlights.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.08 }}
                className="p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
              >
                <feature.icon className="w-6 h-6 text-[#38BDF8] mb-3" />
                <h3 className="text-[15px] font-semibold text-white mb-1">{feature.title}</h3>
                <p className="text-[13px] text-[#94A3B8]">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="relative z-10 flex items-center p-10 border-t border-white/10"
        >
          {stats.map((stat, index) => (
            <div key={stat.label} className="flex items-center">
              <div className="px-8">
                <p className="text-[28px] font-bold text-white">{stat.number}</p>
                <p className="text-[13px] text-[#94A3B8] mt-0.5">{stat.label}</p>
              </div>
              {index < stats.length - 1 && (
                <div className="w-px h-10 bg-white/10" />
              )}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center bg-white">
        {/* Mobile logo strip */}
        <div className="md:hidden absolute top-0 left-0 right-0 h-20 bg-[#0F172A] flex items-center justify-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#1E40AF]">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">SalesWisdom</h2>
            <p className="text-xs text-[#94A3B8]">销售客户跟进智能助手</p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-[400px] px-6 md:px-12"
        >
          <div className="mb-8">
            <h2 className="text-[28px] font-bold text-[#0F172A] mb-2">欢迎回来</h2>
            <p className="text-sm text-[#94A3B8]">请登录您的SalesWisdom账号</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-[#FEF2F2] border border-[#FECACA] rounded-lg text-sm text-[#EF4444]"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-[#475569] mb-1.5">
                用户名 / 邮箱
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="请输入用户名或邮箱"
                  className="w-full h-11 pl-10 pr-4 text-sm bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#1E40AF] focus:ring-2 focus:ring-[#1E40AF]/20 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-[#475569] mb-1.5">
                密码
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="请输入密码"
                  className="w-full h-11 pl-10 pr-10 text-sm bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#1E40AF] focus:ring-2 focus:ring-[#1E40AF]/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#475569] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Options Row */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-[#E2E8F0] text-[#1E40AF] focus:ring-[#1E40AF]/20"
                />
                <span className="text-[13px] text-[#475569]">记住我</span>
              </label>
              <button type="button" className="text-[13px] text-[#1E40AF] hover:underline">
                忘记密码？
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-[#1E40AF] text-white text-base font-semibold rounded-lg hover:bg-[#1D4ED8] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  登录中...
                </>
              ) : (
                '登 录'
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-1">
              <div className="flex-1 h-px bg-[#E2E8F0]" />
              <span className="text-[13px] text-[#94A3B8]">或</span>
              <div className="flex-1 h-px bg-[#E2E8F0]" />
            </div>

            {/* Enterprise SSO */}
            <button
              type="button"
              className="w-full h-11 flex items-center justify-center gap-2 bg-white border border-[#E2E8F0] text-[#475569] text-sm font-medium rounded-lg hover:bg-[#F8FAFC] transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              企业微信登录
            </button>
          </form>

          {/* Footer */}
          <p className="mt-8 text-center text-[13px] text-[#94A3B8]">
            还没有账号？
            <button type="button" className="text-[#1E40AF] hover:underline ml-1">
              联系管理员开通
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
