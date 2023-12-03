import CardContainer from "library/atoms/CardContainer";
import { BellSvg } from "library/icons/symbols";
import Image from "next/image";
import { ReactNode } from "react";

export type FriendContent = {
  items: Friend[];
  pending: number;
};

export type Friend = {
  id: number;
  name: string;
  image: string;
};

type Props = {
  title?: string;
  //TODO: Upravit typy (ideálně odstranit string)
  contentType: "description" | "friends" | "notification" | string;
  content: FriendContent | string | any; //TODO: Upravit TS typy
  textLink: ReactNode;
  additionalData?: {};
};

const CardMobile = ({ title, textLink, contentType, content }: Props) => {
  return (
    <CardContainer variant="default" className="flex flex-col items-start gap-4">
      <h5>{title && title}</h5>
      {contentType === "description" && typeof content === "string" && <p className="text-gray-60">{content}</p>}

      {contentType === "friends" && (
        <div className="flex flex-row gap-2">
          {typeof content === "object" && "items" in content && (
            <>
              {content.items?.map((friend: Friend) => (
                <div key={friend.id} className="relative w-10 h-10">
                  {/* TODO: Mrknout na legacy layout prop */}
                  <Image src={friend.image} alt={friend.name} layout="fill" className="rounded-full" />
                </div>
              ))}

              <br></br>
              <p>Čekající na žádost: {content.pending}</p>
            </>
          )}
        </div>
      )}
      {contentType === "notification" && typeof content === "string" && (
        <div className="flex items-center gap-4">
          <span className="text-violet-70">
            <BellSvg width={35} />
          </span>
          <p className="text-gray-60">{content}</p>
        </div>
      )}
      <div className="self-end">{textLink}</div>
    </CardContainer>
  );
};
export default CardMobile;
