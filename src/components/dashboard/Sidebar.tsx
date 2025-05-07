'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Home, 
  BookOpen, 
  FileText, 
  ShoppingCart, 
  User, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Wallet,
  MessageSquare,
  Award,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  hasChildren?: boolean;
  isOpen?: boolean;
  onClick?: () => void;
}

const SidebarItem = ({ href, icon, label, isActive, hasChildren, isOpen, onClick }: SidebarItemProps) => {
  return (
    <Link 
      href={href}
      onClick={onClick}
      className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
        isActive 
          ? 'bg-primary text-primary-foreground' 
          : 'hover:bg-primary/10'
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-xl">{icon}</span>
        <span className="text-sm font-medium">{label}</span>
      </div>
      {hasChildren && (
        <span className="text-sm">
          {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </span>
      )}
    </Link>
  );
};

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    courses: false,
  });

  const toggleMenu = (menu: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  const isActive = (path: string) => pathname === path;

  return (
    <div 
      className={`bg-card border-r border-border transition-all duration-300 ${
        isCollapsed ? 'w-[80px]' : 'w-[280px]'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!isCollapsed && (
            <Link href="/" className="flex items-center gap-2">
              <span className="font-bold text-xl">تلافز</span>
            </Link>
          )}
          <button 
            onClick={() => setIsCollapsed(prev => !prev)} 
            className="p-2 rounded-md hover:bg-accent"
          >
            {isCollapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {!isCollapsed ? (
            <>
              <SidebarItem 
                href="/dashboard" 
                icon={<Home size={20} />} 
                label="داشبورد" 
                isActive={isActive('/dashboard')} 
              />
              
              {/* دوره‌های من */}
              <div className="space-y-1">
                <SidebarItem 
                  href="#" 
                  icon={<BookOpen size={20} />} 
                  label="دوره‌های من" 
                  isActive={pathname.includes('/courses')}
                  hasChildren={true}
                  isOpen={openMenus.courses}
                  onClick={() => toggleMenu('courses')}
                />
                
                {openMenus.courses && (
                  <div className="mr-6 space-y-1 border-r border-border pr-2">
                    <SidebarItem 
                      href="/courses/my-courses" 
                      icon={<FileText size={18} />} 
                      label="دوره‌های من" 
                      isActive={isActive('/courses/my-courses')} 
                    />
                    <SidebarItem 
                      href="/courses/in-progress" 
                      icon={<Award size={18} />} 
                      label="در حال یادگیری" 
                      isActive={isActive('/courses/in-progress')} 
                    />
                  </div>
                )}
              </div>
              
              <SidebarItem 
                href="/cart" 
                icon={<ShoppingCart size={20} />} 
                label="سبد خرید" 
                isActive={isActive('/cart')} 
              />
              
              <SidebarItem 
                href="/wallet" 
                icon={<Wallet size={20} />} 
                label="کیف پول" 
                isActive={isActive('/wallet')} 
              />
              
              <SidebarItem 
                href="/tickets" 
                icon={<MessageSquare size={20} />} 
                label="پشتیبانی" 
                isActive={isActive('/tickets')} 
              />
              
              <SidebarItem 
                href="/profile" 
                icon={<User size={20} />} 
                label="پروفایل" 
                isActive={isActive('/profile')} 
              />
              
              <SidebarItem 
                href="/settings" 
                icon={<Settings size={20} />} 
                label="تنظیمات" 
                isActive={isActive('/settings')} 
              />
              
              <button 
                onClick={logout}
                className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
              >
                <LogOut size={20} />
                <span className="text-sm font-medium">خروج</span>
              </button>
            </>
          ) : (
            // نسخه جمع شده سایدبار
            <div className="flex flex-col items-center space-y-6 pt-4">
              <Link 
                href="/dashboard"
                className={`p-2 rounded-lg ${isActive('/dashboard') ? 'bg-primary text-primary-foreground' : 'hover:bg-primary/10'}`}
              >
                <Home size={24} />
              </Link>
              <Link 
                href="/courses/my-courses"
                className={`p-2 rounded-lg ${isActive('/courses/my-courses') ? 'bg-primary text-primary-foreground' : 'hover:bg-primary/10'}`}
              >
                <BookOpen size={24} />
              </Link>
              <Link 
                href="/cart"
                className={`p-2 rounded-lg ${isActive('/cart') ? 'bg-primary text-primary-foreground' : 'hover:bg-primary/10'}`}
              >
                <ShoppingCart size={24} />
              </Link>
              <Link 
                href="/wallet"
                className={`p-2 rounded-lg ${isActive('/wallet') ? 'bg-primary text-primary-foreground' : 'hover:bg-primary/10'}`}
              >
                <Wallet size={24} />
              </Link>
              <Link 
                href="/tickets"
                className={`p-2 rounded-lg ${isActive('/tickets') ? 'bg-primary text-primary-foreground' : 'hover:bg-primary/10'}`}
              >
                <MessageSquare size={24} />
              </Link>
              <Link 
                href="/profile"
                className={`p-2 rounded-lg ${isActive('/profile') ? 'bg-primary text-primary-foreground' : 'hover:bg-primary/10'}`}
              >
                <User size={24} />
              </Link>
              <Link 
                href="/settings"
                className={`p-2 rounded-lg ${isActive('/settings') ? 'bg-primary text-primary-foreground' : 'hover:bg-primary/10'}`}
              >
                <Settings size={24} />
              </Link>
              <button 
                onClick={logout}
                className="p-2 rounded-lg text-red-500 hover:bg-red-500/10"
              >
                <LogOut size={24} />
              </button>
            </div>
          )}
        </nav>

        {/* User Profile */}
        {!isCollapsed && (
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <User size={20} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.name || user?.username}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email || user?.phone_number}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
