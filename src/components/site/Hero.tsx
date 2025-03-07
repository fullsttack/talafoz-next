"use client";

import Link from "next/link";
import { BorderMagic } from "../magicui/BorderMagic";
import { GlobeDemo } from "../magicui/GlobeDemo";
export default function Hero() {
  return (
    <div className="mt-12 md:mt-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center w-full gap-8">
          <div className="w-full flex flex-col gap-4 mt-8 md:mt-0">
            <p className="text-xl md:text-3xl font-bold">
              زمان و دانش بزرگ ترین سرمایه هر انسان است ...
            </p>
            <p className="text-xs sm:text-sm text-gray-300">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
            </p>

            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 mt-6 md:mt-12">
              <Link
                href="/"
                className="w-32 text-center border bg-cyan-500 text-background px-2 py-1.5 rounded-xl"
              >
                مشاهده دوره ها
              </Link>
              <Link href="/" className="">
                <BorderMagic />
              </Link>
            </div>
          </div>

          <div
            dir="ltr"
            className="w-full max-w-full md:max-w-[50%] flex justify-center md:justify-end"
          >
            <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden rounded-lg shadow-lg">
              <GlobeDemo />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
