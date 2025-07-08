
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Search, User, Phone, MapPin, GraduationCap, CreditCard } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Student {
  id: string;
  fullName: string;
  phone: string;
  region: string;
  parentPhone: string;
  grade: string;
  subjects: string[];
  totalFees: number;
  paidAmount: number;
  paymentHistory: Array<{
    date: string;
    amount: number;
    notes: string;
  }>;
}

const StudentSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    fullName: '',
    phone: '',
    region: '',
    parentPhone: '',
    grade: '',
    subjects: [] as string[]
  });

  // Mock data
  const students: Student[] = [
    {
      id: '1',
      fullName: 'أحمد محمد علي',
      phone: '07901234567',
      region: 'الكرادة',
      parentPhone: '07801234567',
      grade: 'السادس علوم',
      subjects: ['اللغة العربية', 'الرياضيات', 'الفيزياء'],
      totalFees: 900000,
      paidAmount: 600000,
      paymentHistory: [
        { date: '2024-01-15', amount: 300000, notes: 'دفعة يناير' },
        { date: '2024-02-15', amount: 300000, notes: 'دفعة فبراير' }
      ]
    },
    {
      id: '2',
      fullName: 'فاطمة حسن محمود',
      phone: '07912345678',
      region: 'الجادرية',
      parentPhone: '07812345678',
      grade: 'السادس أدبي',
      subjects: ['اللغة العربية', 'اللغة الإنجليزية'],
      totalFees: 600000,
      paidAmount: 600000,
      paymentHistory: [
        { date: '2024-01-10', amount: 300000, notes: 'دفعة يناير' },
        { date: '2024-02-10', amount: 300000, notes: 'دفعة فبراير' }
      ]
    }
  ];

  const filteredStudents = students.filter(student =>
    student.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.phone.includes(searchQuery)
  );

  const getPaymentStatus = (student: Student) => {
    const percentage = (student.paidAmount / student.totalFees) * 100;
    if (percentage >= 100) return { status: 'مكتمل', color: 'bg-green-100 text-green-700' };
    if (percentage >= 50) return { status: 'جزئي', color: 'bg-yellow-100 text-yellow-700' };
    return { status: 'غير مدفوع', color: 'bg-red-100 text-red-700' };
  };

  const handleEditStudent = (student: Student) => {
    setEditForm({
      fullName: student.fullName,
      phone: student.phone,
      region: student.region,
      parentPhone: student.parentPhone,
      grade: student.grade,
      subjects: student.subjects
    });
    setEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (!selectedStudent) return;
    
    // Here you would typically update the database
    toast({
      title: 'تم بنجاح',
      description: 'تم تحديث بيانات الطالب',
    });
    
    setEditModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
          <CardTitle className="flex items-center gap-3">
            <Search className="h-5 w-5" />
            البحث عن الطلاب
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <Input
              type="text"
              placeholder="البحث بالاسم أو رقم الهاتف..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 border-purple-200 focus:border-purple-500"
            />
            <Button className="bg-gradient-to-r from-purple-500 to-indigo-500">
              <Search className="h-4 w-4 ml-2" />
              بحث
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {searchQuery && (
        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <User className="h-5 w-5 text-purple-600" />
              نتائج البحث ({filteredStudents.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredStudents.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  لا توجد نتائج للبحث "{searchQuery}"
                </div>
              ) : (
                filteredStudents.map((student) => {
                  const paymentStatus = getPaymentStatus(student);
                  return (
                    <div
                      key={student.id}
                      className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => setSelectedStudent(student)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-800 text-lg">{student.fullName}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                            <span className="flex items-center gap-1">
                              <Phone className="h-4 w-4" />
                              {student.phone}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {student.region}
                            </span>
                            <span className="flex items-center gap-1">
                              <GraduationCap className="h-4 w-4" />
                              {student.grade}
                            </span>
                          </div>
                        </div>
                        <Badge className={paymentStatus.color}>
                          {paymentStatus.status}
                        </Badge>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-600">
                          المواد: {student.subjects.join(', ')}
                        </div>
                        <div className="text-sm font-medium">
                          {student.paidAmount.toLocaleString()} / {student.totalFees.toLocaleString()} دينار
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Student Details */}
      {selectedStudent && (
        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
            <CardTitle className="flex items-center gap-3">
              <User className="h-5 w-5" />
              تفاصيل الطالب: {selectedStudent.fullName}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Personal Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  المعلومات الشخصية
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">الاسم الكامل:</span>
                    <span className="font-medium">{selectedStudent.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">رقم الهاتف:</span>
                    <span className="font-medium">{selectedStudent.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">المنطقة:</span>
                    <span className="font-medium">{selectedStudent.region}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">هاتف ولي الأمر:</span>
                    <span className="font-medium">{selectedStudent.parentPhone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">الصف:</span>
                    <span className="font-medium">{selectedStudent.grade}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">المواد:</span>
                    <span className="font-medium">{selectedStudent.subjects.join(', ')}</span>
                  </div>
                </div>
              </div>

              {/* Financial Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  المعلومات المالية
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">إجمالي الرسوم:</span>
                    <span className="font-medium text-blue-600">
                      {selectedStudent.totalFees.toLocaleString()} دينار
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">المبلغ المدفوع:</span>
                    <span className="font-medium text-green-600">
                      {selectedStudent.paidAmount.toLocaleString()} دينار
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">المبلغ المتبقي:</span>
                    <span className="font-medium text-red-600">
                      {(selectedStudent.totalFees - selectedStudent.paidAmount).toLocaleString()} دينار
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full"
                      style={{ width: `${(selectedStudent.paidAmount / selectedStudent.totalFees) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Payment History */}
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-800 mb-3">سجل الدفعات</h4>
                  <div className="space-y-2">
                    {selectedStudent.paymentHistory.map((payment, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <span className="font-medium">{payment.amount.toLocaleString()} دينار</span>
                          <span className="text-sm text-gray-600 mr-2">- {payment.notes}</span>
                        </div>
                        <span className="text-sm text-gray-500">{payment.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
              <Button 
                variant="outline"
                onClick={() => setEditModalOpen(true)}
              >
                تعديل البيانات
              </Button>
              <Button className="bg-gradient-to-r from-purple-500 to-indigo-500">
                إضافة دفعة
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Edit Student Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>تعديل بيانات الطالب</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">الاسم الكامل</Label>
              <Input
                id="edit-name"
                value={editForm.fullName}
                onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-phone">رقم الهاتف</Label>
              <Input
                id="edit-phone"
                value={editForm.phone}
                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-region">المنطقة</Label>
              <Input
                id="edit-region"
                value={editForm.region}
                onChange={(e) => setEditForm({ ...editForm, region: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-parent-phone">هاتف ولي الأمر</Label>
              <Input
                id="edit-parent-phone"
                value={editForm.parentPhone}
                onChange={(e) => setEditForm({ ...editForm, parentPhone: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-grade">الصف</Label>
              <Select value={editForm.grade} onValueChange={(value) => setEditForm({ ...editForm, grade: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الصف" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="السادس علوم">السادس علوم</SelectItem>
                  <SelectItem value="السادس أدبي">السادس أدبي</SelectItem>
                  <SelectItem value="السادس مهني">السادس مهني</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button 
                onClick={handleSaveEdit}
                className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
              >
                حفظ التعديلات
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setEditModalOpen(false)}
                className="flex-1"
              >
                إلغاء
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentSearch;
