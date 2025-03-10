"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Calendar, CheckCircle2, Clock, CreditCard, Download, Flame, HeartIcon, Loader2, PlayCircle, Share2, Signal, Users } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCourse } from "@/contexts/CourseContext";
import CourseContentSection from "@/components/course/CourseContentSection";
import CourseInstructorSection from "@/components/course/CourseInstructorSection";
import CourseReviewsSection from "@/components/course/CourseReviewsSection";
import { CourseVideoPlayer } from "@/components/course/CourseVideoPlayer";
import { CourseVideoThumbnail } from "@/components/course/CourseVideoThumbnail";
import { CourseType, InstructorType } from "@/types/course";

// Import courses data from correct file
import { ALL_COURSES } from "../../../data/courses";

// Mock instructor data
const dummyInstructor: InstructorType = {
  id: 1,
  name: "علی محمدی",
  avatar: "/images/instructors/instructor-1.jpg",
  bio: "مدرس با بیش از ۱۰ سال تجربه در زمینه برنامه‌نویسی وب و موبایل. دارای سابقه تدریس در دانشگاه‌های معتبر و شرکت‌های بزرگ تکنولوژی.",
  role: "مدرس ارشد برنامه‌نویسی",
  courses: 12,
  students: 2500,
  rating: 4.8,
  socialLinks: {
    website: "https://example.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  }
};

// Mock reviews data
const dummyReviews = [
  {
    id: 1,
    userName: "رضا احمدی",
    userAvatar: "/images/avatars/user-1.jpg",
    rating: 5,
    date: "۱۴۰۲/۰۲/۱۵",
    content: "این دوره فوق‌العاده بود! من قبلاً هیچ تجربه‌ای در این زمینه نداشتم اما با توضیحات روان و پروژه‌های عملی استاد، خیلی سریع یاد گرفتم.",
    likes: 12,
    userLiked: false
  },
  {
    id: 2,
    userName: "مریم حسینی",
    userAvatar: "/images/avatars/user-2.jpg",
    rating: 4,
    date: "۱۴۰۲/۰۲/۱۰",
    content: "محتوای دوره بسیار کامل و جامع است. تنها مشکل کوچک، سرعت تدریس در برخی قسمت‌ها بود که کمی سریع بود.",
    likes: 5,
    userLiked: true
  },
  {
    id: 3,
    userName: "محمد کریمی",
    userAvatar: "/images/avatars/user-3.jpg",
    rating: 5,
    date: "۱۴۰۲/۰۱/۲۵",
    content: "بهترین دوره‌ای که تا به حال دیدم! پروژه‌های عملی و کاربردی بسیار مفید بودند.",
    likes: 8,
    userLiked: false
  }
];

export default function CourseDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const { setActiveCourse, courseProgress } = useCourse();
  const [course, setCourse] = useState<CourseType | null>(null);
  const [isPurchased, setIsPurchased] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);

  // کد ویدیوی یوتیوب برای پیش‌نمایش دوره
  const coursePreviewVideoId = "dQw4w9WgXcQ"; // این مقدار را با کد واقعی ویدیو جایگزین کنید

  // Fetch course data based on slug
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchCourse = async () => {
      setLoadingPage(true);
      try {
        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // For demo purposes, find the course from dummy data
        const foundCourse = ALL_COURSES.find((c: CourseType) => c.slug === slug);
        
        if (foundCourse) {
          setCourse(foundCourse);
          // Set active course in context
          setActiveCourse(foundCourse);
          
          // Check if user has purchased this course (could be from API)
          // For demo, randomly decide if purchased
          setIsPurchased(Math.random() > 0.5);
        }
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setLoadingPage(false);
      }
    };
    
    fetchCourse();
  }, [slug, setActiveCourse]);

  // Rating breakdown for reviews section
  const ratingBreakdown = {
    5: 75,
    4: 15,
    3: 7,
    2: 2,
    1: 1
  };

  // If loading or course not found
  if (loadingPage || !course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">در حال بارگذاری دوره...</p>
      </div>
    );
  }
  
  const handlePurchase = () => {
    alert("در حال انتقال به درگاه پرداخت...");
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("لینک دوره کپی شد. می‌توانید آن را به اشتراک بگذارید.");
  };
  
  // Hard-coded price for demonstration (replace this with dynamic data in real app)
  const originalPrice = "۱,۲۰۰,۰۰۰";
  const discountedPrice = "۹۶۰,۰۰۰";
  
  return (
    <div className="flex flex-col">
      {/* Back Button */}
      <div className="mb-6">
        <Link href="/courses">
          <Button variant="ghost" className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            <span>بازگشت به دوره‌ها</span>
          </Button>
        </Link>
      </div>
      
      {/* Hero Section - Course Image and Price Card Side by Side */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Course Image - Takes 2/3 of the width on desktop */}
          <div className="md:col-span-2">
            {/* از کامپوننت تامبنیل ویدیو استفاده می‌کنیم */}
            <CourseVideoThumbnail 
              course={course} 
              onClick={() => setShowVideoPlayer(true)} 
            />
          </div>
          
          {/* Price Card - Takes 1/3 of the width on desktop */}
          <div>
            {/* Course Price Card */}
            <Card className="border border-muted h-full">
              <CardContent className="p-5 flex flex-col justify-between h-full">
                {/* Course Title */}
                <div className="mb-4">
                  <h2 className="text-xl font-bold mb-2">{course.title}</h2>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Signal className="h-4 w-4 text-muted-foreground" />
                      <span>{course.level}</span>
                    </div>
                  </div>
                </div>
                
                {/* Completely Redesigned Price Section */}
                <div className="mb-6">
                  {/* Price Box with Favorite Button */}
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-gray-700">قیمت دوره:</h3>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className={isFavorite ? "text-red-500" : "text-muted-foreground"}
                      onClick={() => setIsFavorite(!isFavorite)}
                    >
                      <HeartIcon className={`h-5 w-5 ${isFavorite ? "fill-red-500" : ""}`} />
                    </Button>
                  </div>
                  
                  {/* Price Display */}
                  {course.discount > 0 ? (
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <div className="inline-flex items-center">
                            <span className="text-3xl font-bold text-primary">
                              {discountedPrice}
                            </span>
                            <span className="mr-1 text-primary font-medium">تومان</span>
                          </div>
                          
                          <div className="flex items-center gap-2 mt-2">
                            <span className="line-through text-muted-foreground">
                              {originalPrice} تومان
                            </span>
                          </div>
                        </div>
                        
                        <div className="bg-primary text-white py-1 px-3 rounded-full text-sm font-bold">
                          {course.discount}% تخفیف
                        </div>
                      </div>
                      
                      <div className="mt-3 bg-orange-50 border border-orange-200 p-2 rounded-md flex items-center gap-2">
                        <Clock className="h-4 w-4 text-orange-500" />
                        <span className="text-orange-700 text-sm font-medium">
                          فقط تا ۲ روز دیگر فرصت استفاده از این تخفیف را دارید
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                      <div className="flex items-center">
                        <span className="text-3xl font-bold text-primary">
                          {originalPrice}
                        </span>
                        <span className="mr-1 text-primary font-medium">تومان</span>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Action Buttons */}
                <div className="space-y-3">
                  {isPurchased ? (
                    <>
                      <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
                        <PlayCircle className="ml-2 h-5 w-5" />
                        ادامه یادگیری
                      </Button>
                      
                      {courseProgress && (
                        <div className="space-y-2 mt-3">
                          <div className="flex justify-between text-sm">
                            <span>پیشرفت شما</span>
                            <span className="font-medium">{courseProgress.progress}%</span>
                          </div>
                          <Progress value={courseProgress.progress} className="h-2" />
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <Button className="w-full bg-primary hover:bg-primary/90" size="lg" onClick={handlePurchase}>
                        <CreditCard className="ml-2 h-5 w-5" />
                        ثبت‌نام در دوره
                      </Button>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1" onClick={handleShare}>
                          <Share2 className="ml-2 h-4 w-4" />
                          اشتراک‌گذاری
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <Download className="ml-2 h-4 w-4" />
                          دانلود سرفصل‌ها
                        </Button>
                      </div>
                    </>
                  )}
                </div>
                
                {/* Course Features */}
                <div className="border-t border-muted pt-4 mt-4">
                  <h3 className="font-medium mb-2 text-sm">این دوره شامل:</h3>
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>دسترسی مادام‌العمر به محتوای دوره</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>گواهی‌نامه معتبر پایان دوره</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>۳۰ روز گارانتی بازگشت وجه</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* نمایش کامپوننت ویدیو پلیر در صورت کلیک روی دکمه پخش */}
      {showVideoPlayer && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute -top-12 right-0 text-white hover:bg-white/20"
              onClick={() => setShowVideoPlayer(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </Button>
            
            <CourseVideoPlayer
              src={`https://www.youtube.com/watch?v=${coursePreviewVideoId}`}
              title={course.title}
              poster={course.image}
              allowDownload={false}
              onComplete={() => {
                console.log("Video completed");
                setShowVideoPlayer(false);
              }}
            />
          </div>
        </div>
      )}
      
      {/* Course Meta Info Bar */}
      <div className="flex flex-wrap items-center gap-3 mb-8 bg-muted/30 p-4 rounded-lg">
        <div className="flex items-center gap-1">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <Image 
              src={dummyInstructor.avatar} 
              alt={course.instructor} 
              width={32} 
              height={32} 
            />
          </div>
          <span className="text-sm font-medium">{course.instructor}</span>
        </div>
        
        <span className="text-muted-foreground">|</span>
        
        <div className="flex items-center gap-1">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{course.students} دانشجو</span>
        </div>
        
        <span className="text-muted-foreground">|</span>
        
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">آخرین بروزرسانی: ۱۴۰۲/۰۳/۱۵</span>
        </div>
        
        <span className="text-muted-foreground">|</span>
        
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{course.duration}</span>
        </div>
        
        <span className="text-muted-foreground">|</span>
        
        <div className="flex items-center gap-1">
          <Signal className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">سطح: {course.level}</span>
        </div>
        
        {course.isTrending && (
          <>
            <span className="text-muted-foreground">|</span>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Flame className="h-3 w-3 text-red-500" />
              <span>پرطرفدار</span>
            </Badge>
          </>
        )}
      </div>
      
      {/* Course Tags */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-sm font-medium ml-2">برچسب‌ها:</h3>
          {course.tags.map(tag => (
            <Badge key={tag} variant="outline" className="rounded-full px-3 py-1">{tag}</Badge>
          ))}
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto mb-10">
        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="overview">معرفی دوره</TabsTrigger>
            <TabsTrigger value="content">محتوای دوره</TabsTrigger>
            <TabsTrigger value="instructor">مدرس</TabsTrigger>
            <TabsTrigger value="reviews">نظرات</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6 space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
              <p className="text-muted-foreground leading-7">{course.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">چه چیزهایی یاد می‌گیرید</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-1" />
                      <span className="text-sm">مفاهیم پایه و پیشرفته در این حوزه</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-1" />
                      <span className="text-sm">کار با ابزارهای حرفه‌ای مورد استفاده در صنعت</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-1" />
                      <span className="text-sm">ساخت پروژه‌های واقعی و کاربردی</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-1" />
                      <span className="text-sm">بهترین روش‌های برنامه‌نویسی تمیز و اصولی</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">پیش‌نیازهای دوره</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-1" />
                      <span className="text-sm">آشنایی با مفاهیم پایه کامپیوتر</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-1" />
                      <span className="text-sm">دسترسی به کامپیوتر با سیستم‌عامل ویندوز، مک یا لینوکس</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-1" />
                      <span className="text-sm">اشتیاق برای یادگیری مفاهیم جدید</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="content" className="mt-6">
            <CourseContentSection isPurchased={isPurchased} />
          </TabsContent>
          
          <TabsContent value="instructor" className="mt-6">
            <CourseInstructorSection instructor={dummyInstructor} />
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <CourseReviewsSection 
              courseId={course.id}
              overallRating={course.rating}
              totalReviews={dummyReviews.length}
              ratingBreakdown={ratingBreakdown}
              reviews={dummyReviews}
              isPurchased={isPurchased}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
