
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { 
  CreditCard, 
  Search, 
  Calendar, 
  DollarSign, 
  Plus,
  Edit,
  Trash2,
  Receipt
} from 'lucide-react';

interface Payment {
  id: string;
  studentName: string;
  amount: number;
  date: string;
  receiptNumber: string;
  notes: string;
  status: 'completed' | 'partial' | 'pending';
}

const PaymentManagement = () => {
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: '1',
      studentName: 'أحمد محمد علي',
      amount: 300000,
      date: '2024-01-15',
      receiptNumber: 'REC001',
      notes: 'دفعة شهر يناير',
      status: 'completed'
    },
    {
      id: '2',
      studentName: 'فاطمة حسن',
      amount: 150000,
      date: '2024-01-16',
      receiptNumber: 'REC002',
      notes: 'دفعة جزئية',
      status: 'partial'
    }
  ]);

  const [newPayment, setNewPayment] = useState({
    studentName: '',
    amount: '',
    date: '',
    receiptNumber: '',
    notes: ''
  });

  const [searchQuery, setSearchQuery] = useState('');

  const handleAddPayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPayment.studentName || !newPayment.amount || !newPayment.date) {
      toast({
        title: 'خطأ في البيانات',
        description: 'يرجى ملء جميع الحقول المطلوبة',
        variant: 'destructive',
      });
      return;
    }

    const payment: Payment = {
      id: Date.now().toString(),
      studentName: newPayment.studentName,
      amount: parseInt(newPayment.amount),
      date: newPayment.date,
      receiptNumber: newPayment.receiptNumber,
      notes: newPayment.notes,
      status: 'completed'
    };

    setPayments([payment, ...payments]);
    setNewPayment({
      studentName: '',
      amount: '',
      date: '',
      receiptNumber: '',
      notes: ''
    });

    toast({
      title: 'تم إضافة الدفعة بنجاح',
      description: `تم تسجيل دفعة ${payment.amount.toLocaleString()} دينار`,
    });
  };

  const filteredPayments = payments.filter(payment =>
    payment.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.receiptNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-700">مكتمل</Badge>;
      case 'partial':
        return <Badge className="bg-yellow-100 text-yellow-700">جزئي</Badge>;
      case 'pending':
        return <Badge className="bg-red-100 text-red-700">معلق</Badge>;
      default:
        return <Badge variant="secondary">غير محدد</Badge>;
    }
  };

  const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">إجمالي المدفوعات</p>
                <p className="text-2xl font-bold text-green-700">
                  {totalAmount.toLocaleString()}
                </p>
                <p className="text-xs text-green-600">دينار</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">عدد الدفعات</p>
                <p className="text-2xl font-bold text-blue-700">{payments.length}</p>
                <p className="text-xs text-blue-600">دفعة</p>
              </div>
              <Receipt className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-indigo-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600">متوسط الدفعة</p>
                <p className="text-2xl font-bold text-purple-700">
                  {payments.length > 0 ? Math.round(totalAmount / payments.length).toLocaleString() : 0}
                </p>
                <p className="text-xs text-purple-600">دينار</p>
              </div>
              <CreditCard className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Payment Form */}
      <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
          <CardTitle className="flex items-center gap-3">
            <Plus className="h-5 w-5" />
            إضافة دفعة جديدة
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleAddPayment} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="studentName">اسم الطالب *</Label>
                <Input
                  id="studentName"
                  type="text"
                  placeholder="أدخل اسم الطالب"
                  value={newPayment.studentName}
                  onChange={(e) => setNewPayment({...newPayment, studentName: e.target.value})}
                  className="border-purple-200 focus:border-purple-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">المبلغ (دينار) *</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="300000"
                  value={newPayment.amount}
                  onChange={(e) => setNewPayment({...newPayment, amount: e.target.value})}
                  className="border-purple-200 focus:border-purple-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">التاريخ *</Label>
                <Input
                  id="date"
                  type="date"
                  value={newPayment.date}
                  onChange={(e) => setNewPayment({...newPayment, date: e.target.value})}
                  className="border-purple-200 focus:border-purple-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="receiptNumber">رقم الإيصال</Label>
                <Input
                  id="receiptNumber"
                  type="text"
                  placeholder="REC001"
                  value={newPayment.receiptNumber}
                  onChange={(e) => setNewPayment({...newPayment, receiptNumber: e.target.value})}
                  className="border-purple-200 focus:border-purple-500"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="notes">ملاحظات</Label>
                <Input
                  id="notes"
                  type="text"
                  placeholder="أدخل أي ملاحظات"
                  value={newPayment.notes}
                  onChange={(e) => setNewPayment({...newPayment, notes: e.target.value})}
                  className="border-purple-200 focus:border-purple-500"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
              >
                <Plus className="h-4 w-4 ml-2" />
                إضافة الدفعة
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Search className="h-5 w-5 text-purple-600" />
            البحث في الدفعات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input
              type="text"
              placeholder="البحث بالاسم أو رقم الإيصال..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 border-purple-200 focus:border-purple-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Payments List */}
      <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <CreditCard className="h-5 w-5 text-purple-600" />
            سجل الدفعات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPayments.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                لا توجد دفعات مسجلة
              </div>
            ) : (
              filteredPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-800">{payment.studentName}</h3>
                      {getStatusBadge(payment.status)}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600">
                      <span>المبلغ: {payment.amount.toLocaleString()} دينار</span>
                      <span>التاريخ: {payment.date}</span>
                      <span>الإيصال: {payment.receiptNumber}</span>
                      <span>الملاحظات: {payment.notes}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentManagement;
