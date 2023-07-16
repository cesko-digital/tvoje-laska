import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route"

export const getUserData = async (url: string, options?: Record<string, unknown>) => {
    const session  = await getServerSession(authOptions)

    if (!session) {
        return;
    }

    try {
        const headers = { ...(options && options.headers ? options.headers : {}), Authorization: session.wpJwtToken };
        const me = await fetch(url, {...options, headers})
        return me.json();
    } catch (error) {
        // TODO: log error
        return;
    }
}
