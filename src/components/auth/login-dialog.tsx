'use client'

import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { UserRoundPlus } from "lucide-react"
import { LoginForm } from "./login-form"
import { useUser } from "@/contexts/user-context"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

export function LoginDialog() {
  const { user } = useUser()
  const router = useRouter()

  if (user) {
    return (
      <button 
        onClick={() => router.push('/dashboard')}
        className="border p-2 rounded-lg bg-green-500/10 border-green-500/20 hover:bg-green-500/20 transition-colors"
      >
        <UserRoundPlus className="w-4 h-4 text-green-500" />
      </button>
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className={cn(
          "border p-2 rounded-lg",
          "hover:bg-muted transition-colors"
        )}>
          <UserRoundPlus className="w-4 h-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogTitle className="text-center text-lg font-semibold mb-4">
          ورود به حساب کاربری
        </DialogTitle>
        <LoginForm />
      </DialogContent>
    </Dialog>
  )
} 