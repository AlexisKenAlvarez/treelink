'use server'
import { signIn, signOut } from "@/auth"

export async function LogIn(provider: "google" | "facebook" | "github") {
  return await signIn(provider)
}

export async function SignOut() {
  return await signOut()
}