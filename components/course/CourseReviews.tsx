'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star, ThumbsUp, MessageCircle, Send, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

// تعریف ساختار داده پاسخ به نظر
interface ReviewReply {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  isInstructor: boolean;
  date: string;
  content: string;
}

// تعریف ساختار داده نظر
interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  content: string;
  helpfulCount: number;
  replyCount: number;
  replies?: ReviewReply[];
}

// نظرات نمونه برای نمایش
const demoReviews: Review[] = [
  {
    id: 'r1',
    userId: 'u1',
    userName: 'علی محمدی',
    userAvatar: '/images/avatars/user1.jpg',
    rating: 5,
    date: '۱۴۰۳/۰۳/۱۵',
    content: 'این دوره فوق‌العاده بود! مفاهیم به صورت کاملاً واضح و با مثال‌های کاربردی توضیح داده شده بودند. مدرس هم تسلط بالایی داشت و به سوالات به خوبی پاسخ می‌داد.',
    helpfulCount: 24,
    replyCount: 1,
    replies: [
      {
        id: 'reply1',
        userId: 'instructor1',
        userName: 'محسن رضایی',
        userAvatar: '/images/avatars/instructor.jpg',
        isInstructor: true,
        date: '۱۴۰۳/۰۳/۱۶',
        content: 'سلام علی عزیز. ممنون از نظر مثبت شما. خوشحالم که دوره برایتان مفید بوده است. امیدوارم در ادامه مسیر یادگیری‌تان موفق باشید. اگر سوالی داشتید، حتما در بخش پرسش و پاسخ مطرح کنید.'
      }
    ]
  },
  {
    id: 'r2',
    userId: 'u2',
    userName: 'سارا رضایی',
    userAvatar: '/images/avatars/user2.jpg',
    rating: 4,
    date: '۱۴۰۳/۰۲/۲۲',
    content: 'محتوای دوره خوب بود و مطالب مفیدی یاد گرفتم. فقط قسمت‌های آخر کمی سرعت آموزش زیاد شد و باعث شد چند نکته را متوجه نشوم. در کل راضی بودم.',
    helpfulCount: 15,
    replyCount: 1,
    replies: [
      {
        id: 'reply2',
        userId: 'instructor1',
        userName: 'محسن رضایی',
        userAvatar: '/images/avatars/instructor.jpg',
        isInstructor: true,
        date: '۱۴۰۳/۰۲/۲۳',
        content: 'سلام سارا جان. ممنون از بازخورد ارزشمندتان. حق با شماست، در فصل‌های آخر سرعت کمی بیشتر شد. لطفاً بخش‌هایی که برایتان مبهم بوده را در انجمن دوره مطرح کنید تا توضیح بیشتری ارائه دهم. همچنین ویدیوهای تکمیلی برای آن بخش‌ها در حال آماده‌سازی است.'
      }
    ]
  },
  {
    id: 'r3',
    userId: 'u3',
    userName: 'محمد کریمی',
    userAvatar: '/images/avatars/user3.jpg',
    rating: 5,
    date: '۱۴۰۳/۰۲/۱۰',
    content: 'بهترین دوره‌ای که تا به حال دیدم! هر چیزی که برای شروع نیاز داشتم در این دوره به خوبی پوشش داده شده بود. پروژه‌های عملی هم بسیار کاربردی بودند.',
    helpfulCount: 32,
    replyCount: 0
  },
  {
    id: 'r4',
    userId: 'u4',
    userName: 'مریم حسینی',
    userAvatar: '/images/avatars/user4.jpg',
    rating: 3,
    date: '۱۴۰۳/۰۱/۰۵',
    content: 'دوره متوسطی بود. بعضی مباحث خیلی سریع رد شدند و نیاز به توضیح بیشتر داشتند. منابع تکمیلی خوبی معرفی شده بود ولی کاش چند پروژه عملی بیشتر داشت.',
    helpfulCount: 8,
    replyCount: 1,
    replies: [
      {
        id: 'reply4',
        userId: 'instructor1',
        userName: 'محسن رضایی',
        userAvatar: '/images/avatars/instructor.jpg',
        isInstructor: true,
        date: '۱۴۰۳/۰۱/۰۶',
        content: 'سلام مریم عزیز. از نظر صادقانه‌تان متشکرم. بازخوردهای شما برای بهبود دوره بسیار ارزشمند است. در به‌روزرسانی بعدی دوره، حتماً پروژه‌های عملی بیشتری اضافه خواهیم کرد و مباحثی که سریع گذشته شده‌اند را با جزئیات بیشتری توضیح خواهیم داد.'
      }
    ]
  },
  {
    id: 'r5',
    userId: 'u5',
    userName: 'رضا محمودی',
    userAvatar: '/images/avatars/user5.jpg',
    rating: 5,
    date: '۱۴۰۲/۱۲/۱۵',
    content: 'به نظرم هزینه دوره کاملاً ارزشش رو داشت. مدرس خیلی با حوصله توضیح می‌داد و به سوالات کامل پاسخ می‌داد. مطالب هم کاملاً کاربردی و به‌روز بودند.',
    helpfulCount: 19,
    replyCount: 0
  }
];

