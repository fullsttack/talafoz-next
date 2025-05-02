import Image from "next/image";

export default function AboutIndex() {
  return (
    <div className="container mx-auto max-w-7xl px-4 md:px-12 py-24 flex flex-col md:flex-row items-center justify-center gap-4">
      <div className="w-full flex flex-col md:items-start items-center gap-4">
        <h1 className="text-3xl ">وبسایت آموزشی تلفظ</h1>
        <p className="text-base text-gray-500 mb-6 text-center md:text-right">
          با تلفظ، یادگیری صحیح و اصولی برنامه‌نویسی، طراحی و سایر مهارت‌ها را با جدیدترین فناوری‌های هوش مصنوعی تجربه کنید. دوره‌های تخصصی، آموزش‌های کاربردی و پشتیبانی حرفه‌ای، مسیر موفقیت شما را هموار می‌کند. همین حالا شروع کنید و آینده شغلی خود را متحول سازید!
        </p>

        <div className="flex items-center gap-4">
          <button className="bg-base-1 hover:bg-base-1/90 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 shadow-md">
            همین حالا شروع کن
          </button>
          <button className="text-muted-foreground border font-bold py-3 px-8 rounded-lg">
            تماس با ما
          </button>
          
        </div>
      </div>

      <div className="w-full">
        <Image
          src="/vector/about.svg"
          alt="about"
          className="w-12/12"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
}
