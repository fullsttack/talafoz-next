import Link from "next/link";
import { MessageSquareCode, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Footer = () => {
  return (
    <footer className="w-full bg-background border-t border-border/40 mt-12">
      <Suspense
        fallback={
          <div className="container mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-40 w-full rounded-md" />
            ))}
          </div>
        }
      >
        <div className="container mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* لوگو و توضیح */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 mb-2">
              <MessageSquareCode className="text-primary h-8 w-8" />
              <span className="font-bold text-xl bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                تلفظ
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              یادگیری صحیح و اصولی برنامه‌نویسی و مهارت‌های دیجیتال با جدیدترین متدهای آموزشی و پشتیبانی حرفه‌ای.
            </p>
            <div className="flex gap-3 mt-2">
              <Link href="https://instagram.com" target="_blank" aria-label="اینستاگرام">
                <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link href="https://twitter.com" target="_blank" aria-label="توییتر">
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link href="https://linkedin.com" target="_blank" aria-label="لینکدین">
                <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link href="mailto:support@example.com" aria-label="ایمیل">
                <Mail className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
            </div>
          </div>

          {/* لینک‌های سریع */}
          <div>
            <h4 className="font-bold mb-4 text-primary">دسترسی سریع</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-primary transition-colors">خانه</Link></li>
              <li><Link href="/courses" className="hover:text-primary transition-colors">دوره‌ها</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">وبلاگ</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">درباره ما</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">تماس با ما</Link></li>
            </ul>
          </div>

          {/* خدمات و پشتیبانی */}
          <div>
            <h4 className="font-bold mb-4 text-primary">خدمات و پشتیبانی</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/faq" className="hover:text-primary transition-colors">سوالات متداول</Link></li>
              <li><Link href="/support" className="hover:text-primary transition-colors">پشتیبانی آنلاین</Link></li>
              <li><Link href="/rules" className="hover:text-primary transition-colors">قوانین سایت</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">حریم خصوصی</Link></li>
            </ul>
          </div>

          {/* خبرنامه و تماس */}
          <div>
            <h4 className="font-bold mb-4 text-primary">عضویت در خبرنامه</h4>
            <form className="flex flex-col gap-2 mb-4">
              <input
                type="email"
                placeholder="ایمیل خود را وارد کنید"
                className="rounded-md border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="bg-foreground text-background rounded-md py-2 text-sm hover:bg-foreground/90 transition-colors"
              >
                عضویت
              </button>
            </form>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <Phone className="h-4 w-4" /> ۰۲۱-۱۲۳۴۵۶۷۸
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <Mail className="h-4 w-4" /> support@example.com
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="h-4 w-4" /> تهران، خیابان مثال، پلاک ۱۲۳
            </div>
          </div>
        </div>
      </Suspense>
      <div className="border-t border-border/30 py-4 text-center text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-center gap-2 px-6">
        <span>کليه حقوق محصولات و محتوای اين سایت متعلق به تلفظ می باشد</span>

      </div>
    </footer>
  );
};

export default Footer;
