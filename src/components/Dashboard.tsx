
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  Calculator, 
  Settings, 
  DollarSign,
  UserPlus,
  CreditCard,
  BarChart3,
  Search,
  LogOut,
  Menu
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import StatsOverview from '@/components/StatsOverview';
import StudentForm from '@/components/StudentForm';
import PaymentManagement from '@/components/PaymentManagement';
import StudentSearch from '@/components/StudentSearch';
import SubjectsManagement from '@/components/SubjectsManagement';
import TeachersManagement from '@/components/TeachersManagement';
import WithdrawalsManagement from '@/components/WithdrawalsManagement';
import StatisticsPage from '@/components/StatisticsPage';
import SettingsPage from '@/components/SettingsPage';

interface DashboardProps {
  user: any;
  onLogout: () => void;
}

const Dashboard = ({ user, onLogout }: DashboardProps) => {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'overview':
        return <StatsOverview />;
      case 'add-student':
        return <StudentForm />;
      case 'payments':
        return <PaymentManagement />;
      case 'search':
        return <StudentSearch />;
      case 'subjects':
        return <SubjectsManagement />;
      case 'teachers':
        return <TeachersManagement />;
      case 'withdrawals':
        return <WithdrawalsManagement />;
      case 'statistics':
        return <StatisticsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <StatsOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50" dir="rtl">
      <div className="flex">
        <Sidebar 
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        
        <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'mr-64' : 'mr-16'}`}>
          {/* Header */}
          <header className="bg-white/80 backdrop-blur-lg border-b border-purple-100 p-4 shadow-sm">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden"
                >
                  <Menu className="h-5 w-5" />
                </Button>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    معهد إبداع الرواد
                  </h1>
                  <p className="text-sm text-gray-600">لوحة التحكم الإدارية</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                  {user.username}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onLogout}
                  className="border-purple-200 text-purple-700 hover:bg-purple-50"
                >
                  <LogOut className="h-4 w-4 ml-2" />
                  تسجيل الخروج
                </Button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="p-6">
            {renderActiveSection()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
