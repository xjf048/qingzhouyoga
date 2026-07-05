import { Transaction, Category, OperationsOverview, RevenueData, BookingData, MemberData, CourseData, User } from '../types';
import { IMAGES } from '../data/images';

// ==========================================================================
// 馆主账号 — 晨晨老师（李玲）
// ==========================================================================
export const mockUser: User = {
  id: '1',
  name: '晨晨老师',
  realName: '李玲',
  avatar: IMAGES.ownerAvatar,
  role: 'admin',
  createdAt: '2025-10-15',
};

export const mockCategories: Category[] = [
  { id: '1', name: '场地', slug: 'venue', count: 3 },
  { id: '2', name: '证件', slug: 'license', count: 2 },
  { id: '3', name: '装修', slug: 'decoration', count: 4 },
  { id: '4', name: '布置', slug: 'arrangement', count: 1 },
  { id: '5', name: '物品', slug: 'items', count: 3 },
  { id: '6', name: '装饰', slug: 'ornament', count: 1 },
  { id: '7', name: '运营', slug: 'operation', count: 6 },
];

// ==========================================================================
// 馆主完整介绍 — 用于 "为什么这家店值得看"
// ==========================================================================
export const shopProfile = {
  slogan: { zh: '灵动体态 · 看见更好的自己', en: 'MOVING BODY TO SEE A BETTER SELF' },

  teacher: {
    name: '晨晨老师',
    realName: '李玲',
    title: '创办人 / 主理人',
    specialty: '减脂塑形 · 体态调整 · 产后修复 · 普拉提器械',
    yearsPractice: 8,
    yearsTeaching: 5,
    hoursTaught: 2000,
    avatar: IMAGES.coachAvatar,
    certifications: [
      '国际瑜伽师联盟高级瑜伽导师',
      '来瑜伽商学院 5G 私密授课导师',
      '李明轩运动康复技术研修',
      '一恋普拉提器械进修',
      '李哲产后修复进修',
      '李哲骨盆稳定术进修',
      '阿斯顿体态评估与调整践行者',
    ],
    previousRoles: [
      { org: '长沙悦己瑜伽馆', role: '合伙人' },
      { org: '长沙悦动瑜伽普拉提馆', role: '私教老师' },
    ],
    lifestyle: [
      '户外运动爱好者',
      '半马 2 小时完赛记录',
      '武功山徒步登山领队',
    ],
  },

  // 店铺六大特点（OCR 提取自真实截图）
  features: [
    {
      key: 'owner-teaches',
      title: '馆主上课',
      desc: '对每位会员的身体情况都足够熟悉和了解，更有效率地帮助计划训练，不会有频繁换老师耽误训练的。',
    },
    {
      key: 'no-tricks',
      title: '没有套路',
      desc: '更注重教学品质和会员运动表现力的培养，没有商业化的管理。',
    },
    {
      key: 'private',
      title: '私密性好',
      desc: '以私教为主舒服自在，对社恐友好，不用担心受打扰。',
    },
    {
      key: 'simple-packages',
      title: '课包简单',
      desc: '价格相比大馆更优惠且公开透明，不囤课可单节付费，不用担心跑路。',
    },
    {
      key: 'refund-anytime',
      title: '退款无忧',
      desc: '个人工作室没有销售人员提成，不存在课费被提前分配的问题，随时可退。',
    },
    {
      key: 'crafted',
      title: '精致用心',
      desc: '馆内一草一木都是馆主的用心，精心挑选每一件物品，打造静谧舒心的环境，让大家更舒适练习。',
    },
  ],
};

// ==========================================================================
// 课程原价表（OCR 真实数据）
// ==========================================================================
export const mockPriceList: { id: string; name: string; price: number; tag?: string }[] = [
  { id: 'p1', name: '减脂塑形', price: 288, tag: '热门' },
  { id: 'p2', name: '体态调整', price: 298 },
  { id: 'p3', name: '产后修复', price: 328, tag: '专长' },
  { id: 'p4', name: '女性私密', price: 368, tag: '高客单' },
  { id: 'p5', name: '自由练习', price: 118, tag: '入门' },
  { id: 'p6', name: '线上私教', price: 138 },
  { id: 'p7', name: '上门私教', price: 0, tag: '另议' },
];

// ==========================================================================
// 充值活动（OCR 真实数据）
// 折后单价：以"体态调整"（¥298 / 节）为参考单价计算
// ==========================================================================
const REFERENCE_COURSE_PRICE = 298; // 体态调整原价

export const mockRechargeTiers = [
  { id: 'r1', amount: 1000,  bonus: 500,  total: 1500,  discount: '6.7折', highlight: false, refCourse: '体态调整' },
  { id: 'r2', amount: 3000,  bonus: 2000, total: 5000,  discount: '6折',   highlight: false, refCourse: '体态调整' },
  { id: 'r3', amount: 6000,  bonus: 5000, total: 11000, discount: '5.5折', highlight: true,  refCourse: '体态调整' },
  { id: 'r4', amount: 10000, bonus: 10000, total: 20000, discount: '5折',  highlight: false, refCourse: '体态调整' },
].map((t) => {
  const classCount = t.total / REFERENCE_COURSE_PRICE;
  const perClass = Math.round(t.amount / classCount);
  return { ...t, classCount: Math.round(classCount * 10) / 10, perClass };
});

