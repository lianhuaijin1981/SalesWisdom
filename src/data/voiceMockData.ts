// ============ Recording Records ============
export interface Recording {
  id: string;
  title: string;
  customer: string;
  time: string;
  duration: string;
  status: 'transcribed' | 'transcribing' | 'pending';
  size?: string;
}

export const recordings: Recording[] = [
  { id: '1', title: '华夏科技 — 初次访谈', customer: '张明德', time: '12:30', duration: '05:23', status: 'transcribed', size: '12.5MB' },
  { id: '2', title: '鼎盛集团 — 项目需求沟通', customer: '李建国', time: '11:00', duration: '12:45', status: 'transcribing', size: '28.3MB' },
  { id: '3', title: '创联科技 — 技术方案讨论', customer: '王秀芳', time: '昨天', duration: '08:30', status: 'transcribed', size: '19.1MB' },
  { id: '4', title: '远景投资 — 合作意向确认', customer: '陈志强', time: '昨天', duration: '03:15', status: 'transcribed', size: '7.2MB' },
  { id: '5', title: '智慧城建 — 招标细节确认', customer: '刘雅琴', time: '前天', duration: '15:20', status: 'pending', size: '34.8MB' },
];

// ============ Transcription Data ============
export interface TranscriptSegment {
  id: string;
  timestamp: string;
  speaker: string;
  speakerType: 'sales' | 'customerA' | 'customerB';
  text: string;
  highlights?: { text: string; tag: string; color: string }[];
}

export const transcriptData: TranscriptSegment[] = [
  {
    id: '1',
    timestamp: '00:00:12',
    speaker: '销售员',
    speakerType: 'sales',
    text: '张总您好，感谢您今天抽出时间。我想了解一下贵公司今年在数字化转型方面的规划。',
  },
  {
    id: '2',
    timestamp: '00:00:35',
    speaker: '客户-张总',
    speakerType: 'customerA',
    text: '嗯，我们确实在做这方面的考虑。目前内部有一些系统已经用了好几年了，效率上确实有些问题。',
    highlights: [{ text: '效率上确实有些问题', tag: '痛点识别', color: '#F59E0B' }],
  },
  {
    id: '3',
    timestamp: '00:01:05',
    speaker: '客户-张总',
    speakerType: 'customerA',
    text: '不过我这边最大的顾虑是预算问题。上级的意思是今年的预算主要放在市场拓展上。',
    highlights: [{ text: '预算问题', tag: '预算顾虑', color: '#EF4444' }],
  },
  {
    id: '4',
    timestamp: '00:01:30',
    speaker: '销售员',
    speakerType: 'sales',
    text: '这个理解。其实我们的方案是可以分阶段实施的，前期投入并不需要很大，可以根据实际效果逐步推进。',
    highlights: [{ text: '分阶段实施', tag: '方案亮点', color: '#10B981' }],
  },
  {
    id: '5',
    timestamp: '00:02:15',
    speaker: '客户-张总',
    speakerType: 'customerA',
    text: '分阶段？这个可以详细聊聊。另外，我想了解一下你们在金融行业的案例，看看实际效果。',
    highlights: [{ text: '金融行业案例', tag: '需求信号', color: '#1E40AF' }],
  },
  {
    id: '6',
    timestamp: '00:02:45',
    speaker: '销售员',
    speakerType: 'sales',
    text: '没问题，我们服务过华夏银行、平安集团等多家金融机构，效果都非常不错。我可以整理一份详细的案例集发给您。',
  },
  {
    id: '7',
    timestamp: '00:03:20',
    speaker: '客户-张总',
    speakerType: 'customerA',
    text: '那太好了。我们预计Q2会正式启动这个项目的评估，到时候你那边准备一下方案。',
    highlights: [{ text: 'Q2正式启动', tag: '时间线索', color: '#8B5CF6' }],
  },
  {
    id: '8',
    timestamp: '00:03:50',
    speaker: '销售员',
    speakerType: 'sales',
    text: '好的张总，我会在下周三之前把初步方案和案例集发到您邮箱。届时我们再约个时间详细讨论。',
  },
];

export const transcriptMeta = {
  customer: '华夏科技 — 张明德',
  topic: '初次需求访谈',
  duration: '05:23',
  recordTime: '2024-01-15 14:30',
  status: '已完成',
  confidence: 96.8,
  wordCount: 486,
};

