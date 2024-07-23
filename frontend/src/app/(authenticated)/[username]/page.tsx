import { getClient } from "@/lib/client";
import { GET_USER_WITH_USERNAME, USER_QUERY_WITH_LINK } from "@/lib/graphql";
import UserOverview from "@/views/UserOverview";
import { notFound } from "next/navigation";
export const revalidate = 0
const page = async ({ params }: { params: { username: string } }) => {
  const { username } = params;

  const client = getClient();

  const { data } = await client.query({
    query: GET_USER_WITH_USERNAME,
    variables: {
      username: username,
    },
    fetchPolicy: "no-cache"
  });

  if (!data.getUserWithUsername) {
    return notFound()
  }

  return <UserOverview user={data.getUserWithUsername} />;
};

export default page;
