// ============ Topics & Scripts Mock Data ============

export interface IndustryTopic {
  id: string;
  type: '行业' | '政策' | '技术';
  title: string;
  content: string;
  isNew: boolean;
  isFavorite: boolean;
}

export interface CompanyNews {
  id: string;
  date: string;
  category: string;
  title: string;
  summary: string;
  talkingAngle: string;
}

export interface PersonalInterest {
  id: string;
  name: string;
  icon: string;
  confidence: number;
  description: string;
  talkingPoints: string[];
  visibility: '公开' | '私下';
}

export interface ConversationScript {
  id: string;
  scene: string;
  title: string;
  content: string;
}

export interface TabooTopic {
  id: string;
  topic: string;
  reason: string;
}

export const industryTopics: IndustryTopic[] = [
  {
    id: 'it1',
    type: '行业',
    title: '2024年SaaS行业增长放缓下的突围策略',
    content: '近期SaaS行业增速整体放缓，但垂直领域的深耕型SaaS反而逆势增长。可以聊聊华夏科技如何通过数字化工具提升运营效率，在这个环境下实现降本增效。',
    isNew: true,
    isFavorite: false,
  },
  {
    id: 'it2',
    type: '政策',
    title: '数据安全法3.0版本对企业合规的新要求',
    content: '新版数据安全法规即将出台，对企业的数据治理提出了更高标准。华夏科技作为数据密集型公司，这方面的应对策略可以作为很好的切入点。',
    isNew: true,
    isFavorite: false,
  },
  {
    id: 'it3',
    type: '技术',
    title: 'AI Agent在企业办公场景的落地实践',
    content: 'AI Agent正在从概念走向落地，很多头部企业已经开始在客服、运营、分析等场景试点。可以聊聊AI Agent在华夏科技的实际应用场景。',
    isNew: true,
    isFavorite: false,
  },
  {
    id: 'it4',
    type: '行业',
    title: 'B2B企业从"卖产品"到"卖结果"的转型趋势',
    content: '越来越多的B2B企业开始从单纯的产品销售转向结果导向的服务模式。这个趋势与华夏科技的业务发展方向高度契合。',
    isNew: false,
    isFavorite: true,
  },
  {
    id: 'it5',
    type: '技术',
    title: '低代码平台如何加速企业数字化转型',
    content: '低代码平台正在成为企业数字化转型的加速器，但选型和使用过程中也有不少坑。可以分享一些行业最佳实践。',
    isNew: false,
    isFavorite: false,
  },
  {
    id: 'it6',
    type: '政策',
    title: '新质生产力政策对科技企业的影响与机遇',
    content: '新质生产力成为各地政策的关键词，科技企业有望获得更多政策和资源倾斜。华夏科技可以如何借势发展？',
    isNew: true,
    isFavorite: false,
  },
  {
    id: 'it7',
    type: '行业',
    title: '企业服务市场的并购整合趋势',
    content: '去年以来企业服务市场出现了多起重要并购，行业整合加速。这个话题适合从行业格局的角度切入，展示对市场的深度理解。',
    isNew: false,
    isFavorite: false,
  },
  {
    id: 'it8',
    type: '技术',
    title: '云原生架构的演进方向与最佳实践',
    content: '云原生架构已经成为主流，但很多企业仍处于早期探索阶段。可以聊聊云原生在提升系统弹性和降低运维成本方面的实际效果。',
    isNew: false,
    isFavorite: true,
  },
];

export const historicalTopics: IndustryTopic[] = [
  {
    id: 'ht1',
    type: '行业',
    title: '远程办公常态化后的协作工具演进',
    content: '远程办公已经成为常态，协作工具从简单的沟通向深度协同演进。',
    isNew: false,
    isFavorite: false,
  },
  {
    id: 'ht2',
    type: '技术',
    title: 'RPA技术在财务场景的应用实践',
    content: 'RPA在财务自动化领域已经非常成熟，可以聊聊具体应用场景和效果。',
    isNew: false,
    isFavorite: false,
  },
  {
    id: 'ht3',
    type: '政策',
    title: '个税改革对企业福利体系的影响',
    content: '个税专项附加扣除政策的调整对企业和员工都有影响。',
    isNew: false,
    isFavorite: false,
  },
];

