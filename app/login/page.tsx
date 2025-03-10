import { Undo2 } from "lucide-react";
import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";
import LoginJson from "@/components/auth/LoginJson";
export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-12">
      <div className="col-span-4 flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Undo2 className="size-4" />
            </div>
            <p className="text-sm text-gray-500">بازگشت به سایت</p>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="col-span-8 relative hidden border-r border-foreground/10 md:flex items-center justify-center lg:block">
        <div className="flex items-center justify-center h-full">
          <LoginJson />
        </div>
      </div>
    </div>
  );
}
