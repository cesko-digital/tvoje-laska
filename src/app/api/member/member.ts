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

  try {
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
