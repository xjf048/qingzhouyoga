import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, FileText, BarChart3, Users, PieChart, Settings, Eye, Edit, Trash2, Plus } from 'lucide-react';
import Sidebar from '../../components/layout/Sidebar';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { useTransactionStore } from '../../stores/transactionStore';
import { mockOverview, mockMembers, mockTransactions } from '../../mock/data';

export default function AdminDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const transactions = useTransactionStore((state) => state.transactions);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      
      <main className={`transition-all duration-300 pt-18 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-serif font-semibold text-accent mb-2">管理后台</h1>
            <p className="text-muted">欢迎回来，管理馆内事务和查看运营数据</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-mono font-bold text-accent">{transactions.length}</p>
                <p className="text-sm text-muted">事务总数</p>
              </div>
            </Card>

            <Card className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/30 flex items-center justify-center">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-mono font-bold text-accent">{mockOverview.totalMembers}</p>
                <p className="text-sm text-muted">会员总数</p>
              </div>
            </Card>

            <Card className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-data1/20 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-data1" />
              </div>
              <div>
                <p className="text-2xl font-mono font-bold text-accent">¥{mockOverview.monthRevenue.toLocaleString()}</p>
                <p className="text-sm text-muted">本月营收</p>
              </div>
            </Card>

            <Card className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-data2/20 flex items-center justify-center">
                <LayoutDashboard className="w-6 h-6 text-data2" />
              </div>
              <div>
                <p className="text-2xl font-mono font-bold text-accent">
                  {mockOverview.todayBookings ?? '—'}
                </p>
                <p className="text-sm text-muted">今日预约 · 待接口对接</p>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-serif font-semibold text-accent">最新事务</h2>
                <Link to="/admin/transactions" className="text-sm text-primary hover:underline">查看全部</Link>
              </div>
              <div className="space-y-4">
                {transactions.slice(0, 5).map((transaction) => (
                  <div key={transaction.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/5 transition-colors">
                    <img
                      src={transaction.coverImage}
                      alt={transaction.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-accent truncate">{transaction.title}</p>
                      <p className="text-sm text-muted">{transaction.category} · {transaction.createdAt}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 rounded-lg hover:bg-secondary/20 transition-colors">
                        <Eye className="w-4 h-4 text-muted" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-secondary/20 transition-colors">
                        <Edit className="w-4 h-4 text-muted" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-serif font-semibold text-accent">最新会员</h2>
                <Link to="/admin/members" className="text-sm text-primary hover:underline">查看全部</Link>
              </div>
              <div className="space-y-4">
                {mockMembers.slice(0, 5).map((member) => (
                  <div key={member.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/5 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center text-white font-medium">
                      {member.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-accent">{member.name}</p>
                      <p className="text-sm text-muted">{member.phone}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      member.level === '钻石会员' ? 'bg-warning/10 text-warning' :
                      member.level === '金卡会员' ? 'bg-secondary/20 text-accent' :
                      'bg-secondary/5 text-muted'
                    }`}>
                      {member.level}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-serif font-semibold text-accent">快捷操作</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button className="flex flex-col items-center gap-3 p-6 rounded-xl bg-secondary/5 hover:bg-secondary/10 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                      <Plus className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-medium text-accent">发布事务</span>
                  </button>
                  <button className="flex flex-col items-center gap-3 p-6 rounded-xl bg-secondary/5 hover:bg-secondary/10 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-data1 flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-medium text-accent">添加会员</span>
                  </button>
                  <button className="flex flex-col items-center gap-3 p-6 rounded-xl bg-secondary/5 hover:bg-secondary/10 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-data2 flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-medium text-accent">数据导出</span>
                  </button>
                  <button className="flex flex-col items-center gap-3 p-6 rounded-xl bg-secondary/5 hover:bg-secondary/10 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                      <Settings className="w-6 h-6 text-accent" />
                    </div>
                    <span className="font-medium text-accent">系统设置</span>
                  </button>
                </div>
              </Card>
            </div>

            <div>
              <Card>
                <h2 className="text-xl font-serif font-semibold text-accent mb-6">系统信息</h2>
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b border-secondary/10">
                    <span className="text-muted">系统版本</span>
                    <span className="text-accent">v1.0.0</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-secondary/10">
                    <span className="text-muted">数据同步</span>
                    <span className="text-success">已连接</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-secondary/10">
                    <span className="text-muted">最后更新</span>
                    <span className="text-accent">3分钟前</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted">小程序状态</span>
                    <span className="text-success">正常</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
