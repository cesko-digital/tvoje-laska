import { sendForgottenPasswordEmail } from "../wordpress/wordpress-auth";

export async function POST(request: Request) {
    const body = (await request.json());

    return new Response(await sendForgottenPasswordEmail(body.email));
}