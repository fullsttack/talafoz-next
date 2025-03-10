"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { 
  Card, 
  CardContent, 
  CardDescription,  
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TabsContent,
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { CourseType } from "@/components/course/CourseCart";
import { 
  BookOpen, 
  Calendar, 
  CheckCircle,
  ChevronLeft,
  Clock, 
  FileText, 
  GraduationCap, 
  LayoutList, 
  LucideIcon, 
  MessageSquare, 
  Play, 
  PlayCircle, 
  Share2, 
  Star, 
  Users 
} from "lucide-react";

const COURSES: CourseType[] = [
  {
    id: 1,
    title: "مبانی توسعه وب",
    description:
      "ساخت اپلیکیشن‌های مدرن با ری‌اکت ساخت اپلیکیشن‌های مدرن با ری‌اکت ساخت اپلیکیشن‌های مدرن با ری‌اکت",
    image: "/image/next.jpg",
    duration: "۸ هفته",
    level: "سطح مبتدی",
    price: "۱,۵۰۰,۰۰۰ تومان",
    instructor: "علی محمدی",
    rating: 4.8,
    students: 1240,
    tags: ["HTML", "CSS", "JavaScript"],
    discount: 20,
    isTrending: true,
    gradientFrom: "#4F46E5",
    gradientTo: "#14B8A6",
    slug: "web-development-basics",
  },
  {
    id: 2,
    title: "دوره جامع ری‌اکت و نکست‌جی‌اس",
    description:
      "ساخت اپلیکیشن‌های مدرن با ری‌اکت ساخت اپلیکیشن‌های مدرن با ری‌اکت ساخت اپلیکیشن‌های مدرن با ری‌اکت",
    image: "/image/next.jpg",
    duration: "۱۰ هفته",
    level: "سطح متوسط",
    price: "۲,۸۰۰,۰۰۰ تومان",
    instructor: "مهدی حسینی",
    rating: 4.9,
    students: 850,
    tags: ["React", "Next.js", "TypeScript"],
    discount: 15,
    isTrending: false,
    gradientFrom: "#4F46E5",
    gradientTo: "#14B8A6",
    slug: "react-nextjs-masterclass",
  },
  {
    id: 12,
    title: "مبانی بلاکچین و ارزهای دیجیتال",
    description:
      "آشنایی با فناوری بلاکچین، ارزهای دیجیتال و کاربردهای آن در صنایع مختلف",
    image: "/image/next.jpg",
    duration: "۶ هفته",
    level: "سطح مبتدی",
    price: "۲,۲۰۰,۰۰۰ تومان",
    instructor: "بهرام صادقی",
    rating: 4.6,
    students: 830,
    tags: ["Blockchain", "Cryptocurrency", "Smart Contracts"],
    discount: 0,
    isTrending: false,
    gradientFrom: "#F59E0B",
    gradientTo: "#DC2626",
    slug: "blockchain-cryptocurrency-basics",
  }
];

// Sample course chapters for this specific course
const courseChapters = [
  {
    id: 1,
    title: "مقدمه و آشنایی با HTML",
    lessons: [
      { id: 1, title: "معرفی دوره و پیش‌نیازها", duration: "۱۵ دقیقه", completed: true },
      { id: 2, title: "نصب ابزارهای مورد نیاز", duration: "۲۰ دقیقه", completed: true },
      { id: 3, title: "ساختار پایه HTML", duration: "۳۰ دقیقه", completed: true },
      { id: 4, title: "آشنایی با تگ‌های HTML", duration: "۴۵ دقیقه", completed: false },
    ],
  },
  {
    id: 2,
    title: "استایل‌دهی با CSS",
    lessons: [
      { id: 5, title: "مقدمه‌ای بر CSS", duration: "۲۵ دقیقه", completed: false },
      { id: 6, title: "انتخابگرها در CSS", duration: "۳۵ دقیقه", completed: false },
      { id: 7, title: "مدل جعبه‌ای در CSS", duration: "۴۰ دقیقه", completed: false },
      { id: 8, title: "فلکس‌باکس و گرید", duration: "۵۵ دقیقه", completed: false },
    ],
  },
  {
    id: 3,
    title: "جاوااسکریپت پایه",
    lessons: [
      { id: 9, title: "مقدمه‌ای بر جاوااسکریپت", duration: "۳۰ دقیقه", completed: false },
      { id: 10, title: "متغیرها و انواع داده", duration: "۴۰ دقیقه", completed: false },
      { id: 11, title: "عملگرها و شرط‌ها", duration: "۳۵ دقیقه", completed: false },
      { id: 12, title: "حلقه‌ها و توابع", duration: "۵۰ دقیقه", completed: false },
    ],
  },
];

