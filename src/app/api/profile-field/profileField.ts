import { getServerSession } from "next-auth";
import { ProfileFieldResponse, ProfileGroupResponse } from "./profileField.type";
import { authOptions } from "app/api/auth/[...nextauth]/route";
import axios from "axios";
const http = axios.create({
  baseURL: process.env.WP_API_URL,
  headers: {
    "Content-type": "application/json",
  },
  validateStatus: status => status >= 200 && status < 500,
});

export const getGroupsWithFields = async (args: { userId: number; groupId?: number }) => {
  const session = await getServerSession(authOptions);
  if (!session) return;

  const response = await http.get<ProfileGroupResponse[]>(`${process.env.WP_API_URL}/xprofile/groups`, {
    data: JSON.stringify({
      user_id: args.userId,
      profile_group_id: args.groupId,
      fetch_field_data: true,
      fetch_visibility_level: true,
      fetch_fields: true,
      context: "view",
    }),
    headers: { Authorization: session.wpJwtToken },
  });

  return response.data;
};

export const getProfileFields = async (args: {
  userId: number;
  groupId?: number;
}) => {
  const session = await getServerSession(authOptions);
  if (!session) return;

  const response = await http.get<ProfileFieldResponse[]>(`${process.env.WP_API_URL}/xprofile/fields`, {
    data: JSON.stringify({
      user_id: args.userId,
      profile_group_id: args.groupId,
      fetch_field_data: true,
      context: "view",
    }),
    headers: { Authorization: session.wpJwtToken },
  });

  return response.data;
};

export const getProfileField = async (args: { userId: number; fieldId: number }) => {
  const session = await getServerSession(authOptions);
  if (!session) return;

  const response = await http.get<ProfileFieldResponse>(`${process.env.WP_API_URL}/xprofile/fields/${args.fieldId}`, {
    data: JSON.stringify({
      user_id: args.userId,
      fetch_field_data: true,
      context: "view",
    }),
    headers: { Authorization: session.wpJwtToken },
  });

  return response.data;
};

/*https://developer.buddypress.org/bp-rest-api/reference/extended-profiles/profile-data/*/
export const updateProfileField = async (args: {
  fieldId: number;
  userId: number;
  //The value(s) (comma separated list of values needs to be used in case of multiple values) for the field data.
  value: string;
}) => {

  const session = await getServerSession(authOptions);
  if (!session) 
    return;
  
  const response = await http.post<ProfileFieldResponse>(
    `${process.env.WP_API_URL}/xprofile/${args.fieldId}/data/${args.userId}`,
    {
      context: "edit",
      value: args.value,
    },
    {
      headers: { Authorization: session.wpJwtToken },
    },
  );
  return response.data;
};
