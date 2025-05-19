'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
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
import CategoryIndex from "@/components/layouts/CategoryIndex";
export default function Home() {
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const searchParams = useSearchParams();
  const showLogin = searchParams.get('showLogin');
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  useEffect(() => {
    if (showLogin === 'true') {
      setIsLoginDialogOpen(true);
      // نمایش پیام به کاربر
      toast.info('برای دسترسی به این بخش، لطفا وارد حساب کاربری خود شوید.', {
        duration: 5000,
      });
      

      const newURL = new URL(window.location.href);
      newURL.searchParams.delete('showLogin');
      window.history.replaceState({}, '', newURL.toString());
    }
  }, [showLogin]);


  const handleLoginDialogClose = () => {
    setIsLoginDialogOpen(false);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-12 relative">
      <Header />
      <Slider />
      <CategoryIndex />
      <CourseList/>
      <BestCourse />
      <AboutIndex />
      <BlogList />
      <FaqIndex />
      <Footer />
      
      {/* Dialog */}
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