export const companyNews: CompanyNews[] = [
  {
    id: 'cn1',
    date: '2024-01-15',
    category: '新产品',
    title: '华夏科技发布智能风控3.0版本',
    summary: '华夏科技正式推出智能风控平台的3.0版本，新增AI驱动的实时风险预警和自动化决策功能。',
    talkingAngle: '可以祝贺客户的产品升级，并探讨AI能力如何与我们的方案形成互补',
  },
  {
    id: 'cn2',
    date: '2024-01-12',
    category: '战略动作',
    title: '华夏科技与某头部银行达成战略合作',
    summary: '华夏科技宣布与某头部股份制银行签署战略合作协议，将在智能风控领域展开深度合作。',
    talkingAngle: '这是一个很好的切入点，可以了解合作的具体方向，寻找我们能提供的价值',
  },
  {
    id: 'cn3',
    date: '2024-01-10',
    category: '获奖荣誉',
    title: '华夏科技入选2023年度金融科技50强',
    summary: '华夏科技凭借在智能风控领域的创新表现，成功入选由某权威机构评选的"2023年度金融科技50强"。',
    talkingAngle: '恭喜客户的行业认可，顺势讨论其技术领先性和未来发展规划',
  },
  {
    id: 'cn4',
    date: '2024-01-08',
    category: '人事变动',
    title: '华夏科技任命新的首席技术官',
    summary: '华夏科技宣布任命原某互联网大厂技术总监张明为新的CTO，负责公司整体技术战略规划。',
    talkingAngle: '可以了解新任CTO的技术背景和管理风格，找到合适的沟通方式',
  },
  {
    id: 'cn5',
    date: '2024-01-05',
    category: '战略动作',
    title: '华夏科技完成新一轮融资，估值超10亿',
    summary: '华夏科技宣布完成C轮融资，融资金额数亿元，投后估值超过10亿元人民币。',
    talkingAngle: '资金充裕意味着可能有更大的IT投入预算，可以顺势推进我们的方案',
  },
];

export const personalInterests: PersonalInterest[] = [
  {
    id: 'pi1',
    name: '茶文化与品鉴',
    icon: 'Coffee',
    confidence: 92,
    description: '从朋友圈和客户秘书了解到，客户办公室常备多种茶叶，经常在朋友圈分享品茶心得。',
    talkingPoints: ['最近去云南出差，带了一些古树普洱', '推荐一家很有格调的茶馆适合商务会谈', '讨论不同茶类的养生功效'],
    visibility: '公开',
  },
  {
    id: 'pi2',
    name: '文旅与古建筑',
    icon: 'Landmark',
    confidence: 85,
    description: '客户多次在公开场合表达对古建筑的喜爱，节假日经常前往各地参观历史古迹。',
    talkingPoints: ['分享最近参观的古建筑照片', '推荐一些人少但很有文化底蕴的景点', '讨论传统建筑与现代设计的融合'],
    visibility: '公开',
  },
  {
    id: 'pi3',
    name: '跑步与马拉松',
    icon: 'Activity',
    confidence: 88,
    description: '客户是跑步爱好者，已完成多次半程马拉松，朋友圈经常分享跑步打卡记录。',
    talkingPoints: ['聊聊跑步对工作效率的提升', '推荐适合跑步的路线', '讨论 upcoming 的马拉松赛事'],
    visibility: '公开',
  },
  {
    id: 'pi4',
    name: '国学与传统文化',
    icon: 'BookOpen',
    confidence: 80,
    description: '客户在多个场合引用经典名言，办公桌上常放有国学书籍。',
    talkingPoints: ['聊聊对某本经典著作的感悟', '分享国学智慧在管理中的应用', '推荐优质的线上国学课程'],
    visibility: '公开',
  },
  {
    id: 'pi5',
    name: '摄影与旅行',
    icon: 'Camera',
    confidence: 75,
    description: '客户偶尔会分享一些旅行摄影作品，偏好风光摄影题材。',
    talkingPoints: ['分享旅行摄影技巧', '推荐适合摄影的旅行目的地', '讨论手机摄影与单反的差异'],
    visibility: '私下',
  },
  {
    id: 'pi6',
    name: '古风音乐',
    icon: 'Music',
    confidence: 70,
    description: '客户的车载音乐以古风为主，曾在一次闲聊中提到喜欢某位古风歌手。',
    talkingPoints: ['推荐近期的古风音乐新作', '聊聊古风音乐与传统文化的结合', '分享音乐会或演出信息'],
    visibility: '私下',
  },
  {
    id: 'pi7',
    name: '亲子教育',
    icon: 'Baby',
    confidence: 90,
    description: '客户有两个孩子，非常关注子女教育，朋友圈经常分享与孩子的互动。',
    talkingPoints: ['讨论子女教育的心得', '分享优质的教育资源', '聊聊如何平衡工作与家庭'],
    visibility: '私下',
  },
];

