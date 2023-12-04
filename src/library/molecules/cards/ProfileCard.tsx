import { UserIcon } from "@heroicons/react/24/outline";
import { UserBasicInfo } from "app/api/profile-field/basic-info/route";
import classNames from "helpers/classNames";
import Button from "library/atoms/Button";
import CardContainer from "library/atoms/CardContainer";
import Divider from "library/atoms/Divider";
import MembershipMode from "library/atoms/MembershipMode";
import Tag from "library/atoms/Tag";
import TextLink from "library/atoms/TextLink";
import { EditProfileSvg } from "library/icons/actions";
import { UserSvg } from "library/icons/symbols";
import Image from "next/image";

type Props = { userInfo: UserBasicInfo};

const ProfileCard = (props: Props) => {
  const user = props.userInfo;
  return (
    // TODO: Upravit max width
    <CardContainer
      variant="default"
      padding="smaller"
      className={`flex gap-4 flex-col justify-center max-w-sm ${user.className}`}
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
        <p>{user.name}</p>
        <p>{user.nickname}</p>
        <p>{user.gender}</p>
        <p>{user.age} let</p>
        <p>{user.city}, {user.region}</p>
        {/* <ProfileStatus status={user.status}></ProfileStatus> */}
           <MembershipMode variant={user.status} />
      </div>
    </CardContainer>
  );
};
export default ProfileCard;
