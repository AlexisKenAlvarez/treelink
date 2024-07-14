import { auth } from "@/auth";
import Login from "@/views/Login";

const page = async () => {
  const session = await auth()
  console.log("🚀 ~ page ~ session:", session)
  return <Login />;
};

export default page;
