import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session) {
    return redirect("/login");
  }

  return <div>{children}</div>;
};

export default layout;
