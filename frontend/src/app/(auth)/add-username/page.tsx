"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LogIn } from "@/lib/auth-function";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Page = () => {
  const router = useRouter();
  return (
    <div className="w-full h-screen flex">
      <div className="w-full flex flex-col items-center justify-center gap-4 p-3">
        <div className="flex items-center gap-2">
          <button className="flex gap-2" onClick={() => router.push("/")}>
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

        <h1 className="sm:text-2xl text-xl font-bold">Welcome to Linkme!</h1>

        <p className="text-xs max-w-xs text-center opacity-70">
          Choose your Linkme username, you can still change it later.
        </p>

        <div className="flex flex-col w-full max-w-sm gap-3">
          
        </div>

      </div>
      <div className="w-full h-full relative lg:block hidden">
        <Image
          alt="background"
          width={1800}
          height={1000}
          src="/add-username.png"
          className="w-full h-full top-0 left-0 absolute xl:object-right object-center object-cover"
        />
      </div>
    </div>
  );
};

export default Page;
