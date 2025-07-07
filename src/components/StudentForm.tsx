
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { UserPlus, Users, Phone, MapPin, BookOpen } from 'lucide-react';

const StudentForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    region: '',
    parentPhone: '',
    lineName: '',
    grade: '',
    lineOwnerPhone: '',
    subjects: [],
    teachers: {}
  });

  const grades = ['السادس علوم', 'السادس أدبي', 'السادس مهني'];
  const subjects = ['اللغة العربية', 'اللغة الإنجليزية', 'الرياضيات', 'الفيزياء', 'الكيمياء', 'الأحياء'];
  
  const teachersBySubject = {
    'اللغة العربية': ['صلاح اللطيف', 'مزاحم الشمري'],
    'اللغة الإنجليزية': ['كرار المولى', 'نور الدين'],
    'الرياضيات': ['عادل الدليمي'],
    'الفيزياء': ['أحمد الكاظمي'],
    'الكيمياء': ['فاطمة العلي'],
    'الأحياء': ['محمد الحسيني']
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.phone || !formData.grade) {
      toast({
        title: 'خطأ في البيانات',
        description: 'يرجى ملء جميع الحقول المطلوبة',
        variant: 'destructive',
      });
      return;
    }

    console.log('Student data:', formData);
    toast({
      title: 'تم إضافة الطالب بنجاح',
      description: `تم تسجيل الطالب ${formData.fullName} في النظام`,
    });

    // Reset form
    setFormData({
      fullName: '',
      phone: '',
      region: '',
      parentPhone: '',
      lineName: '',
      grade: '',
      lineOwnerPhone: '',
      subjects: [],
      teachers: {}
    });
  };

  const handleSubjectChange = (subject: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      subjects: checked 
        ? [...prev.subjects, subject]
        : prev.subjects.filter(s => s !== subject)
    }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-3 text-xl">
            <UserPlus className="h-6 w-6" />
            إضافة طالب جديد
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-gray-700 font-medium">
                  الاسم الكامل *
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="أدخل الاسم الكامل"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className="border-purple-200 focus:border-purple-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-700 font-medium">
                  رقم الهاتف *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="07XXXXXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="border-purple-200 focus:border-purple-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="region" className="text-gray-700 font-medium">
                  المنطقة
                </Label>
                <Input
                  id="region"
                  type="text"
                  placeholder="أدخل المنطقة"
                  value={formData.region}
                  onChange={(e) => setFormData({...formData, region: e.target.value})}
                  className="border-purple-200 focus:border-purple-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="parentPhone" className="text-gray-700 font-medium">
                  هاتف ولي الأمر
                </Label>
                <Input
                  id="parentPhone"
                  type="tel"
                  placeholder="07XXXXXXXX"
                  value={formData.parentPhone}
                  onChange={(e) => setFormData({...formData, parentPhone: e.target.value})}
                  className="border-purple-200 focus:border-purple-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lineName" className="text-gray-700 font-medium">
                  اسم الخط
                </Label>
                <Input
                  id="lineName"
                  type="text"
                  placeholder="أدخل اسم الخط"
                  value={formData.lineName}
                  onChange={(e) => setFormData({...formData, lineName: e.target.value})}
                  className="border-purple-200 focus:border-purple-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lineOwnerPhone" className="text-gray-700 font-medium">
                  هاتف صاحب الخط
                </Label>
                <Input
                  id="lineOwnerPhone"
                  type="tel"
                  placeholder="07XXXXXXXX"
                  value={formData.lineOwnerPhone}
                  onChange={(e) => setFormData({...formData, lineOwnerPhone: e.target.value})}
                  className="border-purple-200 focus:border-purple-500"
                />
              </div>
            </div>

            {/* Academic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-purple-600" />
                المعلومات الأكاديمية
              </h3>
              
              <div className="space-y-2">
                <Label htmlFor="grade" className="text-gray-700 font-medium">
                  الصف *
                </Label>
                <Select 
                  value={formData.grade} 
                  onValueChange={(value) => setFormData({...formData, grade: value})}
                >
                  <SelectTrigger className="border-purple-200 focus:border-purple-500">
                    <SelectValue placeholder="اختر الصف" />
                  </SelectTrigger>
                  <SelectContent>
                    {grades.map((grade) => (
                      <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Subjects and Teachers */}
              <div className="space-y-4">
                <Label className="text-gray-700 font-medium">المواد والمعلمون</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {subjects.map((subject) => (
                    <div key={subject} className="p-4 border border-purple-100 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <input
                          type="checkbox"
                          id={subject}
                          checked={formData.subjects.includes(subject)}
                          onChange={(e) => handleSubjectChange(subject, e.target.checked)}
                          className="rounded border-purple-300 text-purple-600 focus:ring-purple-500"
                        />
                        <label htmlFor={subject} className="font-medium text-gray-700">
                          {subject}
                        </label>
                      </div>
                      
                      {formData.subjects.includes(subject) && (
                        <Select 
                          value={formData.teachers[subject] || ''} 
                          onValueChange={(value) => setFormData({
                            ...formData, 
                            teachers: {...formData.teachers, [subject]: value}
                          })}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="اختر المعلم" />
                          </SelectTrigger>
                          <SelectContent>
                            {teachersBySubject[subject]?.map((teacher) => (
                              <SelectItem key={teacher} value={teacher}>{teacher}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-6">
              <Button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white px-8 py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <UserPlus className="h-5 w-5 ml-2" />
                إضافة الطالب
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentForm;
