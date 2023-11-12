import { Metadata } from "next";
import { useEffect, useState } from "react";
import ProfileGroup from "../ProfileGroup";
import { ProfileFieldResponse } from "app/api/profile-field/profileField.type";
import ProfileCard from "library/molecules/cards/ProfileCard";
import { UserBasicInfo, getUserBasicInfo } from "app/api/profile-field/basic-info/route";
import { getServerSession } from "next-auth";
import { authOptions } from "app/api/auth/[...nextauth]/route";
import { getProfileFields } from "app/api/profile-field/profileField";
import ProfileField from "../ProfileField";

export const metadata: Metadata = {
  title: 'O mně',
}

export default async function ProfileAbout() {
  const session = await getServerSession(authOptions);

  if (session) {
    const userId = parseInt(session.user.id);
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
            {/* TODO: Pass an icon id to get the right icon */}
            <ProfileField name={'Medailonek'} fieldId={1035} fieldData={profileFields} />
            <ProfileGroup name={'Jak Vypadám'} groupId={5} fieldData={profileFields} />
            <ProfileGroup name={'Moje záliby'} groupId={6} fieldData={profileFields} />
            <ProfileGroup name={'Sporty'} groupId={15} fieldData={profileFields} />
            <ProfileGroup name={'Vztah a rodina'} groupId={2} fieldData={profileFields} />
            <ProfileGroup name={'Vzdělání a práce'} groupId={14} fieldData={profileFields} />
            <ProfileGroup name={'Hendikep'} groupId={3} fieldData={profileFields} />
            <ProfileGroup name={'Životní styl'} groupId={4} fieldData={profileFields} />
            <ProfileGroup name={'Koho hledám'} groupId={11} fieldData={profileFields} />
          </>
        )}
      </>
    );
  }

}
