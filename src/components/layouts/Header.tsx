"use client";

import { useState, useEffect, useCallback, memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  // Bell,
  Menu,
  X,
  ShoppingCart,
  User,
  Search,
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  Settings,
  LogOut,
  MessageSquareCode,
  BotMessageSquare,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "../tools/ModeToggle";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

// کامپوننت لینک‌های منوی ناوبری دسکتاپ با بهینه‌سازی memo
const DesktopNavLink = memo(
  ({
    href,
    label,
    isActive,
  }: {
    href: string;
    label: string;
    isActive: boolean;
  }) => (
    <Link
      href={href}
      className={`relative py-2 px-3 transition-colors duration-200 text-sm font-medium rounded-md
    ${
      isActive
        ? "bg-primary/10 text-primary font-bold"
        : "text-foreground hover:bg-accent/50 hover:text-primary"
    }`}
    >
      {label}
      {isActive && (
        <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/70 to-primary rounded-full" />
      )}
    </Link>
  )
);

DesktopNavLink.displayName = "DesktopNavLink";

// کامپوننت لینک‌های منوی ناوبری موبایل با بهینه‌سازی memo
const MobileNavLink = memo(
  ({
    href,
    label,
    isActive,
    icon,
    onClick,
  }: {
    href: string;
    label: string;
    isActive: boolean;
    icon?: React.ReactNode;
    onClick: () => void;
  }) => (
    <Link
      href={href}
      onClick={onClick}
      className={`py-3 px-4 border-b border-border/10 text-lg font-medium transition-colors flex items-center gap-3 rounded-md
    ${
      isActive
        ? "bg-primary/10 text-primary font-bold"
        : "text-foreground/80 hover:bg-accent/50 hover:text-primary"
    }`}
    >
      {icon}
      {label}
    </Link>
  )
);

MobileNavLink.displayName = "MobileNavLink";

// کامپوننت منوی دوره‌ها
const CoursesNavContent = () => (
  <div className="p-4 grid grid-cols-2 gap-4 w-[500px]">
    <div className="col-span-2">
      <h4 className="text-primary font-bold mb-2 text-lg">دسته‌بندی دوره‌ها</h4>
      <Separator className="mb-4" />
    </div>

    <div>
      <h5 className="font-medium mb-2">برنامه‌نویسی</h5>
      <ul className="space-y-2">
        <li>
          <Link
            href="/courses/frontend"
            className="text-sm hover:text-primary flex items-center gap-2"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary/70"></span>
            برنامه‌نویسی فرانت‌اند
          </Link>
        </li>
        <li>
          <Link
            href="/courses/backend"
            className="text-sm hover:text-primary flex items-center gap-2"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary/70"></span>
            برنامه‌نویسی بک‌اند
          </Link>
        </li>
        <li>
          <Link
            href="/courses/mobile"
            className="text-sm hover:text-primary flex items-center gap-2"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary/70"></span>
            برنامه‌نویسی موبایل
          </Link>
        </li>
        <li>
          <Link
            href="/courses/ai"
            className="text-sm hover:text-primary flex items-center gap-2"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary/70"></span>
            هوش مصنوعی و یادگیری ماشین
          </Link>
        </li>
      </ul>
    </div>

    <div>
      <h5 className="font-medium mb-2">طراحی و گرافیک</h5>
      <ul className="space-y-2">
        <li>
          <Link
            href="/courses/ui-design"
            className="text-sm hover:text-primary flex items-center gap-2"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary/70"></span>
            طراحی رابط کاربری
          </Link>
        </li>
        <li>
          <Link
            href="/courses/ux-design"
            className="text-sm hover:text-primary flex items-center gap-2"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary/70"></span>
            تجربه کاربری
          </Link>
        </li>
        <li>
          <Link
            href="/courses/graphic-design"
            className="text-sm hover:text-primary flex items-center gap-2"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary/70"></span>
            طراحی گرافیک
          </Link>
        </li>
        <li>
          <Link
            href="/courses/3d"
            className="text-sm hover:text-primary flex items-center gap-2"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary/70"></span>
            مدل‌سازی سه‌بعدی
          </Link>
        </li>
      </ul>
    </div>

    <div className="col-span-2 mt-4 bg-muted/30 p-4 rounded-lg border border-border/50">
      <div className="flex items-center gap-4">
        <div className="bg-primary/10 p-2 rounded-md">
          <GraduationCap className="text-primary h-8 w-8" />
        </div>
        <div>
          <h5 className="font-bold text-primary">دوره‌های ویژه</h5>
          <p className="text-sm text-muted-foreground">
            دوره‌های جامع با تخفیف ویژه
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/special-courses">مشاهده دوره‌های ویژه</Link>
        </Button>
        <Button size="sm" asChild>
          <Link href="/new-courses">دوره‌های جدید</Link>
        </Button>
      </div>
    </div>
  </div>
);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [isLoggedIn] = useState(false);
  const [circles, setCircles] = useState<{ cx: number; cy: number; r: number; fill: string }[]>([]);

  useEffect(() => {
    // Only run on client
    const generated = Array.from({ length: 30 }).map((_, i) => ({
      cx: Math.random() * 1440,
      cy: Math.random() * 320,
      r: Math.random() * 6 + 2,
      fill: i % 2 === 0 ? "#06b6d4" : "#facc15",
    }));
    setCircles(generated);
  }, []);

  const toggleSearch = useCallback(() => {
    setIsSearchOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (
        (currentScrollY > 10 && !scrolled) ||
        (currentScrollY <= 10 && scrolled)
      ) {
        setScrolled(currentScrollY > 10);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  // بستن منو هنگام تغییر مسیر
  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = "auto";
    }
    if (isSearchOpen) {
      setIsSearchOpen(false);
    }
  }, [pathname, isMenuOpen, isSearchOpen]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md shadow-md py-3"
          : "bg-background py-5"
      }`}
    >
      <div className="relative">
        
        <div
          className="gridlines absolute inset-x-0  -mt-8 py-12 -z-10"
          data-v-257aca76=""
        ></div>

        {/* افکت‌های پس‌زمینه */}
        <div className="absolute inset-x-0 -z-10 -mt-24 py-20 pointer-events-none select-none">
          {/* لایه بلور رنگی ملایم */}
          <div className="absolute right-1/12 top-0 w-10/12 h-32 rounded-full bg-gradient-to-r from-base1 via-yellow-100/40 to-sky-500/40 blur-2xl"></div>
          {/* پترن نقطه‌ای */}
          {circles.length > 0 && (
            <svg
              className="absolute inset-0 w-full h-full"
              width="100%"
              height="100%"
              viewBox="0 0 1440 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ opacity: 0.18 }}
            >
              {circles.map((circle, i) => (
                <circle
                  key={i}
                  cx={circle.cx}
                  cy={circle.cy}
                  r={circle.r}
                  fill={circle.fill}
                  opacity="0.5"
                />
              ))}
            </svg>
          )}
        </div>

        <div className="container mx-auto w-full px-12">
          <div className="flex justify-between py-2 items-center">
            {/* لوگو و برند */}
            <div className="flex items-center ">
              <Link href="/" className="flex items-center">
                <MessageSquareCode className="text-primary h-8 w-8" />
              </Link>

              {/* منوی ناوبری دسکتاپ */}
              <div className="hidden md:flex items-center mr-12">
                <NavigationMenu dir="rtl">
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuLink
                        asChild
                        className={`${
                          pathname === "/"
                            ? "text-primary font-bold"
                            : "text-foreground"
                        } px-3 py-2 text-sm font-medium hover:text-primary transition-colors`}
                      >
                        <Link href="/">خانه</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavigationMenuTrigger
                        className={`${
                          pathname.includes("/courses")
                            ? " text-primary font-bold"
                            : "bg-transparent"
                        }`}
                      >
                        دوره‌ها
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <CoursesNavContent />
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavigationMenuLink
                        asChild
                        className={`${
                          pathname === "/roadmap"
                            ? "text-primary font-bold"
                            : "text-foreground"
                        } px-3 py-2 text-sm font-medium hover:text-primary transition-colors`}
                      >
                        <Link href="/roadmap">مسیر آموزشی</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavigationMenuLink
                        asChild
                        className={`${
                          pathname === "/blog"
                            ? "text-primary font-bold"
                            : "text-foreground"
                        } px-3 py-2 text-sm font-medium hover:text-primary transition-colors`}
                      >
                        <Link href="/blog">وبلاگ</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavigationMenuLink
                        asChild
                        className={`${
                          pathname === "/about"
                            ? "text-primary font-bold"
                            : "text-foreground"
                        } px-3 py-2 text-sm font-medium hover:text-primary transition-colors`}
                      >
                        <Link href="/about">درباره ما</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavigationMenuLink
                        asChild
                        className={`${
                          pathname === "/contact"
                            ? "text-primary font-bold"
                            : "text-foreground"
                        } px-3 py-2 text-sm font-medium hover:text-primary transition-colors`}
                      >
                        <Link href="/contact">تماس با ما</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            </div>

            {/* باکس جستجو - حالت دسکتاپ و موبایل */}
            <div
              className={`absolute left-0 right-0 top-0 z-50 flex items-center justify-center transition-all duration-300 bg-background/80 backdrop-blur-md p-3 ${
                isSearchOpen
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <div className="relative w-full max-w-2xl mx-auto">
                <Input
                  placeholder="جستجو در دوره‌ها، مقالات و..."
                  className="w-full h-12 pr-12 pl-12 rounded-xl border border-border/50 shadow-sm bg-background"
                  autoFocus={isSearchOpen}
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                  onClick={toggleSearch}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* آیکون‌های سمت راست - هر دو حالت */}
            <div className="flex gap-2 sm:gap-3 items-center">


              {/* تم */}
              <ModeToggle />

              {/* اعلان‌ها */}
              <Button
                variant="outline"
                size="icon"
                className="relative rounded-full border-none shadow-lg hover:bg-secondary transition-colors duration-300 h-8 w-8 sm:h-9 sm:w-9"
                aria-label="اعلان‌ها"
              >
                {/* Animated blue badge */}
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-base-1 border-2 border-background"></span>
                </span>
                <BotMessageSquare className="w-4 h-4" />
              </Button>

              {/* اعلان‌ها */}
              {/* <Button
                variant="outline"
                size="icon"
                className="relative rounded-full border-none shadow-lg hover:bg-secondary transition-colors duration-300 h-8 w-8 sm:h-9 sm:w-9"
                aria-label="اعلان‌ها"
              >
                <Badge
                  variant="default"
                  className="absolute -top-1 -right-1 flex items-center justify-center h-4 w-4 text-[10px] p-0"
                >
                  3
                </Badge>
                <Bell className="w-4 h-4" />
              </Button> */}

              {/* سبد خرید */}
              <Button
                asChild
                variant="outline"
                size="icon"
                className="relative rounded-full border-none shadow-lg hover:bg-secondary transition-colors duration-300 h-8 w-8 sm:h-9 sm:w-9"
                aria-label="سبد خرید"
              >
                <Link href="/cart">
                  <Badge
                    variant="default"
                    className="absolute  -top-1 -right-1 flex items-center justify-center h-4 w-4 text-[10px] p-0"
                  >
                    2
                  </Badge>
                  <ShoppingCart className="w-4 h-4" />
                </Link>
              </Button>

              {/* پروفایل کاربر یا دکمه ورود/ثبت‌نام */}
              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="rounded-full border-none shadow-lg hover:bg-secondary transition-colors duration-300 h-8 w-8 sm:h-9 sm:w-9 p-0 overflow-hidden"
                    >
                      <Avatar className="h-full w-full">
                        <AvatarImage
                          src="/avatars/user-profile.jpg"
                          alt="تصویر کاربر"
                        />
                        <AvatarFallback className="text-xs">
                          کاربر
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="flex flex-col gap-2 py-3">
                      <span className="font-bold">رضا محمدی</span>
                      <span className="text-xs font-normal text-muted-foreground">
                        reza@example.com
                      </span>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        <span>داشبورد</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/my-courses"
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <BookOpen className="h-4 w-4" />
                        <span>دوره‌های من</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/settings"
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Settings className="h-4 w-4" />
                        <span>تنظیمات</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive focus:text-destructive flex items-center gap-2 cursor-pointer">
                      <LogOut className="h-4 w-4" />
                      <span>خروج</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex gap-2">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-32 rounded-md hidden sm:flex"
                  >
                    <Link href="/register">ثبت نام</Link>
                  </Button>
                  <Button
                    asChild
                    variant="default"
                    size="sm"
                    className="w-32 bg-base-1 hover:bg-base-1/90 text-white rounded-md hidden sm:flex"
                  >
                    <Link href="/login">ورود</Link>
                  </Button>
                </div>
              )}

              {/* دکمه همبرگر منو در موبایل */}
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    className="md:hidden border-none p-2 rounded-full bg-background text-foreground hover:bg-secondary transition-colors duration-300 h-8 w-8 sm:h-9 sm:w-9"
                    variant="outline"
                    size="icon"
                    aria-label="منو"
                  >
                    <Menu className="w-4 h-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[85%] sm:w-[350px] p-0">
                  <div className="flex flex-col h-full">
                    <div className="p-4 flex items-center justify-between border-b">
                      <Link
                        href="/"
                        className="flex items-center"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="font-bold text-xl bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                          تلفظ
                        </span>
                      </Link>

                      <Button
                        className="border-none p-2 rounded-full bg-background/50 text-foreground hover:bg-secondary transition-colors duration-300 h-8 w-8"
                        variant="outline"
                        size="icon"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="p-4 flex flex-col gap-2 flex-grow overflow-auto">
                      <div className="mb-2">
                        <Input placeholder="جستجو..." className="w-full" />
                      </div>

                      <div className="space-y-1">
                        <MobileNavLink
                          href="/"
                          label="خانه"
                          isActive={pathname === "/"}
                          icon={<LayoutDashboard className="h-5 w-5" />}
                          onClick={() => setIsMenuOpen(false)}
                        />
                        <MobileNavLink
                          href="/courses"
                          label="دوره‌ها"
                          isActive={pathname.includes("/courses")}
                          icon={<BookOpen className="h-5 w-5" />}
                          onClick={() => setIsMenuOpen(false)}
                        />
                        <MobileNavLink
                          href="/roadmap"
                          label="مسیر آموزشی"
                          isActive={pathname === "/roadmap"}
                          icon={<GraduationCap className="h-5 w-5" />}
                          onClick={() => setIsMenuOpen(false)}
                        />
                        <MobileNavLink
                          href="/blog"
                          label="وبلاگ"
                          isActive={pathname === "/blog"}
                          icon={<BookOpen className="h-5 w-5" />}
                          onClick={() => setIsMenuOpen(false)}
                        />
                        <MobileNavLink
                          href="/about"
                          label="درباره ما"
                          isActive={pathname === "/about"}
                          icon={<User className="h-5 w-5" />}
                          onClick={() => setIsMenuOpen(false)}
                        />
                        <MobileNavLink
                          href="/contact"
                          label="تماس با ما"
                          isActive={pathname === "/contact"}
                          icon={<Settings className="h-5 w-5" />}
                          onClick={() => setIsMenuOpen(false)}
                        />
                      </div>
                    </div>

                    <div className="mt-auto p-4 border-t">
                      <Button
                        variant="destructive"
                        className="w-full"
                        onClick={() => alert("خروج از حساب کاربری")}
                      >
                        <LogOut className="h-4 w-4 ml-2" />
                        خروج از حساب کاربری
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