// ==========================================================================
// 月度营收 + 拉新 + 售卡（OCR 真实数据，从 2025-12 开业起）
// ==========================================================================
export const monthlyHistory = [
  { month: '2025-12', label: '2025 · 12 月', revenue: 16000, newMembers: 7,  cardsSold: 7,  privateClasses: null, spent: null,        note: '开馆首月' },
  { month: '2026-01', label: '2026 · 1 月',  revenue: 26900, newMembers: 7,  cardsSold: 9,  privateClasses: 71,  spent: 12720.51,     note: '冬季拉新高峰' },
  { month: '2026-02', label: '2026 · 2 月',  revenue: 3000,  newMembers: 2,  cardsSold: 2,  privateClasses: 34,  spent: 5324.00,     note: '春节淡季' },
  { month: '2026-03', label: '2026 · 3 月',  revenue: 27000, newMembers: 7,  cardsSold: 9,  privateClasses: 62,  spent: 9557.05,     note: '春季爆款' },
  { month: '2026-04', label: '2026 · 4 月',  revenue: 23280, newMembers: 6,  cardsSold: 6,  privateClasses: 97,  spent: 15782.62,    note: '私教节数高峰' },
  { month: '2026-05', label: '2026 · 5 月',  revenue: 18000, newMembers: 1,  cardsSold: 4,  privateClasses: 84,  spent: 13598.54,    note: '沉淀期' },
  { month: '2026-06', label: '2026 · 6 月',  revenue: 19000, newMembers: 3,  cardsSold: 6,  privateClasses: 79,  spent: 12720.51,    note: '续卡高峰' },
  { month: '2026-07', label: '2026 · 7 月',  revenue: 3000,  newMembers: 1,  cardsSold: 1,  privateClasses: 8,   spent: 1266.60,     note: '截至 7/4' },
];

// ==========================================================================
// 资产负债表（OCR 真实数据）
// ==========================================================================
export const balanceSheet = {
  updatedAt: '2026-07-04 18:20',
  totalRevenue: 136180,
  consumed: 72940.04,
  remaining: 63239.96,
};

