"use client";

import {
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Heart,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const footerLinks = [
    {
      title: "صفحات",
      links: [
        { label: "خانه", href: "/" },
        { label: "دوره‌ها", href: "/courses" },
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
    { icon: <Instagram className="w-5 h-5" />, href: "#", label: "اینستاگرام" },
    { icon: <Twitter className="w-5 h-5" />, href: "#", label: "توییتر" },
    { icon: <Facebook className="w-5 h-5" />, href: "#", label: "فیسبوک" },
    { icon: <Youtube className="w-5 h-5" />, href: "#", label: "یوتیوب" },
  ];

  return (
    <footer className="relative bg-background border-t ">
      <div className="container mx-auto pt-16 pb-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
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

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary/80 flex items-center justify-center">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <span className="text-foreground/80">۰۲۱-۱۲۳۴۵۶۷۸</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary/80 flex items-center justify-center">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <span className="text-foreground/80">info@talafoz.com</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary/80 flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <span className="text-foreground/80">
                  تهران، خیابان آزادی، پلاک ۱۲۳
                </span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((section, i) => (
            <div key={i}>
              <h3 className="font-bold text-lg mb-5 relative inline-block">
                {section.title}
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary/30 rounded-full"></span>
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <Link
                      href={link.href}
                      className="text-foreground/70 hover:text-primary transition-colors inline-flex items-center gap-1 group"
                    >
                      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social + Copyright */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-border/40">
          <div className="flex items-center gap-3">
            {socialLinks.map((social, i) => (
              <Link
                key={i}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-full bg-secondary/40 flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors"
              >
                {social.icon}
              </Link>
            ))}
          </div>

          <p className="text-foreground/60 text-sm">
            &copy; {new Date().getFullYear()} تلفظ. تمامی حقوق محفوظ است. ساخته
            شده با{" "}
            <Heart
              className="inline h-3 w-3 text-red-500 mx-1"
              fill="currentColor"
            />{" "}
            در ایران
          </p>
        </div>
      </div>
    </footer>
  );
}
