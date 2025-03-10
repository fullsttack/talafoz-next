"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Menu, ShoppingCart, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../tools/ModeToggle";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? "auto" : "hidden";
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md shadow-md py-3"
          : "bg-background py-5"
      }`}
    >
      <div className="relative ">
        <div
          className="gridlines absolute inset-x-0  -mt-8 py-16 -z-10"
          data-v-257aca76=""
        ></div>

        <div className="absolute inset-x-0 -z-10 -mt-24 py-20">
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
        <div className="container mx-auto w-full max-w-7xl flex justify-between py-6 items-center z-10">
          <div className="flex items-center gap-2">
            {/* Logo and Brand */}
            <Link href="/" className="flex items-center">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary/80 to-primary text-white font-bold text-xl">
                T
              </div>
              <span className="font-bold text-xl mr-2 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                تلفظ
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-0 space-x-reverse space-y-0 relative">
            <nav className="flex items-center gap-8 px-6 ">
              {[
                { href: "/", label: "خانه" },
                { href: "/courses", label: "دوره‌ها" },
                { href: "/roadmap", label: "مسیر آموزشی" },
                { href: "/blog", label: "وبلاگ" },
                { href: "/about", label: "درباره ما" },
                { href: "/contact", label: "تماس با ما" },
              ].map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative py-2 transition-colors duration-200 text-sm font-medium 
                    ${
                      isActive
                        ? "font-bold"
                        : "text-foreground hover:text-primary"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/50 to-primary rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex gap-3 items-center">
            {/* Icon buttons - visible on all devices */}
            <div className="flex gap-2 sm:gap-3 items-center">
              <ModeToggle />

              {/* Notifications Button */}
              <Button
                asChild
                variant="outline"
                size="icon"
                className="relative rounded-full border-none hover:bg-secondary transition-colors duration-300 h-8 w-8 sm:h-9 sm:w-9"
                aria-label="اعلان‌ها"
              >
                <Link href="/notifications">
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-[10px] flex items-center justify-center text-white font-bold">
                    ۲
                  </span>
                  <Bell className="w-4 h-4" />
                </Link>
              </Button>

              {/* Cart Button with Counter */}
              <Button
                asChild
                variant="outline"
                size="icon"
                className="relative rounded-full border-none hover:bg-secondary transition-colors duration-300 h-8 w-8 sm:h-9 sm:w-9"
                aria-label="سبد خرید"
              >
                <Link href="/cart">
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-[10px] flex items-center justify-center text-background font-bold">
                    ۲
                  </span>
                  <ShoppingCart className="w-4 h-4" />
                </Link>
              </Button>

              {/* Login/Register Button */}
              <Button
                asChild
                variant="outline"
                size="icon"
                className="relative rounded-full border-none hover:bg-secondary transition-colors duration-300 h-8 w-8 sm:h-9 sm:w-9"
                aria-label="ورود/ثبت نام"
              >
                <Link href="/auth/login">
                  <User className="w-4 h-4" />
                </Link>
              </Button>
            </div>

            {/* Hamburger Menu Button - only visible on mobile */}
            <Button
              className="md:hidden border-none p-2 rounded-full bg-background text-foreground hover:bg-secondary transition-colors duration-300 h-8 w-8 sm:h-9 sm:w-9"
              onClick={toggleMenu}
              variant="outline"
              size="icon"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-background/95 pt-20">
          <div className="container mx-auto px-4">
            <nav className="flex flex-col space-y-6">
              {[
                { href: "/", label: "خانه" },
                { href: "/courses", label: "دوره‌ها" },
                { href: "/blog", label: "وبلاگ" },
                { href: "/about", label: "درباره ما" },
                { href: "/contact", label: "تماس با ما" },
              ].map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={toggleMenu}
                    className={`py-4 border-b border-border/10 text-xl font-medium transition-colors ${
                      isActive
                        ? "text-primary font-bold"
                        : "text-foreground/70 hover:text-primary"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