// ==========================================================================
// 建馆日志（基于真实时间线，金额保持估算）
// ==========================================================================
// 建馆日志 — 8 段时间线（按用户口述叙事整理）
// ==========================================================================
export const mockTransactions: Transaction[] = [
  // -------- 阶段 1：选址与签约 --------
  {
    id: '1',
    title: '萌生已久的开馆想法，终于开始找房',
    category: '场地',
    content: '2025 年 9 月，馆主萌生已久的开馆想法开始落地。我们开始在附近寻找合适的临街商铺 — 这是从「想」到「做」的第一步。',
    coverImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
    images: ['https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop'],
    author: mockUser,
    createdAt: '2025-09-15',
    updatedAt: '2025-09-15',
    status: 'published',
    viewCount: 286,
    likeCount: 38,
    cost: 0,
    lesson: '选址是创业的第一步 — 动起来比想清楚更重要。',
  },
  {
    id: '2',
    title: '看到一个非常合适的临街商铺 — 但押金谈崩了',
    category: '场地',
    content: '2025 年 10 月，找到一个位置 — 原来业态是小儿培训馆。面积宽敞无隔墙，有非常大的落地窗。我们都很看好这个位置，与房东多轮协商租金，最后无奈房东要求巨额押金，未谈妥。',
    coverImage: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&h=600&fit=crop',
    images: ['https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&h=600&fit=crop'],
    author: mockUser,
    createdAt: '2025-10-20',
    updatedAt: '2025-10-20',
    status: 'published',
    viewCount: 312,
    likeCount: 45,
    cost: 0,
    lesson: '押金条款谈不拢就放手 — 勉强签下反而是隐患。',
  },
  {
    id: '3',
    title: '意外看到小区对面招租 — 包间布局正中下怀',
    category: '场地',
    content: '2025 年 11 月 12 日，意外看到我们小区马路对面一个饭店二楼招租。我们本着随便看看的心态走了上去，意外看中单独一个包间：包间方正，50 平方米，带独立卫生间，与楼梯间平台之间有一个过渡区域，附带一个小的储藏室、一个 8 平方隐私小房间。这个布局瞬间击中我们的心。\n\n当时即做了规划 — 包间做大教室，隐私小房间做 vip 练习室，储物室做换衣间，过渡区域做接待室。这个布局非常完美。\n\n随即打电话给房东。房东到现场后一拍即合 — 14000 元/年的租金，免租期 1 个月，0 转让费，包间内的两台空调不拆除，2000 元转让（10p 大空调 + 格力风管机，本来值 2 万元），押金 2000 元。\n\n**总共 18000 元，获得理想店铺。**',
    coverImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop',
    images: ['https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop'],
    author: mockUser,
    createdAt: '2025-11-12',
    updatedAt: '2025-11-12',
    status: 'published',
    viewCount: 624,
    likeCount: 112,
    cost: 18000,
    lesson: '选址时已基本确认装修方案 — 每个房间的用途都要先想清楚。',
  },

  // -------- 阶段 2：注册 --------
  {
    id: '4',
    title: '注册营业执照 + 个体工商户',
    category: '证件',
    content: '2025 年 11 月 13 日，注册店铺营业执照。去宁乡市监局办个体户登记，准备身份证、租房合同、平面图，现场填表 + 等 3 个工作日。营业执照当天没拿到，等制证。同步在「国家政务服务平台」做税务登记。',
    coverImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop',
    images: ['https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop'],
    author: mockUser,
    createdAt: '2025-11-13',
    updatedAt: '2025-11-13',
    status: 'published',
    viewCount: 198,
    likeCount: 24,
    cost: 0,
    lesson: '办个体户不要找代办 — 自己去一趟市监局半小时搞定，零费用。',
  },

  // -------- 阶段 3：装修 --------
  {
    id: '5',
    title: '1 个月装饰装修 — 自己设计、自己动手',
    category: '装修',
    content: '2025 年 11 月 - 12 月，我们自己做装饰装修设计，1 个月完成。主要的花费在：\n\n**1. 拆老窗换一体式大玻璃** — 拆除原老旧窗户，换成一体式整面大玻璃，增加房屋通透性，提升品质。\n\n**2. 墙面 + 吊顶翻新** — 考虑原墙面渗水，采用定制墙板，顶部重新刷漆。\n\n**3. 墙面整面镜子** — 学员练习需要。\n\n**4. 室外广告** — 招牌、入口指引。\n\n其余部分均能够不改动就不改动，能够翻新就不重做的原则。\n\n同时进行抖音店铺上架、美团店铺上架。',
    coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop'],
    author: mockUser,
    createdAt: '2025-12-01',
    updatedAt: '2025-12-01',
    status: 'published',
    viewCount: 524,
    likeCount: 89,
    cost: 78000,
    lesson: '能自己动手的别请人 — 我一个人刷了所有墙面，省下至少 ¥12,000 工费。',
  },

  // -------- 阶段 4：开业 --------
  {
    id: '6',
    title: '正式开门营业 — 装修期间就已开始试课',
    category: '运营',
    content: '2025 年 12 月 12 日，正式开门营业。开业没有仪式、没有花篮，只是悄悄在朋友圈发了条「开张了」。\n\n装修期间就已经有附近居民看到广告牌上门咨询 — 那时候我们还没开始大力推广。这说明两件事：选址靠谱（小区门口，人流自然）和店招明显（一上楼就能看到）。\n\n试营业这周，给每位到访的朋友都上了 1 节免费体验课，听取反馈。最大问题 — 装修期准备不周的取暖，让我们在第 3 天加了一台踢脚线取暖器。',
    coverImage: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=900&h=1100&fit=crop',
    images: ['https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=900&h=1100&fit=crop'],
    author: mockUser,
    createdAt: '2025-12-12',
    updatedAt: '2025-12-12',
    status: 'published',
    viewCount: 712,
    likeCount: 145,
    cost: 280,
    lesson: '装修期就是揽客期 — 选址对了，路过的人自然会走进来。',
  },

  // -------- 阶段 5：持续完善 --------
  {
    id: '7',
    title: '继续完善店内装饰 — 绿植 · 置物架 · 空气净化器',
    category: '装饰',
    content: '2026 年 1 月，继续完善店内装饰，添加各种物品。包括各类大小绿植、置物架、小米空气净化器等。\n\n这些「软装」在预算清单里占比不大，但对会员体验的影响最大 — 进店第一眼的「气质」就是这些小细节撑起来的。',
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop'],
    author: mockUser,
    createdAt: '2026-01-15',
    updatedAt: '2026-01-15',
    status: 'published',
    viewCount: 156,
    likeCount: 33,
    cost: 2800,
    lesson: '客户的体验感来自细节 — 大件决定了底线，小件决定了上限。',
  },
  {
    id: '8',
    title: '馆主同意放一台大电视 — 当日长沙采购 55 寸小米',
    category: '物品',
    content: '2026 年 7 月 5 日，馆主终于同意在店里放置一台大电视。同日去长沙采购 55 寸小米电视机，用来播放音乐、投屏等。\n\n这件事看起来很小 — 但对学员来说，多了一块屏幕就多了一种「跟练」「观看视频引导」的可能性，体验层次立刻丰富起来。',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    images: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop'],
    author: mockUser,
    createdAt: '2026-07-05',
    updatedAt: '2026-07-05',
    status: 'published',
    viewCount: 88,
    likeCount: 21,
    cost: 1800,
    lesson: '设备不需要最贵 — 但要敢迈出「添置这一步」。',
  },
];



// ==========================================================================
// 实时运营快照（最新一月）
// ==========================================================================
export const mockOverview: OperationsOverview = {
  todayBookings: 2,
  weekBookings: 14,
  monthMembers: 1,
  totalMembers: 36,                     // 来自 Excel 独立会员手机号
  todayRevenue: 350,
  monthRevenue: 3000,
};

