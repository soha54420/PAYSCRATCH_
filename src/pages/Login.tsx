import { Link, useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { ShieldAlert, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function Login() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async () => {
    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 1500))
    // On success, redirect to dashboard
    navigate("/dashboard")
  }

  return (
    <div className="flex-1 flex items-center justify-center p-6 animate-in fade-in zoom-in-95 duration-500">
      <Card className="w-full max-w-md shadow-xl shadow-primary/5">
        <CardHeader className="space-y-2 text-center pb-8">
          <div className="flex justify-center mb-2 text-primary">
            <ShieldAlert className="h-10 w-10" />
          </div>
          <CardTitle className="text-2xl font-display font-bold">Sign in to PayScratch</CardTitle>
          <CardDescription>
            Enter your email and password to access the dashboard.
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
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-[13px] text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                {...register("password")}
                className={errors.password ? "border-destructive focus-visible:ring-destructive/20" : ""}
                disabled={isSubmitting}
              />
              {errors.password && (
                <p className="text-[13px] text-destructive font-medium">{errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full h-11 mt-6" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center border-t border-border pt-6 pb-6">
          <div className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary font-medium hover:underline">
              Create one
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
