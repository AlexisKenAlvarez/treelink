"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Share2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const AdminDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="w-full min-h-screen p-2">
      <div className="h-[calc(100vh-1rem)] w-full border rounded-md flex">
        <div className={cn("w-56 h-full shrink-0 border-r transition-all ease-in-out duration-300", {
          "w-16": collapsed
        })}>
          <div
            className={cn(
              "w-full h-16 border-b flex items-center pl-3",
            )}
          >
            <Image
              alt="Logo"
              src="/logo.png"
              width={150}
              height={150}
              className="w-9"
            />
          </div>
        </div>
        <div className="w-full h-full flex flex-col">
          <div className="w-full h-16 border-b flex justify-between items-center p-3">
            <h1
              className="text-xl font-bold"
              onClick={() => {
                setCollapsed((curr) => !curr);
              }}
            >
              TREELINK
            </h1>

            <Button variant={"outline"}>
              <Share2 size={14} />
              Share
            </Button>
          </div>
          <div className="w-full flex-1"></div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
