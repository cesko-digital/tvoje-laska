"use client";;
import Button from "library/atoms/Button";
import Content from "library/atoms/Content";
import Tag from "library/atoms/Tag";
import TextLink from "library/atoms/TextLink";
import { ArrowRightSvg } from "library/icons/arrows";
import CardMobile, { Friend } from "library/molecules/cards/CardMobile";
import Image from "next/image";
import { HeartSvg } from "library/icons/symbols";
import { SignOutSvg } from "library/icons/actions";
import { signOut } from "next-auth/react";
import { UserBasicInfo } from "app/api/profile-field/basic-info/route";
import { IMemberResponse } from "app/api/member/member.type";

//Zkušební data
const getCards = (friends: { items: Friend[], pending: number}) => [
  {
    contentType: "notification",
    content: "Máš 3 nová upozornění.",
    textLink: (
      <TextLink title="Zobrazit upozornění" color="primary" as="link" path="/" endIcon={<ArrowRightSvg width={10} />} />
    ),
  },
  {
    title: "Moji přátelé a oblíbení",
    contentType: "friends",
    content: friends,
    textLink: (
      <TextLink
        title="Přejít na přátele a oblíbené"
        color="primary"
        as="link"
        path="/profil/pratele"
        endIcon={<ArrowRightSvg width={10} />}
      />
    ),
  },
  {
    title: "Seberozvoj",
    contentType: "description",
    content: "V rámci free plánu máš k dispozici 3 základní kurzy.",
    textLink: (
      <TextLink title="Přejít na eKurzy" color="primary" as="link" path="/" endIcon={<ArrowRightSvg width={10} />} />
    ),
  },
  {
    title: "Nastavení",
    contentType: "description",
    content: "Potřebuješ si změnit heslo, zapnout notifikace, změnit členství nebo upravit své základní nastavení?",
    textLink: (
      <TextLink title="Přejít do nastavení" color="primary" as="link" path="/" endIcon={<ArrowRightSvg width={10} />} />
    ),
  },
  {
    title: "Podpora",
    contentType: "description",
    content: "Nevíš si rady s aplikací, potřebuješ na nás kontakt nebo pomoc odborného vztahového kouče?",
    textLink: (
      <TextLink title="Přejít na podporu" color="primary" as="link" path="/" endIcon={<ArrowRightSvg width={10} />} />
    ),
  },
];

//Zkušební data
type Props = { userInfo: UserBasicInfo; friends: { items: IMemberResponse[]; pending: number } };

const HomeLoggedIn = (props: Props) => {
  /* TODO: Ostranit header? */
  const user = props.userInfo;
  return (
    <>
      <div className="w-full bg-violet-20 px-4 rounded-b-[34px]">
        {user && (
          <div className="flex items-center gap-4  pt-6">
            <Image src={user.photo} alt="Uživatelská fotka" width={150} height={180} className="rounded-3xl" />

            <div className="flex flex-col gap-3 flex-grow">
              <h5 className="font-medium">@{user.nickname}</h5>
              <Tag
                title={user.status}
                variant="openToMeet"
                className="col-span-1"
                startIcon={
                  <span className="text-magenta-50">
                    <HeartSvg width={20} />
                  </span>
                }
              />
              <div className="rounded-full w-full h-4 bg-white border border-white mt-2">
                <div
                  className={`rounded-full bg-violet-70 h-full`}
                  style={{
                    width: `${user.profileComplete}%`,
                  }}
                />
              </div>

              <p className="text-violet-70 text-sm">Profil vyplněný na {user.profileComplete} %</p>
            </div>
          </div>
        )}

        <Button
          buttonText="Zobrazit můj profil"
          color="secondary"
          className="w-full my-6"
          endIcon={<ArrowRightSvg width={10} />}
          size="small"
        />
      </div>

      <Content title="" className="z-50">
        <div className="flex flex-col gap-8 -mt-4">
          {getCards({ items: props.friends.items.map(e => ({
              id: e.id,
              image: safeUrl(e.avatar_urls?.full ?? ""),
              name: e.name ?? "",
            })), pending: props.friends.pending},
          ).map((card, index) => (
            <CardMobile
              content={card.content}
              contentType={card.contentType}
              key={index}
              title={card.title || ""}
              textLink={card.textLink}
            />
          ))}
          <Button
            buttonText="Odhlásit se"
            color="secondary"
            className="w-full"
            startIcon={<SignOutSvg width={20} />}
            onClick={() => signOut()}
          />{" "}
        </div>
      </Content>
    </>
  );
};

function safeUrl(value: string) {
  if (value.startsWith("http")) {
    return value;
  }

  return "https://" + value;
}

export default HomeLoggedIn;
