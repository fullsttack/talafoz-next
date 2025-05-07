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
import { Github, Chrome } from "lucide-react";
import { Separator } from "@/components/ui/separator";

enum AuthStep {
  RequestOTP,
  VerifyOTP,
}

interface LoginDialogContentProps {
  onClose?: () => void;
}

export default function LoginDialogContent({ onClose }: LoginDialogContentProps) {
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
      toast.success("ورود با موفقیت انجام شد");
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

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full">
      <DialogTitle className="text-center w-full mb-1">ورود به حساب کاربری</DialogTitle>
      <DialogDescription className="text-center w-full mb-2">
        فقط با ایمیل می‌توانید وارد شوید. کد تایید به ایمیل شما ارسال خواهد شد.
      </DialogDescription>
      <div className="w-full max-w-sm">
        
        {authStep === AuthStep.RequestOTP ? (
          <>
            <div className="flex flex-col gap-3 mb-4">
              <button
                type="button"
                onClick={() => handleSocialLogin('google')}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Chrome className="w-5 h-5 text-[#4285F4]" />
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
            
            <div className="relative my-6">
              <Separator />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-gray-500">
                یا
              </div>
            </div>
            
            <form onSubmit={handleRequestOtp} className="flex flex-col gap-4">
              <div>
                <label htmlFor="identifier" className="block text-sm font-medium mb-1">
                  ایمیل
                </label>
                <input
                  type="email"
                  id="identifier"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
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
                {isLoading ? "در حال ارسال..." : "ارسال کد تایید"}
              </button>
            </form>
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
                  onChange={setVerificationCode}
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
              {isLoading ? "در حال بررسی..." : "ورود"}
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