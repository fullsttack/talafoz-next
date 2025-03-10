export default function CourseDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gradient-to-b from-blue-50/50 to-white dark:from-blue-950/10 dark:to-background min-h-screen">
      <section className="container mx-auto px-4 md:px-6 py-6 md:py-10">
        {children}
      </section>
    </div>
  );
}
