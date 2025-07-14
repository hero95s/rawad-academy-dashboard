import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Shield, User, Lock, Bell, DollarSign, Save, Settings as SettingsIcon, Trash2, Users, BookOpen, GraduationCap, FileText, BarChart3 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { DeleteConfirmationModal } from '@/components/ui/delete-confirmation-modal';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    verificationCode: '200102',
    username: 'admin',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    paymentNotifications: true,
    defaultSubjectCost: '300000',
  });

  const [showPasswords, setShowPasswords] = useState(false);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    sectionName: '',
    sectionKey: '',
  });

  const handleSaveSettings = () => {
    // Validation
    if (settings.newPassword && settings.newPassword !== settings.confirmPassword) {
      toast({
        title: 'خطأ',
        description: 'كلمة المرور الجديدة غير متطابقة',
        variant: 'destructive',
      });
      return;
    }

    if (settings.newPassword && !settings.currentPassword) {
      toast({
        title: 'خطأ',
        description: 'يرجى إدخال كلمة المرور الحالية',
        variant: 'destructive',
      });
      return;
    }

    // Save settings (in a real app, this would be an API call)
    toast({
      title: 'تم الحفظ بنجاح',
      description: 'تم حفظ الإعدادات بنجاح',
    });

    // Clear password fields
    setSettings(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    }));
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDeleteSection = (sectionName: string, sectionKey: string) => {
    setDeleteModal({
      isOpen: true,
      sectionName,
      sectionKey,
    });
  };

  const confirmDeleteSection = async () => {
    const { sectionName, sectionKey } = deleteModal;
    
    try {
      // Call the appropriate deletion function
      await deleteSectionData(sectionKey);
      
      toast({
        title: 'تم الحذف بنجاح',
        description: `تم حذف بيانات ${sectionName} بنجاح`,
      });
    } catch (error) {
      toast({
        title: 'خطأ في الحذف',
        description: `فشل في حذف بيانات ${sectionName}. يرجى المحاولة مرة أخرى`,
        variant: 'destructive',
      });
    }
  };

  // Individual deletion functions for each section
  const deleteSectionData = async (sectionKey: string) => {
    switch (sectionKey) {
      case 'students':
        await deleteStudentData();
        break;
      case 'subjects':
        await deleteSubjectData();
        break;
      case 'classes':
        await deleteClassData();
        break;
      case 'withdrawals':
        await deleteWithdrawalData();
        break;
      case 'statistics':
        await deleteStatisticsData();
        break;
      case 'logs':
        await deleteAdminLogs();
        break;
      default:
        throw new Error('نوع البيانات غير مدعوم');
    }
  };

  // API call functions for each section
  const deleteStudentData = async () => {
    // In a real app, this would call your backend API
    // Example: await fetch('/api/students', { method: 'DELETE' });
    
    // For now, clear localStorage data
    localStorage.removeItem('students');
    localStorage.removeItem('studentPayments');
    console.log('Student data deleted successfully');
  };

  const deleteSubjectData = async () => {
    // Example: await fetch('/api/subjects', { method: 'DELETE' });
    localStorage.removeItem('subjects');
    console.log('Subject data deleted successfully');
  };

  const deleteClassData = async () => {
    // Example: await fetch('/api/classes', { method: 'DELETE' });
    localStorage.removeItem('classes');
    localStorage.removeItem('classSchedules');
    console.log('Class data deleted successfully');
  };

  const deleteWithdrawalData = async () => {
    // Example: await fetch('/api/withdrawals', { method: 'DELETE' });
    localStorage.removeItem('withdrawals');
    localStorage.removeItem('financialRecords');
    console.log('Withdrawal data deleted successfully');
  };

  const deleteStatisticsData = async () => {
    // Example: await fetch('/api/statistics', { method: 'DELETE' });
    localStorage.removeItem('statistics');
    localStorage.removeItem('reports');
    console.log('Statistics data deleted successfully');
  };

  const deleteAdminLogs = async () => {
    // Example: await fetch('/api/admin-logs', { method: 'DELETE' });
    localStorage.removeItem('adminLogs');
    localStorage.removeItem('systemLogs');
    console.log('Admin logs deleted successfully');
  };

  const closeDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      sectionName: '',
      sectionKey: '',
    });
  };

  const deleteSections = [
    {
      key: 'students',
      name: 'الطلاب',
      icon: Users,
      description: 'جميع بيانات الطلاب والمعلومات الشخصية',
    },
    {
      key: 'subjects',
      name: 'المواد الدراسية',
      icon: BookOpen,
      description: 'جميع المواد والتكاليف المرتبطة بها',
    },
    {
      key: 'classes',
      name: 'الصفوف',
      icon: GraduationCap,
      description: 'جميع الصفوف والفصول الدراسية',
    },
    {
      key: 'withdrawals',
      name: 'سجلات السحب',
      icon: FileText,
      description: 'جميع عمليات السحب والمعاملات المالية',
    },
    {
      key: 'statistics',
      name: 'الإحصائيات',
      icon: BarChart3,
      description: 'جميع البيانات الإحصائية والتقارير',
    },
    {
      key: 'logs',
      name: 'السجلات الإدارية',
      icon: FileText,
      description: 'جميع سجلات النشاطات والعمليات الإدارية',
    },
  ];

  return (
    <div className="space-y-6" dir="rtl">
      <Card className="bg-white/80 backdrop-blur-lg border-purple-100 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl text-purple-800">
            <SettingsIcon className="h-6 w-6" />
            إعدادات النظام
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Security Settings */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-purple-600" />
              <h3 className="text-lg font-semibold">إعدادات الأمان</h3>
            </div>
            
            <div className="grid gap-4 pl-6">
              <div className="space-y-2">
                <Label htmlFor="verification-code">رمز التحقق</Label>
                <Input
                  id="verification-code"
                  type={showPasswords ? "text" : "password"}
                  value={settings.verificationCode}
                  onChange={(e) => handleInputChange('verificationCode', e.target.value)}
                  className="max-w-md"
                  placeholder="رمز التحقق للتسجيل"
                />
                <p className="text-sm text-gray-600">
                  هذا الرمز مطلوب لإنشاء حسابات جديدة
                </p>
              </div>
              
              <div className="flex items-center space-x-2 space-x-reverse">
                <Switch
                  id="show-passwords"
                  checked={showPasswords}
                  onCheckedChange={setShowPasswords}
                />
                <Label htmlFor="show-passwords">إظهار كلمات المرور</Label>
              </div>
            </div>
          </div>

          <Separator />

          {/* Account Settings */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-purple-600" />
              <h3 className="text-lg font-semibold">إعدادات الحساب</h3>
            </div>
            
            <div className="grid gap-4 pl-6">
              <div className="space-y-2">
                <Label htmlFor="username">اسم المستخدم</Label>
                <Input
                  id="username"
                  value={settings.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  className="max-w-md"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Password Change */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-purple-600" />
              <h3 className="text-lg font-semibold">تغيير كلمة المرور</h3>
            </div>
            
            <div className="grid gap-4 pl-6">
              <div className="space-y-2">
                <Label htmlFor="current-password">كلمة المرور الحالية</Label>
                <Input
                  id="current-password"
                  type={showPasswords ? "text" : "password"}
                  value={settings.currentPassword}
                  onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                  className="max-w-md"
                  placeholder="أدخل كلمة المرور الحالية"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-password">كلمة المرور الجديدة</Label>
                <Input
                  id="new-password"
                  type={showPasswords ? "text" : "password"}
                  value={settings.newPassword}
                  onChange={(e) => handleInputChange('newPassword', e.target.value)}
                  className="max-w-md"
                  placeholder="أدخل كلمة المرور الجديدة"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">تأكيد كلمة المرور</Label>
                <Input
                  id="confirm-password"
                  type={showPasswords ? "text" : "password"}
                  value={settings.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="max-w-md"
                  placeholder="أعد إدخال كلمة المرور الجديدة"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Notification Settings */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-purple-600" />
              <h3 className="text-lg font-semibold">إعدادات التنبيهات</h3>
            </div>
            
            <div className="pl-6">
              <div className="flex items-center justify-between max-w-md">
                <div>
                  <Label htmlFor="payment-notifications">تنبيهات الدفع</Label>
                  <p className="text-sm text-gray-600">
                    تلقي تنبيهات عند استلام الدفعات
                  </p>
                </div>
                <Switch
                  id="payment-notifications"
                  checked={settings.paymentNotifications}
                  onCheckedChange={(checked) => handleInputChange('paymentNotifications', checked)}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Financial Settings */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-purple-600" />
              <h3 className="text-lg font-semibold">الإعدادات المالية</h3>
            </div>
            
            <div className="pl-6">
              <div className="space-y-2">
                <Label htmlFor="default-cost">التكلفة الافتراضية للمواد (دينار)</Label>
                <Input
                  id="default-cost"
                  type="number"
                  value={settings.defaultSubjectCost}
                  onChange={(e) => handleInputChange('defaultSubjectCost', e.target.value)}
                  className="max-w-md"
                  placeholder="300000"
                />
                <p className="text-sm text-gray-600">
                  هذا المبلغ سيكون التكلفة الافتراضية عند إضافة مواد جديدة
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Delete Section Data */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-red-600" />
              <h3 className="text-lg font-semibold text-red-600">حذف بيانات الأقسام</h3>
            </div>
            
            <div className="pl-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-2">
                  <Shield className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-red-700">
                    <p className="font-medium">تحذير هام!</p>
                    <p>عمليات الحذف هذه لا يمكن التراجع عنها. تأكد من عمل نسخة احتياطية قبل المتابعة.</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-3">
                {deleteSections.map((section) => {
                  const IconComponent = section.icon;
                  return (
                    <div key={section.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <IconComponent className="h-5 w-5 text-gray-600" />
                        <div>
                          <h4 className="font-medium">{section.name}</h4>
                          <p className="text-sm text-gray-600">{section.description}</p>
                        </div>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteSection(section.name, section.key)}
                        className="flex items-center gap-1"
                      >
                        <Trash2 className="h-4 w-4" />
                        حذف بيانات {section.name}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <Separator />

          {/* Save Button */}
          <div className="flex justify-start">
            <Button
              onClick={handleSaveSettings}
              className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 px-8"
            >
              <Save className="ml-2 h-4 w-4" />
              حفظ الإعدادات
            </Button>
          </div>

        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-blue-800">إجراءات سريعة</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <Shield className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <h4 className="font-medium">حماية البيانات</h4>
              <p className="text-sm text-gray-600">جميع البيانات محمية ومشفرة</p>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <SettingsIcon className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <h4 className="font-medium">سهولة الإدارة</h4>
              <p className="text-sm text-gray-600">إدارة شاملة لجميع العمليات</p>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <Bell className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <h4 className="font-medium">التنبيهات الذكية</h4>
              <p className="text-sm text-gray-600">تنبيهات فورية للعمليات المهمة</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        sectionName={deleteModal.sectionName}
        verificationCode={settings.verificationCode}
        onConfirm={confirmDeleteSection}
      />
    </div>
  );
};

export default SettingsPage;