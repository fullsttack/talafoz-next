'use client';

import { useState } from 'react';
import { Calendar, User, BarChart3, Clock, CheckCircle } from 'lucide-react';
import { Course } from '@/components/data/course';

interface CourseInfoProps {
  course: Course;
}

export default function CourseInfo({ course }: CourseInfoProps) {
  const [activeTab, setActiveTab] = useState<'description' | 'prerequisites' | 'goals'>('description');
  
  const {
    description,
    instructor,
    level,
    createdAt,
    updatedAt,
    duration,
    studentsCount,
    prerequisites = [],
    goals = []
  } = course;
  
  // تبدیل سطح دوره به متن فارسی
  const getLevelText = () => {
    if (level === 'beginner') return 'مبتدی';
    if (level === 'intermediate') return 'متوسط';
    if (level === 'advanced') return 'پیشرفته';
    return '';
  };
  
  // فرمت تاریخ به شمسی
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('fa-IR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(date);
    } catch (e) {
      return dateString;
    }
  };
  
  return (
    <div className="space-y-6">
      {/* تب‌ها */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <nav className="-mb-px flex space-x-4 space-x-reverse">
          <button
            onClick={() => setActiveTab('description')}
            className={`flex space-x-reverse gap-1.5 px-4 py-2 text-sm font-medium ${
              activeTab === 'description'
                ? 'border-b-2 border-primary text-primary'
                : 'border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <span>توضیحات دوره</span>
          </button>
          
          <button
            onClick={() => setActiveTab('prerequisites')}
            className={`flex space-x-reverse gap-1.5 px-4 py-2 text-sm font-medium ${
              activeTab === 'prerequisites'
                ? 'border-b-2 border-primary text-primary'
                : 'border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <span>پیش‌نیازها</span>
          </button>
          
          <button
            onClick={() => setActiveTab('goals')}
            className={`flex space-x-reverse gap-1.5 px-4 py-2 text-sm font-medium ${
              activeTab === 'goals'
                ? 'border-b-2 border-primary text-primary'
                : 'border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <span>اهداف دوره</span>
          </button>
        </nav>
      </div>
      
      {/* محتوای تب */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        {/* توضیحات دوره */}
        {activeTab === 'description' && (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-x-6 gap-y-4">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-gray-500" />
                <span className="text-sm">{instructor}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-gray-500" />
                <span className="text-sm">{getLevelText()}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-500" />
                <span className="text-sm">{duration}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-500" />
                <span className="text-sm">
                  {updatedAt 
                    ? `به‌روزرسانی: ${formatDate(updatedAt)}` 
                    : `تاریخ انتشار: ${formatDate(createdAt)}`
                  }
                </span>
              </div>
            </div>
            
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="leading-7 text-gray-700 dark:text-gray-300">{description}</p>
            </div>
            
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
              <CheckCircle className="h-5 w-5" />
              <span className="text-sm">{studentsCount.toLocaleString()} دانشجو در این دوره ثبت‌نام کرده‌اند.</span>
            </div>
          </div>
        )}
        
        {/* پیش‌نیازها */}
        {activeTab === 'prerequisites' && (
          <div className="space-y-4">
            {prerequisites.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">این دوره پیش‌نیاز خاصی ندارد.</p>
            ) : (
              <ul className="space-y-2">
                {prerequisites.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        
        {/* اهداف دوره */}
        {activeTab === 'goals' && (
          <div className="space-y-4">
            {goals.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">اهداف دوره هنوز مشخص نشده‌اند.</p>
            ) : (
              <ul className="space-y-2">
                {goals.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 