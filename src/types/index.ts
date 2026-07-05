export type TransactionCategory = '场地' | '证件' | '装修' | '布置' | '物品' | '装饰' | '运营';

export type TransactionStatus = 'draft' | 'published' | 'archived';

export interface Transaction {
  id: string;
  title: string;
  category: TransactionCategory;
  content: string;
  coverImage: string;
  images: string[];
  author: User;
  createdAt: string;
  updatedAt: string;
  status: TransactionStatus;
  viewCount: number;
  likeCount: number;
  cost?: number;            // 该阶段实际花费（同行关心）
  lesson?: string;          // 一句经验 / 避坑
}

export interface User {
  id: string;
  name: string;
  realName?: string;
  phone?: string;
  avatar?: string;
  role: 'admin' | 'coach' | 'member';
  createdAt: string;
  wechat?: string;
}

export interface OperationsOverview {
  todayBookings: number;
  weekBookings: number;
  monthMembers: number;
  totalMembers: number;
  todayRevenue: number;
  monthRevenue: number;
}

export interface RevenueData {
  date: string;
  amount: number;
  orders: number;
}

export interface BookingData {
  id: string;
  courseId: string;
  courseName: string;
  memberId: string;
  memberName: string;
  coachName: string;
  date: string;
  timeSlot: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export interface MemberData {
  id: string;
  name: string;
  phone: string;
  level: string;
  joinDate: string;
  totalBookings: number;
  totalSpent: number;
  lastVisit: string;
}

export interface CourseData {
  id: string;
  name: string;
  type: 'yoga' | 'pilates' | 'therapy';
  coachId: string;
  coachName: string;
  capacity: number;
  booked: number;
  price: number;
  schedule: { day: string; time: string }[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
}
