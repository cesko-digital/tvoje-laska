
import axios from "axios";
import { getServerSession } from "next-auth";
import { FriendResponse } from "./friends.type";
import { authOptions } from "../auth/[...nextauth]/route";
const http = axios.create({
  baseURL: process.env.WP_API_URL,
  headers: {
    "Content-type": "application/json",
  },
  validateStatus: status => status >= 200 && status < 500,
});

export const getFriends = async (options: Record<string, unknown>, requestParams: {
    user_id: number
}) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return;

    const response = await http.get<FriendResponse[]>(`${process.env.WP_API_URL}/friends`, {
      data: JSON.stringify(requestParams),
      headers: { Authorization: session.wpJwtToken },
    });

    return response.data;
  } catch (error) {
    console.log(error);
    // TODO: log error
    return;
  }
};