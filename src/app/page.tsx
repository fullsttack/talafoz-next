'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from "@/components/layouts/Header";  
import Slider from "@/components/layouts/Slider";
import CourseList from "@/components/layouts/CourseList";
import BestCourse from "@/components/layouts/BestCourse";
import AboutIndex from "@/components/layouts/AboutIndex";
import BlogList from "@/components/layouts/BlogList";
import FaqIndex from "@/components/layouts/FaqIndex";
import Footer from "@/components/layouts/Footer";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import LoginDialogContent from "@/components/auth/LoginDialogContent";
import { toast } from "sonner";

export default function Home() {
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const showLogin = searchParams.get('showLogin');
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  // اگر پارامتر showLogin وجود داشت، دیالوگ لاگین را نمایش دهد
  useEffect(() => {
    if (showLogin === 'true') {
      setIsLoginDialogOpen(true);
      // نمایش پیام به کاربر
      toast.info('برای دسترسی به این بخش، لطفا وارد حساب کاربری خود شوید.', {
        duration: 5000,
      });
      
      // پاک کردن پارامترها از URL بدون ریلود
      const newURL = new URL(window.location.href);
      newURL.searchParams.delete('showLogin');
      window.history.replaceState({}, '', newURL.toString());
    }
  }, [showLogin]);

  // وقتی دیالوگ بسته می‌شود
  const handleLoginDialogClose = () => {
    setIsLoginDialogOpen(false);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-12">
      <Header />
      <Slider />
      <CourseList/>
      <BestCourse />
      <AboutIndex />
      <BlogList />
      <FaqIndex />
      <Footer />
      
      {/* دیالوگ لاگین */}
      <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
        <DialogContent className="max-w-md">
          <LoginDialogContent 
            onClose={handleLoginDialogClose} 
            isOpen={isLoginDialogOpen}
            callbackUrl={callbackUrl}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
