import Link from "next/link";
import { MessageSquareCode, Instagram, Github, Mail, BookOpen } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const quickLinks = [
  { href: "/", label: "خانه" },
  { href: "/courses", label: "دوره‌ها" },
  { href: "/roadmap", label: "مسیر آموزشی" },
  { href: "/blog", label: "وبلاگ" },
  { href: "/about", label: "درباره ما" },
  { href: "/contact", label: "تماس با ما" },
];

const courseCategories = [
  { href: "/courses/frontend", label: "فرانت‌اند" },
  { href: "/courses/backend", label: "بک‌اند" },
  { href: "/courses/mobile", label: "موبایل" },
  { href: "/courses/ai", label: "هوش مصنوعی" },
];

const socialLinks = [
  { href: "https://instagram.com/yourpage", icon: <Instagram className="h-5 w-5" />, label: "اینستاگرام" },
  { href: "https://github.com/yourpage", icon: <Github className="h-5 w-5" />, label: "گیت‌هاب" },
  { href: "mailto:info@talafoz.com", icon: <Mail className="h-5 w-5" />, label: "ایمیل" },
];

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border/40 mt-12 pt-10 pb-4 px-4 md:px-0">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* برندینگ */}
        <div className="flex flex-col gap-3">
          <Link href="/" className="flex items-center gap-2" aria-label="صفحه اصلی تلفظ">
            <MessageSquareCode className="text-primary h-8 w-8" />
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">تلفظ</span>
          </Link>
          <p className="text-sm text-muted-foreground mt-2">
            یادگیری صحیح و اصولی برنامه‌نویسی و طراحی با جدیدترین فناوری‌های هوش مصنوعی.
          </p>
        </div>
        {/* لینک‌های سریع */}
        <div>
          <h4 className="font-bold mb-3 text-primary">لینک‌های سریع</h4>
          <ul className="space-y-2">
            {quickLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-primary transition-colors text-sm">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* دسته‌بندی دوره‌ها */}
        <div>
          <h4 className="font-bold mb-3 text-primary">دسته‌بندی دوره‌ها</h4>
          <ul className="space-y-2">
            {courseCategories.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-primary transition-colors text-sm flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary/70" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* شبکه‌های اجتماعی */}
        <div>
          <h4 className="font-bold mb-3 text-primary">ارتباط با ما</h4>
          <ul className="flex gap-4 mb-3">
            {socialLinks.map((item) => (
              <li key={item.href}>
                <a href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.label} className="hover:text-primary transition-colors">
                  {item.icon}
                </a>
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted-foreground">ایمیل: info@talafoz.com</p>
        </div>
      </div>
      <Separator className="my-6" />
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} تلفظ - تمامی حقوق محفوظ است.</span>
        <span>طراحی و توسعه با ❤️ توسط تیم تلفظ</span>
      </div>
    </footer>
  );
};

export default Footer;
