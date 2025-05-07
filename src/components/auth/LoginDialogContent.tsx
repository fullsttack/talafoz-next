"use client";
import React, { useState, useEffect, useRef } from "react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Github } from "lucide-react";
import { Separator } from "@/components/ui/separator";

enum AuthStep {
  RequestOTP,
  VerifyOTP,
}

interface LoginDialogContentProps {
  onClose?: () => void;
  isOpen?: boolean;
  isRegister?: boolean;
}


const convertPersianToEnglish = (str: string): string => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  
  return str.split('').map(char => {
    const persianIndex = persianDigits.indexOf(char);
    if (persianIndex >= 0) return persianIndex.toString();
    
    const arabicIndex = arabicDigits.indexOf(char);
    if (arabicIndex >= 0) return arabicIndex.toString();
    
    return char;
  }).join('');
};

// تابع بررسی معتبر بودن ایمیل
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default function LoginDialogContent({ onClose, isOpen, isRegister = false }: LoginDialogContentProps) {
  const [authStep, setAuthStep] = useState<AuthStep>(AuthStep.RequestOTP);
  const [identifier, setIdentifier] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [timer, setTimer] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const otpRef = useRef<HTMLInputElement>(null);
  const dialogCloseRef = useRef<HTMLButtonElement>(null);

  // Reset the state when the dialog is opened
  useEffect(() => {
    if (isOpen) {
      setAuthStep(AuthStep.RequestOTP);
      setIdentifier("");
      setVerificationCode("");
      setTimer(0);
      setIsLoading(false);
    }
  }, [isOpen]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);
  
  useEffect(() => {
    // Focus the OTP input when moving to verification step
    if (authStep === AuthStep.VerifyOTP) {
      // Small delay to ensure the DOM is updated
      setTimeout(() => {
        if (otpRef.current) {
          otpRef.current.focus();
        }
      }, 100);
    }
  }, [authStep]);

  const handleRequestOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!identifier) {
      toast.error("لطفا ایمیل خود را وارد کنید");
      return;
    }
    
    if (!isValidEmail(identifier)) {
      toast.error("لطفا یک آدرس ایمیل معتبر وارد کنید");
      return;
    }
    
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'}/auth/users/send_otp/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: identifier }),
        cache: 'no-store',
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.error || "خطا در ارسال کد تایید");
        return;
      }
      toast.success(data.message || "کد تایید با موفقیت به ایمیل ارسال شد");
      setAuthStep(AuthStep.VerifyOTP);
      setTimer(90); // 90 ثانیه تا ارسال مجدد
    } catch (error) {
      console.error("Error requesting OTP:", error);
      toast.error("خطا در ارسال کد تایید");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!verificationCode || verificationCode.length !== 5) {
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
      toast.success(isRegister ? "ثبت نام با موفقیت انجام شد" : "ورود با موفقیت انجام شد");
      handleLoginSuccess();
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("خطا در بررسی کد تایید");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/users/send_otp/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: identifier }),
        cache: 'no-store',
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("کد تایید مجدداً به ایمیل ارسال شد");
        setTimer(90);
      } else {
        toast.error(data.error || "خطا در ارسال مجدد کد تایید");
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      toast.error("خطا در ارسال مجدد کد تایید");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSocialLogin = async (provider: 'google' | 'github') => {
    try {
      setIsLoading(true);
      await signIn(provider, { callbackUrl, redirect: true });
      // No need to handle success here as we're redirecting
    } catch (error) {
      console.error(`Error signing in with ${provider}:`, error);
      toast.error(`خطا در ورود با ${provider === 'google' ? 'گوگل' : 'گیت‌هاب'}`);
      setIsLoading(false);
    }
  };
  
  const handleLoginSuccess = () => {
    // Close the dialog
    if (onClose) {
      onClose();
    } else if (dialogCloseRef.current) {
      dialogCloseRef.current.click();
    }
    
    // Small delay to ensure dialog is closed before navigation
    setTimeout(() => {
      router.push(callbackUrl);
      router.refresh();
    }, 100);
  };

  // تبدیل اعداد فارسی به انگلیسی در کد تایید
  const handleOTPChange = (value: string) => {
    const englishValue = convertPersianToEnglish(value);
    setVerificationCode(englishValue);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full">
      <DialogTitle className="text-center w-full mb-1">
        {isRegister ? "ثبت نام در سایت" : "ورود به حساب کاربری"}
      </DialogTitle>
      <DialogDescription className="text-center w-full mb-2">
          جهت {isRegister ? "ثبت نام" : "ورود"} لطفا ایمیل خود را وارد کنید
      </DialogDescription>
      <div className="w-full max-w-sm">
        
        {authStep === AuthStep.RequestOTP ? (
          <>
            <form onSubmit={handleRequestOtp} className="flex flex-col gap-4 mb-6">
              <div>
                <label htmlFor="identifier" className="block text-sm font-medium mb-3">
                  ایمیل
                </label>
                <input
                  type="email"
                  id="identifier"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value.trim())}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="example@email.com"
                  disabled={isLoading}
                  dir="ltr"
                  autoFocus
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 mt-2 px-4 bg-base-1 text-white rounded-md hover:bg-base-1/90 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-bold transition-colors"
              >
                {isLoading ? "در حال ارسال..." : isRegister ? "ارسال کد ثبت نام" : "ارسال کد تایید"}
              </button>
            </form>
            
            <div className="relative my-6">
              <Separator />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  px-2 text-sm text-gray-600 dark:text-gray-300">
               یا ورود سریع با
              </div>
            </div>
            
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => handleSocialLogin('google')}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span>ورود با گوگل</span>
              </button>
              
              <button
                type="button"
                onClick={() => handleSocialLogin('github')}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Github className="w-5 h-5" />
                <span>ورود با گیت‌هاب</span>
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium mb-3 text-center">
                کد تایید ارسال شده به <span className="font-bold">{identifier}</span> را وارد کنید
              </label>
              <div dir="ltr" className="flex justify-center my-4">
                <InputOTP
                  maxLength={5}
                  value={verificationCode}
                  onChange={handleOTPChange}
                  disabled={isLoading}
                  containerClassName="gap-4 justify-center"
                  ref={otpRef}
                >
                  <InputOTPGroup className="flex gap-4">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <InputOTPSlot 
                        key={index} 
                        index={index} 
                        className="w-14 h-14 text-lg border-2 border-gray-300 focus:border-primary-500 rounded-md flex items-center justify-center"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading || verificationCode.length !== 5}
              className="w-full py-2.5 px-4 bg-base-1 text-white rounded-md hover:bg-base-1/90 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-bold transition-colors"
            >
              {isLoading ? "در حال بررسی..." : isRegister ? "ثبت نام" : "ورود"}
            </button>
            <div className="flex flex-row gap-2 justify-between mt-2 items-center">
              <button
                type="button"
                onClick={() => { setAuthStep(AuthStep.RequestOTP); setVerificationCode(""); setTimer(0); }}
                className="hover:underline text-sm font-medium"
                disabled={isLoading}
              >
                تغییر ایمیل
              </button>
              <button
                type="button"
                onClick={handleResend}
                className={`text-primary-600 hover:underline text-sm font-medium px-3 py-1 rounded transition-colors duration-200 ${timer > 0 ? 'opacity-50 cursor-not-allowed' : 'bg-primary-50 hover:bg-primary-100'}`}
                disabled={isLoading || timer > 0}
              >
                {timer > 0 ? `ارسال مجدد کد تا ${timer} ثانیه` : "ارسال مجدد کد"}
              </button>
            </div>
          </form>
        )}
      </div>
      <DialogClose ref={dialogCloseRef} className="hidden" />
    </div>
  );
} 