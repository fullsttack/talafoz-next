'use client'

import { useFormStatus } from 'react-dom'
import { sendOTP, verifyOTP } from '@/app/actions/auth'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useState, startTransition, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardFooter } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Icons } from '@/components/ui/icons'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { useUser } from '@/contexts/user-context'

function convertToEnglishNumbers(str: string): string {
  const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
  const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']
  const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  
  return str.split('').map(c => {
    const persianIndex = persianNumbers.indexOf(c)
    const arabicIndex = arabicNumbers.indexOf(c)
    
    if (persianIndex !== -1) return englishNumbers[persianIndex]
    if (arabicIndex !== -1) return englishNumbers[arabicIndex]
    return c
  }).join('')
}

function PinInput({ length = 6, value = '', onChange }: { length?: number; value?: string; onChange: (value: string) => void }) {
  const [pins, setPins] = useState<string[]>(Array(length).fill(''))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Initialize refs array on mount
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length)
  }, [length])

  useEffect(() => {
    const values = value.split('').slice(0, length)
    setPins(values.concat(Array(length - values.length).fill('')))
  }, [value, length])

  const handleChange = (index: number, newValue: string) => {
    const newPin = convertToEnglishNumbers(newValue).slice(-1)
    if (newPin && !/^\d+$/.test(newPin)) return

    const newPins = [...pins]
    newPins[index] = newPin
    setPins(newPins)
    onChange(newPins.join(''))

    if (newPin && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !pins[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = convertToEnglishNumbers(e.clipboardData.getData('text'))
    const numbers = pastedData.match(/\d/g)?.slice(0, length) || []
    const newPins = [...pins]
    numbers.forEach((num, i) => {
      newPins[i] = num
    })
    setPins(newPins)
    onChange(newPins.join(''))
    inputRefs.current[Math.min(numbers.length, length - 1)]?.focus()
  }

  const setRef = (index: number) => (element: HTMLInputElement | null) => {
    inputRefs.current[index] = element
  }

  return (
    <div className="flex gap-2 justify-center" dir="ltr">
      {pins.map((pin, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.1 }}
        >
          <Input
            ref={setRef(i)}
            type="text"
            inputMode="numeric"
            value={pin}
            maxLength={1}
            className="w-12 h-12 text-center text-lg font-semibold"
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            onFocus={(e) => e.target.select()}
          />
        </motion.div>
      ))}
    </div>
  )
}

function Timer({ duration = 120, onFinish }: { duration?: number; onFinish: () => void }) {
  const [timeLeft, setTimeLeft] = useState(duration)
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  useEffect(() => {
    if (timeLeft <= 0) {
      onFinish()
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, onFinish])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-sm text-muted-foreground font-mono"
    >
      {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
    </motion.div>
  )
}

export function LoginForm() {
  const router = useRouter()
  const { setUser } = useUser()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [otpValue, setOtpValue] = useState('')
  const [canResend, setCanResend] = useState(false)
  const { pending } = useFormStatus()

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (pending) return

    const formData = new FormData()
    formData.append('phone_number', phoneNumber)
    
    const result = await sendOTP(formData)
    if (result.success) {
      startTransition(() => {
        setStep('otp')
        setCanResend(false)
      })
      toast.success(result.message)
    } else {
      toast.error(result.message)
    }
  }

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (pending || otpValue.length !== 6) return

    const formData = new FormData()
    formData.append('phone_number', phoneNumber)
    formData.append('otp', otpValue)
    
    const result = await verifyOTP(formData)
    if (result.success) {
      toast.success(result.message)
      startTransition(() => {
        setUser(result.data?.user || null)
        router.push('/dashboard')
      })
    } else {
      toast.error(result.message)
    }
  }

  const handleResend = async () => {
    if (!canResend) return
    
    const formData = new FormData()
    formData.append('phone_number', phoneNumber)
    
    const result = await sendOTP(formData)
    if (result.success) {
      setCanResend(false)
      setOtpValue('')
      toast.success('کد تایید مجدداً ارسال شد')
    } else {
      toast.error(result.message)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto border-none shadow-none">
      <CardHeader className="space-y-1">
        <CardDescription className="text-center">
          {step === 'phone' 
            ? 'برای ورود یا ثبت نام شماره موبایل خود را وارد کنید'
            : 'کد تایید به شماره موبایل شما ارسال شد'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          {step === 'phone' ? (
            <motion.form
              key="phone"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              onSubmit={handlePhoneSubmit}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="phone">شماره موبایل</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="09xxxxxxxxx"
                  dir="ltr"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(convertToEnglishNumbers(e.target.value))}
                  pattern="^09\d{9}$"
                  required
                  className="text-left"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-background" 
                disabled={pending || phoneNumber.length !== 11}
              >
                {pending ? (
                  <>
                    <Icons.spinner className="ml-2 h-4 w-4 animate-spin" />
                    در حال ارسال...
                  </>
                ) : (
                  'ارسال کد تایید'
                )}
              </Button>
            </motion.form>
          ) : (
            <motion.form
              key="otp"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              onSubmit={handleOtpSubmit}
              className="space-y-4"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>کد تایید</Label>
                  <PinInput value={otpValue} onChange={setOtpValue} />
                </div>
                <div className="flex items-center justify-between ">
                  <Button
                    type="button"
                    variant="link"
                    onClick={handleResend}
                    disabled={!canResend}
                    className={cn(
                      "px-0",
                      !canResend && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    ارسال مجدد کد
                  </Button>
                  {!canResend && (
                    <Timer onFinish={() => setCanResend(true)} />
                  )}
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-background " 
                disabled={pending || otpValue.length !== 6}
              >
                {pending ? (
                  <>
                    <Icons.spinner className="ml-2 h-4 w-4 animate-spin" />
                    در حال بررسی...
                  </>
                ) : (
                  'ورود'
                )}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </CardContent>
      <CardFooter className="text-center text-sm text-muted-foreground">
        {step === 'otp' && (
          <Button
            variant="link"
            className="w-full"
            onClick={() => {
              setStep('phone')
              setOtpValue('')
            }}
          >
            تغییر شماره موبایل
          </Button>
        )}
      </CardFooter>
    </Card>
  )
} 