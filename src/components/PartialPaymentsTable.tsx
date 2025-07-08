import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Clock, Phone, Users } from 'lucide-react';

interface PartialPaymentStudent {
  id: string;
  name: string;
  grade: string;
  phone: string;
  paidAmount: number;
  remainingAmount: number;
}

const PartialPaymentsTable = () => {
  const partialStudents: PartialPaymentStudent[] = [
    {
      id: '1',
      name: 'أحمد محمد علي',
      grade: 'السادس علوم',
      phone: '07901234567',
      paidAmount: 600000,
      remainingAmount: 300000
    },
    {
      id: '2',
      name: 'فاطمة حسن محمود',
      grade: 'السادس أدبي',
      phone: '07912345678',
      paidAmount: 300000,
      remainingAmount: 300000
    },
    {
      id: '3',
      name: 'محمد علي حسن',
      grade: 'السادس مهني',
      phone: '07923456789',
      paidAmount: 450000,
      remainingAmount: 150000
    },
    {
      id: '4',
      name: 'سارة أحمد محمد',
      grade: 'السادس علوم',
      phone: '07934567890',
      paidAmount: 750000,
      remainingAmount: 150000
    }
  ];

  const totalPaidAmount = partialStudents.reduce((sum, student) => sum + student.paidAmount, 0);

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-yellow-600" />
          الطلاب المسددين جزئياً
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-yellow-50">
                <TableHead className="text-right">اسم الطالب</TableHead>
                <TableHead className="text-right">الصف</TableHead>
                <TableHead className="text-right">الهاتف</TableHead>
                <TableHead className="text-right">المدفوع</TableHead>
                <TableHead className="text-right">المتبقي</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {partialStudents.map((student) => (
                <TableRow key={student.id} className="hover:bg-yellow-25">
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                      {student.grade}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="font-mono text-sm">{student.phone}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-700">
                      {student.paidAmount.toLocaleString()} د.ع
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-red-100 text-red-700">
                      {student.remainingAmount.toLocaleString()} د.ع
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <tfoot>
              <TableRow className="bg-yellow-100 font-bold">
                <TableCell colSpan={3} className="text-right">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    المبلغ الإجمالي المدفوع
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className="bg-green-600 text-white font-bold">
                    {totalPaidAmount.toLocaleString()} د.ع
                  </Badge>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </tfoot>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default PartialPaymentsTable;