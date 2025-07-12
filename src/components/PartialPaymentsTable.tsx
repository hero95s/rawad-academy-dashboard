import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, Users, Printer, Search, Filter } from 'lucide-react';

interface PartialPaymentStudent {
  id: string;
  name: string;
  subject: string;
  teacher: string;
  paidAmount: number;
  remainingAmount: number;
}

const PartialPaymentsTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedTeacher, setSelectedTeacher] = useState('all');

  const partialStudents: PartialPaymentStudent[] = [
    {
      id: '1',
      name: 'أحمد محمد علي',
      subject: 'الرياضيات',
      teacher: 'أحمد حسن',
      paidAmount: 600000,
      remainingAmount: 300000
    },
    {
      id: '2',
      name: 'فاطمة حسن محمود',
      subject: 'اللغة العربية',
      teacher: 'سارة محمد',
      paidAmount: 300000,
      remainingAmount: 300000
    },
    {
      id: '3',
      name: 'محمد علي حسن',
      subject: 'اللغة الإنجليزية',
      teacher: 'علي أحمد',
      paidAmount: 450000,
      remainingAmount: 150000
    },
    {
      id: '4',
      name: 'سارة أحمد محمد',
      subject: 'الرياضيات',
      teacher: 'أحمد حسن',
      paidAmount: 750000,
      remainingAmount: 150000
    },
    {
      id: '5',
      name: 'محمود عبد الله',
      subject: 'العلوم',
      teacher: 'فاطمة علي',
      paidAmount: 400000,
      remainingAmount: 200000
    }
  ];

  // Get unique subjects and teachers for filters
  const subjects = [...new Set(partialStudents.map(student => student.subject))];
  const teachers = [...new Set(partialStudents.map(student => student.teacher))];

  // Filter students based on search and filters
  const filteredStudents = partialStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSubject = selectedSubject === 'all' || student.subject === selectedSubject;
    const matchesTeacher = selectedTeacher === 'all' || student.teacher === selectedTeacher;
    
    return matchesSearch && matchesSubject && matchesTeacher;
  });

  const totalPaidAmount = filteredStudents.reduce((sum, student) => sum + student.paidAmount, 0);
  const totalRemainingAmount = filteredStudents.reduce((sum, student) => sum + student.remainingAmount, 0);

  const handlePrint = () => {
    const printContent = `
      <html dir="rtl">
        <head>
          <title>تقرير الطلاب المسددين جزئياً</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              margin: 20px; 
              direction: rtl; 
              color: #333;
            }
            .header { 
              text-align: center; 
              margin-bottom: 30px; 
              border-bottom: 2px solid #f59e0b;
              padding-bottom: 20px;
            }
            .institute-name {
              font-size: 24px;
              font-weight: bold;
              color: #f59e0b;
              margin-bottom: 10px;
            }
            .report-title {
              font-size: 20px;
              color: #1f2937;
              margin-bottom: 5px;
            }
            .info { 
              margin-bottom: 20px; 
              background: #fef3c7;
              padding: 15px;
              border-radius: 8px;
            }
            .filters-info {
              margin-bottom: 15px;
              padding: 10px;
              background: #f3f4f6;
              border-radius: 5px;
            }
            table { 
              width: 100%; 
              border-collapse: collapse; 
              margin-top: 20px;
              font-size: 14px;
            }
            th, td { 
              border: 1px solid #d1d5db; 
              padding: 12px 8px; 
              text-align: right; 
            }
            th { 
              background-color: #fef3c7; 
              font-weight: bold;
              color: #92400e;
            }
            .total-row { 
              font-weight: bold; 
              background-color: #fbbf24; 
              color: #1f2937;
            }
            .student-row:nth-child(even) {
              background-color: #fffbeb;
            }
            .amount {
              font-family: 'Courier New', monospace;
              font-weight: bold;
            }
            .footer {
              margin-top: 30px;
              border-top: 1px solid #d1d5db;
              padding-top: 20px;
              display: flex;
              justify-content: space-between;
            }
            .signature-area {
              text-align: center;
              margin-top: 50px;
            }
            @media print {
              body { margin: 0; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="institute-name">معهد إبداع الرواد</div>
            <div class="report-title">تقرير الطلاب المسددين جزئياً</div>
          </div>
          
          <div class="info">
            <div><strong>طُبع بواسطة:</strong> المدير</div>
            <div><strong>تاريخ الطباعة:</strong> ${new Date().toLocaleDateString('ar')}</div>
            <div><strong>وقت الطباعة:</strong> ${new Date().toLocaleTimeString('ar')}</div>
          </div>

          ${(selectedSubject !== 'all' || selectedTeacher !== 'all' || searchTerm) ? `
          <div class="filters-info">
            <strong>المرشحات المطبقة:</strong>
            ${selectedSubject !== 'all' ? `المادة: ${selectedSubject} | ` : ''}
            ${selectedTeacher !== 'all' ? `المعلم: ${selectedTeacher} | ` : ''}
            ${searchTerm ? `البحث: ${searchTerm}` : ''}
          </div>
          ` : ''}
          
          <table>
            <thead>
              <tr>
                <th>الاسم</th>
                <th>المادة</th>
                <th>المعلم</th>
                <th>المدفوع</th>
                <th>المتبقي</th>
              </tr>
            </thead>
            <tbody>
              ${filteredStudents.map(student => `
                <tr class="student-row">
                  <td>${student.name}</td>
                  <td>${student.subject}</td>
                  <td>${student.teacher}</td>
                  <td class="amount">${student.paidAmount.toLocaleString()} د.ع</td>
                  <td class="amount">${student.remainingAmount.toLocaleString()} د.ع</td>
                </tr>
              `).join('')}
              <tr class="total-row">
                <td colspan="3"><strong>الإجمالي</strong></td>
                <td class="amount"><strong>${totalPaidAmount.toLocaleString()} د.ع</strong></td>
                <td class="amount"><strong>${totalRemainingAmount.toLocaleString()} د.ع</strong></td>
              </tr>
            </tbody>
          </table>

          <div class="footer">
            <div>
              <strong>عدد الطلاب:</strong> ${filteredStudents.length} طالب
            </div>
            <div>
              <strong>إجمالي المدفوع:</strong> ${totalPaidAmount.toLocaleString()} د.ع
            </div>
          </div>

          <div class="signature-area">
            <div style="margin-top: 60px; border-top: 1px solid #000; width: 200px; margin: 60px auto 10px;">
              <strong>توقيع المدير</strong>
            </div>
          </div>
        </body>
      </html>
    `;
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-yellow-600" />
          الطلاب المسددين جزئياً
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6" dir="rtl">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="البحث في الطلاب أو المواد أو المعلمين..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10"
            />
          </div>
          
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="فلترة حسب المادة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع المواد</SelectItem>
              {subjects.map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="فلترة حسب المعلم" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع المعلمين</SelectItem>
              {teachers.map((teacher) => (
                <SelectItem key={teacher} value={teacher}>
                  {teacher}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            onClick={handlePrint}
            variant="outline"
            className="border-yellow-200 text-yellow-700 hover:bg-yellow-50 whitespace-nowrap"
          >
            <Printer className="ml-2 h-4 w-4" />
            🖨️ طباعة التقرير
          </Button>
        </div>

        {/* Table */}
        <div className="rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-yellow-50">
                  <TableHead className="text-right font-semibold min-w-[120px]">الاسم</TableHead>
                  <TableHead className="text-right font-semibold min-w-[100px]">المادة</TableHead>
                  <TableHead className="text-right font-semibold min-w-[100px]">المعلم</TableHead>
                  <TableHead className="text-right font-semibold min-w-[100px]">المدفوع</TableHead>
                  <TableHead className="text-right font-semibold min-w-[100px]">المتبقي</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <TableRow key={student.id} className="hover:bg-yellow-25">
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                          {student.subject}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-purple-200 text-purple-700">
                          {student.teacher}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-700 font-mono">
                          {student.paidAmount.toLocaleString()} د.ع
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-red-100 text-red-700 font-mono">
                          {student.remainingAmount.toLocaleString()} د.ع
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      لا توجد بيانات لعرضها
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
              {filteredStudents.length > 0 && (
                <tfoot>
                  <TableRow className="bg-yellow-100 font-bold">
                    <TableCell colSpan={3} className="text-right">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        الإجمالي ({filteredStudents.length} طالب)
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-600 text-white font-bold font-mono">
                        {totalPaidAmount.toLocaleString()} د.ع
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-red-600 text-white font-bold font-mono">
                        {totalRemainingAmount.toLocaleString()} د.ع
                      </Badge>
                    </TableCell>
                  </TableRow>
                </tfoot>
              )}
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PartialPaymentsTable;