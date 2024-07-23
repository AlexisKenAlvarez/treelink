"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Crown,
  Link as LinkIcon,
  Loader,
  LogOut,
  Palette,
  PanelTopOpen,
  Settings,
  Share2,
} from "lucide-react";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOut } from "@/lib/auth-function";
import { useSession } from "next-auth/react";
import { useQuery } from "@apollo/client";
import { USER_QUERY } from "@/lib/graphql";
import { GetUserQueryQuery } from "@/__generated__/graphql";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  {
    title: "Links",
    link: "/admin",
    icon: LinkIcon,
  },
  {
    title: "Theme",
    link: "/admin/theme",
    icon: Palette,
  },
  {
    title: "Settings",
    link: "/admin/settings",
    icon: Settings,
  },
];

const AdminLayout = ({
  children,
  session,
}: {
  children: ReactNode;
  session: Session;
}) => {
  const { data, loading } = useQuery(USER_QUERY, {
    variables: {
      email: session?.user.email ?? "",
    },
  });

  return (
    <AnimatePresence>
      {loading ? (
        <motion.div key={"loader"} exit={{opacity: 0}} transition={{duration: 1}} className="flex fixed z-10 top-0 left-0 h-screen w-full items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <Loader className="animate-spin" />
            <p className="text-lg font-bold">TREELINK</p>
          </div>
        </motion.div>
      ) : (
        <motion.div initial={{opacity: 0}} animate={{opacity: 100}} transition={{duration: 0.5}} className="min-h-screen w-full p-2">
          <div className="flex h-[calc(100vh-1rem)] w-full rounded-md border">
            <div className="hidden h-full w-56 shrink-0 flex-col border-r transition-all duration-300 ease-in-out lg:flex">
              <Navigation user={data?.getUser} />
            </div>
            <div className="flex h-full w-full flex-col">
              <div className="flex h-16 w-full items-center justify-between border-b p-3">
                <Sheet>
                  <SheetTrigger asChild>
                    <button className="flex rounded-full lg:hidden">
                      <PanelTopOpen className="-rotate-90" />
                    </button>
                  </SheetTrigger>
                  <SheetContent
                    side={"left"}
                    className="flex flex-col text-left"
                  >
                    <Navigation user={data?.getUser} />
                  </SheetContent>
                </Sheet>
                <Button variant={"outline"}>
                  <span className="hidden sm:block">
                    🔥Your Treelink is live:
                  </span>{" "}
                  <span className="underline">
                    treelink.one&#47;{data?.getUser?.username}
                  </span>
                </Button>

                <Button variant={"outline"}>
                  <Share2 size={14} />
                  <p className="hidden sm:block">Share</p>
                </Button>
              </div>
              <div className="w-full flex-1 p-2">{children}</div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Navigation = ({ user }: { user: GetUserQueryQuery["getUser"] }) => {
  const pathname = usePathname();

  return (
    <>
      <div className={cn("flex h-16 w-full items-center border-b pl-3")}>
        <div className="flex items-center gap-3">
          <button className="flex gap-2">
            <Image
              src="/logo.webp"
              alt="logo"
              width={50}
              height={50}
              className="h-6 w-6 shrink-0"
            />
            <h1 className="font-bold uppercase">Treelink</h1>
          </button>
          <Badge variant={"secondary"} className="text-xs">
            Beta
          </Badge>
        </div>
      </div>
      <div className="flex w-full flex-1 flex-col justify-between p-2">
        <div className="space-y-2">
          {links.map((link) => (
            <Link
              key={link.title}
              href={link.link}
              className={cn(
                "relative flex items-center gap-3 rounded-md p-2 pl-4",
                {
                  "bg-slate-100 font-medium": pathname === link.link,
                },
              )}
            >
              <div
                className={cn(
                  "absolute left-0 top-0 hidden h-full w-1 rounded-bl-sm rounded-tl-md bg-accent",
                  {
                    block: pathname === link.link,
                  },
                )}
              />
              <link.icon size={18} />
              <p className="text-sm">{link.title}</p>
            </Link>
          ))}
        </div>

        <div className="space-y-3 p-2">
          <Button variant={"secondary"} className="w-full">
            <Crown size={14} />
            Pro &#40;Coming Soon&#41;
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex h-10 pr-2 w-full items-center gap-3 rounded-full border border-slate-200">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.image ?? ""} />
                  <AvatarFallback>TL</AvatarFallback>
                </Avatar>

                <p className="font-medium truncate">@{user?.username}</p>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="start">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="gap-2"
                onClick={async () => {
                  await SignOut();
                  window.location.reload();
                }}
              >
                <LogOut size={16} />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
