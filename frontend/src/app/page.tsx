import { auth } from "@/auth";
import Nav from "@/components/Nav";
import AddUsername from "@/views/AddUsername";
import Hero from "@/views/Hero";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();

  if (session && session.user.username) {
    return redirect("/admin")
  }

  return (
    <>
      {session && !session.user.username ? (
        <AddUsername />
      ) : (
        <>
          <Nav session={session} />
          <Hero />
        </>
      )}
    </>
  );
};

export default page;
