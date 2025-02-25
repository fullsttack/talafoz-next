import React from "react";
import { Phone } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { LoginDialog } from "@/components/auth/login-dialog";
import Image from "next/image";
export const Header = () => {
  return (
    <div className="relative">
      <div className="absolute top-0 left-0 w-full -z-50">
        <Image
          src="/image/section.svg"
          alt="section"
          className="w-full"
          width={1500}
          height={1500}
        />
      </div>
      <div className="container mx-auto flex justify-between items-center gap-10 py-12 ">
        <div>
          <p>Logo</p>
        </div>
        <div className="flex gap-8">
          <p className="">خانه</p>
          <p className="">ثبت درخواست</p>
          <p className="">وبلاگ</p>
          <p className="">درباره ما</p>
        </div>
        <div className="flex gap-4">
          <ModeToggle />
          <Link className="border p-2 rounded-lg" href="/login">
            <Phone className="w-4 h-4 " />
          </Link>
          <LoginDialog />
        </div>
      </div>
    </div>
  );
};
