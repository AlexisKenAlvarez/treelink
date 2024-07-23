import { getClient } from "@/lib/client";
import { GET_USER_WITH_USERNAME } from "@/lib/graphql";
import UserOverview from "@/views/UserOverview";
import { notFound } from "next/navigation";
export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;
  return {
    title: `${username} - Treelink.`,
  };
}

const page = async ({ params }: { params: { username: string } }) => {
  const { username } = params;

  const client = getClient();

  const { data } = await client.query({
    query: GET_USER_WITH_USERNAME,
    variables: {
      username: username,
    },
    fetchPolicy: "no-cache",
  });

  if (!data.getUserWithUsername) {
    return notFound();
  }

  return <UserOverview user={data.getUserWithUsername} />;
};

export default page;
