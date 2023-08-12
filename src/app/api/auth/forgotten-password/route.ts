import axios from "axios";

const http = axios.create({
    baseURL: process.env.WP_URL,
    headers: {
      "Content-type": "application/json",
    }
  });

export async function POST(request: Request): Promise<Response> {
    const body = (await request.json());

    return new Response(await sendForgottenPasswordEmail(body.email));
}

const sendForgottenPasswordEmail = async (email: string): Promise<ForgottenPasswordResult> => {
    try {
        const response = await http.post("/wp-json/bdpwr/v1/reset-password", {
          email: email,
        });
    
        if (response.status === 200) {
          return "Success";
        } 
    
        return "Unknown";
      } catch (error) {
        if(error?.response?.data?.code === 'bad_email') {
          return 'UserNotFound';
        }
        return "Unknown";
      }
}

export type ForgottenPasswordResult = "Success" | "UserNotFound" | "Unknown";
