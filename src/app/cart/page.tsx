"use client";

import React from "react";
import Image from "next/image";
export default function CartPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-gray-600 dark:text-gray-300">
      <Image src="/vector/cart.svg" alt="cart" className="" width={500} height={500} priority />
      <h2 className="mt-6 font-medium text-xl">سبد خرید شما خالی است</h2>
      <p className="mt-2 text-gray-500 dark:text-gray-600">محصولی به سبد خرید خود اضافه نکرده‌اید.</p>
    </div>
  );
}
