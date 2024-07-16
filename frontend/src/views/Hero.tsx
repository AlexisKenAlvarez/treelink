"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";

import { BiLogoPostgresql } from "react-icons/bi";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { SiGraphql, SiPrisma } from "react-icons/si";

import Footer from "@/components/Footer";
import Marquee from "@/components/magicui/marquee";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";

import { useEffect } from "react";

const Hero = () => {
  const showcase = ["aj", "mary", "aki", "molly"];

  const stacks = [
    {
      icon: RiNextjsFill,
      name: "Next.js",
    },
    {
      icon: RiTailwindCssFill,
      name: "Tailwind CSS",
    },
    {
      icon: SiPrisma,
      name: "Prisma",
    },
    {
      icon: SiGraphql,
      name: "GraphQL",
    },
    {
      icon: BiLogoPostgresql,
      name: "PostgreSQL",
    },
  ];

  return (
    <>
      <div className="p-5">
        <div className="sm:text-center text-left mt-24 space-y-5" id="hero">
          <Badge className="p-2 px-5 bg-gradient-to-br from-accent-secondary to-accent">
            Treelink is finally out, still in beta.
          </Badge>
          <h1 className="sm:text-5xl text-5xl max-w-screen-sm mx-auto font-bold">
            Everything you are. In one simple link in bio.
          </h1>
          <p className="max-w-md sm:mx-auto mx-0">
            Join 5+ people using Treelink for their link in bio. One link to help
            you share everything you create.
          </p>

          <div className="flex gap-2 justify-center sm:flex-row flex-col">
            <Button>Claim your Treelink</Button>
            <Button variant={"outline"}>
              <FaGithub />
              View on Github
            </Button>
          </div>

          <div className="flex gap-2 justify-center">
            {stacks.map((stack) => (
              <TooltipProvider key={stack.name}>
                <Tooltip>
                  <TooltipTrigger>
                    <stack.icon size={24} className="fill-primary" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{stack.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>

        <div className="mt-32" id="showcase">
          <div className="text-center space-y-3">
            <h1 className="font-bold text-4xl capitalize">showcase</h1>
            <p className="">
              Choose your own background and find the best one that will fit
              your style.
            </p>
          </div>

          <div className="w-fit mt-10 relative">
            <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
            <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
            <Marquee className="[--duration:20s]">
              {showcase.map((user) => (
                <Image
                  key={user}
                  alt={user}
                  src={`/showcase/${user}.png`}
                  width={300}
                  height={300}
                  className="rounded-lg"
                />
              ))}
            </Marquee>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Hero;
