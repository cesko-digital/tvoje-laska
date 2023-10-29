import { UserIcon } from "@heroicons/react/24/outline";
import classNames from "helpers/classNames";
import Button from "library/atoms/Button";
import CardContainer from "library/atoms/CardContainer";
import Divider from "library/atoms/Divider";
import Tag from "library/atoms/Tag";
import TextLink from "library/atoms/TextLink";
import { AddFriendSvg, EditProfileSvg, RemoveSvg, SendMessageSvg } from "library/icons/actions";
import { HeartSvg, ShakingHandsSvg, UserSvg } from "library/icons/symbols";
import Image from "next/image";

type Props = {
  name: string;
  nickname: string;
  gender: string;
  age: number;
  location: string;
  status: "seznamuji se";
  tags: string[];
  className?: string;
};

const ProfileCard = ({ name, nickname, gender, age, location, status, tags, className }: Props) => {
  return (
    // TODO: Upravit max width
    <CardContainer
      variant="default"
      padding="smaller"
      className={`flex gap-4 flex-col justify-center max-w-sm ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* TODO: Upravit zarovnání na řádku (kvůli písma) */}
          <span className="text-violet-70">
            <UserSvg width={20} />
          </span>
          <h5>O mně</h5>
        </div>
        {/* TODO: Upravit odkaz na editaci */}
        <TextLink as="link" title="Upravit" path="/" color="primary" startIcon={<EditProfileSvg width={20} />} />
      </div>
      {/* TODO: Upravit zobrazení nicknamu podle toho, jak přijde ze serveru (bez/se zavináčem apod.) */}
      {/* TODO: Upravit paddingy a marginy, aby to vypadalo co nejlépe */}
      <Divider type="default" borderColor="border-violet-20" marginY="my-1" />
      <div className="text-gray-70 flex flex-col gap-1">
        <p>{name}</p>
        <p>{nickname}</p>
        <p>{gender}</p>
        <p>{age} let</p>
        <p>{location}</p>
        <div className="flex gap-2 items-center">
          {status === "seznamuji se" && (
            <span className="text-magenta-40">
              <HeartSvg width={20} />
            </span>
          )}
          <p>{status}</p>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {tags.map((tag, index) => {
            return <Tag key={index} title={tag} variant="light" className="col-span-1" />;
          })}
        </div>
      </div>
    </CardContainer>
  );
};
export default ProfileCard;
