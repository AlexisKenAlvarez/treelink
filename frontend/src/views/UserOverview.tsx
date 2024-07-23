"use client";

import { GetUsernameUserQuery } from "@/__generated__/graphql";
import Image from "next/image";
import Link from "next/link";
import { SocialIcon } from "react-social-icons";

const UserOverview = ({
  user,
}: {
  user: NonNullable<GetUsernameUserQuery["getUserWithUsername"]>;
}) => {
  console.log("🚀 ~ UserOverview ~ user:", user);
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center">
      <Image alt="User" width={1000} height={1000} src={user.image} className="absolute top-0 left-0 bottom-0 right-0" />
      <div className="relative z-10 flex w-full flex-col items-center">
        <Image
          src={(user.image as string) ?? ""}
          alt={user.name as string}
          width={500}
          height={500}
          className="w-20 rounded-full"
        />
        <div className="mt-2 text-center">
          <h1 className="font-bold">@{user.profile_title}</h1>
          <h1 className="text-sm">{user.bio}</h1>
        </div>

        <div className="mt-4 w-full max-w-xs space-y-4">
          {user.links?.map((link) => (
            <Link
              href={link.url}
              target="_blank"
              className="shadowed-button relative flex h-14 w-full items-center justify-center rounded-full border border-black bg-white"
              key={link.id}
            >
              <p className="text-black">{link.title}</p>

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

        <p className="left-0 right-0 mx-auto mt-10 w-fit text-sm font-bold uppercase">
          Join Treelink
        </p>
      </div>
    </div>
  );
};

export default UserOverview;
