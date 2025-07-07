import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { BookOpen, Plus, Edit, Trash2, Users, GraduationCap } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Subject {
  id: string;
  name: string;
  teacher: string;
  students: number;
  cost: number;
}

interface Teacher {
  id: string;
  name: string;
  specialization: string;
}

const SubjectsManagement = () => {
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: '1', name: 'الرياضيات', teacher: 'أحمد محمد', students: 25, cost: 300000 },
    { id: '2', name: 'الفيزياء', teacher: 'سارة أحمد', students: 18, cost: 300000 },
    { id: '3', name: 'الكيمياء', teacher: 'محمد علي', students: 22, cost: 300000 },
  ]);

  const [teachers] = useState<Teacher[]>([
    { id: '1', name: 'أحمد محمد', specialization: 'رياضيات' },
    { id: '2', name: 'سارة أحمد', specialization: 'فيزياء' },
    { id: '3', name: 'محمد علي', specialization: 'كيمياء' },
    { id: '4', name: 'فاطمة حسن', specialization: 'علوم' },
  ]);

  const [newSubject, setNewSubject] = useState({
    name: '',
    teacher: '',
    cost: '300000'
  });

  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState('');

  const handleAddSubject = () => {
    if (!newSubject.name || !newSubject.teacher) {
      toast({
        title: 'خطأ',
        description: 'يرجى ملء جميع الحقول المطلوبة',
        variant: 'destructive',
      });
      return;
    }

    const subject: Subject = {
      id: Date.now().toString(),
      name: newSubject.name,
      teacher: newSubject.teacher,
      students: 0,
      cost: parseInt(newSubject.cost),
    };

    setSubjects([...subjects, subject]);
    setNewSubject({ name: '', teacher: '', cost: '300000' });
    setIsDialogOpen(false);
    
    toast({
      title: 'تم بنجاح',
      description: 'تم إضافة المادة الجديدة',
    });
  };

  const handleEditSubject = (subject: Subject) => {
    setEditingSubject(subject);
    setNewSubject({
      name: subject.name,
      teacher: subject.teacher,
      cost: subject.cost.toString()
    });
    setIsDialogOpen(true);
  };

  const handleUpdateSubject = () => {
    if (!editingSubject) return;

    const updatedSubjects = subjects.map(subject =>
      subject.id === editingSubject.id
        ? {
            ...subject,
            name: newSubject.name,
            teacher: newSubject.teacher,
            cost: parseInt(newSubject.cost),
          }
        : subject
    );

    setSubjects(updatedSubjects);
    setEditingSubject(null);
    setNewSubject({ name: '', teacher: '', cost: '300000' });
    setIsDialogOpen(false);
    
    toast({
      title: 'تم بنجاح',
      description: 'تم تحديث المادة',
    });
  };

  const handleDeleteSubject = (id: string) => {
    setSubjects(subjects.filter(subject => subject.id !== id));
    toast({
      title: 'تم بنجاح',
      description: 'تم حذف المادة',
    });
  };

  const filteredSubjects = selectedTeacher
    ? subjects.filter(subject => subject.teacher === selectedTeacher)
    : subjects;

  return (
    <div className="space-y-6" dir="rtl">
      <Card className="bg-white/80 backdrop-blur-lg border-purple-100 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl text-purple-800">
            <BookOpen className="h-6 w-6" />
            إدارة المواد الدراسية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
              <SelectTrigger className="w-full sm:w-64">
                <SelectValue placeholder="فلترة حسب المعلم" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">جميع المعلمين</SelectItem>
                {teachers.map((teacher) => (
                  <SelectItem key={teacher.id} value={teacher.name}>
                    {teacher.name} - {teacher.specialization}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
                  onClick={() => {
                    setEditingSubject(null);
                    setNewSubject({ name: '', teacher: '', cost: '300000' });
                  }}
                >
                  <Plus className="ml-2 h-4 w-4" />
                  إضافة مادة جديدة
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    {editingSubject ? 'تعديل المادة' : 'إضافة مادة جديدة'}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject-name">اسم المادة</Label>
                    <Input
                      id="subject-name"
                      value={newSubject.name}
                      onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                      placeholder="أدخل اسم المادة"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject-teacher">المعلم</Label>
                    <Select value={newSubject.teacher} onValueChange={(value) => setNewSubject({ ...newSubject, teacher: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر المعلم" />
                      </SelectTrigger>
                      <SelectContent>
                        {teachers.map((teacher) => (
                          <SelectItem key={teacher.id} value={teacher.name}>
                            {teacher.name} - {teacher.specialization}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject-cost">التكلفة (دينار)</Label>
                    <Input
                      id="subject-cost"
                      type="number"
                      value={newSubject.cost}
                      onChange={(e) => setNewSubject({ ...newSubject, cost: e.target.value })}
                      placeholder="300000"
                    />
                  </div>
                  
                  <Button
                    onClick={editingSubject ? handleUpdateSubject : handleAddSubject}
                    className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
                  >
                    {editingSubject ? 'تحديث المادة' : 'إضافة المادة'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-purple-50">
                  <TableHead className="text-right">اسم المادة</TableHead>
                  <TableHead className="text-right">المعلم</TableHead>
                  <TableHead className="text-right">عدد الطلاب</TableHead>
                  <TableHead className="text-right">التكلفة</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubjects.map((subject) => (
                  <TableRow key={subject.id} className="hover:bg-purple-25">
                    <TableCell className="font-medium">{subject.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-purple-600" />
                        {subject.teacher}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                        <Users className="ml-1 h-3 w-3" />
                        {subject.students}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono">
                      {subject.cost.toLocaleString()} د.ع
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditSubject(subject)}
                          className="border-purple-200 text-purple-700 hover:bg-purple-50"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteSubject(subject.id)}
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

export default SubjectsManagement;