interface CourseReviewsProps {
  courseId: string;
  courseRating: number;
  reviewsCount?: number;
}

export default function CourseReviews({ courseId, courseRating, reviewsCount = 0 }: CourseReviewsProps) {
  const [sortBy, setSortBy] = useState<'newest' | 'helpful'>('newest');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReviewContent, setNewReviewContent] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [showReplies, setShowReplies] = useState<Record<string, boolean>>({});

  // تغییر وضعیت نمایش پاسخ‌ها برای یک نظر
  const toggleReplies = (reviewId: string) => {
    setShowReplies(prev => ({
      ...prev,
      [reviewId]: !prev[reviewId]
    }));
  };
  
  // استفاده از داده‌های نمونه به جای API
  const reviews = demoReviews;
  const totalReviews = reviewsCount > 0 ? reviewsCount : reviews.length;
  
  // مرتب‌سازی نظرات
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === 'helpful') {
      return b.helpfulCount - a.helpfulCount;
    }
    // به صورت پیش‌فرض بر اساس تاریخ مرتب می‌شود (جدیدترین ابتدا)
    return new Date(b.date.split('/').reverse().join('-')).getTime() - 
           new Date(a.date.split('/').reverse().join('-')).getTime();
  });
  
  // محاسبه تعداد هر امتیاز
  const ratingCounts = [5, 4, 3, 2, 1].map(rating => {
    const count = reviews.filter(review => review.rating === rating).length;
    const percentage = (count / reviews.length) * 100;
    return { rating, count, percentage };
  });

  // ارسال نظر جدید
  const handleSubmitReview = () => {
    if (!newReviewContent.trim()) return;
    
    // در یک پروژه واقعی، اینجا API فراخوانی می‌شود
    alert('نظر شما با موفقیت ثبت شد و پس از تایید نمایش داده خواهد شد.');
    
    // پاکسازی فرم
    setNewReviewContent('');
    setNewReviewRating(5);
    setShowReviewForm(false);
  };
  
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
      <h2 className="mb-6 text-xl font-bold">نظرات کاربران ({totalReviews})</h2>
      
      {/* خلاصه امتیازات */}
      <div className="mb-8 flex flex-col gap-6 rounded-lg bg-gray-50 p-6 dark:bg-gray-800/50 md:flex-row">
        {/* امتیاز کلی */}
        <div className="flex flex-1 flex-col items-center justify-center border-b border-gray-200 pb-6 dark:border-gray-700 md:border-b-0 md:border-l md:pb-0 md:pl-6">
          <div className="text-5xl font-bold text-gray-900 dark:text-white">{courseRating.toFixed(1)}</div>
          <div className="my-2 flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-5 w-5 ${
                  star <= Math.round(courseRating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'fill-gray-300 text-gray-300 dark:fill-gray-600 dark:text-gray-600'
                }`}
              />
            ))}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">از {totalReviews} نظر</div>
        </div>
        
        {/* نمودار امتیازات */}
        <div className="flex-2 w-full space-y-2">
          {ratingCounts.map(({ rating, count, percentage }) => (
            <div key={rating} className="flex items-center gap-2">
              <div className="w-12 text-sm font-medium">{rating} ستاره</div>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  className="h-full rounded-full bg-yellow-400"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <div className="w-10 text-right text-sm text-gray-600 dark:text-gray-400">{count}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* فرم ثبت نظر جدید */}
      <div className="mb-8">
        <button
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="mb-4 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-3 font-medium transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <Star className="h-4 w-4" />
          <span>{showReviewForm ? 'بستن فرم نظر' : 'ثبت نظر جدید'}</span>
          {showReviewForm ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        
        {showReviewForm && (
          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <h3 className="mb-4 text-lg font-bold">نظر خود را ثبت کنید</h3>
            
            {/* امتیازدهی */}
            <div className="mb-4">
              <p className="mb-2 text-sm font-medium">امتیاز شما:</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setNewReviewRating(rating)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-6 w-6 ${
                        rating <= newReviewRating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'fill-gray-300 text-gray-300 dark:fill-gray-600 dark:text-gray-600'
                      }`}
                    />
                  </button>
                ))}
                <span className="mr-2 text-sm text-gray-600 dark:text-gray-400">
                  ({newReviewRating} از 5)
                </span>
              </div>
            </div>
            
            {/* متن نظر */}
            <div className="mb-4">
              <p className="mb-2 text-sm font-medium">نظر شما:</p>
              <Textarea
                placeholder="نظر خود را در مورد این دوره بنویسید..."
                value={newReviewContent}
                onChange={(e) => setNewReviewContent(e.target.value)}
                rows={5}
                className="w-full resize-none"
              />
            </div>
            
            <div className="flex justify-end">
              <Button onClick={handleSubmitReview} className="gap-2">
                <Send className="h-4 w-4" />
                <span>ارسال نظر</span>
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {/* فقط مرتب‌سازی (فیلترها حذف شدند) */}
      <div className="mb-6 flex justify-end">
        <div className="flex items-center gap-2">
          <select
            className="rounded-md border border-gray-200 bg-white px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'newest' | 'helpful')}
          >
            <option value="newest">جدیدترین</option>
            <option value="helpful">مفیدترین</option>
          </select>
        </div>
      </div>
      
      {/* لیست نظرات */}
      <div className="space-y-6">
        {sortedReviews.length > 0 ? (
          sortedReviews.map((review) => (
            <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0 dark:border-gray-800">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full">
                    <Image
                      src={review.userAvatar}
                      alt={review.userName}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/avatars/default.jpg';
                      }}
                    />
                  </div>
                  <div>
                    <div className="font-medium">{review.userName}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{review.date}</div>
                  </div>
                </div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= review.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="mb-3 text-gray-700 dark:text-gray-300">
                {review.content}
              </div>
              
              <div className="mb-3 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <button className="flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-300">
                  <ThumbsUp className="h-4 w-4" />
                  <span>مفید ({review.helpfulCount})</span>
                </button>
                <button 
                  className="flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-300"
                  onClick={() => toggleReplies(review.id)}
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>
                    {review.replyCount > 0 
                      ? `پاسخ‌ها (${review.replyCount})` 
                      : 'پاسخ دادن'}
                  </span>
                  {review.replyCount > 0 && (
                    showReplies[review.id] ? 
                      <ChevronUp className="h-3 w-3" /> : 
                      <ChevronDown className="h-3 w-3" />
                  )}
                </button>
              </div>
              
              {/* پاسخ‌های هر نظر */}
              {review.replies && review.replies.length > 0 && showReplies[review.id] && (
                <div className="mr-10 mt-4 space-y-4">
                  {review.replies.map(reply => (
                    <div key={reply.id} className="rounded-lg border-r-2 border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
                      <div className="mb-2 flex items-center gap-3">
                        <div className="relative h-8 w-8 overflow-hidden rounded-full">
                          <Image
                            src={reply.userAvatar}
                            alt={reply.userName}
                            fill
                            className="object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/images/avatars/default.jpg';
                            }}
                          />
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <div className="font-medium">{reply.userName}</div>
                          {reply.isInstructor && (
                            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                              مدرس دوره
                            </span>
                          )}
                          <div className="text-xs text-gray-500 dark:text-gray-400">{reply.date}</div>
                        </div>
                      </div>
                      <div className="text-gray-700 dark:text-gray-300">
                        {reply.content}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* فرم پاسخ دادن */}
              {showReplies[review.id] && review.replies && (
                <div className="mr-10 mt-4">
                  <div className="flex gap-3">
                    <div className="relative h-8 w-8 overflow-hidden rounded-full">
                      <Image
                        src="/images/avatars/default.jpg"
                        alt="کاربر فعلی"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <Textarea
                        placeholder="پاسخ خود را بنویسید..."
                        rows={2}
                        className="mb-2 resize-none"
                      />
                      <Button size="sm">ارسال پاسخ</Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="rounded-lg bg-gray-50 p-8 text-center dark:bg-gray-800/50">
            <p className="text-gray-600 dark:text-gray-400">نظری یافت نشد.</p>
          </div>
        )}
      </div>
    </div>
  );
} 