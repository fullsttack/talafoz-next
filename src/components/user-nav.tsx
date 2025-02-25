'use client'

import { useUser } from "@/contexts/user-context"

export function UserNav() {
  const { user } = useUser()
  
  if (!user) return null
  
  return (
    <div>
      {/* نمایش اطلاعات کاربر */}
      <span>{user.full_name}</span>
    </div>
  )
} 