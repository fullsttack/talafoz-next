import { Linkedin, Twitter, Instagram, Github, BookOpen } from 'lucide-react';

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
    <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 shadow-md">
      {/* نوار تزئینی بالای کارت */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-green-500 via-green-400 to-green-500"></div>
      
      {/* محتوای اصلی */}
      <div className="p-6 pt-8">
        {/* عکس پروفایل مدرس با افکت‌های ویژه */}
        <div className="mb-5 flex justify-center">
          <div className="relative">
            {/* هاله پشت عکس پروفایل */}
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-green-200 to-green-100 dark:from-green-800/20 dark:to-green-700/10 blur-md"></div>
            
            {/* قاب عکس */}
            <div className="relative h-32 w-32 rounded-full bg-gradient-to-br from-green-500 to-green-600 p-1 shadow-lg">
              <div className="h-full w-full overflow-hidden rounded-full border-2 border-white dark:border-gray-800">
                <img 
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
          <p className="text-green-600 dark:text-green-400 font-medium">{role}</p>
        </div>
        
        {/* بیوگرافی با طراحی جذاب */}
        <div className="mb-5 rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50 text-center">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
            {bio}
          </p>
        </div>
        
        {/* نوار تزئینی */}
        <div className="relative my-5 h-px w-full bg-gradient-to-r from-transparent via-green-300 to-transparent opacity-50">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 dark:bg-gray-900">
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
              className="group relative overflow-hidden rounded-full p-0.5 bg-gradient-to-r from-gray-300 to-gray-200 dark:from-gray-700 dark:to-gray-600"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white transition-all duration-300 group-hover:bg-transparent dark:bg-gray-900">
                <Linkedin className="h-5 w-5 text-gray-600 dark:text-gray-300 transition-colors duration-300 group-hover:text-white" />
              </div>
            </a>
          )}
          
          {socialLinks.twitter && (
            <a 
              href={socialLinks.twitter} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-full p-0.5 bg-gradient-to-r from-gray-300 to-gray-200 dark:from-gray-700 dark:to-gray-600"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white transition-all duration-300 group-hover:bg-transparent dark:bg-gray-900">
                <Twitter className="h-5 w-5 text-gray-600 dark:text-gray-300 transition-colors duration-300 group-hover:text-white" />
              </div>
            </a>
          )}
          
          {socialLinks.instagram && (
            <a 
              href={socialLinks.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-full p-0.5 bg-gradient-to-r from-gray-300 to-gray-200 dark:from-gray-700 dark:to-gray-600"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white transition-all duration-300 group-hover:bg-transparent dark:bg-gray-900">
                <Instagram className="h-5 w-5 text-gray-600 dark:text-gray-300 transition-colors duration-300 group-hover:text-white" />
              </div>
            </a>
          )}
          
          {socialLinks.github && (
            <a 
              href={socialLinks.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-full p-0.5 bg-gradient-to-r from-gray-300 to-gray-200 dark:from-gray-700 dark:to-gray-600"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white transition-all duration-300 group-hover:bg-transparent dark:bg-gray-900">
                <Github className="h-5 w-5 text-gray-600 dark:text-gray-300 transition-colors duration-300 group-hover:text-white" />
              </div>
            </a>
          )}
        </div>
      </div>
    </div>
  );
} 