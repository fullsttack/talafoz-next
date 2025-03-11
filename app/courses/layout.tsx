import Header from "@/components/layout/Header";

export const metadata = {
  title: "دوره‌های آموزشی",
  description: "مشاهده و جستجوی دوره‌های آموزشی در دسته‌بندی‌های مختلف",
};

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <div className="container w-full max-w-7xl mx-auto px-2 py-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
          {/* محتوای اصلی */}
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