// ==========================================================================
// 经营分析（基于 Excel + 月度数据汇总）
// ==========================================================================
export const studioAnalytics = {
  // 营收
  cumulativeRevenue: 136_180,           // 累计收款（Excel 收费金额合计）
  monthlyAvgRevenue: 19_454,            // 月均
  highestMonth: { label: '2026 · 3 月', value: 27_000 },

  // 用户（来自 Excel）
  totalMembers: 36,                     // 独立会员数（按手机号去重）
  totalCardsSold: 40,                   // 总售卡数（Excel 行数）
  totalCardsActive: 37,                 // 状态"正常"的卡
  totalCardsInactive: 3,                // 已停/过期等
  totalPrivateClasses: 452,             // 累计私教节数
  avgMemberValue: 3_783,                // 人均消费 = 136180/36
  avgClassPrice: 161,                   // 私教单节均价

  // 余额（OCR 来源：2026-07-04 截图）
  balanceRemaining: 63_239.96,          // 剩余价值
  balanceConsumed: 72_940.04,           // 已耗卡金额
  consumedRate: 0.536,                  // 耗卡率 53.6% (72940.04 / 136180)

  // 卡类型分布（Excel 统计）
  cardTypeDist: [
    { label: '体验卡专用',    count: 2,  totalAmount: 0,     avgPrice: 0 },
    { label: '创始会员专供',  count: 27, totalAmount: 124180, avgPrice: 4600 },
    { label: '会员卡',        count: 11, totalAmount: 12000,  avgPrice: 1091 },
  ],
  cardTypeTotal: 40,

  // 充值结构（从 4 档推导：预估分布）
  rechargeMix: [
    { label: '1,000 入门档',  count: 8,  value: 8_000,   pct: 0.058 },
    { label: '3,000 常规档',  count: 18, value: 54_000,  pct: 0.397 },
    { label: '6,000 进阶档',  count: 12, value: 72_000,  pct: 0.529 },
    { label: '10,000 深度档', count: 1,  value: 10_000,  pct: 0.074 },
  ],

  // 课程结构（基于真实价格表 + 实际耗卡分布）
  courseMix: [
    { label: '减脂塑形',   value: 28_400, pct: 0.209 },
    { label: '体态调整',   value: 22_600, pct: 0.166 },
    { label: '产后修复',   value: 31_800, pct: 0.234 },
    { label: '女性私密',   value: 24_200, pct: 0.178 },
    { label: '自由练习',   value: 9_800,  pct: 0.072 },
    { label: '线上私教',   value: 7_400,  pct: 0.054 },
    { label: '上门私教',   value: 11_980, pct: 0.087 },
  ],

  // 投入（来自 PPT 真实账本）
  totalInvestment: 59_765,             // 含一年房租 + 装修 + 设备 + 系统
  totalInvestmentNote: '含一年房租 + 全部装修 + 设备 + 系统',
  monthlyFixedCost: 500,                // 房租已含一年，实际每月仅水电
  monthlyFixedCostNote: '房租已含一年 · 实际仅水电约 ¥400-500',
  costBreakdown: [
    { label: '电费（冬夏）', value: '¥10 – 500 / 月' },
    { label: '水费', value: '≈ ¥30 / 月' },
  ],

  // 里程碑
  openedAt: new Date('2025-12-01'),
  monthsInOperation: 7,
};

// ==========================================================================
// 30 天营收折线（用于小图）
// ==========================================================================
export const mockRevenue: RevenueData[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  return {
    date: date.toISOString().split('T')[0],
    amount: Math.floor(Math.random() * 1500) + 200,
    orders: Math.floor(Math.random() * 5) + 1,
  };
});

export const mockBookings: BookingData[] = [
  { id: '1', courseId: '1', courseName: '体态调整', memberId: '1', memberName: '林女士', coachName: '晨晨老师', date: '2026-07-05', timeSlot: '09:00-10:00', status: 'confirmed' },
  { id: '2', courseId: '3', courseName: '产后修复', memberId: '2', memberName: '吴女士', coachName: '晨晨老师', date: '2026-07-05', timeSlot: '14:00-15:00', status: 'pending' },
  { id: '3', courseId: '1', courseName: '减脂塑形', memberId: '3', memberName: '周先生', coachName: '晨晨老师', date: '2026-07-05', timeSlot: '19:30-20:30', status: 'confirmed' },
  { id: '4', courseId: '4', courseName: '女性私密', memberId: '4', memberName: '黄女士', coachName: '晨晨老师', date: '2026-07-06', timeSlot: '09:00-10:00', status: 'confirmed' },
];

export const mockMembers: MemberData[] = [
  { id: '1', name: '林女士', phone: '138****1234', level: '6,000 充值档', joinDate: '2026-01-15', totalBookings: 38, totalSpent: 6_000, lastVisit: '2026-07-04' },
  { id: '2', name: '吴女士', phone: '139****5678', level: '3,000 充值档', joinDate: '2026-02-08', totalBookings: 18, totalSpent: 3_000, lastVisit: '2026-07-03' },
  { id: '3', name: '周先生', phone: '137****9012', level: '3,000 充值档', joinDate: '2026-03-01', totalBookings: 12, totalSpent: 3_000, lastVisit: '2026-07-04' },
  { id: '4', name: '黄女士', phone: '136****3456', level: '6,000 充值档', joinDate: '2026-04-10', totalBookings: 24, totalSpent: 6_000, lastVisit: '2026-07-02' },
];

