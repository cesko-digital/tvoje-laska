import { getServerSession } from "next-auth";
import { GetProfileFieldsParams as GetProfileFieldsArgs } from "./profileField.type";
import { authOptions } from "app/api/auth/[...nextauth]/route";
import axios from "axios";
const http = axios.create({
    baseURL: process.env.WP_API_URL,
    headers: {
      "Content-type": "application/json",
    },
    validateStatus: status => status >= 200 && status < 500,
  });

export const getProfileFields = async (args: GetProfileFieldsArgs) => {
  const session = await getServerSession(authOptions);
  if (!session) return;

  const response = await http.get<GetProfileFieldsArgs>(`${process.env.WP_API_URL}/xprofile/fields`, {
    data: JSON.stringify({
        user_id: args.userId,
      }),
      headers: { Authorization: session.wpJwtToken }
  })

  return response.data;
};
