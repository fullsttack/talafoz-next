'use client'

import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { UserRoundPlus } from "lucide-react"
import { LoginForm } from "./login-form"
import { useUser } from "@/contexts/user-context"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { useState, useEffect } from "react"

export function LoginDialog() {
  const { user } = useUser()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // На сервере или до монтирования рендерим просто кнопку без проверки состояния
  if (!mounted) {
    return (
      <Button className="border p-2 rounded-lg bg-background hover:bg-muted transition-colors">
        <UserRoundPlus className="w-4 h-4" />
      </Button>
    )
  }

  if (user) {
    return (
      <Button 
        onClick={() => router.push('/dashboard')}
        className="border p-2 rounded-lg bg-background hover:bg-muted transition-colors"
      >
        <UserRoundPlus className="w-4 h-4 text-green-500" />
      </Button>
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="border p-2 rounded-lg bg-background text-foreground cursor-pointer hover:bg-muted transition-colors">
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