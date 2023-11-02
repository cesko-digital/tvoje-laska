"use client";

import React from "react";
import { useState } from "react";
import Image from "next/image";
import { getProfileFieldValue, getAllFieldsByGroupName } from "../utils";
import ContentBox from "./ContentBox";
import InterestsBox from "./InterestsBox";

export type UserDetailsProps = {
  memberData?: any;
};

export default function UserProfile({ memberData }: UserDetailsProps) {
  const [showMore, setShowMore] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const profilePhotoUrl =
    memberData.avatar_urls?.full.slice(0, 4) === "http"
      ? memberData.avatar_urls?.full
      : `https:${memberData.avatar_urls?.full}`;

  const mainInfo = getAllFieldsByGroupName("Základní", memberData.xprofile);
  const gender = getProfileFieldValue(mainInfo.fields, "Pohlaví");
  const memberAge = getProfileFieldValue(mainInfo.fields, "Věk");
  const age = new Date().getFullYear() - new Date(memberAge).getFullYear();
  const city = getProfileFieldValue(mainInfo.fields, "Město");
  const region = getProfileFieldValue(mainInfo.fields, "Kraj");
  const location = `${city}, ${region} kraj`;
  const description = getProfileFieldValue(mainInfo.fields, "Medailonek");

  console.log("memberData", memberData);

  const hobbies = getAllFieldsByGroupName("Moje záliby", memberData.xprofile);
  const sports = getAllFieldsByGroupName("Sporty", memberData.xprofile);
  const appearence = getAllFieldsByGroupName("Jak vypadám", memberData.xprofile);
  const relationship = getAllFieldsByGroupName("Vztah a rodina", memberData.xprofile);

  const familyState = getProfileFieldValue(relationship.fields, "Status");

  const education = getAllFieldsByGroupName("Vzdělání a práce", memberData.xprofile);
  const invalidity = getAllFieldsByGroupName("Hendikep", memberData.xprofile);
  const lifestyle = getAllFieldsByGroupName("Životní styl", memberData.xprofile);
  const preferences = getAllFieldsByGroupName("Koho hledám", memberData.xprofile);

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
