import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "جزئیات دوره | تلفظ",
  description: "جزئیات دوره آموزشی در وبسایت تلفظ",
};

export default function CourseDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto py-8">
      {children}
    </div>
  );
}
