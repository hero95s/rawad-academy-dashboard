
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  BarChart3,
  Users,
  UserPlus,
  GraduationCap,
  BookOpen,
  CreditCard,
  Search,
  DollarSign,
  Settings,
  ChevronLeft,
  Home
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar = ({ activeSection, setActiveSection, isOpen, onToggle }: SidebarProps) => {
  const menuItems = [
    { id: 'overview', label: 'نظرة عامة', icon: Home },
    { id: 'add-student', label: 'إضافة طالب', icon: UserPlus },
    { id: 'students', label: 'الطلاب', icon: Users },
    { id: 'teachers', label: 'المعلمون', icon: GraduationCap },
    { id: 'subjects', label: 'المواد', icon: BookOpen },
    { id: 'payments', label: 'الأقساط', icon: CreditCard },
    { id: 'search', label: 'البحث', icon: Search },
    { id: 'withdrawals', label: 'عمليات السحب', icon: DollarSign },
    { id: 'statistics', label: 'الإحصائيات', icon: BarChart3 },
    { id: 'settings', label: 'الإعدادات', icon: Settings },
  ];

  return (
    <aside className={cn(
      "fixed right-0 top-0 h-full bg-white/90 backdrop-blur-lg border-l border-purple-100 shadow-xl transition-all duration-300 z-50",
      isOpen ? "w-64" : "w-16"
    )}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-8">
          {isOpen && (
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-gray-800">إبداع الرواد</h2>
                <p className="text-xs text-gray-600">نظام الإدارة</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="hover:bg-purple-50"
          >
            <ChevronLeft className={cn(
              "h-4 w-4 transition-transform",
              !isOpen && "rotate-180"
            )} />
          </Button>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={activeSection === item.id ? "default" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 transition-all duration-200",
                activeSection === item.id 
                  ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg"
                  : "hover:bg-purple-50 text-gray-700",
                !isOpen && "justify-center px-2"
              )}
              onClick={() => setActiveSection(item.id)}
            >
              <item.icon className="h-5 w-5" />
              {isOpen && <span className="font-medium">{item.label}</span>}
            </Button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
