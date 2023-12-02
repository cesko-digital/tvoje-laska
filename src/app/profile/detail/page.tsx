import { Metadata } from "next";
import { useEffect, useState } from "react";
import ProfileGroup from "../groups/ProfileGroup";
import { ProfileFieldResponse } from "app/api/profile-field/profileField.type";
import ProfileCard from "library/molecules/cards/ProfileCard";
import { UserBasicInfo, getUserBasicInfo } from "app/api/profile-field/basic-info/route";
import { getServerSession } from "next-auth";
import { authOptions } from "app/api/auth/[...nextauth]/route";
import { getProfileFields } from "app/api/profile-field/profileField";

export const metadata: Metadata = {
  title: 'O mně',
}

export default async function ProfileAbout() {
  const session = await getServerSession(authOptions);

  if (session) {
    const userId = 3;
    let userBasicInfo = await getUserBasicInfo(userId);
    let profileFields = await getProfileFields({ userId });

    if (!userBasicInfo) {
      userBasicInfo = {
        age: 0,
        city: "",
        nickname: "",
        photo: "",
        profileComplete: 0,
        region: "",
        status: "",
      };
    }

    return (
      <>
        <ProfileCard userInfo={userBasicInfo} />
        {Array.isArray(profileFields) && profileFields.length > 0 && (
          <>
            <ProfileGroup name={'Medailonek'} fieldId={1035} groupId={1} fieldData={profileFields} />
            <ProfileGroup name={'Jak Vypadám'} fieldId={[1042, 1033, 102]} groupId={5} fieldData={profileFields} />
            <ProfileGroup name={'Moje záliby'} fieldId={[182, 175]} groupId={6} fieldData={profileFields} />
            <ProfileGroup name={'Sporty'} fieldId={252} groupId={15} fieldData={profileFields} />
            <ProfileGroup name={'Vztah a rodina'} fieldId={[38, 45, 61, 68, 360]} groupId={2} fieldData={profileFields} />
            <ProfileGroup name={'Vzdělání a práce'} fieldId={[52, 675]} groupId={14} fieldData={profileFields} />
            <ProfileGroup name={'Hendikep'} fieldId={[1054, 116, 133, 144, 111]} groupId={3} fieldData={profileFields} />
            <ProfileGroup name={'Životní styl'} fieldId={[295, 158, 302, 309]} groupId={4} fieldData={profileFields} />
            <ProfileGroup name={'Koho hledám'} fieldId={[1130, 1131, 1132, 1135]} groupId={11} fieldData={profileFields} />
          </>
        )}
      </>
    );
  }

}
