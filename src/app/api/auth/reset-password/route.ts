import axios from "axios";

const http = axios.create({
    baseURL: process.env.WP_URL,
    headers: {
      "Content-type": "application/json",
    }
  });

export async function POST(request: Request): Promise<Response> {
    const body = (await request.json()) as ResetPasswordRequest;

    return new Response(await setPassword(body));
}

const setPassword = async (request: ResetPasswordRequest): Promise<ResetPasswordResult> => {
    try {
        const response = await http.post("/wp-json/bdpwr/v1/set-password", request);
    
        if (response.status === 200) {
          return "Success";
        } 
    
        return "Unknown";
      } catch (error) {
        if(error?.response?.data?.message.indexOf('You must request a password reset code') !== -1) {
          return 'CodeExpired';
        }
        return "Unknown";
      }
}

export type ResetPasswordRequest = {
    email: string,
    code: string,
    password: string
};

export type ResetPasswordResult = "Success" | "CodeExpired" | "Unknown";
