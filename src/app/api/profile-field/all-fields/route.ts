import { authOptions } from "app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { getProfileFields } from "../profileField";
import { NextApiRequest } from "next";

export async function GET(request: NextApiRequest): Promise<Response> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }

  //TODO find how to do it as a human
  const userId = "3";
  const profileFields = await getProfileFields({ userId: parseInt(userId), groupId: undefined });

  if (profileFields === null) {
    return NextResponse.json({}, { status: 404 });
  }

  return NextResponse.json(profileFields);
}