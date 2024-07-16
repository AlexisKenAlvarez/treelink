import { auth } from "@/auth";
import { getClient } from "@/lib/client";
import { USER_QUERY } from "@/lib/graphql";
import AdminDashboard from "@/views/AdminDashboard";
import { Session } from "next-auth";

const page = async () => {
  const client = getClient();
  const session = (await auth()) as NonNullable<Session>;

  const { data } = await client.query({
    query: USER_QUERY,
    variables: {
      email: session.user.email ?? "",
    },
  });

  return <AdminDashboard userData={data.getUser!} />;
};

export default page;
