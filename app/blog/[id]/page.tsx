import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft, Clock, Calendar, User, Tag, Share } from 'lucide-react';

import { blogs } from '@/components/data/blog';
import Header from '@/components/layout/Header';

// تغییر تنظیمات رندرینگ به حالت استاتیک برای سرعت بیشتر
export const dynamic = "force-static";
export const revalidate = 3600; // کش کردن برای یک ساعت
export const preferredRegion = "auto"; // کمک به عملکرد بهتر

// تولید مسیرهای استاتیک برای تمام بلاگ‌ها
export async function generateStaticParams() {
  return blogs.map((blog) => ({
    id: blog.id,
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const blog = blogs.find((blog) => blog.id === params.id);

  if (!blog) {
    return {
      title: 'مقاله یافت نشد | تالافز',
      description: 'متاسفانه مقاله مورد نظر یافت نشد.',
    };
  }

  return {
    title: `${blog.title} | تالافز`,
    description: blog.description,
  };
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const blog = blogs.find((blog) => blog.id === params.id);

  // اگر بلاگ با این شناسه وجود نداشت، به صفحه 404 هدایت می‌کنیم
  if (!blog) {
    notFound();
  }

  const {
    title,
    description,
    content,
    author,
    authorImageUrl,
    imageUrl,
    date,
    readTime,
    category,
    tags,
  } = blog;

  // محتوای پیش‌فرض برای مقالات بدون محتوای مشخص
  const blogContent = content || `
    <p>
      ${description}
    </p>
    <p>
      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
    </p>
    <h2>معرفی</h2>
    <p>
      کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد.
    </p>
    <p>
      در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
    </p>
    <h2>بخش اصلی</h2>
    <p>
      یکی از مهمترین نکات در این زمینه این است که اطلاعات دقیق و کامل باشند. این امر به خصوص در حوزه فناوری و برنامه‌نویسی اهمیت بیشتری دارد، زیرا تکنولوژی‌ها به سرعت در حال تغییر هستند.
    </p>
    <p>
      همچنین باید به این نکته توجه داشت که آموزش‌های مرتبط با برنامه‌نویسی و طراحی وب نیازمند تمرین و ممارست زیادی است و صرفاً با خواندن مقالات نمی‌توان به تسلط کامل رسید.
    </p>
    <h2>نتیجه‌گیری</h2>
    <p>
      با توجه به مطالب ذکر شده، می‌توان نتیجه گرفت که یادگیری مداوم و به‌روز بودن در دنیای فناوری اهمیت ویژه‌ای دارد. امیدواریم این مقاله توانسته باشد اطلاعات مفیدی را در اختیار شما قرار دهد.
    </p>
  `;

  return (
    <div>
      <Header />
      <div className="container max-w-5xl mx-auto py-8 px-4 md:px-6 lg:px-8">
        {/* مسیر ناوبری */}
        <div className="mb-8">
          <nav className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-primary">
              خانه
            </Link>
            <ChevronLeft className="h-4 w-4 mx-2" />
            <Link href="/blog" className="hover:text-primary">
              مقالات
            </Link>
            <ChevronLeft className="h-4 w-4 mx-2" />
            <span className="text-gray-900 dark:text-white">{title}</span>
          </nav>
        </div>

        {/* سربرگ مقاله */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{title}</h1>
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-6">
            {/* اطلاعات نویسنده */}
            <div className="flex items-center gap-2">
              {authorImageUrl ? (
                <Image
                  src={authorImageUrl}
                  alt={author}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              ) : (
                <User className="h-5 w-5" />
              )}
              <span>{author}</span>
            </div>

            {/* تاریخ انتشار */}
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>{date}</span>
            </div>

            {/* زمان مطالعه */}
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>{readTime}</span>
            </div>

            {/* دسته‌بندی */}
            <Link 
              href={`/blog?category=${encodeURIComponent(category)}`}
              className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <Tag className="h-4 w-4" />
              <span>{category}</span>
            </Link>
          </div>
        </header>

        {/* تصویر اصلی مقاله */}
        <div className="relative w-full h-80 md:h-96 mb-8 rounded-2xl overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* محتوای اصلی مقاله */}
        <article className="prose prose-lg max-w-none dark:prose-invert mb-12">
          <div dangerouslySetInnerHTML={{ __html: blogContent }} />
        </article>

        {/* برچسب‌ها */}
        {tags && tags.length > 0 && (
          <div className="mb-12">
            <h3 className="font-semibold mb-4">برچسب‌ها:</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* اشتراک‌گذاری */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h3 className="font-semibold">این مقاله را به اشتراک بگذارید:</h3>
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors">
                <Share className="h-5 w-5" />
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-600 text-white transition-colors">
                <Share className="h-5 w-5" />
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors">
                <Share className="h-5 w-5" />
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-700 hover:bg-blue-800 text-white transition-colors">
                <Share className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* بازگشت به لیست مقالات */}
        <div className="text-center">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary rounded-xl font-medium text-white hover:bg-primary/90 transition-colors"
          >
            <span>بازگشت به لیست مقالات</span>
          </Link>
        </div>
      </div>
    </div>
  );
} 