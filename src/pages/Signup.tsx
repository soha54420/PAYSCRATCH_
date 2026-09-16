import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { ShieldAlert, Loader2, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
})

type SignupFormValues = z.infer<typeof signupSchema>

export function Signup() {
  const navigate = useNavigate()
  const [isSuccess, setIsSuccess] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  })

  const onSubmit = async () => {
    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSuccess(true)
    setTimeout(() => {
      navigate("/login")
    }, 2000)
  }

  if (isSuccess) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 animate-in fade-in zoom-in-95 duration-500">
        <Card className="w-full max-w-md shadow-xl shadow-primary/5 text-center py-8">
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <div className="h-16 w-16 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8" />
              </div>
            </div>
            <h2 className="text-2xl font-display font-bold">Account Created</h2>
            <p className="text-muted-foreground">
              Your PayScratch workspace is ready. Redirecting to login...
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex-1 flex items-center justify-center p-6 animate-in fade-in zoom-in-95 duration-500">
      <Card className="w-full max-w-md shadow-xl shadow-primary/5">
        <CardHeader className="space-y-2 text-center pb-8">
          <div className="flex justify-center mb-2 text-primary">
            <ShieldAlert className="h-10 w-10" />
          </div>
          <CardTitle className="text-2xl font-display font-bold">Create an account</CardTitle>
          <CardDescription>
            Enter your details below to create your workspace.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Jane Doe"
                {...register("name")}
                className={errors.name ? "border-destructive focus-visible:ring-destructive/20" : ""}
                disabled={isSubmitting}
              />
              {errors.name && (
                <p className="text-[13px] text-destructive font-medium">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Work Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="jane@company.com"
                {...register("email")}
                className={errors.email ? "border-destructive focus-visible:ring-destructive/20" : ""}
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-[13px] text-destructive font-medium">{errors.email.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
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
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center border-t border-border pt-6 pb-6">
          <div className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Sign In
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
