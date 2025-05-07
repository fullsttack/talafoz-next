"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import OtpInput from "@/components/auth/OtpInput";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

enum AuthStep {
  RequestOTP,
  VerifyOTP,
}

export default function LoginPage() {
  const [authStep, setAuthStep] = useState<AuthStep>(AuthStep.RequestOTP);
  const [identifier, setIdentifier] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleRequestOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!identifier) {
      toast.error("لطفا ایمیل یا شماره تلفن خود را وارد کنید");
      return;
    }
    
    try {
      setIsLoading(true);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'}/auth/users/send_otp/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: identifier }),
        cache: 'no-store',
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "خطا در ارسال کد تایید");
        return;
      }
      
      toast.success(data.message || "کد تایید با موفقیت ارسال شد");
      setAuthStep(AuthStep.VerifyOTP);
    } catch (error) {
      console.error("Error requesting OTP:", error);
      toast.error("خطا در ارسال کد تایید");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!verificationCode) {
      toast.error("لطفا کد تایید را وارد کنید");
      return;
    }
    
    try {
      setIsLoading(true);
      
      const result = await signIn("otp-credentials", {
        user: identifier,
        verification_code: verificationCode,
        redirect: false,
        callbackUrl,
      });
      
      if (result?.error) {
        toast.error(result.error || "کد تایید نامعتبر است");
        return;
      }
      
      toast.success("ورود با موفقیت انجام شد");
      router.push(callbackUrl);
      router.refresh();
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("خطا در بررسی کد تایید");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpComplete = (otp: string) => {
    setVerificationCode(otp);
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-gray-600 dark:text-gray-300">
      <Image src="/vector/login.svg" alt="login" className="mb-6" width={300} height={300} />
      <h2 className="mt-6 font-medium text-2xl">ورود به حساب کاربری</h2>
      <p className="mt-2 text-gray-500 dark:text-gray-400 text-center max-w-md mb-6">
        ورود به حساب کاربری می‌توانید اطلاعات بیشتری درباره ما بگیرید
      </p>

      {authStep === AuthStep.RequestOTP ? (
        <form onSubmit={handleRequestOtp} className="w-full max-w-sm">
          <div className="mb-4">
            <label htmlFor="identifier" className="block text-sm font-medium mb-1">
              ایمیل یا شماره تلفن
            </label>
            <input
              type="text"
              id="identifier"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="example@email.com یا 09123456789"
              disabled={isLoading}
              dir="ltr"
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "در حال ارسال..." : "دریافت کد تایید"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="w-full max-w-sm">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-center">
              کد تایید ارسال شده به {identifier} را وارد کنید
            </label>
            <OtpInput
              length={5}
              onComplete={handleOtpComplete}
              disabled={isLoading}
              className="mt-2"
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "در حال بررسی..." : "ورود"}
          </button>
          
          <button
            type="button"
            onClick={() => setAuthStep(AuthStep.RequestOTP)}
            className="w-full mt-2 py-2 px-4 bg-transparent text-primary-600 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            تغییر ایمیل/شماره تلفن
          </button>
          
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={async () => {
                setIsLoading(true);
                try {
                  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'}/auth/users/send_otp/`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ user: identifier }),
                    cache: 'no-store',
                  });
                  const data = await response.json();
                  
                  if (response.ok) {
                    toast.success("کد تایید مجدداً ارسال شد");
                  } else {
                    toast.error(data.error || "خطا در ارسال مجدد کد تایید");
                  }
                } catch (error) {
                  toast.error("خطا در ارسال مجدد کد تایید");
                } finally {
                  setIsLoading(false);
                }
              }}
              className="text-sm text-primary-600 hover:underline"
              disabled={isLoading}
            >
              ارسال مجدد کد تایید
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
