"use client";

import AddUsername from "@/views/AddUsername";
import { Session } from "next-auth";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";

const ClientWrapper = ({
  children,
  session,
}: {
  children: ReactNode;
  session: Session | null;
}) => {
  const [username, setUsername] = useState<string | null>(null);
  const handleChangeUsername = useCallback((value: string) => {
    setUsername(value);
  }, []);

  useEffect(() => {
    if (session) {
      setUsername(session.user.username);
    }
  }, [session]);

  if (!session) {
    return <>{children}</>;
  }

  if (username || session?.user.username) {
    return <>{children}</>;
  }

  return <AddUsername setUsername={handleChangeUsername} />;
};

export default ClientWrapper;
