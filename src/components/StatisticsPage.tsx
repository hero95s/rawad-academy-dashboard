import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  GraduationCap, 
  DollarSign, 
  TrendingUp, 
  CheckCircle, 
  XCircle, 
  Clock,
  Printer,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface Student {
  id: string;
  name: string;
  subject: string;
  teacher: string;
  totalFee: number;
  paidAmount: number;
  status: 'paid' | 'unpaid' | 'partial';
}

interface TeacherStats {
  name: string;
  subject: string;
  studentCount: number;
  students: Student[];
}

const StatisticsPage = () => {
  const [expandedTeacher, setExpandedTeacher] = useState<string | null>(null);

  // Sample data
  const students: Student[] = [
    { id: '1', name: 'أحمد محمد', subject: 'الرياضيات', teacher: 'أحمد محمد', totalFee: 300000, paidAmount: 300000, status: 'paid' },
    { id: '2', name: 'سارة أحمد', subject: 'الفيزياء', teacher: 'سارة أحمد', totalFee: 300000, paidAmount: 150000, status: 'partial' },
    { id: '3', name: 'محمد علي', subject: 'الكيمياء', teacher: 'محمد علي', totalFee: 300000, paidAmount: 0, status: 'unpaid' },
    { id: '4', name: 'فاطمة حسن', subject: 'الرياضيات', teacher: 'أحمد محمد', totalFee: 300000, paidAmount: 300000, status: 'paid' },
    { id: '5', name: 'علي حسين', subject: 'الفيزياء', teacher: 'سارة أحمد', totalFee: 300000, paidAmount: 100000, status: 'partial' },
    { id: '6', name: 'زينب محمود', subject: 'الكيمياء', teacher: 'محمد علي', totalFee: 300000, paidAmount: 0, status: 'unpaid' },
  ];

  const paidStudents = students.filter(s => s.status === 'paid');
  const unpaidStudents = students.filter(s => s.status === 'unpaid');
  const partialStudents = students.filter(s => s.status === 'partial');

  const totalRevenue = students.reduce((sum, student) => sum + student.paidAmount, 0);
  const totalExpenses = 2725000; // Example expenses from withdrawals
  const netProfit = totalRevenue - totalExpenses;

  const teacherStats: TeacherStats[] = [
    {
      name: 'أحمد محمد',
      subject: 'الرياضيات',
      studentCount: students.filter(s => s.teacher === 'أحمد محمد').length,
      students: students.filter(s => s.teacher === 'أحمد محمد')
    },
    {
      name: 'سارة أحمد',
      subject: 'الفيزياء',
      studentCount: students.filter(s => s.teacher === 'سارة أحمد').length,
      students: students.filter(s => s.teacher === 'سارة أحمد')
    },
    {
      name: 'محمد علي',
      subject: 'الكيمياء',
      studentCount: students.filter(s => s.teacher === 'محمد علي').length,
      students: students.filter(s => s.teacher === 'محمد علي')
    },
  ];

  const handlePrint = (type: string) => {
    window.print();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-700';
      case 'unpaid': return 'bg-red-100 text-red-700';
      case 'partial': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid': return 'مسدد';
      case 'unpaid': return 'غير مسدد';
      case 'partial': return 'مسدد جزئياً';
      default: return 'غير محدد';
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">إجمالي الطلاب</p>
                <p className="text-3xl font-bold text-blue-800">{students.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">المسددين بالكامل</p>
                <p className="text-3xl font-bold text-green-800">{paidStudents.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-50 to-red-100 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600">غير المسددين</p>
                <p className="text-3xl font-bold text-red-800">{unpaidStudents.length}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-600">المسددين جزئياً</p>
                <p className="text-3xl font-bold text-yellow-800">{partialStudents.length}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Teachers Statistics */}
      <Card className="bg-white/80 backdrop-blur-lg border-purple-100 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl text-purple-800">
            <GraduationCap className="h-6 w-6" />
            إحصائيات المعلمين
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teacherStats.map((teacher) => (
              <div key={teacher.name} className="border rounded-lg p-4">
                <div 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setExpandedTeacher(expandedTeacher === teacher.name ? null : teacher.name)}
                >
                  <div className="flex items-center gap-3">
                    <GraduationCap className="h-5 w-5 text-purple-600" />
                    <div>
                      <h3 className="font-semibold">{teacher.name}</h3>
                      <p className="text-sm text-gray-600">{teacher.subject}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-purple-100 text-purple-700">
                      {teacher.studentCount} طالب
                    </Badge>
                    {expandedTeacher === teacher.name ? 
                      <ChevronUp className="h-4 w-4" /> : 
                      <ChevronDown className="h-4 w-4" />
                    }
                  </div>
                </div>
                
                {expandedTeacher === teacher.name && (
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-medium mb-3">قائمة الطلاب:</h4>
                    <div className="space-y-2">
                      {teacher.students.map((student) => (
                        <div key={student.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span>{student.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-mono">
                              {student.paidAmount.toLocaleString()} / {student.totalFee.toLocaleString()} د.ع
                            </span>
                            <Badge className={getStatusColor(student.status)}>
                              {getStatusText(student.status)}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Financial Statistics */}
      <Card className="bg-white/80 backdrop-blur-lg border-purple-100 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl text-purple-800">
            <DollarSign className="h-6 w-6" />
            الإحصائيات المالية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800">إجمالي التكاليف</h3>
              <p className="text-2xl font-bold text-blue-600 font-mono">
                {(students.length * 300000).toLocaleString()} د.ع
              </p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-800">إجمالي المقبوضات</h3>
              <p className="text-2xl font-bold text-green-600 font-mono">
                {totalRevenue.toLocaleString()} د.ع
              </p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <h3 className="font-semibold text-red-800">إجمالي المصروفات</h3>
              <p className="text-2xl font-bold text-red-600 font-mono">
                {totalExpenses.toLocaleString()} د.ع
              </p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <h3 className="font-semibold text-yellow-800">الصافي</h3>
              <p className="text-2xl font-bold font-mono" style={{ color: '#ffac33' }}>
                {netProfit.toLocaleString()} د.ع
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Tables */}
      <Card className="bg-white/80 backdrop-blur-lg border-purple-100 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl text-purple-800">
            <TrendingUp className="h-6 w-6" />
            التقارير التفصيلية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="paid" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="paid" className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                المسددين بالكامل
              </TabsTrigger>
              <TabsTrigger value="unpaid" className="flex items-center gap-2">
                <XCircle className="h-4 w-4" />
                غير المسددين
              </TabsTrigger>
              <TabsTrigger value="partial" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                المسددين جزئياً
              </TabsTrigger>
            </TabsList>

            <TabsContent value="paid" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">الطلاب المسددين بالكامل ({paidStudents.length})</h3>
                <Button variant="outline" onClick={() => handlePrint('paid')}>
                  <Printer className="ml-2 h-4 w-4" />
                  طباعة
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow className="bg-green-50">
                    <TableHead className="text-right">الاسم</TableHead>
                    <TableHead className="text-right">المادة</TableHead>
                    <TableHead className="text-right">المعلم</TableHead>
                    <TableHead className="text-right">المبلغ المدفوع</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paidStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.subject}</TableCell>
                      <TableCell>{student.teacher}</TableCell>
                      <TableCell className="font-mono">{student.paidAmount.toLocaleString()} د.ع</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="unpaid" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">الطلاب غير المسددين ({unpaidStudents.length})</h3>
                <Button variant="outline" onClick={() => handlePrint('unpaid')}>
                  <Printer className="ml-2 h-4 w-4" />
                  طباعة
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow className="bg-red-50">
                    <TableHead className="text-right">الاسم</TableHead>
                    <TableHead className="text-right">المادة</TableHead>
                    <TableHead className="text-right">المعلم</TableHead>
                    <TableHead className="text-right">المبلغ المطلوب</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {unpaidStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.subject}</TableCell>
                      <TableCell>{student.teacher}</TableCell>
                      <TableCell className="font-mono text-red-600">{student.totalFee.toLocaleString()} د.ع</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="partial" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">الطلاب المسددين جزئياً ({partialStudents.length})</h3>
                <Button variant="outline" onClick={() => handlePrint('partial')}>
                  <Printer className="ml-2 h-4 w-4" />
                  طباعة
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow className="bg-yellow-50">
                    <TableHead className="text-right">الاسم</TableHead>
                    <TableHead className="text-right">المادة</TableHead>
                    <TableHead className="text-right">المعلم</TableHead>
                    <TableHead className="text-right">المدفوع</TableHead>
                    <TableHead className="text-right">المتبقي</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {partialStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.subject}</TableCell>
                      <TableCell>{student.teacher}</TableCell>
                      <TableCell className="font-mono text-green-600">{student.paidAmount.toLocaleString()} د.ع</TableCell>
                      <TableCell className="font-mono text-red-600">{(student.totalFee - student.paidAmount).toLocaleString()} د.ع</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatisticsPage;