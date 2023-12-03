"use client";

import Carousel from "library/molecules/Carousel";
import Button from "library/atoms/Button";
import Image from "next/image";
import gradientImage from "../../../public/assets/images/gradient-2.svg";
import ListItem from "library/atoms/ListItem";
import { HuggingEmojiSvg } from "library/icons/symbols";
import {
  EyesSvg,
  OrientationSvg,
  ClockSvg,
  ConsultantSvg,
  CooperationSvg,
  CounterpartSvg,
  MessageBubbleSvg,
  SecuritySvg,
  SosSvg,
  TVSvg,
  FriendsSvg,
  HeartOutlineSvg,
} from "library/icons/homepage-items";
import TextLink from "library/atoms/TextLink";

const whoIsForInfo = [
  {
    content: "Bez ohledu na orientaci, věk, nebo hendikep, Mingly je tu pro všechny, bez nálepek.",
    emoji: <OrientationSvg width={24} height={24} />,
  },
  {
    content: "Ať hledáš lásku, kamaráda, komunitu podobně smýšlejících lidí, nebo odbornou radu.",
    emoji: <EyesSvg width={24} height={24} />,
  },
  {
    content: "Ať chceš plný přístup k seznamování, nebo jen profesionální podporu zcela zdarma.",
    emoji: <HuggingEmojiSvg width={24} height={24} />,
  },
];

const functions = [
  {
    title: "Zpětná vazba na tvůj profil",
    content: "Získej doporučení od odborníka, jak vylepšit svůj profil, a zvyš své šance na seznámení.",
    emoji: <MessageBubbleSvg width={24} height={24} />,
  },
  {
    title: "Ideální protějšek",
    content:
      "Zjisti, jak se k sobě s vybraným protějškem hodíte, a to díky unikátnímu párovacímu algoritmu na základě vašich hodnot a představ o budoucnosti.",
    emoji: <CounterpartSvg width={24} height={24} />,
  },
  {
    title: "Konzultace se vztahovým koučem",
    content: "Využij online konzultaci s odborníkem, který ti poradí, jak dosáhnout svých cílů.",
    emoji: <ConsultantSvg width={24} height={24} />,
  },
  {
    title: "Rady pro bezpečné seznámení",
    content:
      "Získej přístup k odborným článkům, kurzům a podcastům, ve kterých získáš spoustu tipů, jak se seznámit s tím, s kým chceš, a s minimálním rizikem.",
    emoji: <SecuritySvg width={24} height={24} />,
  },
  {
    title: "SOS aplikace během schůzky",
    content:
      "Aplikace poradí, na co si dát pozor při prvním kontaktu přes seznamku, doporučí bezpečné místo pro schůzku a v případě nouze odešle tvé GPS souřadnice.",
    emoji: <SosSvg width={24} height={24} />,
  },
];

//TODO: Vyřešit odskakování tečky
const experience = [
  {
    content: "Mingly tvoří odborníci, kteří se seznamování věnují profesionálně více než 10 let.",
    emoji: <ClockSvg width={24} height={24} />,
  },
  {
    content: "Pravidelně vystupujeme v médiích jako odborníci na seznamování.",
    emoji: <TVSvg width={24} height={24} />,
  },
  {
    content: (
      <>
        Vznikáme ve spolupráci s komunitou expertních dobrovolníků z organizace{" "}
        <TextLink path="https://cesko.digital" color="primary" title="Česko.Digital" />
        {/* <span className="whitespace-nowrap">.</span> */}
      </>
    ),
    emoji: <CooperationSvg width={24} height={24} />,
  },
];

//Zkušební data
const testimonials = [
  {
    image: "/assets/images/testimonial-1.svg",
    content:
      "Díky radám od vztahové koučky jsem si upravila profil a konečně se mi začali ozývat ti správní lidé. Taky mi poradila, podle čeho vybírat, a vypadá to, že jsem konečně potkala někoho, kdo mi vyhovuje po všech stránkách a mohlo by to vyjít.",
    name: "Eva",
    age: 29,
  },
  {
    image: "/assets/images/testimonial-2.svg",
    content: "Jsem vděčný, že díky vám teď prožívám úžasnou lásku, kterou můžu nazvat životním příběhem plným štěstí.",
    name: "Vlastík",
    age: 53,
  },
  {
    image: "/assets/images/testimonial-3.svg",
    content:
      "Děkuji. Bez vás by nebylo nás. Neodmyslitelně a navždy budete součástí našeho příběhu. Jsem vám a vašemu týmu nesmírně vděčná za trpělivost a profesionální práci.",
    name: "Jana",
    age: 58,
  },
];

