import React from "react";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col  ">
      <Header />
      <main className="">
        {children}
      </main>
      <Footer />
    </div>
  );
}