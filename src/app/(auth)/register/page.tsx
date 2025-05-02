"use client";

import React from "react";
import Image from "next/image";
export default function RegisterPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-gray-600 dark:text-gray-300">
      <Image src="/vector/login.svg" alt="register" className="" width={500} height={500} />
      <h2 className="mt-6 font-medium text-xl">ثبت نام در سامانه</h2>
      <p className="mt-2 text-gray-500 dark:text-gray-600">ثبت نام در سامانه می‌توانید اطلاعات بیشتری درباره ما بگیرید</p>
    </div>
  );
}
