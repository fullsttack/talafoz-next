'use client'

import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { UserRoundPlus } from "lucide-react"
import { LoginForm } from "./login-form"
import { useUser } from "@/contexts/user-context"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
export function LoginDialog() {
  const { user } = useUser()
  const router = useRouter()

  if (user) {
    return (
      <Button 
        onClick={() => router.push('/dashboard')}
        className=""
      >
        <UserRoundPlus className="w-4 h-4 text-green-500" />
      </Button>
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={cn(
          "border p-2 rounded-lg",
          "hover:bg-muted transition-colors"
        )}>
          <UserRoundPlus className="w-4 h-4" />
        </Button>
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