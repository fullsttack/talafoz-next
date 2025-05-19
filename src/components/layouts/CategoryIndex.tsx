import Link from "next/link";
import { Code, Palette, BarChart3, Brain, ServerCrash, Bitcoin, Languages, NotebookPen } from "lucide-react";

export default function CategoryIndex() {
  const categories = [
    {
      id: 1,
      title: "برنامه نویسی",
      icon: <Code className="w-7 h-7" />,
      color: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
      description: "یادگیری زبان‌های برنامه‌نویسی و ساخت وب‌سایت‌ها",
      href: "/categories/programming",
    },
    {
      id: 2,
      title: "طراحی و گرافیک",
      icon: <Palette className="w-7 h-7" />,
      color: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
      description: "آموزش طراحی گرافیکی، UI/UX و انیمیشن",
      href: "/categories/design",
    },
    {
      id: 3,
      title: "هوش مصنوعی",
      icon: <Brain className="w-7 h-7" />,
      color: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
      description: "آموزش هوش مصنوعی و ماشین لرنینگ",
      href: "/categories/ai",
    },
    {
      id: 4,
      title: "سرور و DevOps",
      icon: <ServerCrash className="w-7 h-7" />,
      color: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
      description: "مدیریت سرور، کانتینرها و زیرساخت‌های ابری",
      href: "/categories/devops",
      count: 12,
    },
    {
      id: 5,
      title: "ارز دیجیتال",
      icon: <Bitcoin className="w-7 h-7" />,
      color: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
      description: "آموزش ارز دیجیتال و استراتژی‌های مالی",
      href: "/categories/financial-markets",
    },
    {
      id: 6,
      title: "سئو و دیجیتال مارکتینگ",
      icon: <BarChart3 className="w-7 h-7" />,
      color: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
      description: "افزایش رتبه سایت و استراتژی‌های بازاریابی آنلاین",
      href: "/categories/digital-marketing",
    },
    {
      id: 7,
      title: "زبان‌های خارجی",
      icon: <Languages  className="w-7 h-7" />,
      color: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
      description: "آموزش زبان‌های خارجی با متدهای نوین",
      href: "/categories/languages",
    },
    {
      id: 8,
      title: "تولید محتوا",
      icon: <NotebookPen className="w-7 h-7" />,
      color: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
      description: "تولید محتوا با  نرم افزار کاربردی",
      href: "/categories/languages",
    },
  ];

  return (
    <div className="py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-12">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">
            دسته‌ بندی‌ های آموزشی
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            دوره‌های آموزشی در دسته‌بندی‌های متنوع برای پاسخگویی به نیازهای
            یادگیری شما
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              href={category.href}
              key={category.id}
              className="group flex flex-col rounded-xl overflow-hidden transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex flex-col items-center justify-center text-center gap-4 p-4">
                <div className={`p-3 rounded-lg ${category.color}`}>
                  {category.icon}
                </div>
                <div className="">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 group-hover:text-base-1 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    {category.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
