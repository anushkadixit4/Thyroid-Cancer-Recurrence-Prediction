import { Metadata } from "next"
import Link from "next/link"
import { Film, Hospital } from "lucide-react"

import { UserAuthForm } from "@/components/auth/auth-form"

export const metadata: Metadata = {
  title: "Login - ThyroCare",
  description: "Login to your account",
}

export default function LoginPage() {
  return (
    <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-1 lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <div className="flex items-center justify-center gap-3">
            <div className="flex aspect-square size-8 items-center justify-center rounded bg-green-400 text-white">
              <Hospital className="size-6" />
            </div>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome to ThyroCare
          </h1>
          <p className="text-sm text-muted-foreground">
            Login and register for the app
          </p>
        </div>
        <UserAuthForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <Link
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  )
} 