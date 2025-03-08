'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useUser } from "@/contexts/user-context"
import { 
  LayoutDashboard, 
  UserCircle, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isCollapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

const menuItems = [
  {
    title: "داشبورد",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "پروفایل",
    icon: UserCircle,
    href: "/dashboard/profile",
  },
  {
    title: "تنظیمات",
    icon: Settings,
    href: "/dashboard/settings",
  },
] as const

export function Sidebar({ className, isCollapsed, onCollapse, ...props }: SidebarProps) {
  const { user, logout } = useUser()
  const pathname = usePathname()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 right-4 z-50 md:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        <Menu className="h-6 w-6" />
      </Button>

      <aside 
        className={cn(
          "fixed top-0 right-0 z-40 h-screen bg-background border-l transition-all duration-300",
          isCollapsed ? "md:w-[80px]" : "md:w-[240px]",
          "w-[240px]",
          !isMobileOpen && "-translate-x-full md:translate-x-0",
          className
        )}
        {...props}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-4 border-b">
            {!isCollapsed && (
              <div className="flex items-center gap-2">
                <span className="font-semibold">پنل کاربری</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex"
              onClick={() => onCollapse(!isCollapsed)}
            >
              {isCollapsed ? (
                <ChevronLeft className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Menu Items */}
          <ScrollArea dir="rtl" className="flex-1 px-4 py-6">
            <nav className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                    pathname === item.href && "bg-muted text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {!isCollapsed && <span>{item.title}</span>}
                </Link>
              ))}
            </nav>
          </ScrollArea>

          {/* Footer */}
          <div className="border-t p-4">
            <div className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2",
              !isCollapsed && "mb-4"
            )}>
              <UserCircle className="h-8 w-8" />
              {!isCollapsed && (
                <div className="flex flex-col">
                  <span className="font-medium">{user?.full_name}</span>
                  <span className="text-xs text-muted-foreground">{user?.phone_number}</span>
                </div>
              )}
            </div>
            <Button
              variant="destructive"
              className="w-full"
              onClick={logout}
            >
              {isCollapsed ? (
                <LogOut className="h-5 w-5" />
              ) : (
                <>
                  <LogOut className="ml-2 h-5 w-5" />
                  خروج از سیستم
                </>
              )}
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-xs md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  )
} 