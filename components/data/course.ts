// Episode model
export interface Episode {
  id: string;
  title: string;
  duration: string;
  isFree: boolean;
  videoUrl?: string;
  description?: string;
}

// Chapter model
export interface Chapter {
  id: string;
  title: string;
  episodes: Episode[];
}

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
  categories: string[];
  isFeatured: boolean;
  createdAt: string;
  isFree?: boolean;
  isFreePremium?: boolean;
  sessionsCount?: number;
  chapters?: Chapter[];
  prerequisites?: string[];
  goals?: string[];
  updatedAt?: string;
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
    categories: ['HTML', 'CSS', 'طراحی وب'],
    isFeatured: true,
    createdAt: '2023-09-15',
    updatedAt: '2024-02-20',
    isFreePremium: true,
    sessionsCount: 24,
    prerequisites: [
      'آشنایی اولیه با کامپیوتر',
      'دسترسی به یک ویرایشگر متن ساده',
      'علاقه به یادگیری طراحی وب'
    ],
    goals: [
      'یادگیری زبان نشانه‌گذاری HTML',
      'تسلط بر CSS و استایل‌دهی به صفحات وب',
      'طراحی صفحات واکنش‌گرا (Responsive)',
      'ساخت چندین پروژه عملی'
    ],
    chapters: [
      {
        id: 'ch1-1',
        title: 'مقدمه و آشنایی با HTML',
        episodes: [
          {
            id: 'ep1-1',
            title: 'معرفی دوره و پیش‌نیازها',
            duration: '۱۰:۲۵',
            isFree: true
          },
          {
            id: 'ep1-2',
            title: 'نصب و راه‌اندازی ابزارهای مورد نیاز',
            duration: '۱۵:۳۰',
            isFree: true
          },
          {
            id: 'ep1-3',
            title: 'آشنایی با ساختار HTML',
            duration: '۲۰:۱۵',
            isFree: false
          },
          {
            id: 'ep1-4',
            title: 'تگ‌های پایه در HTML',
            duration: '۳۵:۴۵',
            isFree: false
          }
        ]
      },
      {
        id: 'ch1-2',
        title: 'کار با CSS',
        episodes: [
          {
            id: 'ep2-1',
            title: 'مقدمه‌ای بر CSS',
            duration: '۱۸:۲۰',
            isFree: false
          },
          {
            id: 'ep2-2',
            title: 'سلکتورها در CSS',
            duration: '۲۵:۱۰',
            isFree: false
          },
          {
            id: 'ep2-3',
            title: 'مدل جعبه‌ای (Box Model)',
            duration: '۲۲:۳۰',
            isFree: false
          },
          {
            id: 'ep2-4',
            title: 'خصوصیات رنگ و پس‌زمینه',
            duration: '۱۹:۴۵',
            isFree: false
          }
        ]
      },
      {
        id: 'ch1-3',
        title: 'طراحی واکنش‌گرا',
        episodes: [
          {
            id: 'ep3-1',
            title: 'اصول طراحی واکنش‌گرا',
            duration: '۲۲:۵۰',
            isFree: false
          },
          {
            id: 'ep3-2',
            title: 'Media Queries',
            duration: '۲۸:۱۵',
            isFree: false
          },
          {
            id: 'ep3-3',
            title: 'Flexbox',
            duration: '۳۵:۲۰',
            isFree: false
          },
          {
            id: 'ep3-4',
            title: 'Grid Layout',
            duration: '۴۰:۱۰',
            isFree: false
          }
        ]
      },
      {
        id: 'ch1-4',
        title: 'پروژه‌های عملی',
        episodes: [
          {
            id: 'ep4-1',
            title: 'ساخت صفحه پروفایل شخصی',
            duration: '۴۵:۳۰',
            isFree: false
          },
          {
            id: 'ep4-2',
            title: 'طراحی Landing Page',
            duration: '۵۵:۱۵',
            isFree: false
          },
          {
            id: 'ep4-3',
            title: 'ساخت گالری تصاویر',
            duration: '۳۸:۲۵',
            isFree: false
          },
          {
            id: 'ep4-4',
            title: 'پروژه نهایی و جمع‌بندی',
            duration: '۱:۰۵:۳۰',
            isFree: false
          }
        ]
      }
    ]
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
    categories: ['JavaScript', 'ES6', 'برنامه‌نویسی'],
    isFeatured: true,
    createdAt: '2023-10-20',
    updatedAt: '2024-03-10',
    isFreePremium: true,
    sessionsCount: 32,
    prerequisites: [
      'آشنایی با HTML و CSS',
      'مفاهیم اولیه برنامه‌نویسی',
      'داشتن یک ویرایشگر کد مناسب'
    ],
    goals: [
      'تسلط بر مفاهیم اصلی جاوااسکریپت',
      'کار با DOM و رویدادها',
      'آشنایی با ویژگی‌های مدرن ES6+',
      'برنامه‌نویسی asynchronous و Promises'
    ],
    chapters: [
      {
        id: 'ch2-1',
        title: 'مقدمات جاوااسکریپت',
        episodes: [
          {
            id: 'ep2-1-1',
            title: 'معرفی دوره و تاریخچه جاوااسکریپت',
            duration: '۱۲:۴۵',
            isFree: true
          },
          {
            id: 'ep2-1-2',
            title: 'متغیرها و انواع داده',
            duration: '۲۰:۳۰',
            isFree: true
          },
          {
            id: 'ep2-1-3',
            title: 'عملگرها و عبارات شرطی',
            duration: '۲۵:۱۵',
            isFree: false
          }
        ]
      },
      {
        id: 'ch2-2',
        title: 'توابع و آرایه‌ها',
        episodes: [
          {
            id: 'ep2-2-1',
            title: 'تعریف و استفاده از توابع',
            duration: '۳۰:۱۰',
            isFree: false
          },
          {
            id: 'ep2-2-2',
            title: 'توابع Arrow',
            duration: '۲۵:۲۰',
            isFree: false
          },
          {
            id: 'ep2-2-3',
            title: 'کار با آرایه‌ها',
            duration: '۳۲:۱۵',
            isFree: false
          },
          {
            id: 'ep2-2-4',
            title: 'متدهای آرایه‌ها',
            duration: '۲۸:۵۵',
            isFree: false
          }
        ]
      },
      {
        id: 'ch2-3',
        title: 'اشیاء و متدها',
        episodes: [
          {
            id: 'ep2-3-1',
            title: 'کار با اشیاء در جاوااسکریپت',
            duration: '۲۷:۳۰',
            isFree: false
          },
          {
            id: 'ep2-3-2',
            title: 'متدهای شیء',
            duration: '۲۴:۱۵',
            isFree: false
          },
          {
            id: 'ep2-3-3',
            title: 'کلاس‌ها و شیءگرایی',
            duration: '۳۵:۵۰',
            isFree: false
          }
        ]
      },
      {
        id: 'ch2-4',
        title: 'ویژگی‌های پیشرفته ES6',
        episodes: [
          {
            id: 'ep2-4-1',
            title: 'Destructuring و Spread Operator',
            duration: '۲۲:۴۰',
            isFree: false
          },
          {
            id: 'ep2-4-2',
            title: 'Promise و Async/Await',
            duration: '۴۰:۲۵',
            isFree: false
          },
          {
            id: 'ep2-4-3',
            title: 'ماژول‌ها در جاوااسکریپت',
            duration: '۲۵:۱۰',
            isFree: false
          },
          {
            id: 'ep2-4-4',
            title: 'جمع‌بندی و پروژه پایانی',
            duration: '۵۰:۳۵',
            isFree: false
          }
        ]
      }
    ]
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
    categories: ['React', 'JavaScript', 'فرانت‌اند'],
    isFeatured: true,
    createdAt: '2023-11-05',
    isFreePremium: true,
    sessionsCount: 40,
    chapters: [
      {
        id: 'ch3-1',
        title: 'مفاهیم اولیه React',
        episodes: [
          {
            id: 'ep3-1-1',
            title: 'معرفی React و مزایای آن',
            description: 'در این قسمت با فریم‌ورک React آشنا می‌شوید و مزایای استفاده از آن را یاد می‌گیرید.',
            duration: '۲۵:۳۰',
            isFree: true
          },
          {
            id: 'ep3-1-2',
            title: 'نصب و راه‌اندازی اولیه',
            duration: '۱۸:۴۵',
            isFree: true
          },
          {
            id: 'ep3-1-3',
            title: 'فلسفه React و Virtual DOM',
            duration: '۳۵:۲۰',
            isFree: false
          }
        ]
      },
      {
        id: 'ch3-2',
        title: 'کامپوننت‌ها در React',
        episodes: [
          {
            id: 'ep3-2-1',
            title: 'ساخت اولین کامپوننت',
            duration: '۲۲:۱۵',
            isFree: false
          },
          {
            id: 'ep3-2-2',
            title: 'Props و انتقال داده',
            duration: '۲۸:۴۰',
            isFree: false
          },
          {
            id: 'ep3-2-3',
            title: 'مدیریت State در کامپوننت‌ها',
            duration: '۳۵:۱۰',
            isFree: false
          }
        ]
      },
      {
        id: 'ch3-3',
        title: 'هوک‌ها در React',
        episodes: [
          {
            id: 'ep3-3-1',
            title: 'معرفی useState و useEffect',
            duration: '۴۲:۳۰',
            isFree: false
          },
          {
            id: 'ep3-3-2',
            title: 'هوک‌های پیشرفته useContext و useReducer',
            duration: '۵۰:۱۵',
            isFree: false
          },
          {
            id: 'ep3-3-3',
            title: 'ساخت هوک سفارشی',
            duration: '۳۸:۲۵',
            isFree: false
          }
        ]
      }
    ]
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
    categories: ['Node.js', 'Express.js', 'بک‌اند'],
    isFeatured: false,
    createdAt: '2023-12-10',
    isFreePremium: true,
    sessionsCount: 35,
    chapters: [
      {
        id: 'ch4-1',
        title: 'مقدمات Node.js',
        episodes: [
          {
            id: 'ep4-1-1',
            title: 'معرفی Node.js و تاریخچه آن',
            description: 'آشنایی با تکنولوژی Node.js و دلایل محبوبیت آن در توسعه بک‌اند',
            duration: '۲۳:۱۵',
            isFree: true
          },
          {
            id: 'ep4-1-2',
            title: 'نصب و راه‌اندازی محیط توسعه',
            duration: '۱۵:۵۰',
            isFree: true
          },
          {
            id: 'ep4-1-3',
            title: 'سیستم ماژول در Node.js',
            duration: '۳۰:۱۰',
            isFree: false
          }
        ]
      },
      {
        id: 'ch4-2',
        title: 'Express.js و ساخت API',
        episodes: [
          {
            id: 'ep4-2-1',
            title: 'معرفی Express و نصب آن',
            duration: '۲۰:۳۰',
            isFree: false
          },
          {
            id: 'ep4-2-2',
            title: 'مسیریابی در Express',
            duration: '۲۸:۱۵',
            isFree: false
          },
          {
            id: 'ep4-2-3',
            title: 'میان‌افزارها (Middlewares)',
            duration: '۳۵:۴۰',
            isFree: false
          }
        ]
      }
    ]
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
    categories: ['پایتون', 'هوش مصنوعی', 'یادگیری ماشین'],
    isFeatured: true,
    createdAt: '2024-01-15',
    isFreePremium: true,
    sessionsCount: 45,
    chapters: [
      {
        id: 'ch5-1',
        title: 'مبانی پایتون',
        episodes: [
          {
            id: 'ep5-1-1',
            title: 'نصب و راه‌اندازی پایتون',
            description: 'آموزش نصب پایتون و محیط‌های توسعه مناسب برای کار با آن',
            duration: '۱۸:۳۰',
            isFree: true
          },
          {
            id: 'ep5-1-2',
            title: 'متغیرها، داده‌ها و عملگرها',
            duration: '۴۵:۲۰',
            isFree: true
          },
          {
            id: 'ep5-1-3',
            title: 'ساختارهای کنترلی در پایتون',
            duration: '۳۸:۱۵',
            isFree: false
          }
        ]
      },
      {
        id: 'ch5-2',
        title: 'کتابخانه‌های تحلیل داده',
        episodes: [
          {
            id: 'ep5-2-1',
            title: 'آشنایی با NumPy',
            duration: '۴۲:۵۰',
            isFree: false
          },
          {
            id: 'ep5-2-2',
            title: 'پاندا (Pandas) و تحلیل داده',
            duration: '۵۵:۲۵',
            isFree: false
          },
          {
            id: 'ep5-2-3',
            title: 'مصورسازی داده با Matplotlib',
            duration: '۴۰:۱۰',
            isFree: false
          }
        ]
      },
      {
        id: 'ch5-3',
        title: 'مبانی هوش مصنوعی',
        episodes: [
          {
            id: 'ep5-3-1',
            title: 'معرفی یادگیری ماشین',
            duration: '۳۵:۴۵',
            isFree: false
          },
          {
            id: 'ep5-3-2',
            title: 'الگوریتم‌های یادگیری با ناظر',
            duration: '۴۸:۱۰',
            isFree: false
          },
          {
            id: 'ep5-3-3',
            title: 'شبکه‌های عصبی مصنوعی',
            duration: '۶۳:۳۰',
            isFree: false
          }
        ]
      }
    ]
  },
  {
    id: '6',
    title: 'آشنایی با گیت و گیت‌هاب',
    description: 'این دوره شما را با سیستم کنترل ورژن گیت و پلتفرم گیت‌هاب آشنا می‌کند. مدیریت کد، همکاری تیمی و بهترین شیوه‌های توسعه نرم‌افزار را خواهید آموخت.',
    instructor: 'علی حسینی',
    price: 0,
    duration: '۱۰ ساعت',
    level: 'beginner',
    category: 'ابزارهای توسعه',
    imageUrl: '/images/courses/git.jpg',
    rating: 4.7,
    studentsCount: 3450,
    categories: ['گیت', 'گیت‌هاب', 'کنترل ورژن'],
    isFeatured: false,
    createdAt: '2023-09-20',
    isFree: true,
    sessionsCount: 20,
    chapters: [
      {
        id: 'ch6-1',
        title: 'آشنایی با مفاهیم کنترل ورژن',
        episodes: [
          {
            id: 'ep6-1-1',
            title: 'چرا به کنترل ورژن نیاز داریم؟',
            description: 'در این قسمت با اهمیت استفاده از سیستم‌های کنترل ورژن آشنا می‌شوید.',
            duration: '۱۵:۲۰',
            isFree: true
          },
          {
            id: 'ep6-1-2',
            title: 'نصب و پیکربندی گیت',
            duration: '۲۲:۴۵',
            isFree: true
          },
          {
            id: 'ep6-1-3',
            title: 'ساخت اولین مخزن (Repository)',
            duration: '۱۸:۳۰',
            isFree: true
          }
        ]
      },
      {
        id: 'ch6-2',
        title: 'دستورات اصلی گیت',
        episodes: [
          {
            id: 'ep6-2-1',
            title: 'آشنایی با Git Add و Git Commit',
            duration: '۲۵:۱۰',
            isFree: true
          },
          {
            id: 'ep6-2-2',
            title: 'کار با شاخه‌ها (Branches)',
            duration: '۳۰:۱۵',
            isFree: true
          },
          {
            id: 'ep6-2-3',
            title: 'ادغام شاخه‌ها (Merge)',
            duration: '۲۷:۳۵',
            isFree: true
          }
        ]
      },
      {
        id: 'ch6-3',
        title: 'کار با گیت‌هاب',
        episodes: [
          {
            id: 'ep6-3-1',
            title: 'ساخت حساب کاربری و مخزن در گیت‌هاب',
            duration: '۱۶:۴۰',
            isFree: true
          },
          {
            id: 'ep6-3-2',
            title: 'همگام‌سازی با مخزن از راه دور',
            duration: '۲۴:۵۵',
            isFree: true
          },
          {
            id: 'ep6-3-3',
            title: 'درخواست‌های ادغام (Pull Requests)',
            duration: '۲۸:۲۰',
            isFree: true
          }
        ]
      }
    ]
  },
];
