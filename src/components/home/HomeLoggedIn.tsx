"use client";
import Button from "library/atoms/Button";
import Content from "library/atoms/Content";
import Tag from "library/atoms/Tag";
import TextLink from "library/atoms/TextLink";
import { ArrowRightSvg } from "library/icons/arrows";
import CardMobile from "library/molecules/cards/CardMobile";
import Image from "next/image";
import userPhoto from "/public/assets/images/user-photo_homepage.png";
import { HeartSvg } from "library/icons/symbols";
import { SignOutSvg } from "library/icons/actions";
import { signOut, useSession } from "next-auth/react";
import { UserBasicInfo } from "app/api/profile-field/basic-info/route";
import { useEffect, useState } from "react";

//Zkušební data
const friends = [
  {
    id: 1,
    name: "Adam Klempíř",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 2,
    name: "Jana Nováková",
    image:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 3,
    name: "Lukáš Vávra",
    image:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

//Zkušební data
const cards = [
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
        path="/"
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

const HomeLoggedIn = (props: { userId: string }) => {
  /* TODO: Ostranit header? */

  const [user, setUser] = useState<UserBasicInfo | null>(null);

  useEffect(() => {
     fetch(`/api/profile-field/basic-info?userId=${props.userId}`).then(response => {
      response.json().then(result => setUser(result));
    });
  }, []);

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
          {cards.map((card, index) => (
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

export default HomeLoggedIn;
