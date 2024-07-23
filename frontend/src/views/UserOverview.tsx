"use client";

import { GetUsernameUserQuery } from "@/__generated__/graphql";
import { Button } from "@/components/ui/button";
import { getClient } from "@/lib/client";
import { GET_USER_WITH_USERNAME } from "@/lib/graphql";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { SocialIcon } from "react-social-icons";

const UserOverview = ({
  user,
}: {
  user: NonNullable<GetUsernameUserQuery["getUserWithUsername"]>;
}) => {
  const { client } = useQuery(GET_USER_WITH_USERNAME);
  useEffect(() => {
    client.clearStore();
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-5">
      <div className="absolute bottom-0 left-0 right-0 top-0 h-screen w-[100vw]">
        <Image
          alt="User"
          width={1000}
          height={1000}
          src={user.image}
          className="relative h-full w-full object-cover"
        />
        <div className="absolute left-0 top-0 z-10 h-full w-full bg-white/70 backdrop-blur-xl"></div>
        <div className="noise-background absolute left-0 top-0 z-20 h-full w-full"></div>
      </div>

      <div className="relative z-30 flex w-full flex-col items-center">
        <Image
          src={(user.image as string) ?? ""}
          alt={user.name as string}
          width={500}
          height={500}
          className="w-24 rounded-full"
        />
        <div className="mt-2 text-center">
          <h1 className="text-xl font-bold">@{user.profile_title}</h1>
          <h1 className="">{user.bio}</h1>
        </div>

        <div className="mt-4 w-full max-w-xs space-y-4">
          {user.links?.map((link) => (
            <Link
              href={link.url}
              target="_blank"
              className="shadowed-button relative flex h-14 w-full items-center justify-center rounded-full border border-black bg-white"
              key={link.id}
            >
              <p className="font-medium text-black">{link.title}</p>

              {link.show_icon ? (
                link.uploaded_icon ? (
                  <div className="absolute left-2 h-[40px] w-[40px] rounded-full bg-black">
                    <Image
                      src={link.uploaded_icon as string}
                      alt="Icon"
                      width={200}
                      height={200}
                      className="h-full w-full"
                    />
                  </div>
                ) : (
                  <div className="absolute left-2">
                    <SocialIcon
                      url={link.url}
                      className=""
                      as="div"
                      style={{ width: 40, height: 40 }}
                    />
                  </div>
                )
              ) : null}
            </Link>
          ))}
        </div>

        <Button variant={"secondary"} className="mt-20 bg-white" asChild>
          <Link
            href="/login"
            className="left-0 right-0 mx-auto w-fit text-sm uppercase"
          >
            <Image
              alt="logo"
              width={150}
              height={150}
              src="/logo.png"
              className="w-5"
            />
            <p className="!font-bold">Join Treelink</p>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default UserOverview;
