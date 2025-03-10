export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  price: number;
  discountPrice?: number;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  imageUrl: string;
  rating: number;
  studentsCount: number;
  tags: string[];
  isFeatured: boolean;
  createdAt: string;
  isFree?: boolean;
  isFreePremium?: boolean;
  sessionsCount?: number;
}

export const courses: Course[] = [
  {
    id: '1',
    title: 'مبانی برنامه‌نویسی وب با HTML و CSS',
    description: 'در این دوره، مبانی طراحی وب با استفاده از HTML و CSS را خواهید آموخت. ساختار صفحات وب، سبک‌دهی و طراحی ریسپانسیو از مباحث این دوره می‌باشند.',
    instructor: 'علی محمدی',
    price: 350000,
    discountPrice: 290000,
    duration: '۱۸ ساعت',
    level: 'beginner',
    category: 'طراحی وب',
    imageUrl: '/images/courses/html-css.jpg',
    rating: 4.7,
    studentsCount: 2156,
    tags: ['HTML', 'CSS', 'طراحی وب', 'فرانت‌اند'],
    isFeatured: true,
    createdAt: '2023-09-15',
    isFreePremium: true,
    sessionsCount: 24,
  },
  {
    id: '2',
    title: 'آموزش جامع جاوااسکریپت مدرن',
    description: 'این دوره شما را با مفاهیم پیشرفته جاوااسکریپت مدرن آشنا می‌کند. از مباحث پایه تا ویژگی‌های ES6 و فراتر را پوشش می‌دهد.',
    instructor: 'مریم عظیمی',
    price: 480000,
    discountPrice: 380000,
    duration: '۲۴ ساعت',
    level: 'intermediate',
    category: 'برنامه‌نویسی',
    imageUrl: '/images/courses/javascript.jpg',
    rating: 4.8,
    studentsCount: 1895,
    tags: ['JavaScript', 'ES6', 'فرانت‌اند', 'برنامه‌نویسی'],
    isFeatured: true,
    createdAt: '2023-10-20',
    isFreePremium: true,
    sessionsCount: 32,
  },
  {
    id: '3',
    title: 'آموزش فریم‌ورک React.js',
    description: 'در این دوره، با فریم‌ورک محبوب React.js آشنا خواهید شد. کامپوننت‌های کاربردی، هوک‌ها و مدیریت state از مباحث اصلی این دوره هستند.',
    instructor: 'محسن رضایی',
    price: 550000,
    discountPrice: 450000,
    duration: '۳۰ ساعت',
    level: 'intermediate',
    category: 'فرانت‌اند',
    imageUrl: '/images/courses/react.jpg',
    rating: 4.9,
    studentsCount: 1542,
    tags: ['React', 'JavaScript', 'فرانت‌اند', 'UI'],
    isFeatured: true,
    createdAt: '2023-11-05',
    isFreePremium: true,
    sessionsCount: 40,
  },
  {
    id: '4',
    title: 'آموزش Node.js و Express.js',
    description: 'این دوره به آموزش Node.js و فریم‌ورک Express برای ساخت API و سرورهای وب می‌پردازد. توسعه بک‌اند با جاوااسکریپت را در این دوره خواهید آموخت.',
    instructor: 'حمید صادقی',
    price: 520000,
    discountPrice: 420000,
    duration: '۲۵ ساعت',
    level: 'intermediate',
    category: 'بک‌اند',
    imageUrl: '/images/courses/nodejs.jpg',
    rating: 4.6,
    studentsCount: 985,
    tags: ['Node.js', 'Express.js', 'بک‌اند', 'API'],
    isFeatured: false,
    createdAt: '2023-12-10',
    isFreePremium: true,
    sessionsCount: 35,
  },
  {
    id: '5',
    title: 'دوره جامع پایتون برای هوش مصنوعی',
    description: 'در این دوره با زبان پایتون و کاربردهای آن در هوش مصنوعی و یادگیری ماشین آشنا خواهید شد. از مفاهیم اولیه تا پروژه‌های عملی را پوشش می‌دهد.',
    instructor: 'نیما کریمی',
    price: 650000,
    discountPrice: 550000,
    duration: '۳۵ ساعت',
    level: 'advanced',
    category: 'هوش مصنوعی',
    imageUrl: '/images/courses/python-ai.jpg',
    rating: 4.9,
    studentsCount: 2210,
    tags: ['پایتون', 'هوش مصنوعی', 'یادگیری ماشین', 'دیتاساینس'],
    isFeatured: true,
    createdAt: '2024-01-15',
    isFreePremium: true,
    sessionsCount: 45,
  },
  {
    id: '6',
    title: 'آشنایی با گیت و گیت‌هاب',
    description: 'در این دوره با اصول کنترل نسخه، گیت و گیت‌هاب آشنا می‌شوید. از مفاهیم پایه تا تکنیک‌های پیشرفته همکاری در تیم‌های نرم‌افزاری را خواهید آموخت.',
    instructor: 'امیر حسینی',
    price: 0,
    duration: '۸ ساعت',
    level: 'beginner',
    category: 'ابزارهای توسعه',
    imageUrl: '/images/courses/git.jpg',
    rating: 4.5,
    studentsCount: 3450,
    tags: ['گیت', 'گیت‌هاب', 'کنترل نسخه', 'همکاری تیمی'],
    isFeatured: false,
    createdAt: '2023-08-05',
    isFree: true,
    sessionsCount: 12,
  },
];
