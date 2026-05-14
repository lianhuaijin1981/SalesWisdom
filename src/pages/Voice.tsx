import { useState, useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic, Pause, Play, Square, RotateCcw, Upload, MoreVertical,
  Edit3, Copy, Download, Sparkles, Pencil,
  AlertCircle, Trash2, CheckCircle2,
  CheckCheck, XCircle, RefreshCw, ChevronRight,
  Plus, X, Tag, Brain,
  Radio, FileAudio,
} from 'lucide-react';
import Layout from '@/components/Layout';
import {
  recordings, transcriptData, transcriptMeta, extractedFields,
  tags, tagCategoryColors, presetTags, aiSuggestions,
  audioQualities, type Tag as TagType, type ExtractedField,
} from '@/data/voiceMockData';

// ============ Animation Variants ============
const cardStagger = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

const fadeInUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

// ============ Waveform Visualizer (memoized) ============
const WaveformVisualizer = memo(function WaveformVisualizer({ isRecording, isPaused }: { isRecording: boolean; isPaused: boolean }) {
  const [bars, setBars] = useState<number[]>(Array(40).fill(3));
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRecording && !isPaused) {
      intervalRef.current = setInterval(() => {
        setBars(Array.from({ length: 40 }, () => Math.random() * 72 + 4));
      }, 120);
    } else if (isPaused) {
      setBars(Array(40).fill(12));
    } else {
      setBars(Array(40).fill(3));
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isRecording, isPaused]);

  const getBarColor = () => {
    if (!isRecording) return '#E2E8F0';
    if (isPaused) return '#F59E0B';
    return '#1E40AF';
  };

  return (
    <div className="flex items-center justify-center gap-[2px] h-[80px] overflow-hidden">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="rounded-sm"
          style={{
            width: 4,
            height: h,
            backgroundColor: getBarColor(),
            transition: 'height 0.12s ease',
          }}
          animate={{ height: h }}
          transition={{ duration: 0.1 }}
        />
      ))}
    </div>
  );
});

