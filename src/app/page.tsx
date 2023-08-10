import Button from "library/atoms/Button";
import Content from "library/atoms/Content";
import Carousel from "library/molecules/Carousel";
import Image from "next/image";
import gradientImage from "../../public/assets/images/gradient.svg";

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

export default async function Home() {
  return (
    <Content title="Pro lásku bez nálepek" className="flex flex-col gap-8 z-50">
      <div className="flex flex-col items-center gap-3 ">
        <Image src="/assets/images/homepage-image.svg" alt="Pro lásku bez nálepek" width={200} height={200} />
        <p>
          Přidej se k Mingly, jedinečné internetové seznamce, která pomáhá navazovat nová přátelství i známosti a
          budovat pevné romantické vztahy.
        </p>

        <div className="flex flex-col gap-5 w-full py-4">
          <Button as="link" path="/registration" color="primary" buttonText="Registrovat se" />
          <Button as="link" path="/auth/sign-in" color="secondary" buttonText="Přihlásit se" />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h2>Najdi si parťáka, nejlepšího kamaráda nebo lásku svého života</h2>
        {/* TODO: Doplnit video */}
        <div className="w-full h-72 rounded-md bg-violet-20"></div>
      </div>
      <div className="flex flex-col gap-3">
        <h2>Jsme jediná seznamka svého druhu</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Duis ante orci, molestie vitae vehicula venenatis,
          tincidunt ac pede. Integer in sapien.
        </p>
        <p>
          Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Fusce consectetuer
          risus a nunc.
        </p>
      </div>
      <div className="flex flex-col">
        <h2>Hledali štěstí a u nás ho našli</h2>
        <Carousel testimonials={testimonials} variant="with-image" />
      </div>
      <div className="flex flex-col gap-3 py-8">
        <h2>Jdi za svým štěstím i ty, zkus to na Mingly</h2>
        <Button as="link" path="/registration" color="primary" buttonText="Registrovat se" />
      </div>
    </Content>
  );
}
