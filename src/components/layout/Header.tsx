'use client'

import React, { useState } from "react";
import { Phone, Menu, X } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { LoginDialog } from "@/components/auth/login-dialog";
import { AnimatePresence, motion } from "framer-motion";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative">
      <div className="gridlines absolute inset-x-0 z-0 -mt-8 py-20" data-v-257aca76=""></div>

      <div className="absolute inset-x-0 z-1 -mt-24 py-20">
        <div className="mt-12 grid grid-cols-2 -space-x-52 opacity-60 2xl:mx-auto 2xl:max-w-6xl dark:opacity-50">
          <div
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-3xl "
            data-v-257aca76=""
          ></div>
          <div
            className="dark:to-primary-600 h-24 bg-gradient-to-r from-indigo-400 to-indigo-700 blur-3xl"
            data-v-257aca76=""
          ></div>
        </div>
      </div>

      <div className="container mx-auto flex justify-between items-center gap-4 md:gap-10 py-6 md:py-12 relative z-10 px-4">
        <div>
          <p>Logo</p>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          <Link href="/" className="hover:text-primary transition-colors duration-200">خانه</Link>
          <Link href="/request" className="hover:text-primary transition-colors duration-200">ثبت درخواست</Link>
          <Link href="/blog" className="hover:text-primary transition-colors duration-200">وبلاگ</Link>
          <Link href="/about" className="hover:text-primary transition-colors duration-200">درباره ما</Link>
        </div>

        <div className="flex gap-4 items-center">
          <ModeToggle />
          <Link className="border p-2 rounded-lg bg-foreground text-background" href="/login">
            <Phone className="w-4 h-4" />
          </Link>
          <div className="hidden md:block ">
            <LoginDialog />
          </div>
          
          {/* Hamburger Menu Button */}
          <button 
            className="md:hidden border p-2 rounded-lg "
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
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
            className="md:hidden absolute top-24 inset-x-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border shadow-lg"
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
