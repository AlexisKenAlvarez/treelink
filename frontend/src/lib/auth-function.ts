"use server";
import { signIn, signOut } from "@/auth";
import { revalidatePath } from "next/cache";

export async function LogIn(provider: "google" | "facebook" | "github") {
  return await signIn(provider);
}

export async function SignOut() {
  return await signOut();
}

export default async function revalidateUserPath({
  username,
}: {
  username: string;
}) {
  revalidatePath("/" + username);
}
