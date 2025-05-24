'use client';

import React, { useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { courses } from '@/data/course';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import {
  ArrowRight,
  Clock,
  FileVideo2,
  Users,
  Award,
  Play,
  Lock,
  ShoppingCart,
  Check,
  Star,
  Download,
  Calendar,
  Globe,
  Zap,
  Heart,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

// نوع Episode
interface Episode {
  id: number;
  title: string;
  duration: string;
  isPreview: boolean;
  isCompleted?: boolean;
}

// نوع Section
interface Section {
  id: number;
  title: string;
  episodes: Episode[];
}

// داده‌های نمونه برای قسمت‌ها و جلسات
const courseSections: Section[] = [
  {
    id: 1,
    title: 'مقدمه و آشنایی',
    episodes: [
      { id: 1, title: 'معرفی دوره و پیش‌نیازها', duration: '05:23', isPreview: true },
      { id: 2, title: 'نصب و راه‌اندازی محیط توسعه', duration: '12:45', isPreview: true },
      { id: 3, title: 'ساختار پروژه', duration: '08:30', isPreview: false },
    ],
  },
  {
    id: 2,
    title: 'مفاهیم پایه',
    episodes: [
      { id: 4, title: 'Components در React', duration: '15:20', isPreview: false },
      { id: 5, title: 'Props و State', duration: '18:40', isPreview: false },
      { id: 6, title: 'Life Cycle Methods', duration: '22:15', isPreview: false },
    ],
  },
  {
    id: 3,
    title: 'مباحث پیشرفته',
    episodes: [
      { id: 7, title: 'React Hooks', duration: '25:30', isPreview: false },
      { id: 8, title: 'Context API', duration: '20:10', isPreview: false },
      { id: 9, title: 'Performance Optimization', duration: '30:00', isPreview: false },
    ],
  },
];

// نظرات نمونه
const sampleReviews = [
  {
    id: 1,
    user: 'علی احمدی',
    avatar: '/avatars/user1.jpg',
    rating: 5,
    date: '۲ هفته پیش',
    comment: 'دوره فوق‌العاده‌ای بود. مدرس با حوصله تمام مفاهیم را توضیح می‌دهد.',
  },
  {
    id: 2,
    user: 'سارا محمدی',
    avatar: '/avatars/user2.jpg',
    rating: 4,
    date: '۱ ماه پیش',
    comment: 'محتوای دوره عالی بود اما کاش تمرین‌های بیشتری داشت.',
  },
];

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const { addToCart, isInCart } = useCart();
  const [activeTab, setActiveTab] = useState('overview');

  // پیدا کردن دوره
  const courseId = parseInt(params.id as string);
  const course = courses.find(c => c.id === courseId);

  const inCart = course ? isInCart(course.id) : false;
  const hasAccess = user && course?.isFree; // فرض: دوره‌های رایگان با لاگین قابل دسترسی هستند

  const handleAddToCart = useCallback(() => {
    if (course && !inCart) {
      addToCart({
        id: course.id,
        title: course.title,
        instructor: course.instructor,
        price: course.isFree ? 'رایگان' : course.price,
        image: course.image,
        isFree: course.isFree,
      });
    }
  }, [addToCart, course, inCart]);

  if (!course) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">دوره مورد نظر یافت نشد</h1>
        <Button onClick={() => router.push('/courses')}>
          <ArrowRight className="ml-2 h-4 w-4" />
          بازگشت به لیست دوره‌ها
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <div className="">
        <div className="container mx-auto px-4 md:px-12 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary">خانه</Link>
            <span>/</span>
            <Link href="/courses" className="hover:text-primary">دوره‌ها</Link>
            <span>/</span>
            <span className="text-foreground">{course.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
              <p className="text-lg text-muted-foreground mb-6">{course.description}</p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-sm">۲,۵۰۰ دانشجو</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="text-sm">{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileVideo2 className="h-5 w-5 text-primary" />
                  <span className="text-sm">{course.episodes} جلسه</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="text-sm">۴.۸ (۳۲۰ نظر)</span>
                </div>
              </div>

              

              {/* Video Preview */}
              <div className="mb-8 overflow-hidden">
                <div className="relative aspect-video bg-muted">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <Button size="lg" className="gap-2 bg-white text-black hover:bg-white/80 cursor-pointer">
                      <Play className="h-5 w-5" />
                      مشاهده پیش‌ نمایش
                    </Button>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">نمای کلی</TabsTrigger>
                  <TabsTrigger value="curriculum">سرفصل‌ها</TabsTrigger>
                  <TabsTrigger value="reviews">نظرات</TabsTrigger>
                  <TabsTrigger value="faq">سوالات</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>درباره این دوره</CardTitle>
                    </CardHeader>
                    <CardContent className="prose dark:prose-invert max-w-none">
                      <p>{course.description}</p>
                      <h3>چه چیزی یاد خواهید گرفت:</h3>
                      <ul>
                        <li>مفاهیم پایه و پیشرفته React</li>
                        <li>ساخت اپلیکیشن‌های واقعی</li>
                        <li>بهترین شیوه‌های کدنویسی</li>
                        <li>مدیریت State و Performance</li>
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="curriculum" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>سرفصل‌های دوره</CardTitle>
                      <CardDescription>
                        {course.episodes} جلسه - {course.duration}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        {courseSections.map((section) => (
                          <AccordionItem key={section.id} value={`section-${section.id}`}>
                            <AccordionTrigger className="text-right">
                              <div className="flex items-center justify-between w-full">
                                <span className="font-medium">{section.title}</span>
                                <span className="text-sm text-muted-foreground ml-4">
                                  {section.episodes.length} جلسه
                                </span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-2">
                                {section.episodes.map((episode) => (
                                  <div
                                    key={episode.id}
                                    className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                                  >
                                    <div className="flex items-center gap-3">
                                      {episode.isPreview || hasAccess ? (
                                        <Play className="h-4 w-4 text-primary" />
                                      ) : (
                                        <Lock className="h-4 w-4 text-muted-foreground" />
                                      )}
                                      <span className="text-sm">{episode.title}</span>
                                      {episode.isPreview && (
                                        <Badge variant="secondary" className="text-xs">
                                          پیش‌نمایش
                                        </Badge>
                                      )}
                                    </div>
                                    <span className="text-sm text-muted-foreground">
                                      {episode.duration}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="reviews" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>نظرات دانشجویان</CardTitle>
                      <CardDescription>
                        میانگین امتیاز ۴.۸ از ۵ (۳۲۰ نظر)
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {sampleReviews.map((review) => (
                          <div key={review.id} className="border-b pb-6 last:border-0">
                            <div className="flex items-start gap-4">
                              <Avatar>
                                <AvatarImage src={review.avatar} />
                                <AvatarFallback>{review.user[0]}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-medium">{review.user}</h4>
                                  <span className="text-sm text-muted-foreground">
                                    {review.date}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1 mb-2">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < review.rating
                                          ? 'text-yellow-500 fill-current'
                                          : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                </div>
                                <p className="text-sm">{review.comment}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="faq" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>سوالات متداول</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                          <AccordionTrigger>آیا این دوره نیاز به پیش‌نیاز دارد؟</AccordionTrigger>
                          <AccordionContent>
                            خیر، این دوره از صفر شروع می‌شود و نیازی به دانش قبلی ندارید.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                          <AccordionTrigger>مدت زمان دسترسی به دوره چقدر است؟</AccordionTrigger>
                          <AccordionContent>
                            دسترسی به دوره مادام‌العمر است و می‌توانید هر زمان که خواستید به محتوا دسترسی داشته باشید.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                          <AccordionTrigger>آیا گواهینامه صادر می‌شود؟</AccordionTrigger>
                          <AccordionContent>
                            بله، پس از اتمام دوره و انجام تمرین‌ها، گواهینامه معتبر دریافت خواهید کرد.
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardContent className="p-6">
                  {/* Price Section */}
                  <div className="mb-6">
                    {course.isFree ? (
                      <div className="text-center">
                        <Badge variant="outline" className="text-lg px-4 py-2 border-none">
                          مشاهده این دوره رایگان است
                          <Heart size={24} className="ml-2 text-base-1" />
                        </Badge>
                      </div>
                    ) : (
                      <>
                        <div className="text-3xl font-bold text-primary text-center mb-2">
                          {course.price}
                        </div>
                        
                      </>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3 mb-6">
                    {hasAccess ? (
                      <Button className="w-full" size="lg">
                        <Play className="ml-2 h-5 w-5" />
                        ادامه یادگیری
                      </Button>
                    ) : course.isFree ? (
                      <Button className="w-full" size="lg">
                        <Play className="ml-2 h-5 w-5" />
                        شروع یادگیری رایگان
                      </Button>
                    ) : (
                      <>
                        <Button
                          className="w-full"
                          size="lg"
                          onClick={handleAddToCart}
                          disabled={inCart}
                          variant={inCart ? "secondary" : "default"}
                        >
                          {inCart ? (
                            <>
                              <Check className="ml-2 h-5 w-5" />
                              در سبد خرید
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="ml-2 h-5 w-5" />
                              افزودن به سبد خرید
                            </>
                          )}
                        </Button>
                        {inCart && (
                          <Button className="w-full" variant="outline" size="lg" asChild>
                            <Link href="/cart">
                              مشاهده سبد خرید
                            </Link>
                          </Button>
                        )}
                      </>
                    )}
                  </div>

                  {/* Course Features */}
                  <Separator className="mb-6" />
                  <div className="space-y-4">
                    <h3 className="font-semibold mb-3">ویژگی‌های دوره</h3>
                    <div className="flex items-center gap-3">
                      <Award className="h-5 w-5 text-primary" />
                      <span className="text-sm">گواهینامه پایان دوره</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Zap className="h-5 w-5 text-primary" />
                      <span className="text-sm">دسترسی مادام‌العمر</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Download className="h-5 w-5 text-primary" />
                      <span className="text-sm">دانلود ویدیوها</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-primary" />
                      <span className="text-sm">پشتیبانی آنلاین</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-primary" />
                      <span className="text-sm">به‌روزرسانی مداوم</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Related Courses */}
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-lg">دوره‌های مرتبط</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {courses.slice(0, 3).filter(c => c.id !== course.id).map((relatedCourse) => (
                      <Link
                        key={relatedCourse.id}
                        href={`/courses/${relatedCourse.id}`}
                        className="flex gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
                      >
                        <Image
                          src={relatedCourse.image}
                          alt={relatedCourse.title}
                          width={60}
                          height={40}
                          className="rounded object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium line-clamp-1">
                            {relatedCourse.title}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {relatedCourse.instructor}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Instructor */}
              <Card className="mt-4">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="/avatars/instructor.jpg" />
                      <AvatarFallback>{course.instructor[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">مدرس: {course.instructor}</h3>
                      <p className="text-sm text-muted-foreground">مدرس برنامه‌نویسی با ۱۰ سال سابقه</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}