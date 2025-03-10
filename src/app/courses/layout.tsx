import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import  Footer  from "@/components/layout/Footer";
export const metadata: Metadata = {
  title: "دوره‌های آموزشی | تلفظ",
  description: "لیست کامل دوره‌های آموزشی تلفظ",
};

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <section className="container mx-auto px-4 py-12">
        
        {children}
      </section>
      <Footer />
    </div>
  );
}
