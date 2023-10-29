import { getServerSession } from "next-auth";
import { GetProfileFieldsParams as GetProfileFieldsArgs } from "./profileField.type";
import { authOptions } from "app/api/auth/[...nextauth]/route";

export const getProfileFields = async (
    args: GetProfileFieldsArgs,
  ) => {
    const session = await getServerSession(authOptions);
    if (!session) return;

    try {
      const headers = { Authorization: session.wpJwtToken };
      const response = await fetch(`${process.env.WP_API_URL}/xprofile/fields`, {
        method: "GET",
        headers,
        body: JSON.stringify({
            user_id: args.userId
        }),
      });
      
      return (await response.json()) as GetProfileFieldsArgs;
    } catch (error) {
      // TODO: log error
      return;
    }
  };