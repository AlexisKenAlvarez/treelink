import { auth } from "@/auth";
import Login from "@/views/Login";

const page = async () => {
  const session = await auth()
  return <Login />;
};

export default page;