export const iceBreakingScripts: ConversationScript[] = [
  {
    id: 's1',
    scene: '微信话术',
    title: '首次加微信后的破冰',
    content: '陈总您好，我是小李，今天非常荣幸能跟您交流。我之前了解到华夏科技在智能风控领域做得很出色，特别是最近发布的3.0版本，在业内引起了很多关注。希望有机会能跟您多学习交流。',
  },
  {
    id: 's2',
    scene: '微信话术',
    title: '节假日的问候',
    content: '陈总，新春快乐！祝您新的一年事业更上一层楼，阖家幸福安康。期待新的一年有机会与华夏科技展开合作，为您创造更多价值。',
  },
  {
    id: 's3',
    scene: '见面话术',
    title: '初次拜访开场',
    content: '陈总，非常感谢您百忙之中抽出时间见我。来之前我特意了解了华夏科技的最新动态，得知贵司最近完成了新一轮融资并且入选了金融科技50强，真是了不起的成绩！今天我来，主要是想了解一下贵司在数字化运营方面的规划和需求，看看我们能不能提供一些有价值的方案。',
  },
  {
    id: 's4',
    scene: '见面话术',
    title: '以兴趣爱好破冰',
    content: '陈总，我听说您是个茶道高手。刚好我前阵子去云南出差，带了一些古树普洱，虽然不是什么名贵茶叶，但口感还不错。下次有机会带给您尝尝。咱们边喝茶边聊，轻松一点。',
  },
  {
    id: 's5',
    scene: '长期维系话术',
    title: '项目推进中的关怀',
    content: '陈总，上次咱们聊完之后，我回去整理了一份关于同行业数字化转型的案例集，里面有几个跟华夏科技情况很相似的企业，他们的实施路径和效果数据都很有参考价值。我整理好了发给您看看，希望对您的决策有所帮助。',
  },
  {
    id: 's6',
    scene: '长期维系话术',
    title: '持续价值输出',
    content: '陈总，最近看到一份行业研究报告，里面提到了几个对华夏科技可能有价值的趋势判断。我特意把相关部分标注了出来，发给您参考。如果您对其中某个方向感兴趣，我可以安排我们的专家跟您做更深入的交流。',
  },
];

export const tabooTopics: TabooTopic[] = [
  { id: 'tt1', topic: '竞品公司负面消息', reason: '谈论竞品的负面信息会显得我们不够专业，且容易引发客户的反感' },
  { id: 'tt2', topic: '客户过往的失败项目', reason: '容易触碰到敏感神经，让客户感到被冒犯' },
  { id: 'tt3', topic: '行业内的八卦传闻', reason: '传播八卦会损害我们的专业形象' },
  { id: 'tt4', topic: '政治敏感话题', reason: '无论客户立场如何，都可能引发不必要的分歧' },
  { id: 'tt5', topic: '过度打听客户隐私', reason: '会让客户感到不适，影响信任关系的建立' },
  { id: 'tt6', topic: '直接贬低客户现有方案', reason: '容易让客户产生防御心理，影响后续沟通' },
];

export const typeColors: Record<string, { bg: string; text: string }> = {
  '行业': { bg: '#DBEAFE', text: '#1E40AF' },
  '政策': { bg: '#FEF3C7', text: '#92400E' },
  '技术': { bg: '#F0FDF4', text: '#166534' },
};

export const categoryColors: Record<string, { bg: string; text: string }> = {
  '新产品': { bg: '#DBEAFE', text: '#1E40AF' },
  '战略动作': { bg: '#F0FDF4', text: '#166534' },
  '获奖荣誉': { bg: '#FEF3C7', text: '#92400E' },
  '人事变动': { bg: '#F3E8FF', text: '#7C3AED' },
};
