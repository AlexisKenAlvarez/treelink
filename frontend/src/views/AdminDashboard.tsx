/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { GetUserQueryQuery } from "@/__generated__/graphql";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UPDATE_USER_MUTATION, USER_QUERY } from "@/lib/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { Loader, ScanEye } from "lucide-react";
import Image from "next/image";
import { useDebounceCallback } from "usehooks-ts";
import { z } from "zod";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

const AdminDashboard = ({
  userData,
}: {
  userData: NonNullable<GetUserQueryQuery["getUser"]>;
}) => {
  const {
    data: user,
    client,
    refetch,
    loading,
  } = useQuery(USER_QUERY, {
    variables: {
      email: userData.email,
    },
  });
  const [updateUser, {loading: updateLoading}] = useMutation(UPDATE_USER_MUTATION);
  const profile_title = z.string().min(1).max(100);
  const bio = z.string().min(1).max(250);

  const handleChangeTitle = useDebounceCallback(async (value: string) => {
    try {
      profile_title.parse(value);
      await updateUser({
        variables: {
          oldValue: {
            id: userData.id,
            profile_title: user?.getUser?.profile_title,
          },
          newValue: {
            profile_title: value,
          },
        },
      });
      refetch();
    } catch (error) {
      console.log(error);
    }
  }, 2000);

  const handleChangeBio = useDebounceCallback(async (value: string) => {
    try {
      bio.parse(value);
      await updateUser({
        variables: {
          oldValue: {
            id: userData.id,
            bio: user?.getUser?.bio,
          },
          newValue: {
            bio: value,
          },
        },
      });
      refetch();
    } catch (error) {
      console.log(error);
    }
  }, 2000);


  return (
    <fieldset className="h-full w-full border p-3">
      <legend className="px-2 text-sm">Admin Dashboard</legend>

      <div className="flex h-full w-full gap-10">
        <div className="w-full space-y-3">
          <div className="">
            <Label htmlFor="profile-title">Profile Title</Label>
            <Input
              id="profile-title"
              placeholder="shadcn"
              onChange={(e) => handleChangeTitle(e.target.value)}
              defaultValue={user?.getUser?.profile_title ?? ""}
              maxLength={100}
            />
          </div>

          <div className="">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              placeholder="shadcn"
              id="bio"
              defaultValue={user?.getUser?.bio ?? ""}
              onChange={(e) => handleChangeBio(e.target.value)}
              maxLength={250}
            />
          </div>
        </div>
        <div className="relative hidden h-full w-full flex-col items-center space-y-2 rounded-md bg-slate-100 p-5 pt-10 md:flex">
          <Loader className={cn("absolute hidden top-3 left-3 animate-spin", {
            "block": updateLoading
          })} size={18} />
          <LinkPreview user={user} />
        </div>

        <Drawer>
          <DrawerTrigger className="fixed bottom-8 left-0 right-0 mx-auto flex h-20 w-20 flex-col items-center justify-center rounded-md border bg-white md:hidden">
            <ScanEye />
            <p className="text-sm">Preview</p>
          </DrawerTrigger>
          <DrawerContent className="h-[90vh]">
            <DrawerHeader>
              <DrawerTitle>Preview</DrawerTitle>
            </DrawerHeader>
            <div className="flex flex-col items-center justify-center space-y-2 p-5">
              <LinkPreview user={user} />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </fieldset>
  );
};

const LinkPreview = ({ user }: { user: GetUserQueryQuery | undefined }) => {
  return (
    <>
      <Image
        src={(user?.getUser?.image as string) ?? ""}
        alt={user?.getUser?.name as string}
        width={500}
        height={500}
        className="w-20 rounded-full"
      />
      <div className="text-center">
        <h1 className="font-bold">@{user?.getUser?.profile_title}</h1>
        <h1 className="text-sm">{user?.getUser?.bio}</h1>
      </div>
    </>
  );
};

export default AdminDashboard;
