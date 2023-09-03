import CardContainer from "library/atoms/CardContainer";
import Image from "next/image";
import { ReactNode } from "react";

//TODO: Jak bude vypadat objekt pro přátele? A bude vždy jen v této podobě?
type Friend = {
  id: number;
  name: string;
  image: string;
};

type Props = {
  title: string;
  friends: Friend[];
  textLink: ReactNode;
};

const CardMobile = ({ title, friends, textLink }: Props) => {
  return (
    <CardContainer variant="default" className="flex flex-col items-start gap-4">
      <h5>{title}</h5>
      <ul className="flex gap-2 items-center">
        {friends &&
          friends.map(friend => {
            return (
              <li key={friend.id}>
                <Image
                  key={friend.id}
                  className="inline-block rounded-full"
                  src={friend.image}
                  alt={friend.name}
                  width={48}
                  height={48}
                />
              </li>
            );
          })}
      </ul>
      <div className="self-end">{textLink}</div>
    </CardContainer>
  );
};
export default CardMobile;
