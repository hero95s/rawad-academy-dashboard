
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PartialPaymentsTable from '@/components/PartialPaymentsTable';
import { 
  Users, 
  DollarSign, 
  GraduationCap, 
  BookOpen,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  AlertCircle,
  Clock,
  UserCheck
} from 'lucide-react';

const StatsOverview = () => {
  const stats = [
    {
      title: 'إجمالي الطلاب',
      value: '247',
      change: '+12',
      changeType: 'increase',
      icon: Users,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'المدفوعات الكاملة',
      value: '189',
      change: '+8',
      changeType: 'increase',
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'المدفوعات الجزئية',
      value: '43',
      change: '+3',
      changeType: 'increase',
      icon: Clock,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'غير مدفوع',
      value: '15',
      change: '-2',
      changeType: 'decrease',
      icon: AlertCircle,
      color: 'from-red-500 to-pink-500'
    }
  ];

  const financialStats = [
    {
      title: 'إجمالي المبالغ المستلمة',
      value: '74,100,000',
      unit: 'دينار',
      icon: TrendingUp,
      color: 'text-green-600 bg-green-50'
    },
    {
      title: 'إجمالي المصروفات',
      value: '12,500,000',
      unit: 'دينار',
      icon: TrendingDown,
      color: 'text-red-600 bg-red-50'
    },
    {
      title: 'صافي المبلغ',
      value: '61,600,000',
      unit: 'دينار',
      color: 'text-orange-600 bg-orange-50',
      highlight: true
    }
  ];

  const gradeStats = [
    { grade: 'السادس علوم', count: 89, color: 'bg-purple-100 text-purple-700' },
    { grade: 'السادس أدبي', count: 76, color: 'bg-blue-100 text-blue-700' },
    { grade: 'السادس مهني', count: 82, color: 'bg-green-100 text-green-700' }
  ];

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5`}></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-full bg-gradient-to-br ${stat.color}`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="flex items-center gap-1 mt-1">
                <Badge 
                  variant={stat.changeType === 'increase' ? 'default' : 'secondary'}
                  className={`text-xs ${
                    stat.changeType === 'increase' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {stat.change}
                </Badge>
                <span className="text-xs text-gray-500">من الشهر الماضي</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Financial Overview */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <DollarSign className="h-5 w-5 text-purple-600" />
            الملخص المالي
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {financialStats.map((stat, index) => (
              <div key={index} className="text-center p-4 rounded-lg border border-gray-100">
                <div className={`inline-flex p-2 rounded-full mb-3 ${stat.color}`}>
                  {stat.icon && <stat.icon className="h-5 w-5" />}
                </div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className={`text-2xl font-bold ${stat.highlight ? 'text-orange-600' : 'text-gray-900'}`}>
                  {stat.value}
                </p>
                <p className="text-xs text-gray-500">{stat.unit}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Grade Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-purple-600" />
              توزيع الطلاب حسب الصف
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {gradeStats.map((grade, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <span className="font-medium">{grade.grade}</span>
                <div className="flex items-center gap-2">
                  <Badge className={grade.color}>{grade.count} طالب</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-purple-600" />
              إحصائيات المعلمين
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
              <span className="font-medium">اللغة العربية</span>
              <div className="text-sm text-gray-600">
                معلمان - 124 طالب
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
              <span className="font-medium">اللغة الإنجليزية</span>
              <div className="text-sm text-gray-600">
                معلمان - 98 طالب
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
              <span className="font-medium">الرياضيات</span>
              <div className="text-sm text-gray-600">
                معلم واحد - 87 طالب
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Partial Payments Table */}
      <PartialPaymentsTable />
    </div>
  );
};

export default StatsOverview;
