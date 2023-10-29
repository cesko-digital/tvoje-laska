import { authOptions } from "app/api/auth/[...nextauth]/route";
import { getMemberById } from "app/api/member/member";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { getProfileFields } from "../profileField";
import { getCompletionPercents, getFieldValueFromArray } from "helpers/profileFieldHelpers";
import { NextApiRequest } from "next";

export async function GET(request: NextApiRequest): Promise<Response> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }

  //TODO find how to do it as a human
  const userId = (request as any).nextUrl.searchParams.get('userId');
  const user = await getUserBasicInfo(parseInt(userId));

  if (user === null) {
    return NextResponse.json({}, { status: 404 });
  }

  return NextResponse.json(user);
}

export const getUserBasicInfo = async (userId: number): Promise<UserBasicInfo | null> => {
  const member = await getMemberById(userId);
  const profileFields = await getProfileFields({
    userId: userId,
  });

  if (!profileFields) {
    return null;
  }

  const birthdate = getFieldValueFromArray(profileFields, "Věk");

  const user: UserBasicInfo = {
    nickname: member?.name ?? "",
    age: birthdate !== "" ? calculateAge(new Date(birthdate)) : 0,
    city: getFieldValueFromArray(profileFields, "Město"),
    region: getFieldValueFromArray(profileFields, "Kraj"),
    status: getFieldValueFromArray(profileFields, "Status"),
    profileComplete: getCompletionPercents(profileFields),
    photo: member?.avatar_urls?.full ?? ''
    // photo: userPhoto,
  };

  return user;
};

const calculateAge = (birthday: any) => {
  // birthday is a date
  var ageDifMs = Date.now() - birthday;
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export type UserBasicInfo = {
  nickname: string;
  age: number;
  region: string;
  city: string;
  status: string;
  profileComplete: number;
  photo: string
};
