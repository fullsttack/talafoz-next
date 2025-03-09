'use client'

import React, { useState } from "react";
import { ShoppingCart, Menu, X, Bell } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { LoginDialog } from "@/components/auth/login-dialog";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/user-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useUser();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Fake notifications data
  const notifications = [
    { id: 1, text: "دوره جدید React اضافه شد", time: "۱۰ دقیقه پیش" },
    { id: 2, text: "نظر شما تایید شد", time: "۱ ساعت پیش" },
    { id: 3, text: "تخفیف ویژه برای دوره‌های جاوااسکریپت", time: "۶ ساعت پیش" },
  ];

  return (
    <div className="relative">
      <div className="gridlines absolute inset-x-0 z-0 -mt-8 py-20" data-v-257aca76=""></div>

      <div className="absolute inset-x-0 z-1 -mt-24 py-20">
        <div className="mt-12 grid grid-cols-2 -space-x-52 opacity-60 2xl:mx-auto 2xl:max-w-6xl dark:opacity-50">
          <div
            className="bg-linear-to-r from-indigo-500 via-cyan-500 to-cyan-500 blur-3xl "
            data-v-257aca76=""
          ></div>
          <div
            className="dark:to-primary-600 h-24 bg-linear-to-r from-indigo-400 to-indigo-700 blur-3xl"
            data-v-257aca76=""
          ></div>
        </div>
      </div>

      <div className="container mx-auto flex justify-between items-center gap-4 md:gap-10 py-6 md:py-12 relative z-10 px-4">
        <div className="dark:bg-white p-2 rounded-full">
          <Image src="/image/logo.png" alt="logo" width={30} height={30} />
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          <Link href="/" className="hover:text-primary transition-colors duration-200">خانه</Link>
          <Link href="/request" className="hover:text-primary transition-colors duration-200">دوره ها</Link>
          <Link href="/request" className="hover:text-primary transition-colors duration-200">مسیر یادگیری</Link>
          <Link href="/request" className="hover:text-primary transition-colors duration-200">اشتراک ها</Link>
          <Link href="/blog" className="hover:text-primary transition-colors duration-200">وبلاگ</Link>
          <Link href="/about" className="hover:text-primary transition-colors duration-200">درباره ما</Link>
          <Link href="/about" className="hover:text-primary transition-colors duration-200">تماس با ما</Link>

        </div>

        <div className="flex gap-4 items-center">
          <ModeToggle />
          
          {/* Notification Icon - Only shown for logged-in users */}
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  className="border p-2 rounded-lg bg-background text-foreground hover:bg-muted transition-colors relative"
                  aria-label="اعلان‌ها"
                >
                  <Bell className="w-4 h-4" />
                  <Badge className="absolute -top-2 -right-2 px-1.5 h-4 min-w-4 flex items-center justify-center text-[10px]">
                    {notifications.length}
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72">
                <DropdownMenuLabel>اعلان‌های جدید</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.map((notification) => (
                  <DropdownMenuItem key={notification.id} className="py-3 cursor-pointer">
                    <div className="flex flex-col">
                      <span>{notification.text}</span>
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </div>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="justify-center text-primary font-medium py-2 cursor-pointer">
                  <Link href="/dashboard/notifications">مشاهده همه اعلان‌ها</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          
          <Button 
            asChild
            className="border p-2 rounded-lg bg-background text-foreground hover:bg-muted transition-colors"
            aria-label="سبد خرید"
          >
            <Link href="/cart">
              <ShoppingCart className="w-4 h-4" />
            </Link>
          </Button>
          <div className="hidden md:block">
            <LoginDialog />
          </div>
          
          {/* Hamburger Menu Button */}
          <Button 
            className="md:hidden border p-2 rounded-lg bg-background hover:bg-muted transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-24 inset-x-0 z-20 bg-background/95 backdrop-blur-xs border-b border-border shadow-lg"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              <Link href="/" className="py-3 border-b border-border/30 hover:text-primary transition-colors duration-200">خانه</Link>
              <Link href="/request" className="py-3 border-b border-border/30 hover:text-primary transition-colors duration-200">ثبت درخواست</Link>
              <Link href="/blog" className="py-3 border-b border-border/30 hover:text-primary transition-colors duration-200">وبلاگ</Link>
              <Link href="/about" className="py-3 hover:text-primary transition-colors duration-200">درباره ما</Link>
              <div className="pt-4">
                <LoginDialog />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
