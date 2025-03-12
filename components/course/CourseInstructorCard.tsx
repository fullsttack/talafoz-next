import { Linkedin, Twitter, Instagram, Github, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
interface CourseInstructorCardProps {
  instructor: string;
  role?: string;
  bio?: string;
  avatarUrl?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    github?: string;
  };
}

export default function CourseInstructorCard({
  instructor,
  role = 'مدرس و برنامه‌نویس',
  bio = 'متخصص در زمینه آموزش برنامه‌نویسی و توسعه نرم‌افزار',
  avatarUrl = '/image/avatar.jpg',
  socialLinks = {
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    instagram: 'https://instagram.com',
    github: 'https://github.com',
  }
}: CourseInstructorCardProps) {
  return (
    <div className={cn(
      "relative overflow-hidden rounded-xl border shadow-md",
      // light styles
      "",
      // dark styles
      ""
    )}>
      {/* نوار تزئینی بالای کارت */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-green"></div>
      
      {/* محتوای اصلی */}
      <div className="p-6 pt-8">
        {/* عکس پروفایل مدرس با افکت‌های ویژه */}
        <div className="mb-5 flex justify-center">
          <div className="relative">
            {/* هاله پشت عکس پروفایل */}
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-green-200 to-green-100 dark:from-green-800/20 dark:to-green-700/10 blur-md"></div>
            
            {/* قاب عکس */}
            <div className="relative h-32 w-32 rounded-full bg-green p-1 shadow-lg">
              <div className="h-full w-full overflow-hidden rounded-full border-2 border-white dark:border-gray-50/[.1]">
                <Image
                  width={100}
                  height={100}
                  src={avatarUrl} 
                  alt={instructor} 
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                  onError={(e) => {
                    // اگر تصویر لود نشد، آواتار پیش‌فرض نمایش بده
                    (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(instructor) + '&background=0D8ABC&color=fff';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* نام و نقش مدرس */}
        <div className="mb-4 text-center">
          <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
            {instructor}
          </h2>
          <p className="text-green font-medium">{role}</p>
        </div>
        
        {/* بیوگرافی با طراحی جذاب */}
        <div className={cn(
          "mb-5 rounded-lg p-4 text-center",
          // light styles
          "border-gray-950/[.1] bg-gray-950/[.01]",
          // dark styles
          "dark:border-gray-50/[.1] dark:bg-gray-50/[.10]"
        )}>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
            {bio}
          </p>
        </div>
        
        {/* نوار تزئینی */}
        <div className="relative my-5 h-px w-full bg-gradient-to-r from-transparent via-green-300 to-transparent opacity-50">
          <div className={cn(
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-3",
            // light styles
            "bg-white",
            // dark styles
            "dark:bg-gray-50/[.10]"
          )}>
            <BookOpen className="h-5 w-5 text-green-500 dark:text-green-400" />
          </div>
        </div>
        
        {/* شبکه‌های اجتماعی با افکت hover یکدست */}
        <div className="flex justify-center gap-3">
          {socialLinks.linkedin && (
            <a 
              href={socialLinks.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-full p-0.5 bg-gradient-to-r from-gray-300 to-gray-200 dark:border-gray-50/[.1] dark:bg-gray-50/[.10]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <div className={cn(
                "relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 group-hover:bg-transparent group-hover:text-white",
                // light styles
                "bg-black",
                // dark styles
                "dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
              )}>
                <Linkedin className="h-5 w-5 text-background transition-colors duration-300 group-hover:text-white" />
              </div>
            </a>
          )}
          
          {socialLinks.twitter && (
            <a 
              href={socialLinks.twitter} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-full p-0.5 bg-gradient-to-r from-gray-300 to-gray-200 dark:border-gray-50/[.1] dark:bg-gray-50/[.10]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <div className={cn(
                "relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 group-hover:bg-transparent group-hover:text-white",
                // light styles
                "bg-black",
                // dark styles
                "dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
              )}>
                <Twitter className="h-5 w-5 text-background transition-colors duration-300 group-hover:text-white" />
              </div>
            </a>
          )}
          
          {socialLinks.instagram && (
            <a 
              href={socialLinks.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-full p-0.5 bg-gradient-to-r from-gray-300 to-gray-200 dark:border-gray-50/[.1] dark:bg-gray-50/[.10]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <div className={cn(
                "relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 group-hover:bg-transparent group-hover:text-white",
                // light styles
                "bg-black",
                // dark styles
                "dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
              )}>
                <Instagram className="h-5 w-5 text-background transition-colors duration-300 group-hover:text-white" />
              </div>
            </a>
          )}
          
          {socialLinks.github && (
            <a 
              href={socialLinks.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-full p-0.5 bg-gradient-to-r from-gray-300 to-gray-200 dark:border-gray-50/[.1] dark:bg-gray-50/[.10]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <div className={cn(
                "relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 group-hover:bg-transparent group-hover:text-white",
                // light styles
                "bg-black",
                // dark styles
                "dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
              )}>
                <Github className="h-5 w-5 text-background transition-colors duration-300 group-hover:text-white" />
              </div>
            </a>
          )}
        </div>
      </div>
    </div>
  );
} 