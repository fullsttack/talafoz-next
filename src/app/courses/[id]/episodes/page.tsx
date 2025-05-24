'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { courses } from '@/data/course';
import { useAuth } from '@/contexts/AuthContext';
import VideoPlayer from '@/components/video/VideoPlayer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import {
  ArrowRight,
  Play,
  Lock,
  Check,
  FileText,
  BookOpen,
  MessageSquare,
  User,
  Clock,
  Download,
  Share2,
  Heart,
  ThumbsUp,
  ThumbsDown,
} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';

// نوع Episode
interface Episode {
  id: number;
  title: string;
  duration: string;
  isPreview: boolean;
  isCompleted?: boolean;
  videoUrl?: string;
  description?: string;
}

// نوع Section
interface Section {
  id: number;
  title: string;
  episodes: Episode[];
}

// نوع Comment
interface Comment {
  id: number;
  user: string;
  avatar?: string;
  content: string;
  timestamp: string;
  likes: number;
  dislikes: number;
  replies?: Comment[];
}

// نوع Exercise
interface Exercise {
  id: number;
  title: string;
  description: string;
  type: 'quiz' | 'coding' | 'project';
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
  isCompleted?: boolean;
}

// نوع Note
interface Note {
  id: number;
  content: string;
  timestamp: string;
  episodeTime?: string;
}

// داده‌های نمونه
const courseSections: Section[] = [
  {
    id: 1,
    title: 'مقدمه و آشنایی',
    episodes: [
      { 
        id: 1, 
        title: 'معرفی دوره و پیش‌نیازها', 
        duration: '05:23', 
        isPreview: true,
        videoUrl: 'https://www.youtube.com/watch?v=LXb3EKWsInQ',
        description: 'در این جلسه با دوره آشنا می‌شوید و پیش‌نیازهای لازم را بررسی می‌کنیم.'
      },
      { 
        id: 2, 
        title: 'نصب و راه‌اندازی محیط توسعه', 
        duration: '12:45', 
        isPreview: true,
        videoUrl: 'https://www.youtube.com/watch?v=Ke90Tje7VS0',
        description: 'نحوه نصب و راه‌اندازی محیط توسعه را یاد می‌گیریم.'
      },
      { 
        id: 3, 
        title: 'ساختار پروژه', 
        duration: '08:30', 
        isPreview: false,
        videoUrl: 'https://www.youtube.com/watch?v=SqcY0GlETPk',
        description: 'ساختار کلی پروژه و فایل‌های مهم را بررسی می‌کنیم.'
      },
    ],
  },
  {
    id: 2,
    title: 'مفاهیم پایه',
    episodes: [
      { 
        id: 4, 
        title: 'Components در React', 
        duration: '15:20', 
        isPreview: false,
        videoUrl: 'https://www.youtube.com/watch?v=hQAHSlTtcmY',
        description: 'مفهوم کامپوننت در React و نحوه ایجاد آن‌ها.'
      },
      { 
        id: 5, 
        title: 'Props و State', 
        duration: '18:40', 
        isPreview: false,
        videoUrl: 'https://www.youtube.com/watch?v=IYvD9oBCuJI',
        description: 'آشنایی با Props و State در React.'
      },
      { 
        id: 6, 
        title: 'Life Cycle Methods', 
        duration: '22:15', 
        isPreview: false,
        videoUrl: 'https://www.youtube.com/watch?v=Oioo0IdoEls',
        description: 'متدهای چرخه حیات کامپوننت‌ها در React.'
      },
    ],
  },
];

const sampleComments: Comment[] = [
  {
    id: 1,
    user: 'علی احمدی',
    avatar: '/avatars/user1.jpg',
    content: 'توضیحات بسیار عالی بود. ممنون از مدرس محترم',
    timestamp: '۲ ساعت پیش',
    likes: 12,
    dislikes: 0,
  },
  {
    id: 2,
    user: 'سارا محمدی',
    avatar: '/avatars/user2.jpg',
    content: 'آیا می‌توانید کد این قسمت را در گیت‌هاب قرار دهید؟',
    timestamp: '۵ ساعت پیش',
    likes: 8,
    dislikes: 1,
  },
];

