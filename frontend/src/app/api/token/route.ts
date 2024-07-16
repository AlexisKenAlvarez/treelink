import { decode, getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

  const secret = process.env.AUTH_SECRET;

  if (!secret) {
    throw new Error("AUTH_SECRET is not defined");
  }

  const token = await getToken({
    secureCookie: process.env.NODE_ENV === "production",
    req,
    secret,
    salt:
    process.env.NODE_ENV === "production"
      ? "__Secure-authjs.session-token"
      : "authjs.session-token",
    cookieName: "authjs.session-token",
    raw: true,
  });

  const decoded = await decode({
    token,
    secret,
    salt:
      process.env.NODE_ENV === "production"
        ? "__Secure-authjs.session-token"
        : "authjs.session-token",
  })

  console.log("🚀 ~ GET ~ decoded:", decoded)
  return NextResponse.json({
    token,
  });
}