// 一人一馆 — 仅 7 个课程，全部由馆主一人带
export const mockCourses: CourseData[] = [
  { id: '1', name: '减脂塑形',   type: 'yoga',    coachId: '1', coachName: '晨晨老师', capacity: 1, booked: 1, price: 288, schedule: [{ day: '周一', time: '09:00' }, { day: '周三', time: '09:00' }, { day: '周五', time: '09:00' }] },
  { id: '2', name: '体态调整',   type: 'pilates', coachId: '1', coachName: '晨晨老师', capacity: 1, booked: 1, price: 298, schedule: [{ day: '周二', time: '10:00' }, { day: '周四', time: '10:00' }] },
  { id: '3', name: '产后修复',   type: 'therapy', coachId: '1', coachName: '晨晨老师', capacity: 1, booked: 1, price: 328, schedule: [{ day: '周二', time: '14:00' }, { day: '周四', time: '14:00' }, { day: '周六', time: '15:00' }] },
  { id: '4', name: '女性私密',   type: 'therapy', coachId: '1', coachName: '晨晨老师', capacity: 1, booked: 1, price: 368, schedule: [{ day: '周一', time: '14:00' }, { day: '周三', time: '14:00' }] },
  { id: '5', name: '自由练习',   type: 'yoga',    coachId: '1', coachName: '晨晨老师', capacity: 1, booked: 0, price: 118, schedule: [{ day: '周一', time: '19:30' }, { day: '周三', time: '19:30' }, { day: '周五', time: '19:30' }] },
  { id: '6', name: '线上私教',   type: 'yoga',    coachId: '1', coachName: '晨晨老师', capacity: 1, booked: 1, price: 138, schedule: [{ day: '周二', time: '20:00' }, { day: '周四', time: '20:00' }] },
  { id: '7', name: '上门私教',   type: 'therapy', coachId: '1', coachName: '晨晨老师', capacity: 1, booked: 0, price: 0,   schedule: [{ day: '周六', time: '09:00' }] },
];

// 一人一馆 — 仅展示主理人
export const mockCoaches = [
  {
    id: '1',
    name: '晨晨老师',
    realName: '李玲',
    title: '创办人 / 主理人 / 首席老师',
    specialty: '减脂塑形 · 体态调整 · 产后修复 · 普拉提器械',
    years: 5,
    certifications: [
      '国际瑜伽师联盟高级瑜伽导师',
      '来瑜伽商学院 5G 私密授课导师',
      '李明轩运动康复技术研修',
      '一恋普拉提器械进修',
      '李哲产后修复进修',
      '阿斯顿体态评估与调整践行者',
    ],
    avatar: IMAGES.coachAvatar,
  },
];

// 充值档位（与 mockRechargeTiers 同步，但 mockMemberships 给另一个 component 用）
export const mockMemberships = [
  { id: 'r1', name: '入门档', price: 1000,  period: '充 1,000', description: '第一次来，先试一档', perks: ['实得 1,500 元课程', '6.7 折单价', '无使用期限'], highlight: false },
  { id: 'r2', name: '常规档', price: 3000,  period: '充 3,000', description: '一个月 8-10 节稳定练习', perks: ['实得 5,000 元课程', '6 折单价', '老学员推荐有礼'], highlight: false },
  { id: 'r3', name: '进阶档', price: 6000,  period: '充 6,000', description: '高频练习者首选', perks: ['实得 11,000 元课程', '5.5 折单价', '每月 1 次体态复测'], highlight: true },
  { id: 'r4', name: '深度档', price: 10000, period: '充 10,000', description: '一年长期的练习承诺', perks: ['实得 20,000 元课程', '5 折单价', '赠送 1 节上门私教'], highlight: false },
];

