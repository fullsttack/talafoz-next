import React from "react";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
export default function RoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="">
      <Header />
      <div className="container mx-auto flex-1 flex flex-col justify-center items-center py-8">
        {children}
      </div>
      <Footer />
    </section>
  );
}
