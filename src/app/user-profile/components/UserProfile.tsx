"use client";

import { useState } from "react";
import Image from "next/image";
import { getProfileFieldValue, getAllFieldsByGroupName, calculateAge } from "../utils";
import ContentBox from "./ContentBox";

export type UserDetailsProps = {
  memberData?: any;
};

const FIELD_NAMES = {
  GENDER: "Pohlaví",
  AGE: "Věk",
  CITY: "Město",
  REGION: "Kraj",
  DESCRIPTION: "Medailonek",
  FAMILY_STATE: "Status",
  HOBBIES: "Moje záliby",
  SPORTS: "Sporty",
  APPEARENCE: "Jak vypadám",
  RELATIONSHIP: "Vztah a rodina",
  EDUCATION: "Vzdělání a práce",
  INVALIDITY: "Hendikep",
  LIFESTYLE: "Životní styl",
  PREFERENCES: "Koho hledám",
};

export default function UserProfile({ memberData }: UserDetailsProps) {
  const [showMore, setShowMore] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const profilePhotoUrl =
    memberData.avatar_urls?.full.slice(0, 4) === "http"
      ? memberData.avatar_urls?.full
      : `https:${memberData.avatar_urls?.full}`;

  const mainInfo = getAllFieldsByGroupName("Základní", memberData.xprofile);
  const gender = getProfileFieldValue(mainInfo.fields, FIELD_NAMES.GENDER);
  const memberAge = getProfileFieldValue(mainInfo.fields, FIELD_NAMES.AGE);
  const age = calculateAge(memberAge);

  const city = getProfileFieldValue(mainInfo.fields, FIELD_NAMES.CITY);
  const region = getProfileFieldValue(mainInfo.fields, FIELD_NAMES.REGION);
  const location = `${city}, ${region} kraj`;
  const description = getProfileFieldValue(mainInfo.fields, FIELD_NAMES.DESCRIPTION);

  const hobbies = getAllFieldsByGroupName(FIELD_NAMES.HOBBIES, memberData.xprofile);
  const sports = getAllFieldsByGroupName(FIELD_NAMES.SPORTS, memberData.xprofile);
  const appearence = getAllFieldsByGroupName(FIELD_NAMES.APPEARENCE, memberData.xprofile);
  const relationship = getAllFieldsByGroupName(FIELD_NAMES.RELATIONSHIP, memberData.xprofile);

  const familyState = getProfileFieldValue(relationship.fields, FIELD_NAMES.FAMILY_STATE);

  const education = getAllFieldsByGroupName(FIELD_NAMES.EDUCATION, memberData.xprofile);
  const invalidity = getAllFieldsByGroupName(FIELD_NAMES.INVALIDITY, memberData.xprofile);
  const lifestyle = getAllFieldsByGroupName(FIELD_NAMES.LIFESTYLE, memberData.xprofile);
  const preferences = getAllFieldsByGroupName(FIELD_NAMES.PREFERENCES, memberData.xprofile);

  return (
    <main className="w-full pt-2">
      <div className="flex flex-col space-y-5">
        <div className="justify-center items-center relative">
          <Image src={profilePhotoUrl} alt="User photo" width={358} height={280} className={"rounded-3xl"} />
          <div className="absolute bottom-4 right-8 text-white px-3 p-1 rounded-lg bg-primary">
            <p>{familyState || "Neznámý stav"}</p>
          </div>
        </div>
        <div>
          <div className="text-[24px]">@{memberData.user_login || "No name"}</div>
          <div className="text-[18px]">{`${gender || "No gender"}, ${age || "No age"} let`}</div>
          <div className="text-[18px]">{location || "No location"}</div>
        </div>
        <div className="text-[18px]">
          <p className={`${showMore ? "max-h-full" : "line-clamp-2"}`}>{description || "No description"}</p>
          <div className="flex justify-end p-2">
            <button onClick={() => setShowMore(!showMore)}>{showMore ? "Skrýt" : "Zobrazit více"}</button>
          </div>
        </div>
        <button>Poslat zpravu</button>
        <button>Pridat do pratel</button>
        <button>Oznacit jako oblibeny</button>
        <div>Fotky...</div>
        <div>
          <ContentBox fields={hobbies.fields} groupName={"Moje záliby"} />
          <ContentBox fields={sports.fields} groupName={"Sporty"} />
          <ContentBox fields={appearence.fields} groupName={appearence.groupName} />
          <ContentBox fields={relationship.fields} groupName={relationship.groupName} />
          <ContentBox fields={education.fields} groupName={education.groupName} />
          <ContentBox fields={invalidity.fields} groupName={invalidity.groupName} />
          <ContentBox fields={lifestyle.fields} groupName={lifestyle.groupName} />
          <ContentBox fields={preferences.fields} groupName={preferences.groupName} />
        </div>
        <div className="flex flex-col">
          <button onClick={() => setShowAlert(!showAlert)}> Falesny nebo obtezujici ucet ?</button>
          {showAlert && (
            <div className="flex flex-col">
              <p>
                Jsi přesvědčený/á, že je tento profil falešný, nebo ses setkal/a s obtěžováním ze strany tohoto
                uživatele?
              </p>
              <button> Nahlásit profil </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
