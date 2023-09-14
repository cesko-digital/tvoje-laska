import { Metadata } from "next";

import TextLink from "library/atoms/TextLink";

import CardContainer from "library/atoms/CardContainer";
import CardMobile from "library/molecules/cards/CardMobile";
import MeCard from "library/molecules/cards/MeCard";

import { ArrowRightSvg } from "library/icons/arrows";

import { getCurrentMember } from "app/api/member/member";

import { processUserData } from "utils/processUserData";

export const metadata: Metadata = {
  title: "Můj profil",
};

export default async function Profile() {
  const profile = await getCurrentMember();

  if (!profile) return <div>Nebylo možné načíst data</div>;

  const data = processUserData(profile);

  return (
    <main className="w-full p-5">
      <MeCard
        nickname={data.get("name") || ""}
        gender={data.get("gender") || ""}
        age={data.get("age") || ""}
        city={data.get("city") || ""}
        region={data.get("region") || ""}
        photo={data.get("imageThumb")}
        datingStatus={data.get("datingStatus")}
      />
      <CardMobile
        /* TODO: translate */
        title="Moji přátelé a oblíbení"
        /* TODO: get friends */
        friends={[]}
        textLink={
          <TextLink
            /* TODO: translate */
            title="Přejít na přátelé a oblíbené"
            as="link"
            path="profile/friends"
            color="primary"
            endIcon={<ArrowRightSvg width={10} />}
          />
        }
      />

      <CardContainer variant="bubble" padding="smaller">
        {/* TODO: translate */}
        <h5 className="mb-1">Multimediální obsah</h5>
        <p className="text-gray-70 font-normal">V rámci free plánu máš k dispozici 3 základní kurzy.</p>
        <TextLink title="???" as="link" path="profile" color="primary" endIcon={<ArrowRightSvg width={10} />} />
      </CardContainer>

      <CardContainer variant="bubble" padding="smaller">
        {/* TODO: translate */}
        <h5 className="mb-1">LoveReport</h5>
        <p className="text-gray-70 font-normal">
          Nemáš vyplněný žádný LoveReport. Vyplň dotazník a zjisti, jaký máš potenciál se seznamovat.
        </p>
        <TextLink
          title="Přejít na LoveReport"
          as="link"
          path="profile/lovereport"
          color="primary"
          endIcon={<ArrowRightSvg width={10} />}
        />
      </CardContainer>

      <CardContainer variant="bubble" padding="smaller">
        {/* TODO: translate */}
        <h5 className="mb-1">Nastavení</h5>
        <p className="text-gray-70 font-normal">
          Potřebuješ si změnit heslo, zapnout notifikace, změnit členství nebo upravit své základní nastavení?
        </p>
        {/* TODO: Create settings page */}
        <TextLink
          title="Přejít do nastavení"
          as="link"
          path="/"
          color="primary"
          endIcon={<ArrowRightSvg width={10} />}
        />
      </CardContainer>

      <CardContainer variant="bubble" padding="smaller">
        {/* TODO: translate */}
        <h5 className="mb-1">Podpora</h5>
        <p className="text-gray-70 font-normal">
          Nevíš si rady s aplikací, potřebuješ na nás kontakt nebo vyhledáváš pomoc odborného vztahového kouče?
        </p>
        {/* TODO: Create support page */}
        <TextLink title="Přejít na podporu" as="link" path="/" color="primary" endIcon={<ArrowRightSvg width={10} />} />
      </CardContainer>
    </main>
  );
}