// ============ Recording Tab ============
function RecordingTab() {
  const [status, setStatus] = useState<'idle' | 'recording' | 'paused'>('idle');
  const [seconds, setSeconds] = useState(0);
  const [selectedQuality, setSelectedQuality] = useState('high');
  const [autoTranscribe, setAutoTranscribe] = useState(true);
  const [filterSensitive, setFilterSensitive] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (status === 'recording') {
      timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [status]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const statusText = status === 'recording' ? '正在录音...' : status === 'paused' ? '已暂停' : '准备录音';
  const statusColor = status === 'recording' ? 'text-[#1E40AF]' : status === 'paused' ? 'text-[#F59E0B]' : 'text-[#94A3B8]';

  return (
    <div className="space-y-5">
      {/* Recording Interface + List */}
      <div className="grid grid-cols-5 gap-5">
        {/* Left: Recording Interface */}
        <div className="col-span-3 bg-white border border-[#E2E8F0] rounded-xl shadow-card p-7">
          <WaveformVisualizer isRecording={status !== 'idle'} isPaused={status === 'paused'} />

          {/* Timer */}
          <div className="text-center mt-5">
            <div className="text-[48px] font-bold text-[#0F172A] font-mono leading-none tracking-tight">
              00:{formatTime(seconds)}
            </div>
            <div className={`flex items-center justify-center gap-2 mt-2 text-sm font-medium ${statusColor}`}>
              {status === 'recording' && <span className="w-2 h-2 rounded-full bg-[#EF4444] animate-pulse-dot" />}
              {statusText}
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-center gap-4 mt-6">
            {status === 'idle' && (
              <button
                onClick={() => setStatus('recording')}
                className="w-[60px] h-[60px] rounded-full bg-[#EF4444] text-white flex items-center justify-center hover:bg-[#DC2626] active:scale-95 transition-all shadow-lg"
              >
                <Radio className="w-6 h-6" />
              </button>
            )}
            {status === 'recording' && (
              <>
                <button
                  onClick={() => setStatus('paused')}
                  className="w-[48px] h-[48px] rounded-full bg-[#F59E0B] text-white flex items-center justify-center hover:bg-[#D97706] active:scale-95 transition-all"
                >
                  <Pause className="w-5 h-5" />
                </button>
                <button
                  onClick={() => { setStatus('idle'); setSeconds(0); }}
                  className="w-[48px] h-[48px] rounded-full bg-[#EF4444] text-white flex items-center justify-center hover:bg-[#DC2626] active:scale-95 transition-all"
                >
                  <Square className="w-5 h-5" />
                </button>
              </>
            )}
            {status === 'paused' && (
              <>
                <button
                  onClick={() => setStatus('recording')}
                  className="w-[48px] h-[48px] rounded-full bg-[#1E40AF] text-white flex items-center justify-center hover:bg-[#1D4ED8] active:scale-95 transition-all"
                >
                  <Play className="w-5 h-5 ml-0.5" />
                </button>
                <button
                  onClick={() => { setStatus('idle'); setSeconds(0); }}
                  className="w-[48px] h-[48px] rounded-full bg-[#EF4444] text-white flex items-center justify-center hover:bg-[#DC2626] active:scale-95 transition-all"
                >
                  <Square className="w-5 h-5" />
                </button>
                <button
                  onClick={() => { setStatus('idle'); setSeconds(0); }}
                  className="flex items-center gap-1.5 px-4 h-9 text-sm text-[#475569] hover:text-[#EF4444] hover:bg-[#FEF2F2] rounded-lg transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  重新录制
                </button>
              </>
            )}
          </div>

          {/* Upload Area */}
          {status === 'idle' && (
            <div className="mt-6 border-2 border-dashed border-[#E2E8F0] rounded-xl p-6 text-center hover:border-[#1E40AF] hover:bg-[#EFF6FF]/30 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-[#94A3B8] mx-auto mb-2" />
              <p className="text-sm text-[#475569]">拖拽音频文件到此处，或点击上传</p>
              <p className="text-xs text-[#94A3B8] mt-1">支持 MP3, WAV, M4A 格式，最大 100MB</p>
            </div>
          )}

          {/* Bottom Inputs */}
          <div className="flex items-center gap-4 mt-5 pt-4 border-t border-[#F1F5F9]">
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#475569]">选择客户:</span>
              <select className="h-9 px-3 text-sm border border-[#E2E8F0] rounded-lg text-[#0F172A] bg-white focus:border-[#1E40AF] focus:ring-2 focus:ring-[#1E40AF]/20 outline-none">
                <option>华夏科技 — 张明德</option>
                <option>鼎盛集团 — 李建国</option>
                <option>创联科技 — 王秀芳</option>
              </select>
            </div>
            <div className="flex items-center gap-2 flex-1">
              <span className="text-sm text-[#475569]">访谈主题:</span>
              <input
                type="text"
                placeholder="请输入本次访谈主题"
                className="flex-1 h-9 px-3 text-sm border border-[#E2E8F0] rounded-lg text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#1E40AF] focus:ring-2 focus:ring-[#1E40AF]/20 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right: Recent Recordings */}
        <div className="col-span-2 bg-white border border-[#E2E8F0] rounded-xl shadow-card">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#F1F5F9]">
            <h3 className="text-base font-semibold text-[#0F172A]">最近录音</h3>
            <button className="flex items-center gap-1 text-sm text-[#1E40AF] hover:text-[#1D4ED8]">
              查看全部 <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="p-3 space-y-2">
            {recordings.map((rec, i) => (
              <motion.div
                key={rec.id}
                custom={i}
                variants={cardStagger}
                initial="hidden"
                animate="visible"
                className="flex items-center gap-3 p-3 rounded-lg border border-[#F1F5F9] hover:bg-[#F8FAFC] hover:border-[#E2E8F0] transition-all group"
              >
                <div className="w-8 h-8 rounded-full bg-[#EFF6FF] flex items-center justify-center shrink-0">
                  <Mic className="w-4 h-4 text-[#1E40AF]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#0F172A] truncate">{rec.title}</p>
                  <p className="text-xs text-[#94A3B8]">{rec.time} | {rec.duration} | {rec.customer}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  rec.status === 'transcribed' ? 'bg-[#F0FDF4] text-[#166534]' :
                  rec.status === 'transcribing' ? 'bg-[#FEF3C7] text-[#92400E]' :
                  'bg-[#F1F5F9] text-[#475569]'
                }`}>
                  {rec.status === 'transcribed' ? '已转写' : rec.status === 'transcribing' ? '转写中' : '待转写'}
                </span>
                <button className="text-[#94A3B8] hover:text-[#475569] opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Recording Settings */}
      <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="bg-white border border-[#E2E8F0] rounded-xl shadow-card p-5">
        <h3 className="text-base font-semibold text-[#0F172A] mb-4">录音设置</h3>
        <div className="grid grid-cols-3 gap-6">
          {/* Audio Quality */}
          <div>
            <label className="text-sm font-medium text-[#475569] mb-2 block">音频质量</label>
            <div className="flex gap-2">
              {audioQualities.map(q => (
                <button
                  key={q.id}
                  onClick={() => setSelectedQuality(q.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedQuality === q.id
                      ? 'bg-[#1E40AF] text-white'
                      : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
                  }`}
                >
                  {q.label}({q.kbps})
                </button>
              ))}
            </div>
          </div>

          {/* Auto Transcribe */}
          <div className="flex items-center gap-3">
            <div
              onClick={() => setAutoTranscribe(!autoTranscribe)}
              className={`relative w-11 h-6 rounded-full cursor-pointer transition-colors ${autoTranscribe ? 'bg-[#1E40AF]' : 'bg-[#CBD5E1]'}`}
            >
              <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${autoTranscribe ? 'translate-x-5.5' : 'translate-x-0.5'}`}
                style={{ transform: autoTranscribe ? 'translateX(20px)' : 'translateX(2px)' }}
              />
            </div>
            <div>
              <p className="text-sm font-medium text-[#0F172A]">自动转写</p>
              <p className="text-xs text-[#94A3B8]">录音完成后自动开始转写</p>
            </div>
          </div>

          {/* Filter Sensitive */}
          <div className="flex items-center gap-3">
            <div
              onClick={() => setFilterSensitive(!filterSensitive)}
              className={`relative w-11 h-6 rounded-full cursor-pointer transition-colors ${filterSensitive ? 'bg-[#1E40AF]' : 'bg-[#CBD5E1]'}`}
            >
              <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform`}
                style={{ transform: filterSensitive ? 'translateX(20px)' : 'translateX(2px)' }}
              />
            </div>
            <div>
              <p className="text-sm font-medium text-[#0F172A]">敏感词过滤</p>
              <p className="text-xs text-[#94A3B8]">自动识别并标记敏感商务信息</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ============ Transcription Tab ============
