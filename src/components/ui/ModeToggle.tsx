"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { Button } from "./button"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  
  React.useEffect(() => {
    setMounted(true)
  }, [])
  
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // Рендер пустой иконки на сервере и до монтирования на клиенте
  if (!mounted) {
    return (
      <Button
        className="border p-2 rounded-lg bg-background hover:bg-muted transition-colors"
        aria-label="تغییر حالت نمایش"
      >
        <span className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <Button
      onClick={toggleTheme}
      className="border p-2 rounded-lg bg-background hover:bg-muted transition-colors cursor-pointer"
      aria-label="تغییر حالت نمایش"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 text-yellow-500" />
      ) : (
        <Moon className="h-4 w-4 text-slate-700" />
      )}
    </Button>
  )
}
