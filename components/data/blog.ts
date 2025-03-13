export interface Blog {
  id: string;
  title: string;
  description: string;
  content?: string;
  author: string;
  authorImageUrl?: string;
  imageUrl: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  views?: number;
  featured?: boolean;
}

export const blogs: Blog[] = [
  {
    id: "1",
    title: "آموزش Next.js 15: تمام ویژگی‌های جدید",
    description: "در این مقاله به بررسی ویژگی‌های جدید Next.js 15 و تفاوت‌های آن با نسخه‌های قبلی می‌پردازیم.",
    author: "علی محمدی",
    authorImageUrl: "/avatar/vctrly-notion-people-30.webp",
    imageUrl: "/image/blog.jpg",
    date: "1403/04/15",
    readTime: "۸ دقیقه",
    category: "فرانت‌اند",
    tags: ["Next.js", "React", "JavaScript", "فرانت‌اند"],
    views: 1245,
    featured: true
  },
  {
    id: "2",
    title: "معرفی Python 3.12: قابلیت‌های جدید",
    description: "پایتون 3.12 با بهبودهای عملکردی و ویژگی‌های جدید منتشر شده است. در این مقاله تغییرات مهم را بررسی می‌کنیم.",
    author: "مریم عظیمی",
    authorImageUrl: "/avatar/vctrly-notion-people-30.webp",
    imageUrl: "/image/blog.jpg",
    date: "1403/04/10",
    readTime: "۶ دقیقه",
    category: "برنامه‌نویسی",
    tags: ["Python", "برنامه‌نویسی", "هوش مصنوعی"],
    views: 980
  },
  {
    id: "3",
    title: "چگونه API امن بسازیم؟",
    description: "امنیت API یکی از مهم‌ترین بخش‌های توسعه وب مدرن است. در این مقاله اصول امنیتی API را بررسی می‌کنیم.",
    author: "محسن رضایی",
    authorImageUrl: "/avatar/vctrly-notion-people-30.webp",
    imageUrl: "/image/blog.jpg",
    date: "1403/04/05",
    readTime: "۱۰ دقیقه",
    category: "امنیت",
    tags: ["API", "امنیت", "بک‌اند", "وب"],
    views: 725
  },
  {
    id: "4",
    title: "آشنایی با طراحی UI/UX در سال 2024",
    description: "ترندهای طراحی رابط کاربری و تجربه کاربری در سال 2024 چیست؟ در این مقاله با آخرین روندها آشنا شوید.",
    author: "نیلوفر حسینی",
    authorImageUrl: "/avatar/vctrly-notion-people-30.webp",
    imageUrl: "/image/blog.jpg",
    date: "1403/03/28",
    readTime: "۷ دقیقه",
    category: "طراحی",
    tags: ["UI", "UX", "طراحی", "وب"],
    views: 1560,
    featured: true
  },
  {
    id: "5",
    title: "آموزش Docker برای مبتدیان",
    description: "در این مقاله، مفاهیم اولیه داکر و نحوه استفاده از آن در پروژه‌های توسعه نرم‌افزار را آموزش می‌دهیم.",
    author: "حمید صادقی",
    authorImageUrl: "/avatar/vctrly-notion-people-30.webp",
    imageUrl: "/image/blog.jpg",
    date: "1403/03/20",
    readTime: "۱۲ دقیقه",
    category: "DevOps",
    tags: ["Docker", "DevOps", "کانتینر", "مجازی‌سازی"],
    views: 845
  },
  {
    id: "6",
    title: "آشنایی با هوش مصنوعی تولیدی",
    description: "هوش مصنوعی تولیدی چیست و چگونه دنیای فناوری را تغییر می‌دهد؟ مدل‌های مختلف و کاربردهای آن‌ها را بررسی می‌کنیم.",
    author: "سارا کریمی",
    authorImageUrl: "/avatar/vctrly-notion-people-30.webp",
    imageUrl: "/image/blog.jpg",
    date: "1403/03/15",
    readTime: "۹ دقیقه",
    category: "هوش مصنوعی",
    tags: ["هوش مصنوعی", "یادگیری عمیق", "فناوری"],
    views: 2150,
    featured: true
  },
  {
    id: "7",
    title: "گیت: ترفندهای پیشرفته",
    description: "در این مقاله، ترفندهای پیشرفته گیت برای توسعه‌دهندگان را آموزش می‌دهیم که به بهبود گردش کار کمک می‌کند.",
    author: "رضا اکبری",
    authorImageUrl: "/avatar/vctrly-notion-people-30.webp",
    imageUrl: "/image/blog.jpg",
    date: "1403/03/08",
    readTime: "۸ دقیقه",
    category: "ابزارهای توسعه",
    tags: ["گیت", "ورژن کنترل", "برنامه‌نویسی"],
    views: 635
  },
  {
    id: "8",
    title: "آموزش GraphQL: جایگزین REST",
    description: "GraphQL چیست و چرا باید به جای REST API از آن استفاده کنیم؟ در این مقاله مزایا و معایب آن را بررسی می‌کنیم.",
    author: "علی محمدی",
    authorImageUrl: "/avatar/vctrly-notion-people-30.webp",
    imageUrl: "/image/blog.jpg",
    date: "1403/03/01",
    readTime: "۱۱ دقیقه",
    category: "بک‌اند",
    tags: ["GraphQL", "API", "بک‌اند", "وب"],
    views: 920
  },
  {
    id: "9",
    title: "معرفی فریم‌ورک‌های جدید فرانت‌اند",
    description: "در این مقاله، فریم‌ورک‌های جدید و در حال ظهور فرانت‌اند را معرفی می‌کنیم که می‌توانند آینده وب را شکل دهند.",
    author: "مریم عظیمی",
    authorImageUrl: "/avatar/vctrly-notion-people-30.webp", 
    imageUrl: "/image/blog.jpg",
    date: "1403/02/25",
    readTime: "۷ دقیقه",
    category: "فرانت‌اند",
    tags: ["فرانت‌اند", "جاوااسکریپت", "فریم‌ورک", "وب"],
    views: 1080
  },
  {
    id: "10",
    title: "تست نرم‌افزار: بهترین شیوه‌ها",
    description: "در این مقاله، بهترین شیوه‌های تست نرم‌افزار از تست واحد تا تست یکپارچگی و انتها به انتها را بررسی می‌کنیم.",
    author: "محسن رضایی",
    authorImageUrl: "/avatar/vctrly-notion-people-30.webp",
    imageUrl: "/image/blog.jpg",
    date: "1403/02/18", 
    readTime: "۱۰ دقیقه",
    category: "تست",
    tags: ["تست", "TDD", "QA", "توسعه نرم‌افزار"],
    views: 750
  }
];