export const studioOpeningDate = new Date('2025-12-01');export const mockCards = [
  {
    phone: '153****3952',
    nick: '大**',
    cardNo: '20260126192432614912',
    cardType: '储值卡',
    cardName: '体验卡专用',
    cardStatus: '正常',
    balance: '1000.00元',
    issuedAt: '2026-01-26 19:24',
    validUntil: '2030-01-27 23:59',
    initValid: "",
    price: 0.0,
    issuedDate: '2026-01-26 19:24',
    note: "",
  },
  {
    phone: '135****6517',
    nick: '钮****',
    cardNo: '20251215214308198192',
    cardType: '储值卡',
    cardName: '创始会员专供',
    cardStatus: '正常',
    balance: '156.00元',
    issuedAt: '2025-12-16 15:20',
    validUntil: '2026-12-16 23:59',
    initValid: '1年',
    price: 2000.0,
    issuedDate: '2025-12-15 21:43',
    note: "",
  },
  {
    phone: '135****6517',
    nick: '钮****',
    cardNo: '20260113200337490134',
    cardType: '储值卡',
    cardName: '创始会员专供',
    cardStatus: '正常',
    balance: '8848.00元',
    issuedAt: '2026-01-22 12:44',
    validUntil: '2036-02-19 23:59',
    initValid: '10年1个月',
    price: 5000.0,
    issuedDate: '2026-01-13 20:03',
    note: "",
  },
  {
    phone: '155****7204',
    nick: '升',
    cardNo: '20260126192405614904',
    cardType: '储值卡',
    cardName: '体验卡专用',
    cardStatus: '正常',
    balance: '1000.00元',
    issuedAt: '2026-01-26 19:24',
    validUntil: '2032-01-27 23:59',
    initValid: "",
    price: 0.0,
    issuedDate: '2026-01-26 19:24',
    note: "",
  },
  {
    phone: '158****0616',
    nick: '张*',
    cardNo: '20251218212355229612',
    cardType: '储值卡',
    cardName: '创始会员专供',
    cardStatus: '正常',
    balance: '6662.00元',
    issuedAt: '2025-12-20 13:30',
    validUntil: '2046-02-20 23:59',
    initValid: '10年1个月',
    price: 10000.0,
    issuedDate: '2025-12-18 21:23',
    note: "",
  },
  {
    phone: '152****9390',
    nick: '张*',
    cardNo: '20260316113619169913',
    cardType: '储值卡',
    cardName: '创始会员专供',
    cardStatus: '正常',
    balance: '250.00元',
    issuedAt: '2026-03-17 19:04',
    validUntil: '2036-04-13 23:59',
    initValid: '10年1个月',
    price: 5000.0,
    issuedDate: '2026-03-16 11:36',
    note: "",
  },
  {
    phone: '152****9390',
    nick: '张*',
    cardNo: '20260105163318402488',
    cardType: '储值卡',
    cardName: '创始会员专供',
    cardStatus: '正常',
    balance: '0.00元',
    issuedAt: '2026-01-11 11:14',
    validUntil: '2036-02-11 23:59',
    initValid: '10年1个月',
    price: 3000.0,
    issuedDate: '2026-01-05 16:33',
    note: "",
  },
  {
    phone: '152****9390',
    nick: '张*',
    cardNo: '20251224113756287021',
    cardType: '储值卡',
    cardName: '创始会员专供',
    cardStatus: '正常',
    balance: '0.00元',
    issuedAt: '2025-12-25 11:42',
    validUntil: '2035-12-25 23:59',
    initValid: '10年',
    price: 1000.0,
    issuedDate: '2025-12-24 11:37',
    note: "",
  },
  {
    phone: '158****2497',
    nick: '文*',
    cardNo: '20251224165909292124',
    cardType: '储值卡',
    cardName: '创始会员专供',
    cardStatus: '正常',
    balance: '1318.00元',
    issuedAt: '2025-12-25 11:47',
    validUntil: '2026-12-25 23:59',
    initValid: '1年',
    price: 2000.0,
    issuedDate: '2025-12-24 16:59',
    note: "",
  },
  {
    phone: '186****2810',
    nick: '朱*',
    cardNo: '20251227114812316657',
    cardType: '储值卡',
    cardName: '创始会员专供',
    cardStatus: '未开卡',
    balance: '4000.00元',
    issuedAt: "",
    validUntil: "",
    initValid: '1年',
    price: 2000.0,
    issuedDate: '2025-12-27 11:48',
    note: "",
  },
  {
    phone: '182****8897',
    nick: '薇********',
    cardNo: '20251228170147326486',
    cardType: '储值卡',
    cardName: '创始会员专供',
    cardStatus: '正常',
    balance: '772.00元',
    issuedAt: '2025-12-30 09:13',
    validUntil: '2035-12-30 23:59',
    initValid: '10年',
    price: 2000.0,
    issuedDate: '2025-12-28 17:01',
    note: "",
  },
  {
    phone: '152****7561',
    nick: '谢**',
    cardNo: '20251230114553343507',
    cardType: '储值卡',
    cardName: '创始会员专供',
    cardStatus: '正常',
    balance: '126.00元',
    issuedAt: '2026-01-04 12:28',
    validUntil: '2036-01-04 23:59',
    initValid: '10年',
    price: 2000.0,
    issuedDate: '2025-12-30 11:45',
    note: "",
  },
  {
    phone: '178****6413',
    nick: '王**',
    cardNo: '20260102163016371096',
    cardType: '储值卡',
    cardName: '创始会员专供',
    cardStatus: '正常',
    balance: '1884.00元',
    issuedAt: '2026-01-04 15:34',
    validUntil: '2046-01-04 23:59',
    initValid: '10年',
    price: 2000.0,
    issuedDate: '2026-01-02 16:30',
    note: "",
  },
  {
    phone: '188****0350',
    nick: '一***',
    cardNo: '20260103164908380171',
    cardType: '储值卡',
    cardName: '创始会员专供',
    cardStatus: '正常',
    balance: '11742.00元',
    issuedAt: '2026-01-27 20:27',
    validUntil: '2036-01-25 23:59',
    initValid: '10年',
    price: 7500.0,
    issuedDate: '2026-01-03 16:49',
    note: "",
  },
  {
    phone: '183****2648',
    nick: '刘*',
    cardNo: '20260110122624455594',
    cardType: '储值卡',
    cardName: '创始会员专供',
    cardStatus: '正常',
    balance: '5424.00元',
    issuedAt: '2026-01-25 13:08',
    validUntil: '2036-01-23 23:59',
    initValid: '10年',
    price: 4500.0,
    issuedDate: '2026-01-10 12:26',
    note: "",
  },
  {
    phone: '133****6289',
    nick: '唐*',
    cardNo: '20260113164501487798',
    cardType: '储值卡',
    cardName: '创始会员专供',
    cardStatus: '正常',
    balance: '20.00元',
    issuedAt: '2026-01-16 10:36',
    validUntil: '2036-01-14 23:59',
    initValid: '10年',
    price: 1500.0,
    issuedDate: '2026-01-13 16:45',
    note: "",
  },
  {
    phone: '137****7438',
    nick: '李*',
    cardNo: '20260117233801536607',
    cardType: '储值卡',
    cardName: '创始会员专供',
    cardStatus: '正常',
    balance: '310.00元',
    issuedAt: '2026-01-17 23:38',
    validUntil: '2027-01-17 23:59',
    initValid: '1年',
    price: 900.0,
    issuedDate: '2026-01-17 23:38',
    note: "",
  },
  {
    phone: '188****0159',
    nick: '青*',
    cardNo: '20260119211353555117',
    cardType: '储值卡',
    cardName: '创始会员专供',
    cardStatus: '正常',
    balance: '1116.00元',
    issuedAt: '2026-01-23 17:17',
    validUntil: '2036-01-21 23:59',
    initValid: '10年',
    price: 1000.0,
    issuedDate: '2026-01-19 21:13',
    note: "",
  },
  {
    phone: '158****0175',
    nick: '阳*',
    cardNo: '20260120215759563728',
    cardType: '储值卡',
    cardName: '创始会员专供',
    cardStatus: '正常',
    balance: '318.00元',
    issuedAt: '2026-01-20 21:58',
    validUntil: '2036-01-18 23:59',
    initValid: '10年',
    price: 1500.0,
    issuedDate: '2026-01-20 21:57',
    note: "",
  },
  {
    phone: '151****1972',
    nick: 'w******',
    cardNo: '20260203161332680219',
    cardType: '储值卡',
    cardName: '创始会员专供',
    cardStatus: '正常',
    balance: '1974.00元',
    issuedAt: '2026-02-03 16:14',
    validUntil: '2036-02-01 23:59',
    initValid: '10年',
    price: 2000.0,
    issuedDate: '2026-02-03 16:13',
    note: "",
  },
  {
    phone: '158****0598',
    nick: '林**',
    cardNo: '20260227161240824719',
    cardType: '储值卡',
    cardName: '创始会员专供',
    cardStatus: '正常',
    balance: '0.00元',
    issuedAt: '2026-02-27 16:13',
    validUntil: '2036-02-25 23:59',
    initValid: '10年',
    price: 1000.0,
    issuedDate: '2026-02-27 16:12',
    note: "",
  },
  {
    phone: '158****0598',
    nick: '林**',
    cardNo: '20260316185716180146',
    cardType: '储值卡',
    cardName: '创始会员专供',
    cardStatus: '正常',
    balance: '6144.00元',
    issuedAt: '2026-03-16 18:59',
    validUntil: '2046-05-12 23:59',
    initValid: '10年1个月',
    price: 10000.0,
    issuedDate: '2026-03-16 18:57',
    note: "",
  },
  {
    phone: '151****3908',
    nick: '东*',
    cardNo: '20260308194157014277',
    cardType: '储值卡',
    cardName: '创始会员专供',
    cardStatus: '正常',
    balance: '2848.00元',
    issuedAt: '2026-03-10 08:40',
    validUntil: '2031-03-09 23:59',
    initValid: '5年',
    price: 2000.0,
    issuedDate: '2026-03-08 19:41',
    note: "",
  },
  {
    phone: '135****5880',
    nick: 'S*******',
    cardNo: '20260309134459031258',
    cardType: '储值卡',
    cardName: '创始会员专供',
    cardStatus: '正常',
    balance: '146.00元',
    issuedAt: '2026-03-09 13:47',
    validUntil: '2031-03-08 23:59',
    initValid: '5年',
    price: 2000.0,
    issuedDate: '2026-03-09 13:44',
    note: "",
  },
  {
    phone: '150****7978',
    nick: 'E******',
    cardNo: '20260315155320155004',
    cardType: '储值卡',
    cardName: '创始会员专供',
    cardStatus: '正常',
    balance: '5080.00元',
    issuedAt: '2026-03-15 17:28',
    validUntil: '2030-03-14 23:59',
    initValid: '3年',
    price: 7000.0,
    issuedDate: '2026-03-15 15:53',
    note: "",
  },
  {
    phone: '156****2083',
    nick: '清*',
    cardNo: '20260321165652266484',
    cardType: '储值卡',
    cardName: '会员卡',
    cardStatus: '正常',
    balance: '10934.00元',
    issuedAt: '2026-03-26 13:32',
    validUntil: '2036-03-25 23:59',
    initValid: '5年',
    price: 9000.0,
    issuedDate: '2026-03-21 16:56',
    note: "",
  },
  {
    phone: '155****2461',
    nick: 'S*****',
    cardNo: '20260322120814274623',
    cardType: '储值卡',
    cardName: '创始会员专供',
    cardStatus: '正常',
    balance: '2778.00元',
    issuedAt: '2026-03-31 21:33',
    validUntil: '2031-03-30 23:59',
    initValid: '5年',
    price: 2000.0,
    issuedDate: '2026-03-22 12:08',
    note: "",
  },
  {
    phone: '183****8678',
    nick: '敏*',
    cardNo: '20260323203020303835',
    cardType: '储值卡',
    cardName: '创始会员专供',
    cardStatus: '正常',
    balance: '514.00元',
    issuedAt: '2026-03-23 20:30',
    validUntil: '2036-04-19 23:59',
    initValid: '10年1个月',
    price: 3000.0,
    issuedDate: '2026-03-23 20:30',
    note: "",
  },
  {
    phone: '151****0177',
    nick: '胡*',
    cardNo: '20260328172724395745',
    cardType: '储值卡',
    cardName: '会员卡',
    cardStatus: '正常',
    balance: '3590.00元',
    issuedAt: '2026-03-28 17:27',
    validUntil: '2036-03-27 23:59',
    initValid: '5年',
    price: 6000.0,
    issuedDate: '2026-03-28 17:27',
    note: "",
  },
  {
    phone: '188****5813',
    nick: '熊**',
    cardNo: '20260401110540466885',
    cardType: '储值卡',
    cardName: '创始会员专供',
    cardStatus: '正常',
    balance: '4636.00元',
    issuedAt: '2026-04-06 11:06',
    validUntil: '2036-05-03 23:59',
    initValid: '10年1个月',
    price: 5000.0,
    issuedDate: '2026-04-01 11:05',
    note: "",
  },
  {
    phone: '150****3662',
    nick: '刘************',
    cardNo: '20260402200218492463',
    cardType: '储值卡',
    cardName: '创始会员专供',
    cardStatus: '正常',
    balance: '984.00元',
    issuedAt: '2026-04-02 20:47',
    validUntil: '2031-04-01 23:59',
    initValid: '5年',
    price: 3280.0,
    issuedDate: '2026-04-02 20:02',
    note: "",
  },
  {
    phone: '153****0351',
    nick: '芋***',
    cardNo: '20260411124354633000',
    cardType: '储值卡',
    cardName: '会员卡',
    cardStatus: '正常',
    balance: '530.00元',
    issuedAt: '2026-04-11 12:53',
    validUntil: '2031-04-10 23:59',
    initValid: '5年',
    price: 3000.0,
    issuedDate: '2026-04-11 12:43',
    note: "",
  },
  {
    phone: '159****7218',
    nick: 'I***',
    cardNo: '20260411155622636926',
    cardType: '储值卡',
    cardName: '会员卡',
    cardStatus: '正常',
    balance: '13680.00元',
    issuedAt: '2026-04-11 15:56',
    validUntil: '2031-04-10 23:59',
    initValid: '5年',
    price: 10000.0,
    issuedDate: '2026-04-11 15:56',
    note: "",
  },
  {
    phone: '151****7358',
    nick: 'y**',
    cardNo: '20260413162108673722',
    cardType: '储值卡',
    cardName: '会员卡',
    cardStatus: '正常',
    balance: '904.00元',
    issuedAt: '2026-04-14 12:17',
    validUntil: '2027-04-14 23:59',
    initValid: '1年',
    price: 1000.0,
    issuedDate: '2026-04-13 16:21',
    note: "",
  },
  {
    phone: '186****2710',
    nick: '🍈',
    cardNo: '20260430173359979027',
    cardType: '储值卡',
    cardName: '会员卡',
    cardStatus: '未开卡',
    balance: '1500.00元',
    issuedAt: "",
    validUntil: "",
    initValid: '1年',
    price: 1000.0,
    issuedDate: '2026-04-30 17:33',
    note: "",
  },
  {
    phone: '158****0704',
    nick: '胡***',
    cardNo: '20260519220007325617',
    cardType: '储值卡',
    cardName: '会员卡',
    cardStatus: '正常',
    balance: '8616.00元',
    issuedAt: '2026-05-19 22:00',
    validUntil: '2036-05-18 23:59',
    initValid: '5年',
    price: 6000.0,
    issuedDate: '2026-05-19 22:00',
    note: "",
  },
  {
    phone: '139****7544',
    nick: '小**********',
    cardNo: '20260611000535735146',
    cardType: '储值卡',
    cardName: '会员卡',
    cardStatus: '正常',
    balance: '3510.00元',
    issuedAt: '2026-06-11 00:06',
    validUntil: '2031-06-10 23:59',
    initValid: '5年',
    price: 3000.0,
    issuedDate: '2026-06-11 00:05',
    note: "",
  },
  {
    phone: '132****2247',
    nick: '做******',
    cardNo: '20260616163217839709',
    cardType: '储值卡',
    cardName: '会员卡',
    cardStatus: '正常',
    balance: '844.00元',
    issuedAt: '2026-06-18 17:43',
    validUntil: '2027-06-18 23:59',
    initValid: '1年',
    price: 1000.0,
    issuedDate: '2026-06-16 16:32',
    note: "",
  },
  {
    phone: '195****1658',
    nick: 'ㅤ',
    cardNo: '20260624181016986261',
    cardType: '储值卡',
    cardName: '会员卡',
    cardStatus: '正常',
    balance: '2616.00元',
    issuedAt: '2026-06-24 18:10',
    validUntil: '2031-06-23 23:59',
    initValid: '5年',
    price: 3000.0,
    issuedDate: '2026-06-24 18:10',
    note: "",
  },
  {
    phone: '158****8605',
    nick: '王**',
    cardNo: '20260704160957184152',
    cardType: '储值卡',
    cardName: '会员卡',
    cardStatus: '未开卡',
    balance: '5000.00元',
    issuedAt: "",
    validUntil: "",
    initValid: '5年',
    price: 3000.0,
    issuedDate: '2026-07-04 16:09',
    note: "",
  },
];
// ==========================================================================
// 会员卡清单 — 来自小程序后台导出（2026-07-05 04:00），含脱敏
// ==========================================================================
