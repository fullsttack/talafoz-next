import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div>
      <div className="container mx-auto max-w-7xl">
        <div className="flex justify-between items-center">
          <div className="w-full flex flex-col gap-4">
            <p className="text-3xl font-bold">زمان و دانش بزرگ ترین سرمایه هر انسان است ...</p>
            <p className="text-sm text-gray-500">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
            </p>

            <div className="flex items-center gap-4 mt-12">
              <Link href="/" className="w-32 text-center border px-2 py-2 rounded-xl">
                مشاهده دوره ها
              </Link>
              <Link 
                href="/" 
                className="btn-gradient w-36 text-center"
              >
                مسیر یادگیری
              </Link>
            </div>
          </div>

          <div className="w-full flex justify-end mt-24">
            <Image src="/image/main.png" className="w-10/12 " alt="hero" width={1800} height={1800} />
          </div>
        </div>
      </div>
    </div>
  );
}
