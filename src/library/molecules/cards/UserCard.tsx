"use client";

import classNames from "helpers/classNames";
import Button from "library/atoms/Button";
import CardContainer from "library/atoms/CardContainer";
import TextLink from "library/atoms/TextLink";
import { AddFriendSvg, RemoveSvg, SendMessageSvg } from "library/icons/actions";
import { ShakingHandsSvg } from "library/icons/symbols";
import Image from "next/image";

type Props = {
  cardType: "default" | "friendWaiting" | "friend";
  name?: string;
  gender: string;
  age: number;
  location: string;
  photo: string;
  userIsActive: boolean;
};

const UserCard = ({ cardType, name, gender, age, location, photo, userIsActive }: Props) => {
  const userActivity = (
    <>
      <div className="flex items-center gap-2 text-gray-70 font-normal">
        <div className={classNames("rounded-full w-3.5 h-3.5 ", userIsActive ? "bg-green-40" : "bg-red-40")} />
        <p> {userIsActive ? "nyní aktivní" : "offline"}</p>
      </div>
    </>
  );

  const renderImage = (width: number, height: number) => (
    <Image
      src={photo}
      alt="User photo"
      width={width}
      height={height}
      className={cardType === "default" || cardType === "friendWaiting" ? "rounded-[18px]" : "rounded-full"}
    />
  );

  return cardType === "default" ? (
    <CardContainer variant="bubble" padding="smaller" className="flex items-center gap-4 ">
      <div className="flex-grow">
        <h5 className="mb-1">{name}</h5>
        <div className="text-gray-70 font-normal">
          <p>
            {gender}, {age} let
          </p>
          <p>{location}</p>
          {userActivity}
        </div>
      </div>
      <div className="relative">
        {renderImage(100, 100)}

        <div className="flex justify-center w-9 h-9 absolute bottom-0 left-0 transform translate-x-[-50%] translate-y-[25%] rounded-full border-2 border-mustard-30 text-mustard-30 bg-white">
          <ShakingHandsSvg width={25} />
        </div>
      </div>
    </CardContainer>
  ) : cardType === "friendWaiting" ? (
    <CardContainer variant="bubble" padding="smaller" className="w-fit flex flex-col gap-4">
      <div className="flex items-center gap-3">
        {renderImage(80, 80)}

        <div>
          <h5 className="mb-1">{name}</h5>
          <div className="text-gray-70 font-normal">
            <p>
              {gender}, {age} let
            </p>
            <p>{location}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <Button color="primary" buttonText="Přijmout" startIcon={<AddFriendSvg width={20} />} />
        <Button color="secondary" buttonText="Odmítnout" startIcon={<RemoveSvg width={20} />} />
      </div>
    </CardContainer>
  ) : (
    cardType === "friend" && (
      <CardContainer variant="bubble" padding="smaller" className="w-fit flex flex-col gap-4">
        <div className="flex items-center gap-3">
          {renderImage(60, 60)}
          <div>
            <h5 className="mb-1">{name}</h5>
            {userActivity}
          </div>
        </div>
        <div className="flex items-center gap-6">
          <TextLink as="button" color="primary" title="Poslat zprávu" startIcon={<SendMessageSvg width={20} />} />
          <TextLink as="button" color="primary" title="Odebrat z přátel" startIcon={<RemoveSvg width={15} />} />
        </div>
      </CardContainer>
    )
  );
};
export default UserCard;
