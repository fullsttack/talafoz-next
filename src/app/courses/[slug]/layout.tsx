export default function CourseDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <section className="container mx-auto px-4 md:px-6 py-6 md:py-10">
        {children}
      </section>
    </div>
  );
}
