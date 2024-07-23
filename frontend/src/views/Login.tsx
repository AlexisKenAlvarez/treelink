"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LogIn } from "@/lib/auth-function";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const router = useRouter()
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
            <h1 className="uppercase font-bold">Treelink</h1>
          </button>
          <Badge variant={"secondary"} className="text-xs">
            Beta
          </Badge>
        </div>

        <h1 className="sm:text-2xl text-xl font-bold">Sign In to your Treelink account</h1>

        <div className="flex flex-col w-full max-w-sm gap-3">
          <Button onClick={() => {
            LogIn("google")
          }}>
            <FcGoogle size={16} />
            <span>Continue with Google</span>
          </Button>
          <Button variant={"outline"} disabled>
            <FaGithub size={16} />
            <span>Continue with Github</span>
          </Button>
          <Button variant={"outline"} disabled>
            <FaFacebook size={16} />
            <span>Continue with Facebook</span>
          </Button>
        </div>

        <p className="text-xs max-w-xs text-center opacity-70">
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
      <div className="w-full h-full relative lg:block hidden">
        <Image
          alt="background"
          width={1800}
          height={1000}
          src="/signin.png"
          className="w-full h-full top-0 left-0 absolute xl:object-right object-center object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
