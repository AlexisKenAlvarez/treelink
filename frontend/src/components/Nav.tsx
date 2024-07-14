"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { CiLinkedin } from "react-icons/ci";
import { FaGithub, FaInstagram } from "react-icons/fa";
import { Button } from "./ui/button";
import { PanelTopOpen } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Session } from "next-auth";
import { SignOut } from "@/lib/auth-function";
import { useRouter } from "next/navigation";

const Nav = ({ session }: { session: Session | null }) => {
  const router = useRouter()
  const nav_list = [
    {
      title: "templates",
      link: "/templates",
    },

    {
      title: "pricing",
      link: "/coming-soon",
    },
    {
      title: "help",
      link: "/comin-soon",
    },
  ];

  const socials = [
    {
      icon: FaGithub,
      link: "",
    },
    {
      icon: FaInstagram,
      link: "",
    },
    {
      icon: CiLinkedin,
      link: "",
    },
  ];

  return (
    <nav className="w-full border-b">
      <div className="w-full p-4 bg-accent text-white text-xs text-center font-medium">
        ✨Introducing Linkme Pro - 50+ blocks and templates to build beautiful
        landing pages in minutes.
      </div>
      <div className="p-3 flex justify-between max-w-screen-xl mx-auto">
        <div className="hidden items-center gap-8 md:flex">
          <div className="flex items-center gap-2">
            <button className="flex gap-2">
              <Image
                src="/logo.webp"
                alt="logo"
                width={50}
                height={50}
                className="w-6 h-6 shrink-0"
              />
              <h1 className="uppercase font-bold">Linkme</h1>
            </button>
            <Badge variant={"secondary"} className="text-xs">
              Beta
            </Badge>
          </div>

          <ul className="text-sm flex gap-5 font-medium">
            {nav_list.map((item) => (
              <Link href={item.link} key={item.title}>
                <li className="capitalize">{item.title}</li>
              </Link>
            ))}
          </ul>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <button className="md:hidden block">
              <PanelTopOpen className="-rotate-90" />
            </button>
          </SheetTrigger>
          <SheetContent side={"left"} className="text-left">
            <SheetHeader>
              <SheetTitle className="text-left">
                <div className="flex items-center gap-3">
                  <button className="flex gap-2">
                    <Image
                      src="/logo.webp"
                      alt="logo"
                      width={50}
                      height={50}
                      className="w-6 h-6 shrink-0"
                    />
                    <h1 className="uppercase font-bold">Linkme</h1>
                  </button>
                  <Badge variant={"secondary"} className="text-xs">
                    Beta
                  </Badge>
                </div>
              </SheetTitle>
              <ul className="text-sm flex flex-col gap-5 font-medium text-left !mt-5">
                {nav_list.map((item) => (
                  <Link href={item.link} key={item.title}>
                    <li className="capitalize">{item.title}</li>
                  </Link>
                ))}
              </ul>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        <div className="flex gap-5">
          {session ? (
            <Button onClick={() => {
              SignOut()
              router.refresh()
            }}>Sign out</Button>
          ) : (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          )}

          <ul className="flex items-center gap-5">
            {socials.map((social, index) => (
              <Link key={index} href={social.link}>
                <li>
                  <social.icon />
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
