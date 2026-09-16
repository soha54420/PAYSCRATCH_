import { useState } from "react"
import { Link } from "react-router"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { ShieldAlert, Loader2, MailCheck, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
})

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

export function ForgotPassword() {
  const [isSuccess, setIsSuccess] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async () => {
    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSuccess(true)
  }

  if (isSuccess) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 animate-in fade-in zoom-in-95 duration-500">
        <Card className="w-full max-w-md shadow-xl shadow-primary/5 text-center py-8">
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <div className="h-16 w-16 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                <MailCheck className="h-8 w-8" />
              </div>
            </div>
            <h2 className="text-2xl font-display font-bold">Check your email</h2>
            <p className="text-muted-foreground">
              We've sent a password reset link to your email address.
            </p>
            <div className="pt-4">
              <Button asChild variant="outline" className="w-full">
                <Link to="/login">Back to Sign In</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex-1 flex items-center justify-center p-6 animate-in fade-in zoom-in-95 duration-500">
      <Card className="w-full max-w-md shadow-xl shadow-primary/5">
        <CardHeader className="space-y-2 text-center pb-8 relative">
          <Link to="/login" className="absolute left-6 top-6 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex justify-center mb-2 text-primary pt-2">
            <ShieldAlert className="h-10 w-10" />
          </div>
          <CardTitle className="text-2xl font-display font-bold">Reset Password</CardTitle>
          <CardDescription>
            Enter your email and we'll send you a recovery link.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@payscratch.com"
                {...register("email")}
                className={errors.email ? "border-destructive focus-visible:ring-destructive/20" : ""}
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-[13px] text-destructive font-medium">{errors.email.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full h-11 mt-6" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending link...
                </>
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