//TODO: Doplnit logo?
const HomeLoggedOut = () => {
  return (
    <>
      <Image
        src={gradientImage}
        width={600}
        height={600}
        alt="Mingly logo"
        className="absolute -top-20 right-0 z-10"
        style={{
          width: "600px",
          height: "600px",
        }}
      />
      <div className="flex flex-col items-center z-50 px-4 gap-y-8 mb-10">
        <div>
          <Image
            src="/assets/images/homepage-image.svg"
            alt="Pro lásku bez nálepek"
            width={300}
            height={300}
            style={{
              width: "300px",
              height: "300px",
            }}
            className="mx-auto"
          />
          <h1 className="font-semibold mb-7 mt-3 text-center">Konečně seznamka, která tě v tom nenechá</h1>
          <div className="flex flex-col gap-y-3 max-w-sm sm:max-w-md mx-auto text-center mb-3">
            <p>Chceš najít parťáka pro život?</p>
            <p>Zkus Mingly, průvodce bezpečným seznamováním pro šťastné konce.</p>
          </div>

          <div className="flex flex-col gap-5 w-full py-4">
            <Button as="link" path="/registrace" color="primary" buttonText="Registrovat se zdarma" />
            <Button as="link" path="/prihlaseni" color="secondary" buttonText="Přihlásit se" />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h2>Najdi si parťáka, nejlepšího kamaráda nebo lásku svého života</h2>
          {/* TODO: Doplnit video */}
          <div className="w-full h-72 rounded-md bg-violet-20 mb-6" />
        </div>
        <div className="flex flex-col gap-4">
          <h2>Pro koho je Mingly?</h2>
          {whoIsForInfo.map((item, index) => (
            <ListItem item={item} key={index} />
          ))}
        </div>
        <Image
          src="/assets/images/homepage-image-2.svg"
          alt="Pomůžeme ti najít partnera/ku"
          width={300}
          height={300}
          /*  style={{
            width: "300px",
            height: "300px",
          }} */
          className="mx-auto w-full max-h-[320px]"
        />
        {/* TODO: Přidat linky u tlačítek */}
        <div className="flex flex-col gap-5 w-full pt-4 pb-8">
          <Button
            as="link"
            path="/"
            color="secondary"
            buttonText="Hledám lásku"
            startIcon={<HeartOutlineSvg width={24} height={24} />}
            className="w-full"
          />
          <Button
            as="link"
            path="/"
            color="secondary"
            buttonText="Hledám kamarády"
            startIcon={<FriendsSvg width={24} height={24} />}
            className="w-full"
          />
        </div>
        <div className="flex flex-col gap-y-4">
          <h2>Pomůžeme ti najít partnera/ku</h2>
          {functions.map((item, index) => (
            <ListItem item={item} key={index} />
          ))}
        </div>
        <Button
          as="link"
          path="/registrace"
          color="primary"
          buttonText="Registrovat se zdarma"
          className="pt-4 pb-8 w-full"
        />
        <div className="flex flex-col">
          <h2 className="text-center">Hledali štěstí a u nás ho našli</h2>
          <Carousel testimonials={testimonials} variant="with-image" />
        </div>
        <div className="flex flex-col gap-y-4 pt-4">
          <h2>10 let zkušeností pro tebe</h2>
          {experience.map((item, index) => (
            <ListItem item={item} key={index} />
          ))}
          {/* TODO: Doplnit link */}
          <TextLink path="/" color="primary" title="Více o nás" className="self-center" />
        </div>

        <div className="flex flex-col gap-3 py-8">
          <h2 className="text-center">Jdi za svým štěstím i ty, zkus to na Mingly!</h2>
          <Button as="link" path="/registrace" color="primary" buttonText="Registrovat se zdarma" />
        </div>
      </div>
    </>
  );
};

export default HomeLoggedOut;
