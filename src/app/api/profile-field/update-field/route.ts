import { authOptions } from "app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { NextApiRequest } from "next";
import { updateProfileField } from "../profileField";

export async function POST(request: NextApiRequest): Promise<Response> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }

  const userId = (request as any).nextUrl.searchParams.get('userId');
  const { fieldId, value } = request.body;

  console.log('Received fieldId:', fieldId);
  console.log('Received value:', value);
 
  try {
    await updateProfileField({
      fieldId: fieldId,
      userId: parseInt(userId),
      value: value,
    });

    // Change to Czech
    return NextResponse.json({ message: "Profile field updated successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update profile field" }, { status: 500 });
  }
}