import { auth } from "@/auth";
import AdminLayout from "@/views/AdminLayout";
import { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth()
  return (
    <div className="">
      <AdminLayout session={session!}>{children}</AdminLayout>
    </div>
  );
};

export default layout;
