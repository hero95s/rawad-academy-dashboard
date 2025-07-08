
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { GraduationCap, Lock, User, Shield, UserPlus, LogIn } from 'lucide-react';

interface LoginFormProps {
  onLogin: (userData: any) => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  
  const VERIFICATION_CODE = '200102';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login validation
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (loginUsername && loginPassword && loginUsername === 'admin' && loginPassword === VERIFICATION_CODE) {
      onLogin({ username: loginUsername, role: 'admin' });
      toast({
        title: 'تم تسجيل الدخول بنجاح',
        description: `مرحباً بك في معهد إبداع الرواد، ${loginUsername}`,
      });
    } else {
      toast({
        title: 'خطأ في تسجيل الدخول',
        description: 'اسم المستخدم أو رمز التحقق غير صحيح',
        variant: 'destructive',
      });
    }
    setIsLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate registration validation
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (registerUsername && registerPassword && verificationCode === VERIFICATION_CODE) {
      onLogin({ username: registerUsername, role: 'admin' });
      toast({
        title: 'تم إنشاء الحساب بنجاح',
        description: `مرحباً بك في معهد إبداع الرواد، ${registerUsername}`,
      });
    } else if (verificationCode !== VERIFICATION_CODE) {
      toast({
        title: 'رمز التحقق خاطئ',
        description: 'يرجى التحقق من رمز التحقق والمحاولة مرة أخرى',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'خطأ في إنشاء الحساب',
        description: 'يرجى التحقق من البيانات المدخلة',
        variant: 'destructive',
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>
      
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
        <CardHeader className="text-center pb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-3 rounded-full shadow-lg">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-white mb-2">
            معهد إبداع الرواد
          </CardTitle>
          <p className="text-purple-200">نظام إدارة المعهد التعليمي</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white/10 border-white/20">
              <TabsTrigger value="login" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white">
                <LogIn className="ml-2 h-4 w-4" />
                تسجيل دخول
              </TabsTrigger>
              <TabsTrigger value="register" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white">
                <UserPlus className="ml-2 h-4 w-4" />
                إنشاء حساب
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-username" className="text-white">اسم المستخدم</Label>
                  <div className="relative">
                    <User className="absolute right-3 top-3 h-4 w-4 text-purple-300" />
                    <Input
                      id="login-username"
                      type="text"
                      placeholder="أدخل اسم المستخدم"
                      value={loginUsername}
                      onChange={(e) => setLoginUsername(e.target.value)}
                      className="pr-10 bg-white/10 border-white/20 text-white placeholder-purple-300"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="login-password" className="text-white">كلمة المرور</Label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-3 h-4 w-4 text-purple-300" />
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="أدخل كلمة المرور"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="pr-10 bg-white/10 border-white/20 text-white placeholder-purple-300"
                      required
                    />
                  </div>
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                  disabled={isLoading}
                >
                  {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="register" className="space-y-4">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-username" className="text-white">اسم المستخدم</Label>
                  <div className="relative">
                    <User className="absolute right-3 top-3 h-4 w-4 text-purple-300" />
                    <Input
                      id="register-username"
                      type="text"
                      placeholder="أدخل اسم المستخدم"
                      value={registerUsername}
                      onChange={(e) => setRegisterUsername(e.target.value)}
                      className="pr-10 bg-white/10 border-white/20 text-white placeholder-purple-300"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="register-password" className="text-white">كلمة المرور</Label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-3 h-4 w-4 text-purple-300" />
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="أدخل كلمة المرور"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      className="pr-10 bg-white/10 border-white/20 text-white placeholder-purple-300"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="verification" className="text-white">رمز التحقق</Label>
                  <div className="relative">
                    <Shield className="absolute right-3 top-3 h-4 w-4 text-purple-300" />
                    <Input
                      id="verification"
                      type="password"
                      placeholder="أدخل رمز التحقق"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      className="pr-10 bg-white/10 border-white/20 text-white placeholder-purple-300"
                      required
                    />
                  </div>
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                  disabled={isLoading}
                >
                  {isLoading ? 'جاري إنشاء الحساب...' : 'إنشاء حساب جديد'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
