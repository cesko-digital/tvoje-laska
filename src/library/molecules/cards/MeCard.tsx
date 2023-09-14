"use client";

import Image from "next/image";

import CardContainer from "library/atoms/CardContainer";
import DatingStatus from "library/atoms/DatingStatus";
import TextLink from "library/atoms/TextLink";

import { ArrowRightSvg } from "library/icons/arrows";

import { fixImageURL } from "utils/fixImageURL";

const getAgeString = (gender: string, age: string) => {
  const ageNumber = Number(age);
  if (isNaN(ageNumber) || ageNumber.toString() !== age) {
    return gender;
  }

  /* TODO: translate */
  const ageWithYears = `${age} let`;

  if (!gender) return ageWithYears;

  return `${gender}, ${ageWithYears}`;
};

const getLocationString = (city: string, region: string) => {
  return `${city}${city && region ? ", " : ""}${region}`;
};

type Props = {
  nickname: string;
  gender: string;
  age: string;
  city: string;
  region: string;
  photo: string | undefined;
  datingStatus: string | undefined;
};

const MeCard = ({ nickname, gender, age, city, region, photo, datingStatus }: Props) => {
  const photoURL = photo && fixImageURL(photo)?.toString();

  return (
    <div>
      <CardContainer variant="bubble" padding="smaller" hideShadow={true} className="flex items-center gap-4 ">
        {photoURL ? (
          <div className="relative">
            {/* TODO: translate */}
            <Image src={photoURL} alt="Moje profilová fotka" width={124} height={124} className="rounded-full" />
          </div>
        ) : null}
        <div className="flex-grow">
          {nickname ? <h5 className="mb-1">@{nickname}</h5> : null}
          <div className="text-gray-70 font-normal">
            <p>{getAgeString(gender, age)}</p>
            <p>{getLocationString(city, region)}</p>
            <DatingStatus status={datingStatus} />
          </div>
        </div>
      </CardContainer>

      {/* TODO: profile filled by x % */}

      <TextLink
        /* TODO: translate */
        title="Zobrazit můj profil"
        as="link"
        path="profile"
        color="primary"
        endIcon={<ArrowRightSvg width={10} />}
      />
    </div>
  );
};

export default MeCard;