const sampleExercises: Exercise[] = [
  {
    id: 1,
    title: 'ایجاد اولین کامپوننت',
    description: 'یک کامپوننت ساده برای نمایش پیام خوش‌آمدگویی ایجاد کنید',
    type: 'coding',
    difficulty: 'easy',
    estimatedTime: '۱۵ دقیقه',
    isCompleted: false,
  },
  {
    id: 2,
    title: 'کوییز مفاهیم پایه',
    description: 'پاسخ به سوالات مربوط به مفاهیم پایه React',
    type: 'quiz',
    difficulty: 'medium',
    estimatedTime: '۱۰ دقیقه',
    isCompleted: true,
  },
];

export default function EpisodesPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  
  // Episode states
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
  const [activeTab, setActiveTab] = useState('curriculum');
  const [newComment, setNewComment] = useState('');
  const [newNote, setNewNote] = useState('');
  const [userNotes, setUserNotes] = useState<Note[]>([]);

  const courseId = parseInt(params.id as string);
  const course = courses.find(c => c.id === courseId);

  // بررسی دسترسی کاربر
  useEffect(() => {
    if (!user) {
      router.push(`/courses/${courseId}`);
      return;
    }

    if (!course) {
      router.push('/courses');
      return;
    }

    // اگر دوره رایگان نیست و کاربر خریداری نکرده
    if (!course.isFree) {
      // اینجا باید چک کنیم که آیا کاربر دوره را خریده یا نه
      // فعلاً فرض می‌کنیم که اگر دوره رایگان نیست، کاربر نمی‌تواند دسترسی داشته باشد
      router.push(`/courses/${courseId}`);
      return;
    }

    // تنظیم اولین اپیزود به عنوان اپیزود فعلی
    if (courseSections.length > 0 && courseSections[0].episodes.length > 0) {
      setCurrentEpisode(courseSections[0].episodes[0]);
    }
  }, [user, course, courseId, router]);

  // Helper function to get all episodes in order
  const getAllEpisodes = (): Episode[] => {
    return courseSections.flatMap(section => section.episodes);
  };

  // Helper function to get current episode index
  const getCurrentEpisodeIndex = (): number => {
    if (!currentEpisode) return -1;
    const allEpisodes = getAllEpisodes();
    return allEpisodes.findIndex(episode => episode.id === currentEpisode.id);
  };

  // Episode navigation functions
  const goToPreviousEpisode = () => {
    const allEpisodes = getAllEpisodes();
    const currentIndex = getCurrentEpisodeIndex();
    
    if (currentIndex > 0) {
      setCurrentEpisode(allEpisodes[currentIndex - 1]);
    }
  };

  const goToNextEpisode = () => {
    const allEpisodes = getAllEpisodes();
    const currentIndex = getCurrentEpisodeIndex();
    
    if (currentIndex < allEpisodes.length - 1) {
      setCurrentEpisode(allEpisodes[currentIndex + 1]);
    }
  };

  // Check if navigation is available
  const hasPreviousEpisode = getCurrentEpisodeIndex() > 0;
  const hasNextEpisode = getCurrentEpisodeIndex() < getAllEpisodes().length - 1;

  // Episode handlers
  const handleEpisodeSelect = (episode: Episode) => {
    setCurrentEpisode(episode);
  };

  // Comments and notes handlers
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    // اینجا باید کامنت را به سرور ارسال کنیم
    console.log('Adding comment:', newComment);
    setNewComment('');
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    
    const note: Note = {
      id: Date.now(),
      content: newNote,
      timestamp: new Date().toLocaleString('fa-IR'),
    };
    
    setUserNotes(prev => [...prev, note]);
    setNewNote('');
  };

  if (!course || !user) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">دسترسی غیرمجاز</h1>
        <Button onClick={() => router.push('/courses')}>
          <ArrowRight className="ml-2 h-4 w-4" />
          بازگشت به لیست دوره‌ها
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary">خانه</Link>
          <span>/</span>
          <Link href="/courses" className="hover:text-primary">دوره‌ها</Link>
          <span>/</span>
          <Link href={`/courses/${courseId}`} className="hover:text-primary">{course.title}</Link>
          <span>/</span>
          <span className="text-foreground">اپیزودها</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Media Player Section - 8/12 */}
          <div className="lg:col-span-8">
            {/* Video Player */}
            <div className="mb-6">
              <CardContent className="p-0">
                {currentEpisode ? (
                  <VideoPlayer
                    url={currentEpisode.videoUrl || "https://www.youtube.com/watch?v=LXb3EKWsInQ"}
                    onPreviousEpisode={goToPreviousEpisode}
                    onNextEpisode={goToNextEpisode}
                    hasPreviousEpisode={hasPreviousEpisode}
                    hasNextEpisode={hasNextEpisode}
                  />
                ) : (
                  <div className="aspect-video bg-black rounded-lg flex items-center justify-center text-white">
                    <div className="text-center">
                      <Play className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p>اپیزودی انتخاب نشده است</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </div>

            {/* Episode Info */}
            {currentEpisode && (
              <Card className="mb-6">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{currentEpisode.title}</CardTitle>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {currentEpisode.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {course.instructor}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 ml-2" />
                        دانلود
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share2 className="h-4 w-4 ml-2" />
                        اشتراک
                      </Button>
                      <Button size="sm" variant="outline">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{currentEpisode.description}</p>
                </CardContent>
              </Card>
            )}

            {/* Comments Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  نظرات و سوالات
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Add Comment */}
                <div className="mb-6">
                  <Textarea
                    placeholder="نظر یا سوال خود را بنویسید..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="mb-3"
                  />
                  <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                    ارسال نظر
                  </Button>
                </div>

                <Separator className="mb-6" />

                {/* Comments List */}
                <div className="space-y-6">
                  {sampleComments.map((comment) => (
                    <div key={comment.id} className="flex gap-4">
                      <Avatar>
                        <AvatarImage src={comment.avatar} />
                        <AvatarFallback>{comment.user[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{comment.user}</h4>
                          <span className="text-sm text-muted-foreground">{comment.timestamp}</span>
                        </div>
                        <p className="text-sm mb-3">{comment.content}</p>
                        <div className="flex items-center gap-4">
                          <Button size="sm" variant="ghost" className="h-8 px-2">
                            <ThumbsUp className="h-4 w-4 ml-1" />
                            {comment.likes}
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 px-2">
                            <ThumbsDown className="h-4 w-4 ml-1" />
                            {comment.dislikes}
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 px-2">
                            پاسخ
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - 4/12 */}
          <div className="lg:col-span-4">
            <Card className="sticky top-4">
              <CardContent className="p-2">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="curriculum" className="text-xs">سرفصل‌ها</TabsTrigger>
                    <TabsTrigger value="exercises" className="text-xs">تمرین‌ها</TabsTrigger>
                    <TabsTrigger value="notes" className="text-xs">یادداشت‌ها</TabsTrigger>
                    <TabsTrigger value="resources" className="text-xs">منابع</TabsTrigger>
                  </TabsList>

                  <TabsContent value="curriculum" className="p-4">
                    <div className="space-y-4">
                      <h3 className="font-semibold">سرفصل‌های دوره</h3>
                      <Accordion type="single" collapsible className="w-full">
                        {courseSections.map((section) => (
                          <AccordionItem key={section.id} value={`section-${section.id}`}>
                            <AccordionTrigger className="text-right cursor-pointer">
                              <div className="flex items-center justify-between w-full">
                                <span className=" text-sm">{section.title}</span>
                                <span className="text-xs text-muted-foreground mr-4">
                                  {section.episodes.length} جلسه
                                </span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-2">
                                {section.episodes.map((episode) => (
                                  <div
                                    key={episode.id}
                                    className={`flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer ${
                                      currentEpisode?.id === episode.id ? 'bg-blue-400/20 border border-blue-400/20' : ''
                                    }`}
                                    onClick={() => handleEpisodeSelect(episode)}
                                  >
                                    <div className="flex items-center gap-3">
                                      {episode.isPreview || course.isFree ? (
                                        <Play className="h-4 w-4 text-primary" />
                                      ) : (
                                        <Lock className="h-4 w-4 text-muted-foreground" />
                                      )}
                                      <div>
                                        <span className="text-sm font-medium">{episode.title}</span>
                                        {episode.isPreview && (
                                          <Badge variant="secondary" className="text-xs mr-2">
                                            پیش‌ نمایش
                                          </Badge>
                                        )}
                                      </div>
                                    </div>
                                    <span className="text-xs text-muted-foreground">
                                      {episode.duration}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  </TabsContent>

                  <TabsContent value="exercises" className="p-4">
                    <div className="space-y-4">
                      <h3 className="font-semibold">تمرین‌ها و پروژه‌ها</h3>
                      <div className="space-y-3">
                        {sampleExercises.map((exercise) => (
                          <Card key={exercise.id} className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-medium text-sm">{exercise.title}</h4>
                              {exercise.isCompleted && (
                                <Check className="h-4 w-4 text-green-500" />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mb-3">{exercise.description}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                  {exercise.type === 'quiz' ? 'کوییز' : exercise.type === 'coding' ? 'کدنویسی' : 'پروژه'}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {exercise.difficulty === 'easy' ? 'آسان' : exercise.difficulty === 'medium' ? 'متوسط' : 'سخت'}
                                </Badge>
                              </div>
                              <span className="text-xs text-muted-foreground">{exercise.estimatedTime}</span>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="notes" className="p-4">
                    <div className="space-y-4">
                      <h3 className="font-semibold">یادداشت‌های من</h3>
                      
                      {/* Add Note */}
                      <div className="space-y-3">
                        <Textarea
                          placeholder="یادداشت جدید..."
                          value={newNote}
                          onChange={(e) => setNewNote(e.target.value)}
                          className="text-sm"
                        />
                        <Button size="sm" onClick={handleAddNote} disabled={!newNote.trim()}>
                          <FileText className="h-4 w-4 ml-2" />
                          افزودن یادداشت
                        </Button>
                      </div>

                      <Separator />

                      {/* Notes List */}
                      <div className="space-y-3">
                        {userNotes.map((note) => (
                          <Card key={note.id} className="p-3">
                            <p className="text-sm mb-2">{note.content}</p>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>{note.timestamp}</span>
                            </div>
                          </Card>
                        ))}
                        {userNotes.length === 0 && (
                          <p className="text-sm text-muted-foreground text-center py-4">
                            هنوز یادداشتی ندارید
                          </p>
                        )}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="resources" className="p-4">
                    <div className="space-y-4">
                      <h3 className="font-semibold">منابع آموزشی</h3>
                      <div className="space-y-3">
                        <Card className="p-3">
                          <div className="flex items-center gap-3">
                            <BookOpen className="h-5 w-5 text-primary" />
                            <div>
                              <h4 className="font-medium text-sm">مستندات React</h4>
                              <p className="text-xs text-muted-foreground">راهنمای کامل React</p>
                            </div>
                          </div>
                        </Card>
                        <Card className="p-3">
                          <div className="flex items-center gap-3">
                            <Download className="h-5 w-5 text-primary" />
                            <div>
                              <h4 className="font-medium text-sm">فایل‌های پروژه</h4>
                              <p className="text-xs text-muted-foreground">کدهای نمونه و فایل‌های پروژه</p>
                            </div>
                          </div>
                        </Card>
                        <Card className="p-3">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-primary" />
                            <div>
                              <h4 className="font-medium text-sm">اسلایدهای درس</h4>
                              <p className="text-xs text-muted-foreground">اسلایدهای ارائه شده در جلسات</p>
                            </div>
                          </div>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 