// Sample course reviews
const courseReviews = [
  {
    id: 1,
    author: "محمد علیزاده",
    avatar: "/avatars/avatar-1.png",
    rating: 5,
    date: "۱۵ مرداد ۱۴۰۲",
    content: "این دوره بسیار عالی بود! محتوای کاربردی و به روز با مثال‌های واقعی. من بعد از گذراندن این دوره توانستم یک وبسایت کامل با HTML و CSS طراحی کنم. از استاد محمدی بسیار سپاسگزارم.",
  },
  {
    id: 2,
    author: "سارا حسینی",
    avatar: "/avatars/avatar-2.png",
    rating: 4,
    date: "۲ مرداد ۱۴۰۲",
    content: "دوره خوبی بود، اما کاش تمرین‌های بیشتری داشت. در کل از محتوا راضی هستم و یادگیری خوبی داشتم.",
  },
  {
    id: 3,
    author: "علی رضایی",
    avatar: "/avatars/avatar-3.png",
    rating: 5,
    date: "۲۵ تیر ۱۴۰۲",
    content: "بهترین دوره‌ای که تا به حال دیده‌ام! استاد محمدی با صبر و حوصله تمام مفاهیم را توضیح می‌دهد و به تمام سوالات در بخش گفتگو پاسخ می‌دهد. قطعاً دوره‌های دیگر ایشان را هم شرکت خواهم کرد.",
  },
];

