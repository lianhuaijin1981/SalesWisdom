import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Building2, Heart, Copy, Check, Sparkles,
  Star, ChevronDown, ChevronUp, RefreshCw, Clock,
  Coffee, Landmark, Activity, BookOpen as BookIcon,
  Camera, Music, Baby, AlertTriangle, Shield,
  MessageSquare, X, Zap, Globe, Users,
} from 'lucide-react';
import Layout from '@/components/Layout';
import {
  industryTopics, historicalTopics, companyNews,
  personalInterests, iceBreakingScripts, tabooTopics,
  typeColors, categoryColors,
} from '@/data/topicsMockData';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const tabs = [
  { key: 'industry', label: '行业商务谈资', icon: BookOpen },
  { key: 'company', label: '企业动态谈资', icon: Building2 },
  { key: 'personal', label: '个人兴趣谈资', icon: Heart },
] as const;

const interestIconMap: Record<string, React.ElementType> = {
  Coffee, Landmark, Activity, BookIcon, Camera, Music, Baby,
};

// ============ Industry Topics Tab ============
function IndustryTopics() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const copyTopic = useCallback((content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  }, []);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#F59E0B]" />
          <h3 className="text-lg font-semibold text-[#0F172A]">推荐话题</h3>
          <span className="text-xs px-2 py-1 rounded-full bg-[#DBEAFE] text-[#1E40AF] font-medium">AI生成</span>
        </div>
        <button className="flex items-center gap-1.5 text-xs text-[#1E40AF] hover:bg-[#EFF6FF] px-3 py-1.5 rounded-lg transition-colors">
          <RefreshCw className="w-3.5 h-3.5" />
          刷新最新谈资
        </button>
      </div>

      {/* Topic Cards */}
      <div className="grid grid-cols-2 gap-4">
        {industryTopics.map((topic, i) => {
          const typeColor = typeColors[topic.type] || typeColors['行业'];
          const isFav = favorites.has(topic.id);
          return (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.4, ease }}
              className="bg-white rounded-xl border border-[#E2E8F0] p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ backgroundColor: typeColor.bg, color: typeColor.text }}>
                    {topic.type}
                  </span>
                  {topic.isNew && (
                    <span className="flex items-center gap-1 text-xs text-[#1E40AF]">
                      <span className="w-2 h-2 rounded-full bg-[#1E40AF]" />
                      新
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleFavorite(topic.id)}
                    className="p-1.5 hover:bg-[#F1F5F9] rounded-md transition-colors"
                  >
                    <Star className={`w-4 h-4 ${isFav ? 'text-[#F59E0B] fill-[#F59E0B]' : 'text-[#CBD5E1]'}`} />
                  </button>
                  <button
                    onClick={() => copyTopic(topic.content, topic.id)}
                    className="p-1.5 hover:bg-[#F1F5F9] rounded-md transition-colors"
                  >
                    {copied === topic.id ? (
                      <Check className="w-4 h-4 text-[#10B981]" />
                    ) : (
                      <Copy className="w-4 h-4 text-[#94A3B8]" />
                    )}
                  </button>
                </div>
              </div>
              <h4 className="text-base font-semibold text-[#0F172A] mb-2">{topic.title}</h4>
              <p className="text-sm text-[#475569] leading-relaxed">{topic.content}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Historical Topics */}
      <div className="mt-6">
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="flex items-center gap-2 text-sm text-[#475569] hover:text-[#1E40AF] transition-colors mb-3"
        >
          <Clock className="w-4 h-4" />
          历史谈资
          {showHistory ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        <AnimatePresence>
          {showHistory && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-3 gap-3">
                {historicalTopics.map((topic) => {
                  const typeColor = typeColors[topic.type] || typeColors['行业'];
                  return (
                    <div key={topic.id} className="bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] p-3">
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: typeColor.bg, color: typeColor.text }}>
                        {topic.type}
                      </span>
                      <p className="text-sm font-medium text-[#0F172A] mt-2">{topic.title}</p>
                      <p className="text-xs text-[#94A3B8] mt-1 line-clamp-2">{topic.content}</p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ============ Company News Tab ============
function CompanyNews() {
  const [expandedNews, setExpandedNews] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-[#F59E0B]" />
        <h3 className="text-lg font-semibold text-[#0F172A]">华夏科技最新动态</h3>
        <span className="text-xs px-2 py-1 rounded-full bg-[#DBEAFE] text-[#1E40AF] font-medium">AI自动采集</span>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-[#E2E8F0]" />

        <div className="space-y-4">
          {companyNews.map((news, i) => {
            const isExpanded = expandedNews === news.id;
            const catColor = categoryColors[news.category] || categoryColors['战略动作'];
            return (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4, ease }}
                className="relative pl-10"
              >
                {/* Timeline dot */}
                <div className="absolute left-1.5 top-3 w-3 h-3 rounded-full bg-[#1E40AF] border-2 border-white shadow-sm z-10" />

                {/* Date */}
                <span className="text-xs text-[#94A3B8] mb-1 block">{news.date}</span>

                {/* Card */}
                <div
                  className="bg-white rounded-xl border border-[#E2E8F0] p-4 cursor-pointer hover:shadow-md transition-all"
                  onClick={() => setExpandedNews(isExpanded ? null : news.id)}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: catColor.bg, color: catColor.text }}>
                      {news.category}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-[#0F172A] mb-1">{news.title}</h4>
                  <p className="text-sm text-[#475569] leading-relaxed">{news.summary}</p>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 pt-3 border-t border-[#E2E8F0]">
                          <div className="flex items-start gap-2 p-3 bg-[#EFF6FF] rounded-lg">
                            <Zap className="w-4 h-4 text-[#1E40AF] mt-0.5 shrink-0" />
                            <div>
                              <span className="text-xs font-medium text-[#1E40AF]">切入角度: </span>
                              <span className="text-xs text-[#475569]">{news.talkingAngle}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-[#94A3B8]">相关度: 85%+</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-[#94A3B8]" /> : <ChevronDown className="w-4 h-4 text-[#94A3B8]" />}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============ Personal Interests Tab ============
function PersonalInterests() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyTalkingPoint = useCallback((point: string, id: string) => {
    navigator.clipboard.writeText(point);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  }, []);

  const publicInterests = personalInterests.filter((p) => p.visibility === '公开');
  const privateInterests = personalInterests.filter((p) => p.visibility === '私下');

  return (
    <div className="space-y-6">
      {/* Interest Profile Summary */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-5">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-[#F59E0B]" />
          <h3 className="text-lg font-semibold text-[#0F172A]">张明德的兴趣画像</h3>
          <span className="text-xs px-2 py-1 rounded-full bg-[#DBEAFE] text-[#1E40AF] font-medium">AI分析</span>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {personalInterests.map((interest, i) => {
            const Icon = interestIconMap[interest.icon] || Heart;
            return (
              <motion.div
                key={interest.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.06, duration: 0.4, ease }}
                className="text-center p-3 bg-[#F8FAFC] rounded-xl hover:bg-[#EFF6FF] transition-colors cursor-pointer"
              >
                <Icon className="w-6 h-6 text-[#1E40AF] mx-auto mb-2" />
                <p className="text-sm font-medium text-[#0F172A]">{interest.name}</p>
                <p className="text-xs text-[#94A3B8] mt-1">置信度 {interest.confidence}%</p>
                <div className="w-full h-1.5 bg-[#E2E8F0] rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-[#1E40AF] rounded-full transition-all"
                    style={{ width: `${interest.confidence}%` }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Public Interests */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Globe className="w-4 h-4 text-[#10B981]" />
          <h4 className="text-sm font-semibold text-[#0F172A]">适合公开聊</h4>
          <span className="text-xs text-[#94A3B8]">初次见面、商务场合均可使用</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {publicInterests.map((interest, i) => {
            const Icon = interestIconMap[interest.icon] || Heart;
            return (
              <motion.div
                key={interest.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4, ease }}
                className="bg-white rounded-xl border border-[#E2E8F0] p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-4 h-4 text-[#1E40AF]" />
                  <h5 className="text-sm font-semibold text-[#0F172A]">{interest.name}</h5>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#F0FDF4] text-[#166534]">公开</span>
                </div>
                <p className="text-xs text-[#94A3B8] mb-3">{interest.description}</p>
                <div className="space-y-2">
                  {interest.talkingPoints.map((point, j) => (
                    <div key={j} className="flex items-center justify-between p-2 bg-[#F8FAFC] rounded-lg">
                      <span className="text-xs text-[#475569]">{point}</span>
                      <button
                        onClick={() => copyTalkingPoint(point, `${interest.id}-${j}`)}
                        className="p-1 hover:bg-[#E2E8F0] rounded transition-colors"
                      >
                        {copied === `${interest.id}-${j}` ? (
                          <Check className="w-3 h-3 text-[#10B981]" />
                        ) : (
                          <Copy className="w-3 h-3 text-[#94A3B8]" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Private Interests */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Users className="w-4 h-4 text-[#F59E0B]" />
          <h4 className="text-sm font-semibold text-[#0F172A]">仅私下聊</h4>
          <span className="text-xs text-[#94A3B8]">需建立一定信任后使用</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {privateInterests.map((interest, i) => {
            const Icon = interestIconMap[interest.icon] || Heart;
            return (
              <motion.div
                key={interest.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4, ease }}
                className="bg-white rounded-xl border border-[#E2E8F0] p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-4 h-4 text-[#F59E0B]" />
                  <h5 className="text-sm font-semibold text-[#0F172A]">{interest.name}</h5>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#FEF3C7] text-[#92400E]">私下</span>
                </div>
                <p className="text-xs text-[#94A3B8] mb-2">{interest.description}</p>
                <div className="space-y-1.5">
                  {interest.talkingPoints.map((point, j) => (
                    <div key={j} className="flex items-center justify-between p-1.5 bg-[#F8FAFC] rounded">
                      <span className="text-xs text-[#475569]">{point}</span>
                      <button
                        onClick={() => copyTalkingPoint(point, `${interest.id}-${j}`)}
                        className="p-1 hover:bg-[#E2E8F0] rounded transition-colors"
                      >
                        {copied === `${interest.id}-${j}` ? (
                          <Check className="w-3 h-3 text-[#10B981]" />
                        ) : (
                          <Copy className="w-3 h-3 text-[#94A3B8]" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============ Ice Breaking Scripts Section ============
function IceBreakingScripts() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyScript = useCallback((content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  }, []);

  const sceneIcons: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
    '微信话术': { icon: MessageSquare, color: '#10B981', bg: '#F0FDF4' },
    '见面话术': { icon: Users, color: '#3B82F6', bg: '#EFF6FF' },
    '长期维系话术': { icon: Heart, color: '#F59E0B', bg: '#FEF3C7' },
  };

  const grouped = {
    '微信话术': iceBreakingScripts.filter((s) => s.scene === '微信话术'),
    '见面话术': iceBreakingScripts.filter((s) => s.scene === '见面话术'),
    '长期维系话术': iceBreakingScripts.filter((s) => s.scene === '长期维系话术'),
  };

  return (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="w-5 h-5 text-[#1E40AF]" />
        <h3 className="text-lg font-semibold text-[#0F172A]">破冰话术</h3>
        <span className="text-xs px-2 py-1 rounded-full bg-[#DBEAFE] text-[#1E40AF] font-medium">AI生成</span>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {Object.entries(grouped).map(([scene, scripts]) => {
          const config = sceneIcons[scene] || sceneIcons['微信话术'];
          const Icon = config.icon;
          return (
            <div key={scene} className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[#E2E8F0]" style={{ backgroundColor: config.bg }}>
                <Icon className="w-4 h-4" style={{ color: config.color }} />
                <h4 className="text-sm font-semibold" style={{ color: config.color }}>{scene}</h4>
              </div>
              <div className="p-4 space-y-3">
                {scripts.map((script) => (
                  <div key={script.id} className="group">
                    <p className="text-xs font-medium text-[#475569] mb-1.5">{script.title}</p>
                    <div className="relative bg-[#F8FAFC] rounded-lg p-3">
                      <p className="text-xs text-[#475569] leading-relaxed">{script.content}</p>
                      <button
                        onClick={() => copyScript(script.content, script.id)}
                        className="absolute top-2 right-2 p-1 opacity-0 group-hover:opacity-100 hover:bg-[#E2E8F0] rounded transition-all"
                      >
                        {copied === script.id ? (
                          <Check className="w-3 h-3 text-[#10B981]" />
                        ) : (
                          <Copy className="w-3 h-3 text-[#94A3B8]" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============ Taboo Topics Section ============
function TabooTopics() {
  return (
    <div className="mt-8 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="w-5 h-5 text-[#EF4444]" />
        <h3 className="text-lg font-semibold text-[#0F172A]">话题禁忌清单</h3>
      </div>

      <div className="bg-[#FEF2F2] rounded-xl border border-[#FECACA] p-5">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-4 h-4 text-[#EF4444]" />
          <p className="text-sm font-medium text-[#EF4444]">以下话题在沟通中应避免提及</p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {tabooTopics.map((taboo, i) => (
            <motion.div
              key={taboo.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.3 }}
              className="bg-white rounded-lg border border-[#FECACA] p-3"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <X className="w-3.5 h-3.5 text-[#EF4444] shrink-0" />
                <p className="text-sm font-medium text-[#0F172A]">{taboo.topic}</p>
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed">{taboo.reason}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ Right Panel ============
function TopicsRightPanel() {
  const [quickCopied, setQuickCopied] = useState<string | null>(null);

  const copyQuick = useCallback((text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setQuickCopied(id);
    setTimeout(() => setQuickCopied(null), 2000);
  }, []);

  const quickScripts = [
    { id: 'qs1', label: '开场白', text: '陈总您好，非常感谢您能抽出时间。我了解到华夏科技最近在智能风控领域又取得了新的突破，真是了不起的成绩。' },
    { id: 'qs2', label: '话题切入', text: '最近AI Agent在企业办公场景的落地引起了很多讨论，不知道您那边有没有关注到这方面的进展？' },
    { id: 'qs3', label: '价值呈现', text: '我们最近帮助一家跟华夏科技情况很相似的企业完成了数字化转型，整体效率提升了40%以上。' },
    { id: 'qs4', label: '收尾邀约', text: '陈总，感谢您今天的时间。我整理一份更详细的方案发给您，下周我再跟您约个时间详细聊聊，您看方便吗？' },
  ];

  return (
    <div className="p-4 space-y-4">
      {/* Quick Script Entry */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-4">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-[#F59E0B]" />
          <h4 className="text-sm font-semibold text-[#0F172A]">快捷话术入口</h4>
        </div>
        <div className="space-y-2">
          {quickScripts.map((qs) => (
            <div key={qs.id} className="group relative p-3 bg-[#F8FAFC] rounded-lg hover:bg-[#EFF6FF] transition-colors cursor-pointer"
              onClick={() => copyQuick(qs.text, qs.id)}>
              <p className="text-xs font-medium text-[#1E40AF] mb-1">{qs.label}</p>
              <p className="text-xs text-[#475569] leading-relaxed line-clamp-3">{qs.text}</p>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {quickCopied === qs.id ? (
                  <Check className="w-3.5 h-3.5 text-[#10B981]" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-[#94A3B8]" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Taboo Quick Entry */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-4">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-4 h-4 text-[#EF4444]" />
          <h4 className="text-sm font-semibold text-[#0F172A]">话题禁忌快捷入口</h4>
        </div>
        <div className="p-3 bg-[#FEF2F2] rounded-lg border border-[#FECACA]">
          <p className="text-xs text-[#EF4444] leading-relaxed mb-2">沟通中请避免以下话题:</p>
          <div className="space-y-1">
            {tabooTopics.slice(0, 4).map((t) => (
              <div key={t.id} className="flex items-center gap-1.5">
                <X className="w-3 h-3 text-[#EF4444] shrink-0" />
                <span className="text-xs text-[#475569]">{t.topic}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ Main Component ============
export default function Topics() {
  const [activeTab, setActiveTab] = useState<typeof tabs[number]['key']>('industry');

  return (
    <Layout
      title="专属谈资与话术生成"
      breadcrumb="首页 / 专属谈资与话术"
      showRightPanel
    >
      {/* Tab Navigation */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] mb-6">
        <div className="flex border-b border-[#E2E8F0]">
          {tabs.map((tab) => {
            const TabIcon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-5 py-3 text-sm font-medium transition-all border-b-2 ${
                  isActive
                    ? 'text-[#1E40AF] border-[#1E40AF] bg-[#EFF6FF]'
                    : 'text-[#94A3B8] border-transparent hover:text-[#475569] hover:bg-[#F8FAFC]'
                }`}
              >
                <TabIcon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-6">
        {/* Left: Tab Content */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            {activeTab === 'industry' && (
              <motion.div
                key="industry"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease }}
              >
                <IndustryTopics />
              </motion.div>
            )}
            {activeTab === 'company' && (
              <motion.div
                key="company"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease }}
              >
                <CompanyNews />
              </motion.div>
            )}
            {activeTab === 'personal' && (
              <motion.div
                key="personal"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease }}
              >
                <PersonalInterests />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Ice Breaking Scripts - shown on all tabs */}
          <IceBreakingScripts />

          {/* Taboo Topics - shown on all tabs */}
          <TabooTopics />
        </div>

        {/* Right Panel */}
        <div className="w-80 shrink-0">
          <div className="bg-white rounded-xl border border-[#E2E8F0] sticky top-4">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#E2E8F0]">
              <Sparkles className="w-4 h-4 text-[#1E40AF]" />
              <h3 className="text-sm font-semibold text-[#0F172A]">话术助手</h3>
            </div>
            <TopicsRightPanel />
          </div>
        </div>
      </div>
    </Layout>
  );
}
