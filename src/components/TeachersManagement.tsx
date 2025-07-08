import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { GraduationCap, Plus, Edit, Trash2, Users, BookOpen } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Teacher {
  id: string;
  name: string;
  subject: string;
  grade: string;
  price: number;
}

const TeachersManagement = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([
    { id: '1', name: 'أحمد محمد', subject: 'الرياضيات', grade: 'السادس علوم', price: 300000 },
    { id: '2', name: 'سارة أحمد', subject: 'الفيزياء', grade: 'السادس علوم', price: 300000 },
    { id: '3', name: 'محمد علي', subject: 'الكيمياء', grade: 'السادس علوم', price: 300000 },
    { id: '4', name: 'فاطمة حسن', subject: 'اللغة العربية', grade: 'السادس أدبي', price: 250000 },
  ]);

  const [newTeacher, setNewTeacher] = useState({
    name: '',
    subject: '',
    grade: '',
    price: '300000'
  });

  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const subjects = ['الرياضيات', 'الفيزياء', 'الكيمياء', 'اللغة العربية', 'اللغة الإنجليزية', 'الأحياء', 'التاريخ', 'الجغرافية'];
  const grades = ['السادس علوم', 'السادس أدبي', 'السادس مهني'];

  const handleAddTeacher = () => {
    if (!newTeacher.name || !newTeacher.subject || !newTeacher.grade || !newTeacher.price) {
      toast({
        title: 'خطأ',
        description: 'يرجى ملء جميع الحقول المطلوبة',
        variant: 'destructive',
      });
      return;
    }

    const teacher: Teacher = {
      id: Date.now().toString(),
      name: newTeacher.name,
      subject: newTeacher.subject,
      grade: newTeacher.grade,
      price: parseInt(newTeacher.price),
    };

    setTeachers([...teachers, teacher]);
    setNewTeacher({ name: '', subject: '', grade: '', price: '300000' });
    setIsDialogOpen(false);
    
    toast({
      title: 'تم بنجاح',
      description: 'تم إضافة المعلم الجديد',
    });
  };

  const handleEditTeacher = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setNewTeacher({
      name: teacher.name,
      subject: teacher.subject,
      grade: teacher.grade,
      price: teacher.price.toString()
    });
    setIsDialogOpen(true);
  };

  const handleUpdateTeacher = () => {
    if (!editingTeacher) return;

    const updatedTeachers = teachers.map(teacher =>
      teacher.id === editingTeacher.id
        ? {
            ...teacher,
            name: newTeacher.name,
            subject: newTeacher.subject,
            grade: newTeacher.grade,
            price: parseInt(newTeacher.price),
          }
        : teacher
    );

    setTeachers(updatedTeachers);
    setEditingTeacher(null);
    setNewTeacher({ name: '', subject: '', grade: '', price: '300000' });
    setIsDialogOpen(false);
    
    toast({
      title: 'تم بنجاح',
      description: 'تم تحديث بيانات المعلم',
    });
  };

  const handleDeleteTeacher = (id: string) => {
    setTeachers(teachers.filter(teacher => teacher.id !== id));
    toast({
      title: 'تم بنجاح',
      description: 'تم حذف المعلم',
    });
  };

  return (
    <div className="space-y-6" dir="rtl">
      <Card className="bg-white/80 backdrop-blur-lg border-purple-100 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl text-purple-800">
            <GraduationCap className="h-6 w-6" />
            إدارة المعلمين
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
                  onClick={() => {
                    setEditingTeacher(null);
                    setNewTeacher({ name: '', subject: '', grade: '', price: '300000' });
                  }}
                >
                  <Plus className="ml-2 h-4 w-4" />
                  إضافة معلم ومادة
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    {editingTeacher ? 'تعديل المعلم' : 'إضافة معلم جديد'}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="teacher-name">اسم المعلم</Label>
                    <Input
                      id="teacher-name"
                      value={newTeacher.name}
                      onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                      placeholder="أدخل اسم المعلم"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="teacher-subject">المادة</Label>
                    <Select value={newTeacher.subject} onValueChange={(value) => setNewTeacher({ ...newTeacher, subject: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر المادة" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem key={subject} value={subject}>
                            {subject}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="teacher-grade">الصف</Label>
                    <Select value={newTeacher.grade} onValueChange={(value) => setNewTeacher({ ...newTeacher, grade: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الصف" />
                      </SelectTrigger>
                      <SelectContent>
                        {grades.map((grade) => (
                          <SelectItem key={grade} value={grade}>
                            {grade}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="teacher-price">سعر المادة (دينار)</Label>
                    <Input
                      id="teacher-price"
                      type="number"
                      value={newTeacher.price}
                      onChange={(e) => setNewTeacher({ ...newTeacher, price: e.target.value })}
                      placeholder="300000"
                    />
                  </div>
                  
                  <Button
                    onClick={editingTeacher ? handleUpdateTeacher : handleAddTeacher}
                    className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
                  >
                    {editingTeacher ? 'تحديث المعلم' : 'إضافة المعلم'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-purple-50">
                  <TableHead className="text-right">اسم المعلم</TableHead>
                  <TableHead className="text-right">المادة</TableHead>
                  <TableHead className="text-right">الصف</TableHead>
                  <TableHead className="text-right">سعر المادة</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teachers.map((teacher) => (
                  <TableRow key={teacher.id} className="hover:bg-purple-25">
                    <TableCell className="font-medium">{teacher.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-purple-600" />
                        {teacher.subject}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                        {teacher.grade}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono">
                      {teacher.price.toLocaleString()} د.ع
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditTeacher(teacher)}
                          className="border-purple-200 text-purple-700 hover:bg-purple-50"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteTeacher(teacher.id)}
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

export default TeachersManagement;