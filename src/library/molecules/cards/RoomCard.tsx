"use client";

import CardContainer from "library/atoms/CardContainer";
import TextLink from "library/atoms/TextLink";
import { ArrowRightSvg } from "library/icons/arrows";
import { EyeSvg } from "library/icons/symbols";
import Image from "next/image";

type Props = {
  title?: string;
  photo: string;
  members: number;
  path: string;
};

const RoomCard = ({ title, photo, members, path }: Props) => {
  const renderImage = (width: number, height: number, sizing: number) => (
    <Image
      src={photo}
      alt="User photo"
      width={width * sizing}
      height={height * sizing}
      className="rounded-[20px]"
      style={{
        width: width,
        height: height,
      }}
    />
  );

  return (
    //TODO: Upravit šířky kartiček
    <CardContainer variant="bubble" padding="smaller" className="w-fit flex flex-col gap-4">
      <div className="flex items-center gap-3">
        {renderImage(90, 90, 3)}
        <div className="flex flex-col gap-y-2 leading-6">
          <div className="flex flex-col gap-y-1">
            <h5>{title}</h5>
            <div className="pl-1 text-gray-70 text-sm">{members} členů</div>
          </div>

          {/* TODO: Vyřešit zalamování textu/mezery */}
          <div className="flex items-center gap-2 sm:gap-6 pl-1 justify-between">
            <div className="text-violet-70">
              <EyeSvg width={24} height={24} />
            </div>

            <div className="flex items-center gap-x-1 text-violet-50">
              <TextLink color="primary" title="Vstoupit" path={path} endIcon={<ArrowRightSvg width={10} />} />
            </div>
          </div>
        </div>
      </div>
    </CardContainer>
  );
};
export default RoomCard;
