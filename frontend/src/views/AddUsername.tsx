"use client";

import { Badge } from "@/components/ui/badge";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignOut } from "@/lib/auth-function";
import { UPDATE_USER_MUTATION } from "@/lib/graphql";
import { cn } from "@/lib/utils";

const AddUsername = () => {
  const router = useRouter();

  const { data: session, update } = useSession();
  const [addUsername, { loading }] = useMutation(UPDATE_USER_MUTATION);

  const formSchema = z.object({
    username: z
      .string()
      .min(2, { message: "Invalid username" })
      .max(50, { message: "Username too long!" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await addUsername({
        variables: {
          value: {
            id: parseInt(session?.user.id ?? ""),
            username: values.username,
          },
        },
      });
      update({
        username: values.username,
      });

      router.push("/admin");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex h-screen w-full">
      <div className="flex w-full flex-col items-center justify-center gap-4 p-3">
        <div className="flex items-center gap-2">
          <button className="flex gap-2" onClick={() => router.push("/")}>
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

        <div className="text-center">
          <h1 className="text-xl font-bold sm:text-2xl">
            Welcome to Treelink!
          </h1>
          <p className="max-w-xs text-center text-xs opacity-70">
            Choose your Treelink username, you can still change it later.
          </p>
        </div>

        <div className="flex w-full max-w-sm flex-col gap-3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl className="relative">
                      <div className="relative h-full">
                        <Input
                          className="rounded-full pl-[6.3rem]"
                          {...field}
                        />
                        <div className="absolute bottom-0 left-3 top-0 my-auto flex h-fit gap-1 text-sm opacity-60">
                          <p>treelink.ink &#47;</p>
                          <p
                            className={cn("", {
                              "opacity-0": form.watch("username").length > 0,
                            })}
                          >
                            username
                          </p>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage className="text-center" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={!form.formState.isValid || loading}
              >
                {loading ? "Loading..." : "Continue"}
              </Button>
            </form>
          </Form>
          <div className="flex items-center justify-center gap-1 text-sm opacity-60">
            <p className="">Don&apos;t want to continue?</p>
            <button
              className="hover:underline"
              onClick={() => {
                SignOut();
                router.refresh();
              }}
            >
              Signout
            </button>
          </div>
        </div>
      </div>
      <div className="relative hidden h-full w-full lg:block">
        <Image
          alt="background"
          width={1800}
          height={1000}
          src="/add-username.png"
          className="absolute left-0 top-0 h-full w-full object-cover object-center"
        />
      </div>
    </div>
  );
};

export default AddUsername;
