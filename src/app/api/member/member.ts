import { getServerSession } from "next-auth/next";
import { authOptions } from "app/api/auth/[...nextauth]/route";

import axios from "axios";
const http = axios.create({
  baseURL: process.env.WP_API_URL,
  headers: {
    "Content-type": "application/json",
  },
  validateStatus: status => status >= 200 && status < 500,
});

import {
  IGetCurrentMemberRequestParams,
  IGetMemberRequestParams,
  IMemberResponse,
  IMembersRequestParams,
  IUpdateCurrentMemberRequestParams,
  IUpdateMemberRequestParams,
} from "./member.type";

// TODO: GET request fetch as ISR
// TODO: Invalidate cache after PUT requests

export const getMembers = async (options: Record<string, unknown>, _requestParams: IMembersRequestParams) => {
  const session = await getServerSession(authOptions);
  if (!session) return;

    const response = await http.get<IMemberResponse[]>(`${process.env.WP_API_URL}/members`, {
      data: _requestParams,
      headers: { Authorization: session.wpJwtToken },
    });

    return response.data;
  } catch (error) {
    console.log(error);
    // TODO: log error
    return;
  }
};

export const getMemberById = async (
  id: number,
  options?: Record<string, unknown>,
  _requestParams?: IGetMemberRequestParams,
) => {
  const session = await getServerSession(authOptions);
  if (!session) return;

  try {
    const headers = { ...(options && options.headers ? options.headers : {}), Authorization: session.wpJwtToken };
    const member = await fetch(`${process.env.WP_API_URL}/members/${id}`, {
      ...options,
      headers,
    });
    return (await member.json()) as IMemberResponse;
  } catch (error) {
    // TODO: log error
    return;
  }
};

export const getMemberID = async (id: number) => {
  // const session = await getServerSession(authOptions);
  // if (!session) return;
  try {
    const member = await fetch(`${process.env.WP_API_URL}/members/${id}`);
    return (await member.json()) as IMemberResponse;
  } catch (error) {
    // TODO: log error
    return;
  }
};

export const getProfileData = async (id: number) => {
  const params = new URLSearchParams({
    user_id: id.toString(),
    context: "view",
    fetch_field_data: "true",
  });

  const response = await fetch(`${process.env.WP_API_URL}/xprofile/fields?${params.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch profile data: ${response.statusText}`);
  }

  // Parse and return the JSON data
  return await response.json();
};

export const getMemeberProfile = async (id: number) => {
  console.log("id", id);
  try {
    const testResponse = await fetch(`${process.env.WP_API_URL}/xprofile/4/data/${id}`);
    const sexResponse = await fetch(`${process.env.WP_API_URL}/xprofile/4/data/${id}`);
    const ageResponse = await fetch(`${process.env.WP_API_URL}/xprofile/2/data/${id}`);
    const regionResponse = await fetch(`${process.env.WP_API_URL}/xprofile/9/data/${id}`);
    const cityResponse = await fetch(`${process.env.WP_API_URL}/xprofile/5/data/${id}`);
    const hobbiesResponse = await fetch(`${process.env.WP_API_URL}/xprofile/182/data/${id}`);
    const statusResponse = await fetch(`${process.env.WP_API_URL}/xprofile/45/data/${id}`);

    const sex = await sexResponse.json();
    const age = await ageResponse.json();
    const region = await regionResponse.json();
    const city = await cityResponse.json();
    const hobbies = await hobbiesResponse.json();
    const status = await statusResponse.json();

    return {
      sex,
      age,
      region,
      city,
      hobbies,
      status,
    };
  } catch (error) {
    // TODO: log error
    return;
  }
};

export const getProfileDataById = async (id: number) => {};
// FIXME: The updateMember() does not seem to be working. Postman can change data, but this request not (but still the received status code is 200).
// TODO: Is the updateMember() function needed? Fix or remove.
export const updateMember = async (
  id: number,
  changedData?: IUpdateMemberRequestParams,
  options?: Record<string, unknown>,
) => {
  const session = await getServerSession(authOptions);
  if (!session) return;

  try {
    const headers = { ...(options && options.headers ? options.headers : {}), Authorization: session.wpJwtToken };
    const updatedMember = await fetch(`${process.env.WP_API_URL}/members/${id}`, {
      method: "PUT",
      ...options,
      headers,
      body: JSON.stringify(changedData),
    });
    return (await updatedMember.json()) as IMemberResponse;
  } catch (error) {
    // TODO: log error
    return;
  }
};

export const getCurrentMember = async (
  options?: Record<string, unknown>,
  _requestParams?: IGetCurrentMemberRequestParams,
) => {
  const session = await getServerSession(authOptions);
  if (!session) return;

  try {
    const headers = { ...(options && options.headers ? options.headers : {}), Authorization: session.wpJwtToken };

    const me = await fetch(`${process.env.WP_API_URL}/members/me`, {
      ...options,
      headers,
    });
    return (await me.json()) as IMemberResponse;
  } catch (error) {
    // TODO: log error
    return;
  }
};

export const updateCurrentMember = async (
  changedData?: IUpdateCurrentMemberRequestParams,
  options?: Record<string, unknown>,
) => {
  const session = await getServerSession(authOptions);
  if (!session) return;

  try {
    const headers = { ...(options && options.headers ? options.headers : {}), Authorization: session.wpJwtToken };
    const updatedMember = await fetch(`${process.env.WP_API_URL}/members/me`, {
      method: "PUT",
      ...options,
      headers,
      body: JSON.stringify(changedData),
    });
    return (await updatedMember.json()) as IMemberResponse;
  } catch (error) {
    // TODO: log error
    return;
  }
};
