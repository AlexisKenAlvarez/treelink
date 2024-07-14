import { auth } from "@/auth";
import Nav from "@/components/Nav";
import Hero from "@/views/Hero";

const page = async () => {
  const session = await auth();
  console.log("🚀 ~ page ~ session:", session)

  return (
    <>
      <Nav session={session} />
      <Hero />
    </>
  );
};

export default page;
