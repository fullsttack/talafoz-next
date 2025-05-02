export interface Course {
  id: number;
  image: string;
  title: string;
  instructor: string;
  description: string;
  price: string;
  episodes: number;
  duration: string;
  isFree: boolean;
  isVipFree?: boolean;
}

export const courses: Course[] = [
  {
    id: 1,
    image: '/course/1.webp',
    title: 'آموزش ری‌اکت',
    instructor: 'علی رضایی',
    description: 'یادگیری React از صفر تا صد به صورت حرفه ای با پروژه عملی. یادگیری ری‌اکت از صفر تا صد به صورت حرفه ای با پروژه عملی.',
    price: '۳۵۰٬۰۰۰ تومان',
    episodes: 24,
    duration: '12:15:30',
    isFree: false,
    isVipFree: true,
  },
  {
    id: 2,
    image: '/course/4.webp',
    title: 'دوره جامع Next.js',
    instructor: 'مریم محمدی',
    description: 'یادگیری Next.js از صفر تا صد به صورت حرفه ای با پروژه عملی. یادگیری Next.js از صفر تا صد به صورت حرفه ای با پروژه عملی.',
    price: '۴۲۰٬۰۰۰ تومان',
    episodes: 30,
    duration: '15:24:32',
    isFree: false,
    isVipFree: true,
  },
  {
    id: 3,
    image: '/course/3.webp',
    title: 'آموزش Node.js',
    instructor: 'حسین احمدی',
    description: 'یادگیری Node.js از صفر تا صد به صورت حرفه ای با پروژه عملی. یادگیری Node.js از صفر تا صد به صورت حرفه ای با پروژه عملی.',
    price: '۳۹۰٬۰۰۰ تومان',
    episodes: 18,
    duration: '09:45:10',
    isFree: true,
  },
  {
    id: 4,
    image: '/course/5.webp',
    title: 'دوره جامع Angular',
    instructor: 'مریم محمدی',
    description: 'یادگیری Angular از صفر تا صد به صورت حرفه ای با پروژه عملی. یادگیری Angular از صفر تا صد به صورت حرفه ای با پروژه عملی.',
    price: '۴۲۰٬۰۰۰ تومان',
    episodes: 28,
    duration: '14:05:00',
    isFree: false,
    isVipFree: true,
  },
];
