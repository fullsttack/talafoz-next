"use client";

import {
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Heart,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { memo } from "react";
import { Button } from "@/components/ui/button";

// Memoized Footer Link component for better performance
const FooterLink = memo(
  ({ href, label }: { href: string; label: string }) => (
    <li>
      <Link
        href={href}
        className="text-foreground/70 hover:text-primary transition-colors duration-200 inline-flex items-center gap-1 group py-1"
      >
        <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
        {label}
      </Link>
    </li>
  )
);

FooterLink.displayName = "FooterLink";

// Memoized Social Link component
const SocialLink = memo(
  ({
    href,
    label,
    icon,
  }: {
    href: string;
    label: string;
    icon: React.ReactNode;
  }) => (
    <Button
      asChild
      variant="outline"
      size="icon"
      className="relative rounded-full border-none hover:bg-secondary transition-colors duration-300 h-9 w-9"
      aria-label={label}
    >
      <Link href={href}>
        {icon}
      </Link>
    </Button>
  )
);

SocialLink.displayName = "SocialLink";

// Contact Item component
const ContactItem = memo(({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center gap-3 group">
    <Button
      variant="outline"
      size="icon"
      className="relative rounded-full border-none hover:bg-secondary transition-colors duration-300 h-9 w-9"
    >
      {icon}
    </Button>
    <span className="text-foreground/80 group-hover:text-primary/90 transition-colors duration-300">
      {text}
    </span>
  </div>
));

ContactItem.displayName = "ContactItem";

export default function Footer() {
  const footerLinks = [
    {
      title: "صفحات",
      links: [
        { label: "خانه", href: "/" },
        { label: "دوره‌ها", href: "/courses" },
        { label: "مسیر آموزشی", href: "/roadmap" },
        { label: "وبلاگ", href: "/blog" },
        { label: "درباره ما", href: "/about" },
        { label: "تماس با ما", href: "/contact" },
      ],
    },
    {
      title: "دوره‌های آموزشی",
      links: [
        { label: "برنامه‌نویسی وب", href: "/courses/web" },
        { label: "هوش مصنوعی", href: "/courses/ai" },
        { label: "توسعه موبایل", href: "/courses/mobile" },
        { label: "پایتون", href: "/courses/python" },
        { label: "جاوااسکریپت", href: "/courses/javascript" },
      ],
    },
    {
      title: "منابع",
      links: [
        { label: "پروژه‌های عملی", href: "/projects" },
        { label: "مسیرهای یادگیری", href: "/roadmaps" },
        { label: "انجمن", href: "/community" },
        { label: "پشتیبانی", href: "/support" },
        { label: "سوالات متداول", href: "/faq" },
      ],
    },
  ];

  const socialLinks = [
    { icon: <Instagram className="w-4 h-4" />, href: "#", label: "اینستاگرام" },
    { icon: <Twitter className="w-4 h-4" />, href: "#", label: "توییتر" },
    { icon: <Facebook className="w-4 h-4" />, href: "#", label: "فیسبوک" },
    { icon: <Youtube className="w-4 h-4" />, href: "#", label: "یوتیوب" },
  ];

  return (
    <footer className="relative bg-background border-t">
      {/* Background Effects - similar to header */}
      <div className="gridlines absolute inset-x-0 -z-10 mt-0 py-16" data-v-257aca76=""></div>
      
      <div className="absolute inset-x-0 -z-10 mt-0 py-20">
        <div className="mt-12 grid grid-cols-2 -space-x-52 opacity-60 2xl:mx-auto 2xl:max-w-6xl dark:opacity-20">
          <div
            className="bg-linear-to-r from-yellow via-cyan-500 to-cyan-500 blur-3xl"
            data-v-257aca76=""
          ></div>
          <div
            className="h-24 bg-linear-to-r from-yellow to-yellow-300 blur-3xl"
            data-v-257aca76=""
          ></div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto max-w-7xl pt-16 pb-8 px-4">
        {/* Newsletter Section - New section that matches header style */}
        <div className="relative mb-16 p-6 bg-secondary/30 backdrop-blur-sm rounded-xl border border-border/10 overflow-hidden">
          <div className="absolute inset-0 -z-10 opacity-30">
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
          </div>
          
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-3">مشترک خبرنامه ما شوید</h2>
              <p className="text-foreground/70 mb-0">آخرین اخبار و بروزرسانی‌های دوره‌های آموزشی را دریافت کنید</p>
            </div>
            <div className="w-full flex flex-col sm:flex-row gap-3 justify-end items-end">
              <div className="relative w-full sm:w-auto ">
                <input
                  type="email"
                  placeholder="ایمیل خود را وارد کنید"
                  className="w-full px-4 py-1.5 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                />
              </div>
              <Button className="bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-opacity">
                اشتراک
              </Button>
            </div>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-4">
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary/80 to-primary text-white font-bold text-xl">
                T
              </div>
              <span className="font-bold text-xl mr-2 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                تلفظ
              </span>
            </div>

            <p className="text-foreground/70 mb-6 leading-7">
              تلفظ، یک پلتفرم آموزش آنلاین با دوره‌های متنوع برنامه‌نویسی، توسعه
              وب و طراحی است. ما به شما کمک می‌کنیم تا مهارت‌های دیجیتال خود را
              توسعه دهید و در مسیر حرفه‌ای پیشرفت کنید.
            </p>

            {/* Social Links - Moved up similar to header */}
            <div className="flex items-center gap-2 mb-6">
              {socialLinks.map((social, i) => (
                <SocialLink key={i} href={social.href} label={social.label} icon={social.icon} />
              ))}
            </div>

            <div className="space-y-3">
              <ContactItem 
                icon={<Phone className="h-4 w-4 text-primary" />} 
                text="۰۲۱-۱۲۳۴۵۶۷۸"
              />
              <ContactItem 
                icon={<Mail className="h-4 w-4 text-primary" />} 
                text="info@talafoz.com"
              />
              <ContactItem 
                icon={<MapPin className="h-4 w-4 text-primary" />} 
                text="تهران، خیابان آزادی، پلاک ۱۲۳"
              />
            </div>
          </div>

          {/* Links Columns - Reorganized with flex */}
          <div className="md:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {footerLinks.map((section, i) => (
                <div key={i}>
                  <h3 className="font-bold text-lg mb-4 relative inline-block">
                    {section.title}
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/30 to-primary/60 rounded-full"></span>
                  </h3>
                  <ul className="space-y-2">
                    {section.links.map((link, j) => (
                      <FooterLink key={j} href={link.href} label={link.label} />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-8 border-t border-border/40 text-center">
          <p className="text-foreground/60 text-sm">
          کليه حقوق محصولات و محتوای اين سایت متعلق به تلفظ  
            <Heart
              className="inline h-3 w-3 text-red-500 mx-1 animate-pulse"
              fill="currentColor"
            />{" "}
            است 
          </p>
        </div>
      </div>
    </footer>
  );
}
