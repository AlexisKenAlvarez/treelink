import { ApolloWrapper } from "@/lib/Apollo-wrapper";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { auth } from "@/auth";
import AddUsername from "@/views/AddUsername";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Treelink",
  description: "Share your link to anyone.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  console.log("🚀 ~ session:", session)

  return (
    <html lang="en">
      <body className={`${inter.className} ${GeistSans.variable} !font-sans`}>
        <SessionProvider session={session}>
          <ApolloWrapper>
            {session && !session.user.username ? <AddUsername /> : children}
          </ApolloWrapper>
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
