"use client";

import classNames from "helpers/classNames";
import CardContainer from "library/atoms/CardContainer";
import { BadgeSvg, CheckMarkSvg, DoubleCheckMarkSvg } from "library/icons/symbols";
import Image from "next/image";

type Props = {
  username?: string;
  photo: string;
  userIsActive: boolean;
  status?: string;
  message?: string;
  time?: string;
};

const ChatCard = ({ username, photo, userIsActive, message, time }: Props) => {
  const userActivity = (
    <>
      <div className="flex items-center gap-2 text-gray-70 font-normal">
        <div className={classNames("rounded-full w-3.5 h-3.5 ", userIsActive ? "bg-green-40" : "bg-red-40")} />
        <p> {userIsActive ? "nyní aktivní" : "offline"}</p>
      </div>
    </>
  );

  const renderImage = (width: number, height: number) => (
    <Image src={photo} alt="User photo" width={width} height={height} className="rounded-[20px]" />
  );

  return (
    <CardContainer variant="bubble" padding="smaller" className="w-fit flex flex-col gap-4">
      <div className="flex items-center gap-3">
        {renderImage(90, 90)}
        <div className="flex flex-col gap-y-2">
          <div className="leading-6">
            <div className="flex items-center gap-x-2">
              <h5>@{username}</h5>
              <div className="text-violet-50">
                <BadgeSvg width={24} height={24} />
              </div>
            </div>
            <div className="pl-1 text-sm">{userActivity}</div>
          </div>

          {/* TODO: Vyřešit zalamování textu/mezery */}
          <div className="flex items-center gap-2 sm:gap-6 pl-1 justify-between">
            <p className="text-gray-80 min-w-fit">{message}</p>
            <div className="flex items-center gap-x-1 text-violet-50">
              <CheckMarkSvg width={12} height={12} />
              <DoubleCheckMarkSvg width={12} height={12} strokeWidth={0.2} />
              <time className="text-violet-50 text-xs">{time}</time>
            </div>
          </div>
        </div>
      </div>
    </CardContainer>
  );
};
export default ChatCard;
