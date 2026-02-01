"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { FcGoogle } from "react-icons/fc"
import axios from "axios"
import { signIn, useSession } from "next-auth/react"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const session = useSession()
  console.log(session)

  const handleRegister = async (e:React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      })
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card onSubmit={handleRegister} className="w-full max-w-sm shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-green-600">
            Create Account
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Join Snapcart today
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            onClick={handleRegister}
            className="w-full bg-gray-300 text-black hover:bg-gray-400"
          >
            Register
          </Button>

          <div className="flex items-center gap-2">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">OR</span>
            <Separator className="flex-1" />
          </div>

          <Button onClick={() => signIn("google")} variant="outline" type="submit" className="w-full flex gap-2">
            <FcGoogle size={20} />
            Continue with Google
          </Button>

          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-green-600 hover:underline">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
