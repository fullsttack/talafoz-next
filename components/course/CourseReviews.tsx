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

// نظرات نمونه برای نمایش - با تصاویر موجود
const demoReviews: Review[] = [
  {
    id: 'r1',
    userId: 'u1',
    userName: 'علی محمدی',
    userAvatar: '/next.svg',
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
        userAvatar: '/next.svg',
        isInstructor: true,
        date: '۱۴۰۳/۰۳/۱۶',
        content: 'سلام علی جان. خیلی ممنون از نظر مثبت شما. خوشحالم که تونستم مطالب رو به خوبی منتقل کنم. موفق باشید.'
      }
    ]
  },
  {
    id: 'r2',
    userId: 'u2',
    userName: 'زهرا کریمی',
    userAvatar: '/next.svg',
    rating: 4,
    date: '۱۴۰۳/۰۲/۲۰',
    content: 'دوره خوبی بود و مطالب به خوبی توضیح داده شدند. فقط کاش چند پروژه عملی بیشتر داشت که بتونیم مفاهیم رو بهتر تمرین کنیم.',
    helpfulCount: 18,
    replyCount: 1,
    replies: [
      {
        id: 'reply2',
        userId: 'instructor1',
        userName: 'محسن رضایی',
        userAvatar: '/next.svg',
        isInstructor: true,
        date: '۱۴۰۳/۰۲/۲۱',
        content: 'سلام زهرا عزیز. ممنون از بازخورد سازنده‌تان. در به‌روزرسانی بعدی دوره، حتماً چند پروژه عملی جدید اضافه خواهم کرد. موفق باشید.'
      }
    ]
  },
  {
    id: 'r3',
    userId: 'u3',
    userName: 'امیر حسینی',
    userAvatar: '/next.svg',
    rating: 5,
    date: '۱۴۰۳/۰۱/۱۰',
    content: 'من قبلاً از منابع مختلفی سعی کردم این موضوع رو یاد بگیرم ولی همیشه گیج می‌شدم. این دوره با توضیحات ساده و کاربردی کمک کرد مفاهیم رو کاملاً درک کنم. واقعاً ممنونم!',
    helpfulCount: 35,
    replyCount: 0
  },
  {
    id: 'r4',
    userId: 'u4',
    userName: 'مریم صادقی',
    userAvatar: '/next.svg',
    rating: 3,
    date: '۱۴۰۳/۰۱/۰۵',
    content: 'مطالب دوره خوب بودند اما در بعضی قسمت‌ها خیلی سریع از موضوعات گذشته شد. به نظرم برای مبتدی‌ها کمی سخت است. پروژه‌های بیشتری هم می‌تونست داشته باشه.',
    helpfulCount: 12,
    replyCount: 1,
    replies: [
      {
        id: 'reply4',
        userId: 'instructor1',
        userName: 'محسن رضایی',
        userAvatar: '/next.svg',
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
    userAvatar: '/next.svg',
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
  // State for storing reply content for each review
  const [replyContents, setReplyContents] = useState<Record<string, string>>({});
  // State to track which review has an active reply form
  const [activeReplyForm, setActiveReplyForm] = useState<string | null>(null);

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
  
  // محاسبه تعداد هر امتیاز
  const ratingCounts = [5, 4, 3, 2, 1].map(rating => {
    const count = reviews.filter(review => review.rating === rating).length;
    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
    
    return {
      rating,
      count,
      percentage
    };
  });
  
  // مرتب‌سازی نظرات
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === 'helpful') {
      return b.helpfulCount - a.helpfulCount;
    }
    
    // تبدیل تاریخ فارسی به مقداری که بتوان مقایسه کرد (ساده‌سازی شده)
    const dateA = a.date.split('/').reverse().join('');
    const dateB = b.date.split('/').reverse().join('');
    return dateB.localeCompare(dateA);
  });
  
  // ارسال نظر جدید
  const handleSubmitReview = () => {
    if (newReviewContent.trim() === '') return;
    
    console.log(`Submitting review for course ${courseId} with rating ${newReviewRating} and content: ${newReviewContent}`);
    
    // در حالت واقعی، اینجا یک API call انجام می‌شود
    // mockCreateReview(newReviewContent, newReviewRating);
    
    // پاک کردن فرم
    setNewReviewContent('');
    setNewReviewRating(5);
    setShowReviewForm(false);
  };
  
  const handleSubmitReply = (reviewId: string, replyContent: string) => {
    if (!replyContent.trim()) return;
    
    console.log(`Submitting reply to review ${reviewId} for course ${courseId} with content: ${replyContent}`);
    
    // در حالت واقعی، اینجا یک API call انجام می‌شود
    // mockAddReplyToReview(reviewId, replyContent);
    
    // آپدیت UI به صورت موقت تا زمان پیاده‌سازی API
    setShowReplies(prev => ({
      ...prev,
      [reviewId]: true // نمایش پاسخ‌ها بعد از ارسال پاسخ جدید
    }));
  };
  
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <h2 className="mb-6 text-xl font-bold">نظرات کاربران</h2>
      
      {/* خلاصه امتیازات */}
      <div className="mb-8 flex flex-col gap-6 md:flex-row">
        <div className="flex-1 space-y-2 border-b pb-4 md:border-b-0 md:border-l md:border-gray-200 md:pb-0 md:pl-6 md:dark:border-gray-700">
          {/* امتیاز کلی */}
          <div className="flex items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-2xl font-bold text-primary">
              {courseRating.toFixed(1)}
            </div>
            <div className="flex flex-col">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= Math.round(courseRating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700'
                    }`}
                  />
                ))}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">از {totalReviews} نظر</div>
            </div>
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
                            : 'fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700'
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
                <label htmlFor="review-content" className="mb-2 block text-sm font-medium">
                  نظر شما:
                </label>
                <Textarea
                  id="review-content"
                  value={newReviewContent}
                  onChange={(e) => setNewReviewContent(e.target.value)}
                  rows={4}
                  placeholder="نظر خود را درباره این دوره بنویسید..."
                  className="w-full resize-none rounded-lg border border-gray-200 p-3 dark:border-gray-700 dark:bg-gray-800"
                />
              </div>
              
              {/* دکمه ارسال */}
              <Button
                type="button"
                onClick={handleSubmitReview}
                disabled={newReviewContent.trim().length < 10}
                className="flex items-center gap-2"
              >
                <span>ثبت نظر</span>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* تب‌های مرتب‌سازی */}
      <div className="mb-6 flex gap-4 border-b border-gray-200 pb-2 dark:border-gray-700">
        <button
          onClick={() => setSortBy('newest')}
          className={`pb-2 text-sm font-medium ${
            sortBy === 'newest'
              ? 'border-b-2 border-primary text-primary'
              : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
          }`}
        >
          جدیدترین
        </button>
        <button
          onClick={() => setSortBy('helpful')}
          className={`pb-2 text-sm font-medium ${
            sortBy === 'helpful'
              ? 'border-b-2 border-primary text-primary'
              : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
          }`}
        >
          مفیدترین
        </button>
      </div>
      
      {/* لیست نظرات */}
      <div className="space-y-6">
        {sortedReviews.length > 0 ? (
          sortedReviews.map((review) => (
            <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0 dark:border-gray-800">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gray-200">
                    <Image
                      src={review.userAvatar}
                      alt={review.userName}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/next.svg';
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
                    {showReplies[review.id] ? 'بستن پاسخ‌ها' : `پاسخ‌ها (${review.replyCount})`}
                  </span>
                </button>
              </div>
              
              {/* نمایش پاسخ‌ها */}
              {showReplies[review.id] && (
                <div className="mr-4 mt-4 space-y-4 border-r border-gray-200 pr-4 dark:border-gray-700">
                  {review.replies && review.replies.length > 0 && review.replies.map((reply) => (
                    <div key={reply.id} className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
                      <div className="mb-2 flex items-center gap-3">
                        <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gray-200">
                          <Image
                            src={reply.userAvatar}
                            alt={reply.userName}
                            fill
                            className="object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/next.svg';
                            }}
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{reply.userName}</span>
                            {reply.isInstructor && (
                              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
                                مدرس
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{reply.date}</div>
                        </div>
                      </div>
                      <div className="text-gray-700 dark:text-gray-300">{reply.content}</div>
                    </div>
                  ))}
                  
                  {/* Reply form */}
                  {activeReplyForm === review.id ? (
                    <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
                      <textarea 
                        value={replyContents[review.id] || ''} 
                        onChange={(e) => setReplyContents(prev => ({
                          ...prev,
                          [review.id]: e.target.value
                        }))}
                        rows={3}
                        placeholder="پاسخ خود را بنویسید..."
                        className="mb-3 w-full resize-none rounded-lg border border-gray-200 p-3 dark:border-gray-700 dark:bg-gray-800"
                      />
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => setActiveReplyForm(null)}
                          className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                        >
                          انصراف
                        </button>
                        <button 
                          onClick={() => {
                            handleSubmitReply(review.id, replyContents[review.id] || '');
                            // Clear reply form after submission
                            setReplyContents(prev => ({
                              ...prev,
                              [review.id]: ''
                            }));
                            setActiveReplyForm(null);
                          }}
                          disabled={!replyContents[review.id]?.trim()}
                          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark disabled:bg-gray-300 dark:disabled:bg-gray-700"
                        >
                          ارسال پاسخ
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setActiveReplyForm(review.id)}
                      className="flex w-full items-center justify-center gap-1 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>پاسخ به این نظر</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="rounded-lg bg-gray-50 p-6 text-center dark:bg-gray-800/50">
            <p className="text-gray-600 dark:text-gray-400">هنوز نظری ثبت نشده است. اولین نفری باشید که نظر می‌دهید!</p>
          </div>
        )}
      </div>
    </div>
  );
} 