import { auth } from "@/auth";
import Nav from "@/components/Nav";
import AddUsername from "@/views/AddUsername";
import Hero from "@/views/Hero";

const page = async () => {
  const session = await auth();
  console.log("🚀 ~ page ~ session:", session);

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
