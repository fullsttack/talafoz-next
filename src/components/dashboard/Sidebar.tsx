'use client';

import { useState, useEffect, useRef } from 'react';
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
  Wallet,
  MessageSquare,
  Award,
  ChevronDown,
  GraduationCap,
  ChevronLeft
} from 'lucide-react';

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  hasChildren?: boolean;
  isOpen?: boolean;
  onClick?: () => void;
  isCollapsed?: boolean;
}

const SidebarItem = ({ href, icon, label, isActive, hasChildren, isOpen, onClick, isCollapsed }: SidebarItemProps) => {
  if (isCollapsed) {
    return (
      <Link 
        href={href}
        className={`flex items-center justify-center p-2 rounded-lg transition-all duration-300 ${
          isActive 
            ? 'bg-primary text-primary-foreground' 
            : 'hover:bg-primary/10'
        }`}
      >
        <span className="text-xl">{icon}</span>
      </Link>
    );
  }

  return (
    <Link 
      href={href}
      onClick={onClick}
      className={`flex items-center justify-between  px-4 py-3 rounded-lg transition-all duration-300 ${
        isActive 
          ? 'bg-primary text-primary-foreground ' 
          : 'hover:bg-primary/10'
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-xl">{icon}</span>
        <span className="text-sm font-medium whitespace-nowrap opacity-100 transition-opacity duration-300">{label}</span>
      </div>
      {hasChildren && (
        <span className="text-sm">
          {isOpen ? <ChevronDown size={16} /> : <ChevronLeft size={16} />}
        </span>
      )}
    </Link>
  );
};

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    courses: false,
  });
  const sidebarRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleMenu = (menu: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  const isActive = (path: string) => pathname === path;

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsCollapsed(false);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsCollapsed(true);
    }, 500); // افزایش تاخیر به 500 میلی‌ثانیه برای تجربه بهتر
  };

  // پاکسازی تایمر هنگام آنمانت کامپوننت
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={sidebarRef}
      className={`bg-card border-l border-border  transition-all duration-500 ease-in-out ${
        isCollapsed ? 'w-[80px]' : 'w-[280px]'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {isCollapsed ? (
            <div className="flex items-center justify-center w-full">
              <GraduationCap size={28} className="text-primary" />
            </div>
          ) : (
            <div className="flex items-center gap-2 transition-all duration-500">
              <Link href="/" className="flex items-center gap-2">
                <GraduationCap size={24} className="text-primary" />
                <span className="font-bold text-xl whitespace-nowrap">تلفظ</span>
              </Link>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <div className={`flex flex-col ${isCollapsed ? 'items-center space-y-6 pt-4' : 'space-y-2'}`}>
            <SidebarItem 
              href="/dashboard" 
              icon={<Home size={isCollapsed ? 24 : 20} />} 
              label="داشبورد" 
              isActive={isActive('/dashboard')}
              isCollapsed={isCollapsed}
            />
            
            {!isCollapsed ? (
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
            ) : (
              <SidebarItem 
                href="/courses/my-courses"
                icon={<BookOpen size={24} />}
                label="دوره‌های من"
                isActive={pathname.includes('/courses')}
                isCollapsed={isCollapsed}
              />
            )}
            
            <SidebarItem 
              href="/cart" 
              icon={<ShoppingCart size={isCollapsed ? 24 : 20} />} 
              label="سبد خرید" 
              isActive={isActive('/cart')} 
              isCollapsed={isCollapsed}
            />
            
            <SidebarItem 
              href="/wallet" 
              icon={<Wallet size={isCollapsed ? 24 : 20} />} 
              label="کیف پول" 
              isActive={isActive('/wallet')} 
              isCollapsed={isCollapsed}
            />
            
            <SidebarItem 
              href="/tickets" 
              icon={<MessageSquare size={isCollapsed ? 24 : 20} />} 
              label="پشتیبانی" 
              isActive={isActive('/tickets')} 
              isCollapsed={isCollapsed}
            />
            
            <SidebarItem 
              href="/profile" 
              icon={<User size={isCollapsed ? 24 : 20} />} 
              label="پروفایل" 
              isActive={isActive('/profile')} 
              isCollapsed={isCollapsed}
            />
            
            <SidebarItem 
              href="/settings" 
              icon={<Settings size={isCollapsed ? 24 : 20} />} 
              label="تنظیمات" 
              isActive={isActive('/settings')} 
              isCollapsed={isCollapsed}
            />
          </div>
        </nav>

        {/* User Profile and Logout Button */}
        <div className="mt-auto">
          {/* User Profile */}
          <div className={`p-4 transition-all duration-500 ${isCollapsed ? 'flex justify-center' : ''}`}>
            {isCollapsed ? (
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <User size={20} className="text-primary" />
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <User size={20} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user?.name || user?.username}</p>
                  <p className="text-xs text-muted-foreground truncate">{user?.email || user?.phone_number}</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Logout Button */}
          <div className={`p-4 pt-0 ${isCollapsed ? 'flex justify-center' : ''}`}>
            {isCollapsed ? (
              <button 
                onClick={async () => {
                  await logout();
                }}
                className="p-2 rounded-lg text-red-500 hover:bg-red-500/10 transition-all duration-300"
                aria-label="خروج از حساب"
              >
                <LogOut size={24} />
              </button>
            ) : (
              <button 
                onClick={async () => {
                  await logout();
                }}
                className="flex w-full justify-center items-center gap-3 px-4 py-3 rounded-lg bg-red-100 text-red-500 hover:bg-red-500/10 transition-all duration-300"
              >
                <LogOut size={20} />
                <span className="text-sm font-medium">خروج از حساب</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
