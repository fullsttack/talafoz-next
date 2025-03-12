"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Lock,
  Play,
  Check,
  ChevronDown,
  Clock,
  BookOpen,
  ArrowLeft,
  FileText,
  Paperclip,
  MessageSquare,
  PenLine,
} from "lucide-react";
import { Course, Episode, Chapter } from "@/components/data/course";
import CourseEpisodePlayer from "@/components/course/CourseEpisodePlayer";
import EpisodeNotes from "@/components/episode/EpisodeNotes";
import EpisodeAssignments from "@/components/episode/EpisodeAssignments";
import EpisodeAttachments from "@/components/episode/EpisodeAttachments";
import EpisodeComments from "@/components/episode/EpisodeComments";
import { useRouter } from "next/navigation";

interface CourseEpisodePageProps {
  course: Course;
  episode: Episode;
  chapter: Chapter;
}

export default function CourseEpisodePage({
  course,
  episode,
  chapter,
}: CourseEpisodePageProps) {
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [hasPurchasedCourse, setHasPurchasedCourse] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<string | null>(
    null
  );
  const [currentPlayerTime, setCurrentPlayerTime] = useState(0);
  const [expandedChapters, setExpandedChapters] = useState<
    Record<string, boolean>
  >({});
  const [activeTab, setActiveTab] = useState<
    "chapters" | "notes" | "assignments" | "attachments" | "comments"
  >("chapters");
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  const [completionTimerProgress, setCompletionTimerProgress] = useState(0);
  const [isVideoEnded, setIsVideoEnded] = useState(false);

  const router = useRouter();
  const completionTimerRef = useRef<NodeJS.Timeout | null>(null);

  // مدیریت پیشرفت تماشای اپیزودها - با مقادیر ثابت به جای تصادفی
  const [watchedProgress, setWatchedProgress] = useState<
    Record<string, number>
  >(() => {
    // ساخت مقادیر ثابت برای نمایش (در پروژه واقعی از API دریافت می‌شود)
    const progress: Record<string, number> = {};
    if (course.chapters) {
      course.chapters.forEach((chapter) => {
        chapter.episodes.forEach((ep, index) => {
          // ایجاد مقادیر ثابت بر اساس شماره ایندکس
          if (index % 4 === 0) progress[ep.id] = 100; // اپیزود کامل شده
          else if (index % 4 === 1) progress[ep.id] = 65; // پیشرفت متوسط
          else if (index % 4 === 2) progress[ep.id] = 25; // پیشرفت کم
          else progress[ep.id] = 0; // بدون پیشرفت
        });
      });
    }

    // اپیزود فعلی را به صورت ثابت تنظیم می‌کنیم
    if (!progress[episode.id]) {
      // اگر اپیزود فعلی قبلاً تنظیم نشده باشد، مقدار ثابت 40% می‌گذاریم
      progress[episode.id] = 40;
    }

    return progress;
  });

  // لیست اپیزودهایی که به طور کامل دیده شده‌اند
  const [completedEpisodes, setCompletedEpisodes] = useState<string[]>(() => {
    const completed: string[] = [];
    // اپیزودهایی که پیشرفت 95% یا بیشتر دارند را به عنوان تکمیل شده علامت‌گذاری می‌کنیم
    Object.entries(watchedProgress).forEach(([epId, progress]) => {
      if (progress >= 95) {
        completed.push(epId);
      }
    });
    return completed;
  });

  // توسعه/بستن فصل‌ها
  const toggleChapter = (chapterId: string) => {
    setExpandedChapters((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  // مدیریت پیشرفت ویدیو
  const handleVideoProgress = (
    progressPercent: number,
    currentTime?: number
  ) => {
    setWatchedProgress((prev) => ({
      ...prev,
      [episode.id]: progressPercent,
    }));

    // ذخیره موقعیت فعلی ویدیو
    if (currentTime !== undefined) {
      setCurrentPlayerTime(currentTime);
    }

    // تغییر وضعیت تکمیل اپیزود
    if (progressPercent >= 95) {
      setCompletedEpisodes((prev) => {
        if (!prev.includes(episode.id)) {
          return [...prev, episode.id];
        }
        return prev;
      });

      // نمایش دیالوگ اتمام ویدیو (فقط اگر ویدیو به پایان رسیده باشد)
      if (progressPercent >= 99.5 && !isVideoEnded) {
        setIsVideoEnded(true);
        setShowCompletionDialog(true);
        startCompletionTimer();
      }
    }
  };

  // شروع تایمر برای رفتن به قسمت بعدی
  const startCompletionTimer = () => {
    // پاکسازی تایمر قبلی
    if (completionTimerRef.current) {
      clearInterval(completionTimerRef.current);
    }

    setCompletionTimerProgress(0);
    // نمایش امتیاز با تاخیر برای ایجاد افکت - حذف شده چون دیگر نیازی نیست
    // setTimeout(() => {
    //   setShowEarnedPoints(true);
    // }, 1000);

    const startTime = Date.now();
    const duration = 10000; // 10 ثانیه

    completionTimerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / duration) * 100, 100);
      setCompletionTimerProgress(progress);

      if (progress >= 100) {
        clearInterval(completionTimerRef.current!);
        navigateToNextEpisode();
      }
    }, 50);
  };

  // لغو تایمر انتقال به قسمت بعد
  const cancelCompletionTimer = () => {
    if (completionTimerRef.current) {
      clearInterval(completionTimerRef.current);
      completionTimerRef.current = null;
    }
    setShowCompletionDialog(false);
  };

  // پیدا کردن و انتقال به قسمت بعدی
  const navigateToNextEpisode = () => {
    const currentEpisodeIndex = chapter.episodes.findIndex(
      (ep) => ep.id === episode.id
    );

    // اگر اپیزود بعدی در این فصل وجود داشت
    if (currentEpisodeIndex < chapter.episodes.length - 1) {
      const nextEpisode = chapter.episodes[currentEpisodeIndex + 1];
      router.push(`/courses/${course.id}/episodes/${nextEpisode.id}`);
      return;
    }

    // اگر فصل بعدی وجود داشت
    if (!course.chapters) {
      setShowSuccessMessage("شما به پایان دوره رسیدید!");
      setShowCompletionDialog(false);
      return;
    }

    const currentChapterIndex = course.chapters.findIndex(
      (ch) => ch.id === chapter.id
    );
    if (currentChapterIndex < course.chapters.length - 1) {
      const nextChapter = course.chapters[currentChapterIndex + 1];
      if (nextChapter.episodes && nextChapter.episodes.length > 0) {
        router.push(
          `/courses/${course.id}/episodes/${nextChapter.episodes[0].id}`
        );
        return;
      }
    }

    // اگر اپیزود بعدی وجود نداشت
    setShowSuccessMessage("شما به پایان دوره رسیدید!");
    setShowCompletionDialog(false);
  };

  // پاکسازی تایمر هنگام خروج از کامپوننت
  useEffect(() => {
    return () => {
      if (completionTimerRef.current) {
        clearInterval(completionTimerRef.current);
      }
    };
  }, []);

  // تغییر وضعیت کاربر به عضو ویژه
  const togglePremiumStatus = () => {
    setIsPremiumUser((prev) => {
      const newStatus = !prev;
      if (newStatus) {
        setShowSuccessMessage("عضویت ویژه با موفقیت فعال شد");
      }
      return newStatus;
    });
  };

  // تغییر وضعیت خرید دوره
  const togglePurchaseStatus = () => {
    setHasPurchasedCourse((prev) => {
      const newStatus = !prev;
      if (newStatus) {
        setShowSuccessMessage("دوره با موفقیت خریداری شد");
      }
      return newStatus;
    });
  };

  // بررسی دسترسی کاربر به محتوا
  const hasAccess =
    episode.isFree ||
    hasPurchasedCourse ||
    (isPremiumUser && course.isFreePremium);

  // نمایش فصل فعلی به صورت باز
  useEffect(() => {
    if (chapter) {
      setExpandedChapters((prev) => ({
        ...prev,
        [chapter.id]: true,
      }));
    }
  }, [chapter]);

  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);

  // آرایه تب‌ها برای نمایش در ساید‌بار
  const tabs = [
    { id: "chapters", label: "فصل‌ها", icon: <BookOpen className="h-5 w-5" /> },
    { id: "notes", label: "یادداشت‌ها", icon: <PenLine className="h-5 w-5" /> },
    {
      id: "assignments",
      label: "تمرین‌ها",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      id: "attachments",
      label: "ضمیمه",
      icon: <Paperclip className="h-5 w-5" />,
    },
    {
      id: "comments",
      label: "نظرات",
      icon: <MessageSquare className="h-5 w-5" />,
    },
  ];

  // تغییر تب با بررسی دسترسی
  const handleTabChange = (
    tabId: "chapters" | "notes" | "assignments" | "attachments" | "comments"
  ) => {
    // تب فصل‌ها همیشه قابل دسترس است
    if (tabId === "chapters") {
      setActiveTab(tabId);
      return;
    }

    // بررسی دسترسی به تب‌های دیگر
    if (!hasAccess) {
      // نمایش پیام عدم دسترسی
      setShowSuccessMessage("برای دسترسی به این بخش باید دوره را خریداری کنید");
    } else {
      // تغییر تب در صورت دسترسی
      setActiveTab(tabId);
    }
  };

  return (
    <div className="h-screen w-full overflow-hidden ">
      {/* پیام توست */}
      {showSuccessMessage && (
        <div
          className={`fixed top-16 right-2 z-50 animate-fade-in rounded-lg p-4 text-center shadow-lg w-[90%] sm:w-[400px] max-w-md
          ${
            showSuccessMessage.includes("دسترسی") ||
            showSuccessMessage.includes("خریداری کنید")
              ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800/40"
              : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800/40"
          }`}
        >
          {showSuccessMessage}
        </div>
      )}

      {/* لینک بازگشت به صفحه دوره در موبایل */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Link
          href={`/courses/${course.id}`}
          className="flex h-10 w-10 items-center justify-center rounded-full  backdrop-blur-md "
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
      </div>

      <div className="h-screen w-full flex overflow-hidden ">
        {/* بخش ویدیو پلیر - سمت راست */}
        <div className="flex-1 h-full overflow-hidden flex flex-col">
          {/* هدر کوچک در بالای ویدیو پلیر - فقط در نمایش دسکتاپ */}
          <div className="hidden md:flex items-center justify-between py-3.5 px-4  border-b ">
            {/* بخش سمت راست - بازگشت، عنوان و اطلاعات اپیزود */}
            <div className="flex items-center gap-3">
              <Link
                href={`/courses/${course.id}`}
                className="flex items-center gap-2 text-white bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded-lg transition-all shadow-sm"
                title="بازگشت به صفحه دوره"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm font-medium">بازگشت به دوره</span>
              </Link>

              <div className="h-4 w-px "></div>

              <div className="flex items-center gap-2">
                <h2 className="text-sm font-medium line-clamp-1  max-w-[300px]">
                  {episode.title}
                </h2>
                <div className="flex items-center text-gray-400 gap-1 text-xs">
                  <Clock className="h-3 w-3" />
                  <span>{episode.duration || "۲۵:۳۰"}</span>
                </div>
              </div>

              <div className="hidden lg:flex items-center gap-2 text-xs ">
                <div className="h-4 w-px  mx-1"></div>
                <span>
                  فصل {(chapter as { index?: string | number }).index || "1"}
                </span>
                <span>•</span>
                <span>
                  قسمت {(episode as { index?: string | number }).index || "1"}/
                  {chapter.episodes.length}
                </span>
              </div>
            </div>

            
          </div>

          {/* ویدیو پلیر */}
          <div className="flex-1 flex bg-black overflow-hidden relative">
            {hasAccess ? (
              <>
                <CourseEpisodePlayer
                  episode={episode}
                  onProgressChange={handleVideoProgress}
                  initialProgress={watchedProgress[episode.id] || 0}
                />

                {/* دیالوگ اتمام ویدیو */}
                {showCompletionDialog && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-30 backdrop-blur-sm">
                    <div className="w-full max-w-md bg-background p-6 rounded-xl border shadow-md animate-fade-in">
                      {/* تایمر دایره‌ای ساده */}
                      <div className="flex justify-center mb-5">
                        <div className="w-16 h-16 relative">
                          <svg
                            className="w-16 h-16 transform -rotate-90"
                            viewBox="0 0 100 100"
                          >
                            <circle
                              cx="50"
                              cy="50"
                              r="44"
                              className="stroke-muted fill-none"
                              strokeWidth="10"
                            />
                            <circle
                              cx="50"
                              cy="50"
                              r="44"
                              className="stroke-green-500 fill-none"
                              strokeWidth="10"
                              strokeDasharray="276"
                              strokeDashoffset={
                                276 - (276 * completionTimerProgress) / 100
                              }
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xl font-bold">
                              {Math.ceil(10 - completionTimerProgress / 10)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* پیام تبریک */}
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-bold mb-2">تبریک!</h3>
                        <p className="text-muted-foreground">این قسمت با موفقیت تکمیل شد</p>
                      </div>

                      {/* امتیاز */}
                      <div className="border rounded-lg p-4 mb-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                              <span className="text-green-500 font-bold">+۱۰</span>
                            </div>
                            <div>
                              <p className="font-medium">امتیاز کسب شده</p>
                              <p className="text-xs text-muted-foreground">از تکمیل این قسمت</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm">امتیاز کل</p>
                            <p className="font-bold">۱۲۰ / ۵۰۰</p>
                          </div>
                        </div>
                        
                        <div className="h-1.5 bg-muted rounded-full">
                          <div className="h-full bg-green-500 rounded-full w-[24%]"></div>
                        </div>
                      </div>

                      {/* دکمه‌ها */}
                      <div className="flex gap-3">
                        <button
                          onClick={navigateToNextEpisode}
                          className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <span>قسمت بعدی</span>
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={cancelCompletionTimer}
                          className="px-4 py-2.5 rounded-lg hover:bg-muted border transition-colors"
                        >
                          انصراف
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
                <div className="mb-4 rounded-full bg-black p-4">
                  <Lock className="h-10 w-10 text-red-500" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">
                  شما دسترسی به این قسمت را ندارید
                </h3>
                <p className="mb-6  max-w-md text-white">
                  برای مشاهده این قسمت، باید دوره را خریداری کنید یا عضو ویژه
                  باشید.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <button
                    onClick={togglePurchaseStatus}
                    className="rounded-md bg-white px-6 py-2.5 text-black transition-colors"
                  >
                    خرید دوره
                  </button>
                  {course.isFreePremium && (
                    <button
                      onClick={togglePremiumStatus}
                      className="rounded-md border border-green-500 bg-transparent px-6 py-2.5 text-green-500 hover:bg-green-500/10 transition-colors"
                    >
                      تهیه اشتراک
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* سایدبار - سمت چپ */}
        <div className="w-full md:w-[380px] lg:w-[400px] xl:w-[450px] h-screen flex flex-col border-r  overflow-hidden">
          {/* نام دوره و عنوان اپیزود در موبایل */}
          <div className="md:hidden p-4 border-b  ">
            <h2 className="font-bold text-lg mb-1">{course.title}</h2>
            <h3 className="text-sm text-gray-300">{episode.title}</h3>
          </div>

          {/* تب‌های سایدبار */}
          <div className=" border-b ">
            <div className="flex justify-between overflow-x-auto px-0.5 pt-1">
              {tabs.map((tab) => {
                // تعیین وضعیت قفل برای هر تب
                const isTabLocked = !hasAccess && tab.id !== "chapters";

                return (
                  <button
                    key={tab.id}
                    onClick={() =>
                      handleTabChange(
                        tab.id as
                          | "chapters"
                          | "notes"
                          | "assignments"
                          | "attachments"
                          | "comments"
                      )
                    }
                    className={`flex flex-1 flex-col items-center gap-1 px-1.5 py-2 text-sm font-medium transition-all rounded-t-lg relative ${
                      activeTab === tab.id ? " text-green-500 shadow-sm" : ""
                    }`}
                  >
                    <div className="relative">
                      <div
                        className={`${
                          activeTab === tab.id
                            ? "text-green-500"
                            : "text-gray-500"
                        }`}
                      >
                        {tab.icon}
                      </div>

                      {/* نمایش آیکون قفل برای تب‌های که کاربر دسترسی ندارد */}
                      {isTabLocked && (
                        <div className="absolute -top-1 -right-1 flex items-center justify-center h-3.5 w-3.5 rounded-full ">
                          <Lock className="h-3 w-3 text-red-500" />
                        </div>
                      )}
                    </div>
                    <span className="text-xs font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* محتوای تب‌ها */}
          <div className="flex-1 overflow-y-auto py-5 px-4 ">
            {/* تب فصل‌ها */}
            {activeTab === "chapters" && (
              <div className="space-y-4">
                {course.chapters &&
                  course.chapters.map((ch, chapterIndex) => {
                    return (
                      <div key={ch.id} className="border rounded-lg overflow-hidden shadow-sm">
                        {/* سرفصل */}
                        <button
                          onClick={() => toggleChapter(ch.id)}
                          className="flex w-full items-center justify-between p-4 text-right transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-muted border border-border/60 text-muted-foreground">
                              <span className="text-xs font-medium">{chapterIndex + 1}</span>
                            </div>
                            <div>
                              <h3 className="font-medium text-sm">{ch.title}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-muted-foreground px-1.5 py-0.5 rounded-full bg-muted">
                                  {ch.episodes.length} قسمت
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex-shrink-0 bg-muted/40 rounded-full p-1">
                            {expandedChapters[ch.id] ? (
                              <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <ChevronLeft className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                        </button>

                        {/* اپیزودهای فصل */}
                        {expandedChapters[ch.id] && (
                          <div className="border-t divide-y divide-dashed">
                            {ch.episodes.map((ep, epIndex) => {
                              // بررسی دسترسی به هر اپیزود
                              const episodeAccess =
                                ep.isFree ||
                                hasPurchasedCourse ||
                                (isPremiumUser && course.isFreePremium);

                              // آیا اپیزود فعلی است؟
                              const isActive = ep.id === episode.id;
                              const progressPercent =
                                watchedProgress[ep.id] || 0;
                              const isCompleted =
                                completedEpisodes.includes(ep.id) ||
                                progressPercent >= 95;

                              return (
                                <Link
                                  href={`/courses/${course.id}/episodes/${ep.id}`}
                                  key={ep.id}
                                  className={`flex items-center p-3 transition-colors ${
                                    isActive
                                      ? "bg-muted"
                                      : episodeAccess
                                      ? "hover:bg-muted/20"
                                      : "opacity-70"
                                  }`}
                                >
                                  <div className="flex-shrink-0 mr-3 w-6 h-6 rounded-full border border-border/50 flex items-center justify-center">
                                    <span className="text-xs text-muted-foreground">{epIndex + 1}</span>
                                  </div>

                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                      <p
                                        className={`truncate text-sm ${
                                          isActive ? "font-medium" : ""
                                        }`}
                                      >
                                        {ep.title}
                                      </p>
                                      
                                      <div className="flex-shrink-0 flex items-center ml-2">
                                        {!episodeAccess ? (
                                          <div className="w-5 h-5 flex items-center justify-center rounded-full bg-red-500/10">
                                            <Lock className="h-3 w-3 text-red-500" />
                                          </div>
                                        ) : isCompleted ? (
                                          <div className="w-5 h-5 flex items-center justify-center rounded-full bg-green-500/10">
                                            <Check className="h-3 w-3 text-green-500" />
                                          </div>
                                        ) : (
                                          <div className="w-5 h-5 flex items-center justify-center rounded-full bg-primary/10">
                                            <Play className="h-3 w-3 text-primary" />
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs text-muted-foreground">
                                        {ep.duration || "00:00"}
                                      </span>
                                      
                                      {episodeAccess && progressPercent > 0 && progressPercent < 95 && (
                                        <span className="text-xs text-primary">
                                          {Math.round(progressPercent)}%
                                        </span>
                                      )}
                                    </div>
                                    
                                    {/* نوار پیشرفت */}
                                    {episodeAccess && progressPercent > 0 && (
                                      <div className="mt-1.5 h-1 w-full rounded-full bg-muted overflow-hidden">
                                        <div
                                          className={`h-full rounded-full ${isCompleted ? "bg-green-500" : "bg-primary"}`}
                                          style={{ width: `${progressPercent}%` }}
                                        />
                                      </div>
                                    )}
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            )}

            {/* تب یادداشت‌ها */}
            {activeTab === "notes" && hasAccess && (
              <div className="p-3  rounded-lg">
                <EpisodeNotes
                  episodeId={episode.id}
                  courseId={course.id}
                  currentTime={currentPlayerTime}
                  isLocked={!hasAccess}
                />
              </div>
            )}

            {/* تب تمرین‌ها */}
            {activeTab === "assignments" && hasAccess && (
              <div className="p-3  rounded-lg">
                <EpisodeAssignments
                  episodeId={episode.id}
                  courseId={course.id}
                  isLocked={!hasAccess}
                />
              </div>
            )}

            {/* تب فایل‌های ضمیمه */}
            {activeTab === "attachments" && hasAccess && (
              <div className="p-3  rounded-lg">
                <EpisodeAttachments
                  episodeId={episode.id}
                  courseId={course.id}
                  isLocked={!hasAccess}
                />
              </div>
            )}

            {/* تب نظرات */}
            {activeTab === "comments" && hasAccess && (
              <div className="p-3  rounded-lg">
                <EpisodeComments
                  episodeId={episode.id}
                  courseId={course.id}
                  isLocked={!hasAccess}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