// ============ Extracted Info Fields ============
export interface ExtractedField {
  id: string;
  label: string;
  value: string;
  confidence: number;
  status: 'filled' | 'pending' | 'error';
  required: boolean;
  category: string;
}

export const extractedFields: ExtractedField[] = [
  { id: '1', label: '客户姓名', value: '张明德', confidence: 98, status: 'filled', required: true, category: '客户基本信息' },
  { id: '2', label: '企业名称', value: '华夏科技有限公司', confidence: 95, status: 'filled', required: true, category: '客户基本信息' },
  { id: '3', label: '行业', value: '互联网/金融科技', confidence: 92, status: 'filled', required: true, category: '客户基本信息' },
  { id: '4', label: '项目名称', value: '数字化转型平台', confidence: 88, status: 'filled', required: true, category: '业务需求' },
  { id: '5', label: '客户职位', value: 'CEO/总经理', confidence: 85, status: 'filled', required: true, category: '客户基本信息' },
  { id: '6', label: '项目进度', value: 'Q2启动评估', confidence: 90, status: 'filled', required: true, category: '下一步行动' },
  { id: '7', label: '预算范围', value: '待定/需确认', confidence: 45, status: 'pending', required: false, category: '预算信息' },
  { id: '8', label: '核心痛点', value: '现有系统效率低', confidence: 93, status: 'filled', required: false, category: '业务需求' },
  { id: '9', label: '竞品情况', value: '正在对比多家', confidence: 72, status: 'filled', required: false, category: '竞品情况' },
  { id: '10', label: '决策周期', value: '预计Q2决策', confidence: 87, status: 'filled', required: false, category: '关键决策因素' },
];

// ============ Tags ============
export interface Tag {
  id: string;
  name: string;
  category: '需求类' | '态度类' | '紧迫性' | '决策类' | '竞争类';
  source: 'AI自动' | '人工添加';
  confidence: number;
  size: 'sm' | 'md' | 'lg';
}

export const tags: Tag[] = [
  { id: '1', name: '数字化转型需求', category: '需求类', source: 'AI自动', confidence: 96, size: 'lg' },
  { id: '2', name: '预算敏感', category: '态度类', source: 'AI自动', confidence: 88, size: 'md' },
  { id: '3', name: '分阶段采购', category: '决策类', source: 'AI自动', confidence: 82, size: 'md' },
  { id: '4', name: '重视案例', category: '态度类', source: 'AI自动', confidence: 75, size: 'sm' },
  { id: '5', name: 'Q2决策', category: '紧迫性', source: 'AI自动', confidence: 91, size: 'lg' },
  { id: '6', name: '多家对比', category: '竞争类', source: 'AI自动', confidence: 68, size: 'sm' },
  { id: '7', name: '技术导向', category: '需求类', source: 'AI自动', confidence: 78, size: 'md' },
  { id: '8', name: '金融行业', category: '需求类', source: '人工添加', confidence: 95, size: 'md' },
  { id: '9', name: '价格敏感', category: '态度类', source: 'AI自动', confidence: 85, size: 'md' },
];

export const tagCategoryColors: Record<string, { bg: string; text: string }> = {
  '需求类': { bg: '#DBEAFE', text: '#1E40AF' },
  '态度类': { bg: '#FEF3C7', text: '#92400E' },
  '紧迫性': { bg: '#FEF2F2', text: '#EF4444' },
  '决策类': { bg: '#F0FDF4', text: '#166534' },
  '竞争类': { bg: '#F3E8FF', text: '#7C3AED' },
};

export const presetTags = [
  '客户信息', '企业战略', '项目瓶颈', '个人兴趣', '行业动态', '谈资素材',
];

// ============ AI Suggestions ============
export interface AiSuggestion {
  id: string;
  text: string;
  type: 'warning' | 'info' | 'success';
}

export const aiSuggestions: AiSuggestion[] = [
  { id: '1', text: '检测到客户提到预算顾虑，建议后续提供灵活的付款方案', type: 'warning' },
  { id: '2', text: '客户关注金融行业案例，可准备相关案例材料', type: 'info' },
  { id: '3', text: '客户明确Q2决策节点，建议提前安排方案演示', type: 'success' },
];

// ============ Recording Settings ============
export interface AudioQuality {
  id: string;
  label: string;
  kbps: string;
}

export const audioQualities: AudioQuality[] = [
  { id: 'standard', label: '标准', kbps: '128kbps' },
  { id: 'high', label: '高清', kbps: '256kbps' },
  { id: 'lossless', label: '无损', kbps: '320kbps' },
];
