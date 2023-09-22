"use client";

import { useSession } from "next-auth/react";
import HomeLoggedIn from "components/home/HomeLoggedIn";
import HomeLoggedOut from "components/home/HomeLoggedOut";

//Zkušební data
const testimonials = [
  {
    image: "/assets/images/testimonial.svg",
    content:
      "Na seznamce jsem poznala úžasného sympaťáka. První rande sice skončilo fiaskem, ale zkusili jsme to ještě jednou a padli si do oka. Po roce vztahu plného humoru i pochopení mě požádal o ruku. Nyní jsme dva měsíce manželé.",
    name: "Iveta S.",
  },
  {
    image: "/assets/images/testimonial.svg",
    content:
      "Podařilo se mi najít na seznamce ženu svých snů. Po pár měsících se nám narodil syn a za další dva roky dcera. Jsme šťastná rodina a děkujeme za to seznamce.",
    name: "Jan N.",
  },
  {
    image: "/assets/images/testimonial.svg",
    content:
      "Našel jsem si na seznamce ženu, která se mnou sdílí společné zájmy. Po pár měsících jsme se vzali a nyní čekáme miminko. Děkujeme seznamce za šanci najít si spřízněnou duši.",
    name: "Lukáš P.",
  },
];

export default function Home() {
  const session = useSession();

  return <>{session.data ? <HomeLoggedIn /> : <HomeLoggedOut />}</>;
}