function TranscriptionTab() {
  const [isEditing, setIsEditing] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const speakerColors: Record<string, { bg: string; text: string }> = {
    'sales': { bg: '#DBEAFE', text: '#1E40AF' },
    'customerA': { bg: '#F0FDF4', text: '#166534' },
    'customerB': { bg: '#FEF3C7', text: '#92400E' },
  };

  const handleRetranscribe = () => {
    setIsTranscribing(true);
    setTimeout(() => setIsTranscribing(false), 3000);
  };

  return (
    <div className="grid grid-cols-5 gap-5">
      {/* Left: Transcription Text */}
      <div className="col-span-3 bg-white border border-[#E2E8F0] rounded-xl shadow-card overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#F1F5F9]">
          <div className="flex items-center gap-3">
            <h4 className="text-base font-semibold text-[#0F172A]">转写文本</h4>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#F0FDF4] text-[#166534] font-medium">
              准确率: {transcriptMeta.confidence}%
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#F1F5F9] text-[#475569] font-medium">
              {transcriptMeta.wordCount} 字
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => setIsEditing(!isEditing)} className="flex items-center gap-1 px-3 h-8 text-sm text-[#475569] hover:bg-[#F1F5F9] rounded-lg transition-colors">
              <Edit3 className="w-4 h-4" />
              {isEditing ? '完成' : '编辑'}
            </button>
            <button className="flex items-center gap-1 px-3 h-8 text-sm text-[#475569] hover:bg-[#F1F5F9] rounded-lg transition-colors">
              <Copy className="w-4 h-4" />
              复制
            </button>
            <button className="flex items-center gap-1 px-3 h-8 text-sm text-[#475569] hover:bg-[#F1F5F9] rounded-lg transition-colors">
              <Download className="w-4 h-4" />
              导出
            </button>
          </div>
        </div>

        {/* Transcription Content */}
        <div className="p-5 max-h-[540px] overflow-y-auto space-y-3">
          {isTranscribing ? (
            <div className="flex flex-col items-center justify-center py-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-10 h-10 border-3 border-[#E2E8F0] border-t-[#1E40AF] rounded-full"
              />
              <p className="mt-4 text-sm text-[#475569]">转写中...</p>
            </div>
          ) : (
            transcriptData.map((segment, i) => (
              <motion.div
                key={segment.id}
                custom={i}
                variants={cardStagger}
                initial="hidden"
                animate="visible"
                className="group"
              >
                <div className="flex items-start gap-2">
                  <span className="text-xs text-[#94A3B8] font-mono mt-1 shrink-0">[{segment.timestamp}]</span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-medium shrink-0 mt-0.5"
                    style={{
                      backgroundColor: speakerColors[segment.speakerType].bg,
                      color: speakerColors[segment.speakerType].text,
                    }}
                  >
                    {segment.speaker}
                  </span>
                </div>
                <div className="mt-1 pl-[72px]">
                  {isEditing ? (
                    <textarea
                      defaultValue={segment.text}
                      className="w-full text-sm text-[#0F172A] border border-[#E2E8F0] rounded-lg p-2 focus:border-[#1E40AF] focus:ring-2 focus:ring-[#1E40AF]/20 outline-none resize-none"
                      rows={2}
                    />
                  ) : (
                    <p className="text-sm text-[#0F172A] leading-relaxed">
                      {segment.text}
                    </p>
                  )}
                  {segment.highlights && !isEditing && (
                    <div className="flex gap-2 mt-1.5">
                      {segment.highlights.map((h, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-0.5 rounded border-b border-dashed font-medium cursor-pointer hover:opacity-80 transition-opacity"
                          style={{ color: h.color, borderColor: h.color, backgroundColor: h.color + '10' }}
                          title={`标签: ${h.tag}`}
                        >
                          {h.text}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Right: Audio Player & Info */}
      <div className="col-span-2 space-y-5">
        {/* Audio Player Card */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-card p-5">
          <h4 className="text-sm font-semibold text-[#0F172A] mb-3">音频播放</h4>
          {/* Simplified waveform */}
          <div className="flex items-center gap-[2px] h-10 overflow-hidden mb-3">
            {Array.from({ length: 60 }, (_, i) => (
              <div
                key={i}
                className="bg-[#1E40AF] rounded-sm"
                style={{
                  width: 2,
                  height: Math.sin(i * 0.4) * 12 + 16,
                  opacity: 0.3 + (i / 100),
                }}
              />
            ))}
          </div>
          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <button className="text-[#475569] hover:text-[#0F172A] transition-colors">
              <RefreshCw className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 rounded-full bg-[#1E40AF] text-white flex items-center justify-center hover:bg-[#1D4ED8] active:scale-95 transition-all">
              <Play className="w-4 h-4 ml-0.5" />
            </button>
            <button className="text-[#475569] hover:text-[#0F172A] transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          {/* Speed selector */}
          <div className="flex items-center justify-center gap-2 mt-3">
            {['0.5x', '1x', '1.5x', '2x'].map(speed => (
              <button key={speed} className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${speed === '1x' ? 'bg-[#1E40AF] text-white' : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'}`}>
                {speed}
              </button>
            ))}
          </div>
        </div>

        {/* Recording Info */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-card p-5">
          <h4 className="text-sm font-semibold text-[#0F172A] mb-3">录音信息</h4>
          <div className="space-y-2.5">
            {[
              { label: '客户', value: transcriptMeta.customer },
              { label: '主题', value: transcriptMeta.topic },
              { label: '时长', value: transcriptMeta.duration },
              { label: '录音时间', value: transcriptMeta.recordTime },
              { label: '转写状态', value: transcriptMeta.status },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-xs text-[#94A3B8]">{item.label}</span>
                <span className="text-sm text-[#0F172A] font-medium">{item.value}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-4 pt-3 border-t border-[#F1F5F9]">
            <button onClick={handleRetranscribe} className="flex-1 flex items-center justify-center gap-1.5 h-9 text-sm bg-[#1E40AF] text-white rounded-lg hover:bg-[#1D4ED8] active:scale-[0.97] transition-all">
              <RefreshCw className="w-3.5 h-3.5" />
              重新转写
            </button>
            <button className="flex-1 flex items-center justify-center gap-1.5 h-9 text-sm border border-[#E2E8F0] text-[#475569] rounded-lg hover:bg-[#F8FAFC] transition-colors">
              <Download className="w-3.5 h-3.5" />
              下载音频
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ Info Validation Tab ============
function ValidationTab() {
  const [fields, setFields] = useState<ExtractedField[]>(extractedFields);
  const [editingId, setEditingId] = useState<string | null>(null);

  const confirmedCount = fields.filter(f => f.required && f.status === 'filled').length;
  const requiredCount = fields.filter(f => f.required).length;
  const missingFields = fields.filter(f => f.required && f.status !== 'filled');

  const handleConfirm = (id: string) => {
    setFields(prev => prev.map(f => f.id === id ? { ...f, status: 'filled' as const } : f));
  };

  const getConfidenceColor = (c: number) => {
    if (c >= 90) return { dot: '#10B981', text: '#166534' };
    if (c >= 70) return { dot: '#F59E0B', text: '#92400E' };
    return { dot: '#EF4444', text: '#DC2626' };
  };

  const getStatusIcon = (status: string) => {
    if (status === 'filled') return <CheckCircle2 className="w-4 h-4 text-[#10B981]" />;
    if (status === 'error') return <XCircle className="w-4 h-4 text-[#EF4444]" />;
    return <AlertCircle className="w-4 h-4 text-[#F59E0B]" />;
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-[#1E40AF]" />
          <h2 className="text-lg font-semibold text-[#0F172A]">AI提取关键信息</h2>
        </div>
        <button className="flex items-center gap-1.5 px-4 h-9 text-sm bg-[#1E40AF] text-white rounded-lg hover:bg-[#1D4ED8] active:scale-[0.97] transition-all">
          <RefreshCw className="w-4 h-4" />
          重新分析
        </button>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-card p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-[#0F172A]">信息验证进度</span>
          <span className="text-sm text-[#475569]">{confirmedCount}/{requiredCount} 已确认</span>
        </div>
        <div className="w-full h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#10B981] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(confirmedCount / requiredCount) * 100}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Missing Fields Warning */}
      {missingFields.length > 0 && (
        <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-[#EF4444] shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-[#DC2626]">有 {missingFields.length} 个必填项未确认</p>
            <p className="text-xs text-[#EF4444] mt-1">
              未确认项: {missingFields.map(f => f.label).join('、')}
            </p>
          </div>
        </div>
      )}

      {/* Info Cards Grid */}
      <div className="grid grid-cols-2 gap-4">
        {fields.map((field, i) => {
          const conf = getConfidenceColor(field.confidence);
          return (
            <motion.div
              key={field.id}
              custom={i}
              variants={cardStagger}
              initial="hidden"
              animate="visible"
              className="bg-white border border-[#E2E8F0] rounded-xl shadow-card p-5 hover:shadow-card-hover transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getStatusIcon(field.status)}
                  <span className="text-sm font-medium text-[#0F172A]">{field.label}</span>
                  {field.required && <span className="text-xs text-[#EF4444]">*</span>}
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  field.status === 'filled' ? 'bg-[#F0FDF4] text-[#166534]' :
                  field.status === 'error' ? 'bg-[#FEF2F2] text-[#DC2626]' :
                  'bg-[#FEF3C7] text-[#92400E]'
                }`}>
                  {field.status === 'filled' ? '已确认' : field.status === 'error' ? '错误' : '待验证'}
                </span>
              </div>

              {editingId === field.id ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    defaultValue={field.value}
                    className="flex-1 h-9 px-3 text-sm border border-[#E2E8F0] rounded-lg focus:border-[#1E40AF] focus:ring-2 focus:ring-[#1E40AF]/20 outline-none"
                    autoFocus
                  />
                  <button onClick={() => setEditingId(null)} className="h-9 px-3 text-sm bg-[#10B981] text-white rounded-lg hover:bg-[#059669] transition-colors">
                    保存
                  </button>
                  <button onClick={() => setEditingId(null)} className="h-9 px-3 text-sm border border-[#E2E8F0] text-[#475569] rounded-lg hover:bg-[#F8FAFC] transition-colors">
                    取消
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#0F172A] font-medium">{field.value}</span>
                  <button
                    onClick={() => setEditingId(field.id)}
                    className="text-[#94A3B8] hover:text-[#1E40AF] transition-colors"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#F1F5F9]">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: conf.dot }} />
                  <span className="text-xs" style={{ color: conf.text }}>{field.confidence}% 置信度</span>
                </div>
                <span className="text-xs text-[#94A3B8]">{field.category}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-3">
                {field.status !== 'filled' && (
                  <button
                    onClick={() => handleConfirm(field.id)}
                    className="flex-1 h-8 text-xs bg-[#1E40AF] text-white rounded-lg hover:bg-[#1D4ED8] active:scale-[0.97] transition-all"
                  >
                    确认
                  </button>
                )}
                <button
                  onClick={() => setEditingId(field.id)}
                  className="flex-1 h-8 text-xs border border-[#E2E8F0] text-[#475569] rounded-lg hover:bg-[#F8FAFC] transition-colors"
                >
                  修改
                </button>
                {field.status === 'pending' && (
                  <button className="flex-1 h-8 text-xs border border-[#E2E8F0] text-[#94A3B8] rounded-lg hover:bg-[#F8FAFC] transition-colors">
                    忽略
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bulk Actions */}
      <div className="flex items-center gap-3 pt-2">
        <button className="px-5 h-9 text-sm bg-[#1E40AF] text-white rounded-lg hover:bg-[#1D4ED8] active:scale-[0.97] transition-all">
          全部确认
        </button>
        <button className="px-5 h-9 text-sm border border-[#E2E8F0] text-[#475569] rounded-lg hover:bg-[#F8FAFC] transition-colors">
          批量修改
        </button>
      </div>
    </div>
  );
}

// ============ Tag Management Tab ============
function TagsTab() {
  const [tagList, setTagList] = useState<TagType[]>(tags);
  const [newTagName, setNewTagName] = useState('');
  const [newTagCategory, setNewTagCategory] = useState<TagType['category']>('需求类');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleDelete = (id: string) => {
    setTagList(prev => prev.filter(t => t.id !== id));
  };

  const handleAdd = () => {
    if (!newTagName.trim()) return;
    const newTag: TagType = {
      id: Date.now().toString(),
      name: newTagName.trim(),
      category: newTagCategory,
      source: '人工添加',
      confidence: 100,
      size: 'md',
    };
    setTagList(prev => [...prev, newTag]);
    setNewTagName('');
    setShowAddForm(false);
  };

  const categoryStats = Object.entries(
    tagList.reduce((acc, tag) => {
      acc[tag.category] = (acc[tag.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  );

  return (
    <div className="space-y-5">
      {/* AI Tags Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#1E40AF]" />
            <h2 className="text-lg font-semibold text-[#0F172A]">智能标签</h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#DBEAFE] text-[#1E40AF] font-medium">AI分析</span>
          </div>
        </div>

        {/* Tag Cloud */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-card p-5 mb-4">
          <div className="flex flex-wrap gap-2">
            {tagList.map((tag) => {
              const colors = tagCategoryColors[tag.category];
              const sizeClasses = {
                sm: 'text-xs px-3 py-1',
                md: 'text-sm px-4 py-1.5',
                lg: 'text-base px-5 py-2 font-semibold',
              };
              return (
                <motion.span
                  key={tag.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`inline-flex items-center gap-1.5 rounded-full cursor-pointer hover:shadow-md transition-all ${sizeClasses[tag.size]}`}
                  style={{ backgroundColor: colors.bg, color: colors.text }}
                  title={`${tag.category} | ${tag.source} | 置信度: ${tag.confidence}%`}
                >
                  {tag.name}
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(tag.id); }}
                    className="opacity-50 hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </motion.span>
              );
            })}
          </div>
        </div>

        {/* Tag Statistics */}
        <div className="flex flex-wrap gap-3 mb-4">
          {categoryStats.map(([cat, count]) => {
            const colors = tagCategoryColors[cat];
            return (
              <div
                key={cat}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
                style={{ backgroundColor: colors.bg + '40' }}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.text }} />
                <span className="text-xs font-medium" style={{ color: colors.text }}>{cat}: {count}</span>
              </div>
            );
          })}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F1F5F9]">
            <Tag className="w-3 h-3 text-[#475569]" />
            <span className="text-xs font-medium text-[#475569]">总计: {tagList.length}</span>
          </div>
        </div>

        {/* Structured Tag Table */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-card overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-[#F1F5F9]">
            <h4 className="text-sm font-semibold text-[#0F172A]">标签列表</h4>
            <span className="text-xs text-[#94A3B8]">{tagList.length} 个标签</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#F8FAFC]">
                  <th className="text-left text-xs font-medium text-[#475569] px-4 py-2.5">标签名称</th>
                  <th className="text-left text-xs font-medium text-[#475569] px-4 py-2.5">类别</th>
                  <th className="text-left text-xs font-medium text-[#475569] px-4 py-2.5">来源</th>
                  <th className="text-left text-xs font-medium text-[#475569] px-4 py-2.5">置信度</th>
                  <th className="text-right text-xs font-medium text-[#475569] px-4 py-2.5">操作</th>
                </tr>
              </thead>
              <tbody>
                {tagList.map((tag) => {
                  const colors = tagCategoryColors[tag.category];
                  const confColor = tag.confidence >= 90 ? 'text-[#166534]' : tag.confidence >= 70 ? 'text-[#92400E]' : 'text-[#DC2626]';
                  return (
                    <tr key={tag.id} className="border-t border-[#F1F5F9] hover:bg-[#F8FAFC] transition-colors">
                      <td className="px-4 py-3">
                        <span className="text-sm text-[#0F172A] font-medium">{tag.name}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: colors.bg, color: colors.text }}>
                          {tag.category}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tag.source === 'AI自动' ? 'bg-[#DBEAFE] text-[#1E40AF]' : 'bg-[#F1F5F9] text-[#475569]'}`}>
                          {tag.source}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${tag.confidence >= 90 ? 'bg-[#10B981]' : tag.confidence >= 70 ? 'bg-[#F59E0B]' : 'bg-[#EF4444]'}`} />
                          <span className={`text-xs font-medium ${confColor}`}>{tag.confidence}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => handleDelete(tag.id)}
                          className="text-[#94A3B8] hover:text-[#EF4444] transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Manual Tags */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-[#0F172A]">人工标签</h3>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-1.5 px-4 h-9 text-sm bg-[#1E40AF] text-white rounded-lg hover:bg-[#1D4ED8] active:scale-[0.97] transition-all"
          >
            <Plus className="w-4 h-4" />
            添加标签
          </button>
        </div>

        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white border border-[#E2E8F0] rounded-xl shadow-card p-4 mb-4"
          >
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <label className="text-xs text-[#475569] mb-1 block">标签名称</label>
                <input
                  type="text"
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                  placeholder="输入标签名称"
                  className="w-full h-9 px-3 text-sm border border-[#E2E8F0] rounded-lg focus:border-[#1E40AF] focus:ring-2 focus:ring-[#1E40AF]/20 outline-none"
                  onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                />
              </div>
              <div>
                <label className="text-xs text-[#475569] mb-1 block">类别</label>
                <select
                  value={newTagCategory}
                  onChange={(e) => setNewTagCategory(e.target.value as TagType['category'])}
                  className="h-9 px-3 text-sm border border-[#E2E8F0] rounded-lg bg-white focus:border-[#1E40AF] focus:ring-2 focus:ring-[#1E40AF]/20 outline-none"
                >
                  <option>需求类</option>
                  <option>态度类</option>
                  <option>紧迫性</option>
                  <option>决策类</option>
                  <option>竞争类</option>
                </select>
              </div>
              <button onClick={handleAdd} className="h-9 px-4 text-sm bg-[#10B981] text-white rounded-lg hover:bg-[#059669] transition-colors">
                添加
              </button>
              <button onClick={() => setShowAddForm(false)} className="h-9 px-4 text-sm border border-[#E2E8F0] text-[#475569] rounded-lg hover:bg-[#F8FAFC] transition-colors">
                取消
              </button>
            </div>
          </motion.div>
        )}

        {/* Preset Tags */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-card p-5">
          <h4 className="text-sm font-medium text-[#475569] mb-3">预设标签</h4>
          <div className="flex flex-wrap gap-2">
            {presetTags.map(preset => (
              <span
                key={preset}
                className="text-sm px-3 py-1.5 rounded-full bg-[#F1F5F9] text-[#475569] cursor-pointer hover:bg-[#EFF6FF] hover:text-[#1E40AF] transition-colors"
                onClick={() => {
                  setNewTagName(preset);
                  setNewTagCategory('需求类');
                  setShowAddForm(true);
                }}
              >
                {preset}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ Right Panel Content ============
function VoiceRightPanel() {
  return (
    <div className="space-y-5">
      {/* Session Summary */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-card p-4">
        <div className="flex items-center gap-2 mb-3">
          <FileAudio className="w-4 h-4 text-[#1E40AF]" />
          <h4 className="text-sm font-semibold text-[#0F172A]">转写摘要</h4>
        </div>
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#94A3B8]">客户</span>
            <span className="text-sm text-[#0F172A] font-medium">华夏科技 — 张明德</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#94A3B8]">主题</span>
            <span className="text-sm text-[#0F172A] font-medium">初次需求访谈</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#94A3B8]">时长</span>
            <span className="text-sm text-[#0F172A] font-medium">05:23</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#94A3B8]">字数</span>
            <span className="text-sm text-[#0F172A] font-medium">{transcriptMeta.wordCount} 字</span>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-[#F1F5F9]">
          <p className="text-xs text-[#475569] font-medium mb-1">关键提取</p>
          <ul className="space-y-1">
            <li className="flex items-start gap-1.5 text-xs text-[#475569]">
              <span className="w-1 h-1 rounded-full bg-[#1E40AF] mt-1.5 shrink-0" />
              客户计划Q2启动数字化转型评估
            </li>
            <li className="flex items-start gap-1.5 text-xs text-[#475569]">
              <span className="w-1 h-1 rounded-full bg-[#1E40AF] mt-1.5 shrink-0" />
              预算顾虑是主要决策障碍
            </li>
            <li className="flex items-start gap-1.5 text-xs text-[#475569]">
              <span className="w-1 h-1 rounded-full bg-[#1E40AF] mt-1.5 shrink-0" />
              关注金融行业案例
            </li>
          </ul>
        </div>
      </div>

      {/* AI Suggestions */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-card p-4">
        <div className="flex items-center gap-2 mb-3">
          <Brain className="w-4 h-4 text-[#1E40AF]" />
          <h4 className="text-sm font-semibold text-[#0F172A]">AI建议</h4>
        </div>
        <div className="space-y-3">
          {aiSuggestions.map(s => (
            <div
              key={s.id}
              className={`p-3 rounded-lg border ${
                s.type === 'warning' ? 'bg-[#FEF3C7]/50 border-[#FDE68A]' :
                s.type === 'success' ? 'bg-[#F0FDF4]/50 border-[#A7F3D0]' :
                'bg-[#EFF6FF]/50 border-[#BFDBFE]'
              }`}
            >
              <p className="text-xs text-[#475569] leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tag Quick View */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-card p-4">
        <div className="flex items-center gap-2 mb-3">
          <Tag className="w-4 h-4 text-[#1E40AF]" />
          <h4 className="text-sm font-semibold text-[#0F172A]">标签概览</h4>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {tags.slice(0, 6).map(tag => {
            const colors = tagCategoryColors[tag.category];
            return (
              <span
                key={tag.id}
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ backgroundColor: colors.bg, color: colors.text }}
              >
                {tag.name}
              </span>
            );
          })}
          {tags.length > 6 && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#F1F5F9] text-[#475569]">+{tags.length - 6}</span>
          )}
        </div>
      </div>
    </div>
  );
}

// ============ Main Voice Page ============
export default function Voice() {
  const [activeTab, setActiveTab] = useState('recording');

  const tabs = [
    { id: 'recording', label: '录音采集', icon: Mic },
    { id: 'transcription', label: '语音转写', icon: FileAudio },
    { id: 'validation', label: '信息校验', icon: CheckCheck },
    { id: 'tags', label: '标签优化', icon: Tag },
  ];

  return (
    <Layout title="语音信息采集" breadcrumb="语音信息采集">
      {/* Internal Tabs */}
      <div className="flex items-center gap-0 border-b border-[#E2E8F0] mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-all ${
              activeTab === tab.id
                ? 'text-[#1E40AF] border-[#1E40AF]'
                : 'text-[#94A3B8] border-transparent hover:text-[#475569]'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          {activeTab === 'recording' && <RecordingTab />}
          {activeTab === 'transcription' && <TranscriptionTab />}
          {activeTab === 'validation' && <ValidationTab />}
          {activeTab === 'tags' && <TagsTab />}
        </motion.div>
      </AnimatePresence>

      {/* Right Panel Portal */}
      <div className="fixed right-0 top-14 bottom-0 z-30 bg-white border-l border-[#E2E8F0] shadow-panel overflow-y-auto"
        style={{ width: 320, padding: 16 }}
      >
        <VoiceRightPanel />
      </div>
    </Layout>
  );
}
