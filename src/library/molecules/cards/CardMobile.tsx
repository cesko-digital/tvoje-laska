import CardContainer from "library/atoms/CardContainer";
import { BellSvg } from "library/icons/symbols";
import Image from "next/image";
import { type } from "os";
import { ReactNode } from "react";

//TODO: Jak bude vypadat objekt pro přátele? A bude vždy jen v této podobě?
type Friend = {
  id: number;
  name: string;
  image: string;
};

type Props = {
  title?: string;
  //TODO: Upravit typy (ideálně odstranit string)
  contentType: "description" | "friends" | "notification" | string;
  content: Friend[] | string;
  textLink: ReactNode;
};

const CardMobile = ({ title, textLink, contentType, content }: Props) => {
  return (
    <CardContainer variant="default" className="flex flex-col items-start gap-4">
      <h5>{title && title}</h5>
      {contentType === "description" && typeof content === "string" && <p className="text-gray-60">{content}</p>}

      {/* TODO: Doplnit "čekající žádosti"? */}
      {contentType === "friends" && (
        <div className="flex flex-row gap-2">
          {Array.isArray(content) &&
            content?.map(friend => (
              <div key={friend.id} className="relative w-10 h-10">
                {/* TODO: Mrknout na legacy layout prop */}
                <Image src={friend.image} alt={friend.name} layout="fill" className="rounded-full" />
              </div>
            ))}
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
