import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DollarSign, Plus, Edit, Trash2, Calendar, FileText, Printer } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Withdrawal {
  id: string;
  name: string;
  amount: number;
  date: string;
  notes: string;
}

const WithdrawalsManagement = () => {
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([
    {
      id: '1',
      name: 'راتب المعلمين',
      amount: 2500000,
      date: '2024-01-15',
      notes: 'راتب شهر يناير للمعلمين'
    },
    {
      id: '2',
      name: 'صيانة الأجهزة',
      amount: 150000,
      date: '2024-01-10',
      notes: 'إصلاح أجهزة الكمبيوتر'
    },
    {
      id: '3',
      name: 'مواد مكتبية',
      amount: 75000,
      date: '2024-01-08',
      notes: 'أوراق وأقلام ومستلزمات'
    },
  ]);

  const [newWithdrawal, setNewWithdrawal] = useState({
    name: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const [editingWithdrawal, setEditingWithdrawal] = useState<Withdrawal | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const totalWithdrawals = withdrawals.reduce((sum, withdrawal) => sum + withdrawal.amount, 0);

  const handleAddWithdrawal = () => {
    if (!newWithdrawal.name || !newWithdrawal.amount) {
      toast({
        title: 'خطأ',
        description: 'يرجى ملء الحقول المطلوبة',
        variant: 'destructive',
      });
      return;
    }

    const withdrawal: Withdrawal = {
      id: Date.now().toString(),
      name: newWithdrawal.name,
      amount: parseInt(newWithdrawal.amount),
      date: newWithdrawal.date,
      notes: newWithdrawal.notes,
    };

    setWithdrawals([withdrawal, ...withdrawals]);
    setNewWithdrawal({
      name: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      notes: ''
    });
    setIsDialogOpen(false);
    
    toast({
      title: 'تم بنجاح',
      description: 'تم إضافة عملية السحب',
    });
  };

  const handleEditWithdrawal = (withdrawal: Withdrawal) => {
    setEditingWithdrawal(withdrawal);
    setNewWithdrawal({
      name: withdrawal.name,
      amount: withdrawal.amount.toString(),
      date: withdrawal.date,
      notes: withdrawal.notes
    });
    setIsDialogOpen(true);
  };

  const handleUpdateWithdrawal = () => {
    if (!editingWithdrawal) return;

    const updatedWithdrawals = withdrawals.map(withdrawal =>
      withdrawal.id === editingWithdrawal.id
        ? {
            ...withdrawal,
            name: newWithdrawal.name,
            amount: parseInt(newWithdrawal.amount),
            date: newWithdrawal.date,
            notes: newWithdrawal.notes,
          }
        : withdrawal
    );

    setWithdrawals(updatedWithdrawals);
    setEditingWithdrawal(null);
    setNewWithdrawal({
      name: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      notes: ''
    });
    setIsDialogOpen(false);
    
    toast({
      title: 'تم بنجاح',
      description: 'تم تحديث عملية السحب',
    });
  };

  const handleDeleteWithdrawal = (id: string) => {
    setWithdrawals(withdrawals.filter(withdrawal => withdrawal.id !== id));
    toast({
      title: 'تم بنجاح',
      description: 'تم حذف عملية السحب',
    });
  };

  const filteredWithdrawals = withdrawals.filter(withdrawal =>
    withdrawal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    withdrawal.notes.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePrint = () => {
    const printContent = `
      <html dir="rtl">
        <head>
          <title>تقرير عمليات السحب</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; direction: rtl; }
            .header { text-align: center; margin-bottom: 30px; }
            .info { margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: right; }
            th { background-color: #f2f2f2; }
            .total { font-weight: bold; background-color: #f9f9f9; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>معهد إبداع الرواد</h1>
            <h2>تقرير عمليات السحب</h2>
          </div>
          <div class="info">
            <p><strong>طُبع بواسطة:</strong> المدير</p>
            <p><strong>تاريخ الطباعة:</strong> ${new Date().toLocaleDateString('ar')}</p>
            <p><strong>وقت الطباعة:</strong> ${new Date().toLocaleTimeString('ar')}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>اسم العملية</th>
                <th>التاريخ</th>
                <th>المبلغ</th>
                <th>الملاحظات</th>
              </tr>
            </thead>
            <tbody>
              ${filteredWithdrawals.map(w => `
                <tr>
                  <td>${w.name}</td>
                  <td>${new Date(w.date).toLocaleDateString('ar')}</td>
                  <td>${w.amount.toLocaleString()} د.ع</td>
                  <td>${w.notes || 'لا توجد ملاحظات'}</td>
                </tr>
              `).join('')}
              <tr class="total">
                <td colspan="2"><strong>الإجمالي</strong></td>
                <td><strong>${totalWithdrawals.toLocaleString()} د.ع</strong></td>
                <td></td>
              </tr>
            </tbody>
          </table>
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
    <div className="space-y-6" dir="rtl">
      {/* Summary Card */}
      <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-red-800">إجمالي السحوبات</h3>
              <p className="text-3xl font-bold text-red-600 font-mono">
                {totalWithdrawals.toLocaleString()} د.ع
              </p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <DollarSign className="h-8 w-8 text-red-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/80 backdrop-blur-lg border-purple-100 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl text-purple-800">
            <DollarSign className="h-6 w-6" />
            إدارة عمليات السحب
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Input
              placeholder="البحث في العمليات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />

            <Button
              onClick={handlePrint}
              variant="outline"
              className="border-purple-200 text-purple-700 hover:bg-purple-50"
            >
              <Printer className="ml-2 h-4 w-4" />
              🖨️ طباعة العمليات
            </Button>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
                  onClick={() => {
                    setEditingWithdrawal(null);
                    setNewWithdrawal({
                      name: '',
                      amount: '',
                      date: new Date().toISOString().split('T')[0],
                      notes: ''
                    });
                  }}
                >
                  <Plus className="ml-2 h-4 w-4" />
                  إضافة عملية سحب
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    {editingWithdrawal ? 'تعديل عملية السحب' : 'إضافة عملية سحب جديدة'}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="withdrawal-name">اسم العملية</Label>
                    <Input
                      id="withdrawal-name"
                      value={newWithdrawal.name}
                      onChange={(e) => setNewWithdrawal({ ...newWithdrawal, name: e.target.value })}
                      placeholder="مثال: راتب المعلمين"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="withdrawal-amount">المبلغ (دينار)</Label>
                    <Input
                      id="withdrawal-amount"
                      type="number"
                      value={newWithdrawal.amount}
                      onChange={(e) => setNewWithdrawal({ ...newWithdrawal, amount: e.target.value })}
                      placeholder="0"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="withdrawal-date">التاريخ</Label>
                    <Input
                      id="withdrawal-date"
                      type="date"
                      value={newWithdrawal.date}
                      onChange={(e) => setNewWithdrawal({ ...newWithdrawal, date: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="withdrawal-notes">الملاحظات</Label>
                    <Textarea
                      id="withdrawal-notes"
                      value={newWithdrawal.notes}
                      onChange={(e) => setNewWithdrawal({ ...newWithdrawal, notes: e.target.value })}
                      placeholder="تفاصيل إضافية..."
                      rows={3}
                    />
                  </div>
                  
                  <Button
                    onClick={editingWithdrawal ? handleUpdateWithdrawal : handleAddWithdrawal}
                    className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
                  >
                    {editingWithdrawal ? 'تحديث العملية' : 'إضافة العملية'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-purple-50">
                  <TableHead className="text-right">اسم العملية</TableHead>
                  <TableHead className="text-right">التاريخ</TableHead>
                  <TableHead className="text-right">المبلغ</TableHead>
                  <TableHead className="text-right">الملاحظات</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWithdrawals.map((withdrawal) => (
                  <TableRow key={withdrawal.id} className="hover:bg-purple-25">
                    <TableCell className="font-medium">{withdrawal.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-purple-600" />
                        {new Date(withdrawal.date).toLocaleDateString('ar')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-200">
                        -{withdrawal.amount.toLocaleString()} د.ع
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 max-w-xs">
                        <FileText className="h-4 w-4 text-gray-500 flex-shrink-0" />
                        <span className="truncate text-sm text-gray-600">
                          {withdrawal.notes || 'لا توجد ملاحظات'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditWithdrawal(withdrawal)}
                          className="border-purple-200 text-purple-700 hover:bg-purple-50"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteWithdrawal(withdrawal.id)}
                          className="border-red-200 text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WithdrawalsManagement;