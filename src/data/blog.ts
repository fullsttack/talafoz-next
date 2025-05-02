export interface Blog {
  id: number;
  image: string;
  title: string;
  author: string;
  description: string;
  date: string;
  likes: number;
  comments: number;
}

export const blogs: Blog[] = [
  {
    id: 1,
    image: '/blog/1.webp',
    title: 'آموزش جامع Next.js 15',
    author: 'سارا محمدی',
    description: 'در این مقاله با امکانات جدید Next.js 15 و نحوه مهاجرت به آن آشنا می‌شوید.',
    date: '1403/03/10',
    likes: 24,
    comments: 5,
  },
  {
    id: 2,
    image: '/blog/2.webp',
    title: 'ترفندهای حرفه‌ای React',
    author: 'علی رضایی',
    description: 'در این مطلب با ترفندهای کاربردی و حرفه‌ای React برای توسعه سریع‌تر آشنا شوید.',
    date: '1403/03/05',
    likes: 18,
    comments: 2,
  },
  {
    id: 3,
    image: '/blog/3.webp',
    title: 'راهنمای شروع برنامه‌نویسی',
    author: 'مریم احمدی',
    description: 'اگر به تازگی می‌خواهید برنامه‌نویسی را شروع کنید، این مقاله را از دست ندهید.',
    date: '1403/02/28',
    likes: 30,
    comments: 8,
  },
  {
    id: 4,
    image: '/blog/4.webp',
    title: 'آموزش جامع Next.js 15',
    author: 'سارا محمدی',
    description: 'در این مقاله با امکانات جدید Next.js 15 و نحوه مهاجرت به آن آشنا می‌شوید.',
    date: '1403/03/10',
    likes: 12,
    comments: 1,
  },
];
