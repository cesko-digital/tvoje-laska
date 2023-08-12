"use client";

import Button from "library/atoms/Button";
import Toggle from "library/atoms/Toggle";
import Input from "library/atoms/Input";
import Tag from "library/atoms/Tag";
import Checkbox from "library/atoms/Checkbox";
import Modal from "library/molecules/Modal";
import Footer from "library/molecules/Footer";
import HeaderNew from "library/molecules/Header";
import StepperMenu, { StepperStep } from "library/molecules/ProgressStepper";
import Carousel from "library/molecules/Carousel";
import { ShoppingBagSvg } from "library/icons/symbols";
import Tabs from "library/atoms/Tabs";
import TextLink from "library/atoms/TextLink";
import { ArrowRightSvg } from "library/icons/arrows";
import UserCard from "library/molecules/cards/UserCard";
import NavbarMobile from "library/molecules/MobileMenu";
import ImageUploader from "library/molecules/ImageUploader";
import RadioGroup from "library/atoms/RadioGroup";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInput from "library/atoms/PhoneInput";

const steps: StepperStep[] = [
  {
    title: "Krok 1",
    description: "Popis kroku 1",
    path: "/components-preview/krok-1",
    active: true,
  },
  {
    title: "Krok 2",
    description: "Popis kroku 2",
    path: "/components-preview/krok-2",
  },
  {
    title: "Krok 3",
    description: "Popis kroku 3",
    path: "/components-preview/krok-3",
  },
  {
    title: "Krok 4",
    description: "Popis kroku 4",
    path: "/components-preview/krok-4",
  },
  {
    title: "Krok 5",
    description: "Popis kroku 5",
    path: "/components-preview/krok-5",
  },
  {
    title: "Krok 6",
    description: "Popis kroku 6",
    path: "/components-preview/krok-6",
  },
  {
    title: "Krok 7",
    description: "Popis kroku 7",
    path: "/components-preview/krok-7",
  },
  {
    title: "Krok 8",
    description: "Popis kroku 8",
    path: "/components-preview/krok-8",
  },
];

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

const options = [
  {
    id: "1",
    optionName: "Možnost 1",
  },
  {
    id: "2",
    optionName: "Možnost 2",
  },
  {
    id: "3",
    optionName: "Možnost 3",
  },
];

const formSchema = z.object({
  email: z.string().nonempty("E-mail je povinný").email(),
  phone: z.string().nonempty("Telefon je povinný").min(9, 'Minimální délka je 9 znaků')
});

export type FormValues = z.infer<typeof formSchema>;

export default async function ComponentsPreview() {

  
    const form = useForm<FormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        email: "",
        phone: ""
      },
    });

  return (
    <div className="w-fit flex flex-col gap-8 justify-start m-5">
      <HeaderNew />
      <Toggle />
      <TextLink
        title="Zobrazit můj profil"
        as="link"
        path="profile"
        color="primary"
        endIcon={<ArrowRightSvg width={10} />}
      />
      <UserCard
        cardType="default"
        name="Adam Klempíř"
        gender="muž"
        age={24}
        location="Praha"
        photo="/assets/images/user-photo.png"
        userIsActive={false}
      />
      <Tabs />
      <Button
        // disabled
        color="secondary"
        buttonText="Tlačítko"
        startIcon={<ShoppingBagSvg width={21} />}
        className="text-xl"
      />
      <Input label="E-mail" error={form.formState.errors["email"]} register={form.register("email")} />
      <PhoneInput label="Telefon" error={form.formState.errors["phone"]} register={form.register("phone")}/>
      <Tag title="Tag" />
      <Checkbox id="comments" title="Checkbox" />
      <RadioGroup title="Možnosti" options={options} />
      <Modal title="Jak na super fotku?" />
      <StepperMenu steps={steps} />
      <Carousel testimonials={testimonials} variant="with-image" />
      <ImageUploader />
      <Footer />
      <NavbarMobile />
    </div>
  );
}
