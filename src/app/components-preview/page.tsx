"use client";
import Button from "library/atoms/Button";
import Toggle from "library/atoms/Toggle";
import Input from "library/atoms/Input";
import Tag from "library/atoms/Tag";
import Checkbox from "library/atoms/Checkbox";
import Modal from "library/molecules/Modal";
import Footer from "library/molecules/Footer";
import Header from "components/layout/Header";
import StepperMenu, { StepperStep } from "library/molecules/ProgressStepper";
import Carousel from "library/molecules/Carousel";
import { ShoppingBagSvg } from "library/icons/symbols";
import Tabs from "library/atoms/Tabs";
import TextLink from "library/atoms/TextLink";
import { ArrowRightSvg } from "library/icons/arrows";
import UserCard from "library/molecules/cards/UserCard";
import NavbarMobile from "library/molecules/NavbarMobile";
import ImageUploader from "library/molecules/ImageUploader";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInput from "library/atoms/PhoneInput";
import Divider from "library/atoms/Divider";
import CardMobile from "library/molecules/cards/CardMobile";
import DateInput from "library/atoms/DateInput";
import CoursesCardList from "library/molecules/cards/CoursesCard";
import ProfileCard from "library/molecules/cards/ProfileCard";
import Textarea from "library/atoms/Textarea";
import QuestionCard from "library/molecules/cards/QuestionCard";
import ChatCard from "library/molecules/cards/ChatCard";
import RoomCard from "library/molecules/cards/RoomCard";
import Pagination from "library/molecules/Pagination";
import { useEffect, useState } from "react";
import DonutChart from "library/molecules/charts/DonutChart";
import VerticalBarChart from "library/molecules/charts/VerticalBarChart";
import MembershipMode from "library/atoms/MembershipMode";

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
const options2 = [
  {
    id: "4",
    optionName: "Možnost 1",
  },
  {
    id: "5",
    optionName: "Možnost 2",
  },
  {
    id: "6",
    optionName: "Možnost 3",
  },
];

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

const formSchema = z.object({
  email: z.string().min(1, "E-mail je povinný").email(),
  phone: z.string().min(1, "Telefon je povinný").min(9, "Minimální délka je 9 znaků"),
  date: z.date(),
  isChecked: z.boolean(),
});

export type FormValues = z.infer<typeof formSchema>;

export default function ComponentsPreview() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      phone: "",
      date: new Date(),
      isChecked: true,
    },
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState([]);
  const maxPage = 8;

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  //TODO: Zkušební data pro stránkování
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos");
      const data = await res.json();

      setItems(data);
    };

    fetchData();
  }, []);

  return (
    <div className="w-fit flex flex-col gap-8 justify-start m-5">
      <Header />
      <Toggle />
      <TextLink
        title="Zobrazit můj profil"
        as="link"
        path="profile"
        color="primary"
        endIcon={<ArrowRightSvg width={10} />}
      />
      <DateInput register={form.register("date")} control={form.control} />
      <UserCard
        status="admin"
        cardType="default"
        name="Adam Klempíř"
        gender="muž"
        age={24}
        location="Praha"
        photo="/assets/images/user-photo.png"
        userIsActive={false}
      />
      {/* ZKUŠEBNÍ DATA */}
      <CoursesCardList
        courses={[
          {
            title: "Kurz 1",
            image: "/assets/images/phone-in-hand.svg",
            path: "/kurz-1",
            duration: "1 hodina",
            active: true,
          },
          {
            title: "Kurz 2",
            image: "/assets/images/phone-in-hand.svg",
            path: "/kurz-2",
            duration: "2 hodiny",
            active: false,
          },
          {
            title: "Kurz 3",
            image: "/assets/images/phone-in-hand.svg",
            path: "/kurz-3",
            duration: "30 minut",
            active: true,
          },
        ]}
      />

      <ProfileCard
        name="Anna Nováková"
        nickname="@annie76"
        gender="žena"
        age={30}
        location="Beroun, Středočeský kraj"
        status="meet"
        tags={["cestování", "cizí jazyky", "fotografie", "party a diskotéky", "architektura"]}
      />
      <Tabs />
      <Divider label="nebo" type="withText" />
      <CardMobile
        title="Moji přátelé a oblíbení"
        content={friends}
        contentType="friends"
        //TODO: Nechat to takto nebo TextLink přidat rovnou do CardMobile?
        textLink={
          <TextLink
            title="Přejít na přátelé a oblíbené"
            as="link"
            path="pratele"
            color="primary"
            endIcon={<ArrowRightSvg width={10} />}
          />
        }
      />

      <Button
        // disabled
        color="secondary"
        buttonText="Tlačítko"
        startIcon={<ShoppingBagSvg width={21} />}
        className="text-xl"
      />
      <Input label="E-mail" error={form.formState.errors["email"]} register={form.register("email")} />
      {/* TODO: Jaké budou hodnoty erroru a registrace u textarea? */}
      <Textarea
        label="Popiš svůj vzhled tak, aby si tě dovedl představit třeba i nevidomý."
        error={form.formState.errors["email"]}
        register={form.register("email")}
        placeholder="Text"
      />
      <PhoneInput label="Telefon" error={form.formState.errors["phone"]} register={form.register("phone")} />
      <Tag title="Tag" />
      <Checkbox register={form.register("isChecked")} id="comments" title="Checkbox" />
      {/* <RadioGroup title="Možnosti" options={options}  /> */}
      {/* <RadioBigButtonGroup title="Možnosti" options={options2} startIcon={<ShoppingBagSvg width={20} />} /> */}
      <div>
        <Modal title="Jak na super fotku?" />
      </div>

      <StepperMenu steps={steps} />
      <Carousel testimonials={testimonials} variant="with-image" />
      <ImageUploader name="upload-image" />
      <ChatCard
        username="honzicek123"
        photo="/assets/images/user-photo.png"
        userIsActive={true}
        message="Tak kdy se uvidíme?"
        time="21:50"
      />
      <RoomCard title="Trapasy z rande" photo="/assets/images/room-photo.png" members={3446} path="#" />

      <QuestionCard />
      <MembershipMode variant="community" />
      <MembershipMode variant="meet" />
      <MembershipMode variant="couch" />
      <MembershipMode variant="admin" />

      <Pagination maxPage={maxPage} data={items} currentPage={currentPage} onPageChange={onPageChange} />

      <DonutChart />
      <VerticalBarChart />

      <Footer />
      <NavbarMobile />
    </div>
  );
}
