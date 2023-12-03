import CardContainer from "library/atoms/CardContainer";
import Divider from "library/atoms/Divider";
import MembershipMode from "library/atoms/MembershipMode";
import Tag from "library/atoms/Tag";
import TextLink from "library/atoms/TextLink";
import { EditProfileSvg } from "library/icons/actions";
import { UserSvg } from "library/icons/symbols";

type Props = {
  name: string;
  nickname: string;
  gender: string;
  age: number;
  location: string;
  status: string;
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
        <MembershipMode variant={status} />
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