// Function to render star rating
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={18}
          className={`${
            star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

// Feature item component for course features
const FeatureItem = ({ 
  icon: Icon, 
  title, 
  value 
}: { 
  icon: LucideIcon; 
  title: string; 
  value: string;
}) => (
  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
      <Icon size={18} className="text-primary" />
    </div>
    <div>
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="font-medium">{value}</p>
    </div>
  </div>
);

export default function CourseDetail() {
  const params = useParams();
  const slug = typeof params.slug === 'string' ? decodeURIComponent(params.slug) : Array.isArray(params.slug) ? decodeURIComponent(params.slug[0]) : '';
  const [course, setCourse] = useState<CourseType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  // Find next unwatched lesson
  const findNextLesson = () => {
    for (const chapter of courseChapters) {
      for (const lesson of chapter.lessons) {
        if (!lesson.completed) {
          return { lesson, chapter };
        }
      }
    }
    return null;
  };

  const nextLesson = findNextLesson();

  // Calculate course progress
  const calculateProgress = () => {
    const totalLessons = courseChapters.reduce((acc, chapter) => acc + chapter.lessons.length, 0);
    const completedLessons = courseChapters.reduce((acc, chapter) => {
      return acc + chapter.lessons.filter(lesson => lesson.completed).length;
    }, 0);

    return Math.round((completedLessons / totalLessons) * 100);
  };

  useEffect(() => {
    // Simulate API call to fetch course data
    setIsLoading(true);
    
    // Debug info
    console.log("Current slug:", slug);
    console.log("Available slugs:", COURSES.map((c: CourseType) => c.slug));
    
    const foundCourse = COURSES.find((c: CourseType) => c.slug === slug);
    
    // Simulate a slight delay for loading
    setTimeout(() => {
      setCourse(foundCourse || null);
      setIsLoading(false);
    }, 500);
  }, [slug]);

  if (isLoading) {
    return (
      <div className="py-10">
        <div className="animate-pulse">
          <div className="h-8 w-1/3 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded mb-10"></div>
          <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
          <div className="h-8 w-1/4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold mb-2">دوره مورد نظر یافت نشد!</h1>
        <p className="text-muted-foreground mb-2">متأسفانه دوره‌ای با این مشخصات پیدا نکردیم.</p>
        <p className="text-sm text-red-500 mb-4">اسلاگ فعلی: {slug}</p>
        <p className="text-sm mb-6">اسلاگ‌های موجود: {COURSES.map((c: CourseType) => c.slug).join(', ')}</p>
        <Button asChild>
          <Link href="/courses">بازگشت به صفحه دوره‌ها</Link>
        </Button>
      </div>
    );
  }

  // Calculate original and discounted prices
  const formatPrice = (price: string) => {
    return price.includes("تومان") ? price : `${price} تومان`;
  };

  const getDiscountedPrice = (price: string, discount: number) => {
    // Extract numeric part from price
    const match = price.match(/(\d[\d,]*)/);
    if (!match) return price;

    try {
      const numericPart = match[0].replace(/,/g, '');
      const priceValue = parseInt(numericPart);
      
      if (!isNaN(priceValue)) {
        const discountedValue = Math.round(priceValue * (1 - discount / 100));
        return discountedValue.toLocaleString('fa-IR') + " تومان";
      }
    } catch (e) {
      console.error("Error calculating discount:", e);
    }
    
    return price;
  };

  return (
    <div className="py-8">
      {/* Course Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Link 
                href="/courses" 
                className="text-sm text-muted-foreground hover:text-primary transition flex items-center gap-1"
              >
                <ChevronLeft size={16} />
                <span>همه دوره‌ها</span>
              </Link>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-1">
                <span className="text-sm text-muted-foreground">{course.rating}</span>
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                <span className="text-xs text-muted-foreground">({course.students} دانشجو)</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-3">{course.title}</h1>
            <p className="text-muted-foreground mb-4 max-w-3xl">{course.description}</p>
            
            <div className="flex flex-wrap gap-3 mb-4">
              <Badge variant="outline" className="px-3 py-1 rounded-full border-primary/30 bg-primary/5 text-primary">
                {course.level}
              </Badge>
              {course.tags.map((tag, idx) => (
                <Badge 
                  key={idx}
                  variant="outline" 
                  className="rounded-full"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Avatar className="w-10 h-10 border">
                  <AvatarImage src="/avatars/instructor.png" alt={course.instructor} />
                  <AvatarFallback>{course.instructor.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{course.instructor}</p>
                  <p className="text-xs text-muted-foreground">مدرس دوره</p>
                </div>
              </div>
              
              <Separator orientation="vertical" className="h-10" />
              
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2"
              >
                <Share2 size={16} />
                <span>اشتراک‌گذاری</span>
              </Button>
            </div>
          </div>
          
          <div className="w-full md:w-auto">
            <Card className="border shadow-md w-full md:w-80">
              <CardContent className="p-6">
                <div className="relative aspect-video mb-6 rounded-lg overflow-hidden">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="bg-white/90 dark:bg-black/70 rounded-full p-3 cursor-pointer hover:scale-110 transition">
                      <PlayCircle size={32} className="text-primary" />
                    </div>
                  </div>
                </div>
                
                {course.discount > 0 ? (
                  <div className="mb-6 text-center">
                    <p className="text-muted-foreground line-through text-sm">
                      {formatPrice(course.price)}
                    </p>
                    <div className="flex items-center justify-center gap-2 mt-1">
                      <span className="text-2xl font-bold text-primary">
                        {getDiscountedPrice(course.price, course.discount)}
                      </span>
                      <Badge className="bg-red-500 hover:bg-red-600">
                        {course.discount}%
                      </Badge>
                    </div>
                  </div>
                ) : (
                  <p className="text-2xl font-bold text-primary text-center mb-6">
                    {formatPrice(course.price)}
                  </p>
                )}
                
                <div className="space-y-4">
                  <Button className="w-full gap-2 py-6">
                    <BookOpen size={18} />
                    <span>ثبت‌نام در دوره</span>
                  </Button>
                  
                  {nextLesson && (
                    <Button variant="outline" className="w-full gap-2 py-6">
                      <Play size={18} />
                      <span>ادامه دوره</span>
                    </Button>
                  )}
                </div>
                
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <Clock size={18} className="text-muted-foreground" />
                    <span>{course.duration} مدت دوره</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FileText size={18} className="text-muted-foreground" />
                    <span>{courseChapters.reduce((acc, chapter) => acc + chapter.lessons.length, 0)} جلسه</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <GraduationCap size={18} className="text-muted-foreground" />
                    <span>{course.level}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar size={18} className="text-muted-foreground" />
                    <span>بروزرسانی: خرداد ۱۴۰۲</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Course Progress */}
        {nextLesson && (
          <Card className="border shadow-sm bg-blue-50/50 dark:bg-blue-950/10 mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-right">
                  <h3 className="text-xl font-bold mb-2">ادامه یادگیری</h3>
                  <p className="text-muted-foreground mb-4">
                    فصل {nextLesson.chapter.id}: {nextLesson.chapter.title} | درس {nextLesson.lesson.id}: {nextLesson.lesson.title}
                  </p>
                  
                  <Button className="gap-2">
                    <Play className="w-4 h-4" />
                    <span>ادامه دوره</span>
                  </Button>
                </div>
                
                <div className="w-full md:w-1/3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground">پیشرفت شما:</span>
                    <span className="font-bold">{calculateProgress()}%</span>
                  </div>
                  <Progress value={calculateProgress()} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    {courseChapters.reduce((acc, chapter) => acc + chapter.lessons.filter(l => l.completed).length, 0)} از {courseChapters.reduce((acc, chapter) => acc + chapter.lessons.length, 0)} جلسه تکمیل شده
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Course Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <FeatureItem 
            icon={Clock} 
            title="مدت دوره" 
            value={course.duration} 
          />
          <FeatureItem 
            icon={LayoutList} 
            title="تعداد جلسات" 
            value={`${courseChapters.reduce((acc, chapter) => acc + chapter.lessons.length, 0)} جلسه`} 
          />
          <FeatureItem 
            icon={Users} 
            title="تعداد دانشجویان" 
            value={`${course.students} نفر`} 
          />
          <FeatureItem 
            icon={GraduationCap} 
            title="سطح دوره" 
            value={course.level} 
          />
        </div>
        
        {/* Tabs for course content */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full justify-start mb-6 bg-background border-b border-muted rounded-none p-0 h-auto">
            <TabsTrigger 
              value="overview" 
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary py-3 px-6"
              onClick={() => setActiveTab("overview")}
            >
              معرفی دوره
            </TabsTrigger>
            <TabsTrigger 
              value="curriculum" 
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary py-3 px-6"
              onClick={() => setActiveTab("curriculum")}
            >
              سرفصل‌ها
            </TabsTrigger>
            <TabsTrigger 
              value="reviews" 
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary py-3 px-6"
              onClick={() => setActiveTab("reviews")}
            >
              نظرات ({courseReviews.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-0">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2>درباره این دوره</h2>
              <p>
                در این دوره جامع، شما با مفاهیم اولیه طراحی وب آشنا می‌شوید و قدم به قدم به سمت ساخت وب‌سایت‌های حرفه‌ای پیش می‌روید. این دوره برای افرادی که هیچ پیش‌زمینه‌ای در برنامه‌نویسی ندارند طراحی شده است.
              </p>
              
              <h3>آنچه در این دوره خواهید آموخت:</h3>
              <ul>
                <li>آشنایی کامل با HTML5 و ساختار صفحات وب</li>
                <li>طراحی استایل‌های مدرن با CSS3</li>
                <li>اصول طراحی واکنش‌گرا (Responsive)</li>
                <li>پایه‌های جاوااسکریپت و تعامل با کاربر</li>
                <li>آشنایی با فریم‌ورک‌های محبوب مانند Bootstrap</li>
                <li>انتشار وب‌سایت و مدیریت دامنه</li>
              </ul>
              
              <h3>پیش‌نیازهای دوره</h3>
              <p>
                برای شرکت در این دوره نیاز به پیش‌زمینه خاصی ندارید، اما آشنایی ابتدایی با کامپیوتر و مرورگرهای وب مفید خواهد بود. تمام ابزارهای مورد نیاز در طول دوره معرفی و نصب خواهند شد.
              </p>
              
              <div className="bg-muted/30 p-6 rounded-xl my-8 border">
                <h3 className="mt-0">مخاطبان این دوره</h3>
                <ul className="mb-0">
                  <li>علاقه‌مندان به ورود به دنیای طراحی وب</li>
                  <li>دانشجویان رشته‌های مرتبط با کامپیوتر</li>
                  <li>مدیران کسب و کارها که می‌خواهند خودشان وب‌سایت‌های ساده بسازند</li>
                  <li>طراحان گرافیک که قصد گسترش مهارت‌های خود را دارند</li>
                </ul>
              </div>
              
              <h3>درباره مدرس</h3>
              <div className="flex gap-4 items-start not-prose">
                <Avatar className="w-16 h-16 border">
                  <AvatarImage src="/avatars/instructor.png" alt={course.instructor} />
                  <AvatarFallback>{course.instructor.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-lg font-bold mb-1">{course.instructor}</h4>
                  <p className="text-muted-foreground mb-2">توسعه‌دهنده ارشد وب با بیش از ۱۰ سال تجربه</p>
                  <p>
                    {course.instructor} توسعه‌دهنده و مدرس با تجربه در زمینه طراحی وب و برنامه‌نویسی فرانت‌اند است. ایشان بیش از ۱۰ سال تجربه تدریس و کار عملی در پروژه‌های مختلف دارند و تاکنون به بیش از ۵۰۰۰ دانشجو آموزش داده‌اند.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="curriculum" className="mt-0">
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">سرفصل‌های دوره</h2>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <FileText size={14} />
                  <span>{courseChapters.reduce((acc, chapter) => acc + chapter.lessons.length, 0)} جلسه</span>
                  <Separator orientation="vertical" className="mx-2 h-4" />
                  <Clock size={14} />
                  <span>{course.duration}</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {courseChapters.map((chapter) => (
                  <Card key={chapter.id} className="border shadow-sm overflow-hidden">
                    <CardHeader className="pb-3 bg-muted/30">
                      <div className="flex justify-between items-center">
                        <CardTitle>فصل {chapter.id}: {chapter.title}</CardTitle>
                        <CardDescription className="pt-0">
                          {chapter.lessons.length} جلسه
                        </CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="px-0 py-0 divide-y divide-border">
                      {chapter.lessons.map((lesson) => (
                        <div 
                          key={lesson.id} 
                          className={`flex items-center justify-between p-4 hover:bg-muted/50 transition-colors ${
                            lesson.completed ? 'bg-green-50/50 dark:bg-green-950/10' : ''
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              lesson.completed 
                                ? "bg-green-500 text-white" 
                                : "bg-muted"
                            }`}>
                              {lesson.completed ? (
                                <CheckCircle size={16} />
                              ) : (
                                <span className="text-sm">{lesson.id}</span>
                              )}
                            </div>
                            <div>
                              <p className={`font-medium ${lesson.completed ? "text-muted-foreground" : ""}`}>
                                {lesson.title}
                              </p>
                              {lesson.completed && (
                                <p className="text-xs text-green-600 dark:text-green-400">تکمیل شده</p>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                            <Button variant="ghost" size="icon" className="rounded-full">
                              <Play size={16} className="text-primary" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-0">
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-muted/30 p-6 rounded-xl border">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">{course.rating}</div>
                  <div className="flex justify-center mt-2">
                    <StarRating rating={Math.round(course.rating)} />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">از {courseReviews.length} نظر</p>
                </div>
                
                <div className="flex-1">
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const count = courseReviews.filter(r => r.rating === star).length;
                      const percentage = (count / courseReviews.length) * 100;
                      
                      return (
                        <div key={star} className="flex items-center gap-3">
                          <div className="flex items-center gap-1 w-12">
                            <span>{star}</span>
                            <Star size={14} className="text-yellow-400 fill-yellow-400" />
                          </div>
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-yellow-400" 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-muted-foreground w-10 text-left">
                            {count}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div>
                  <Button className="w-full md:w-auto gap-2">
                    <MessageSquare size={16} />
                    <span>ثبت نظر</span>
                  </Button>
                </div>
              </div>
              
              <div className="space-y-6">
                {courseReviews.map((review) => (
                  <Card key={review.id} className="border">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={review.avatar} alt={review.author} />
                            <AvatarFallback>{review.author.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{review.author}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <StarRating rating={review.rating} />
                              <span className="text-xs text-muted-foreground">
                                {review.date}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-muted-foreground">
                        {review.content}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
