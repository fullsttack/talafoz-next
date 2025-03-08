"use client";

import {
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300 py-16 w-full border-t border-gray-800"
      dir="rtl"
    >
      <div className="container mx-auto px-6">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div>
            <div className="flex items-center mb-6 gap-4">
              <div className="dark:bg-white p-2 rounded-full">
                <Image
                  src="/image/logo.png"
                  alt="logo"
                  width={24}
                  height={24}
                />
              </div>
              <h3 className="text-xl font-bold text-white">تلفظ</h3>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed text-sm">
              پلتفرم جامع آموزش آنلاین با هدف ارائه آموزش‌های باکیفیت و کاربردی
              برای همه علاقه‌مندان به یادگیری و پیشرفت مهارت‌های دیجیتال
            </p>
            <div className="flex gap-4">
              <Link
                href="https://instagram.com"
                className="bg-gray-800 p-2 rounded-full text-gray-400 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="https://facebook.com"
                className="bg-gray-800 p-2 rounded-full text-gray-400 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 hover:text-white transition-all duration-300"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href="https://twitter.com"
                className="bg-gray-800 p-2 rounded-full text-gray-400 hover:bg-gradient-to-r hover:from-blue-400 hover:to-cyan-400 hover:text-white transition-all duration-300"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="https://youtube.com"
                className="bg-gray-800 p-2 rounded-full text-gray-400 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 hover:text-white transition-all duration-300"
              >
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 inline-block relative after:content-[''] after:absolute after:h-[3px] after:w-1/2 after:bg-gradient-to-r after:from-blue-500 after:to-transparent after:bottom-[-8px] after:right-0">
              دسترسی سریع
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/courses"
                  className="text-gray-400 hover:text-white transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover:bg-blue-500 transition-colors ml-2"></span>
                  دوره‌های آموزشی
                </Link>
              </li>
              <li>
                <Link
                  href="/instructors"
                  className="text-gray-400 hover:text-white transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover:bg-blue-500 transition-colors ml-2"></span>
                  اساتید
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-400 hover:text-white transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover:bg-blue-500 transition-colors ml-2"></span>
                  وبلاگ
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-white transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover:bg-blue-500 transition-colors ml-2"></span>
                  درباره ما
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover:bg-blue-500 transition-colors ml-2"></span>
                  تماس با ما
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 inline-block relative after:content-[''] after:absolute after:h-[3px] after:w-1/2 after:bg-gradient-to-r after:from-blue-500 after:to-transparent after:bottom-[-8px] after:right-0">
              پشتیبانی
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/faq"
                  className="text-gray-400 hover:text-white transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover:bg-blue-500 transition-colors ml-2"></span>
                  سوالات متداول
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="text-gray-400 hover:text-white transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover:bg-blue-500 transition-colors ml-2"></span>
                  راهنمای استفاده
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-white transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover:bg-blue-500 transition-colors ml-2"></span>
                  شرایط و قوانین
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-white transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover:bg-blue-500 transition-colors ml-2"></span>
                  حریم خصوصی
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="relative before:content-[''] before:absolute before:top-0 before:bottom-0 before:right-[-20px] before:w-[1px] before:bg-gradient-to-b before:from-transparent before:via-gray-700 before:to-transparent before:hidden lg:before:block">
            <h3 className="text-xl font-bold text-white mb-6 inline-block relative after:content-[''] after:absolute after:h-[3px] after:w-1/2 after:bg-gradient-to-r after:from-blue-500 after:to-transparent after:bottom-[-8px] after:right-0">
              ارتباط با ما
            </h3>
            <ul className="space-y-5 text-sm">
              <li className="flex items-center group">
                <div className="bg-gray-800 p-2 rounded-lg ml-3 group-hover:bg-blue-600 transition-colors">
                  <Phone className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">تلفن تماس</p>
                  <p className="text-gray-300">۰۲۱-۱۲۳۴۵۶۷۸</p>
                </div>
              </li>
              <li className="flex items-center group">
                <div className="bg-gray-800 p-2 rounded-lg ml-3 group-hover:bg-blue-600 transition-colors">
                  <Mail className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">ایمیل</p>
                  <p className="text-gray-300">info@talafoz.ir</p>
                </div>
              </li>
              <li className="flex items-center group">
                <div className="bg-gray-800 p-2 rounded-lg ml-3 group-hover:bg-blue-600 transition-colors">
                  <MapPin className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">آدرس</p>
                  <p className="text-gray-300">تهران، خیابان ولیعصر</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-10 opacity-50"></div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} تلفظ - تمامی حقوق محفوظ است
          </p>
          <button
            onClick={scrollToTop}
            className="bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white p-2 rounded-full transition-all duration-300 focus:outline-none"
            aria-label="بازگشت به بالا"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
