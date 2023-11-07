import Content from "library/atoms/Content";
import { Metadata } from "next";
import Image from "next/image";
import gradientImage from "../../../public/assets/images/lovereport_gradient.svg";
import Button from "library/atoms/Button";
import { HuggingEmojiSvg } from "library/icons/symbols";

export const metadata: Metadata = {
  title: "Love Report",
};

const functions = [
  {
    title: "Statistická analýza",
    content:
      "Naše technologie vyhodnocuje mnoho faktorů z online seznamek a generuje komplexní pohled na tvůj seznamovací profil.",
  },
  {
    title: "Osobní kouč",
    content:
      "Každý LoveReport je dále ověřen a doplněn osobním seznamovacím koučem. Tím se zaručuje, že analýza je vždy individuální, co nejpřesnější a relevantní právě pro tebe.",
  },
  {
    title: "Rozsáhlý pohled na tvé vztahové a seznamovací dovednosti",
    content:
      "LoveReport se nezaměřuje pouze na současnou situaci, ale také na tvoji vztahovou minulost, dovednosti v navazování a budování vztahů i tvoji připravenost na nový vztah.",
  },
  {
    title: "Hodnocení minulých vztahů",
    content:
      "LoveReport zkoumá tvé minulé vztahy a pomáhá identifikovat vzorce a tendence, které by mohly ovlivňovat tvé současné a budoucí vztahy.",
  },
  {
    title: "Unikátní LOVEREPORT index",
    content:
      "Tento index ti poskytuje komplexní zobrazení tvých seznamovacího schopností a vztahových vlastností v šesti klíčových kategoriích.",
  },
];

const LoveReport = async () => {
  return (
    <>
      <Image
        src={gradientImage}
        width={300}
        height={300}
        alt="Gradient"
        className="absolute top-0 right-0 z-10"
        style={{
          width: "380px",
          height: "380px",
        }}
      />
      <Content title="Zjisti, jaký máš potenciál se seznamovat!" className="flex flex-col gap-8 z-50">
        <div className="flex flex-col items-center gap-3 ">
          <Image
            src="/assets/images/lovereport_woman-primary-image.svg"
            alt="Zjisti, jaký máš potenciál se seznamovat!"
            width={200}
            height={200}
            style={{
              width: "200px",
              height: "200px",
            }}
          />
          <p>
            Vítej v LoveReportu, revolučním nástroji pro lepší porozumění tvému seznamovacímu a vztahovému potenciálu!
          </p>

          <Button
            as="link"
            path="/lovereport/intro"
            color="primary"
            buttonText="Vytvořit si LoveReport"
            className="w-full"
          />

          <div className="mt-6 flex flex-col gap-3">
            <p>
              LoveReport je inovativní analýza, která ti poskytuje jedinečný pohled na „tvoje postavení na seznamovacím
              trhu“. Tato analýza využívá statistická data z online seznamek, aby ti pomohla získat hlubší perspektivu
              na to, jak si stojíš u opačného pohlaví ve tvé věkové kategorii a sociálním statusu.
            </p>
            <Image
              src="/assets/images/lovereport_supplementary-image.svg"
              alt="Graphic image"
              width={200}
              height={200}
              style={{
                width: "200px",
                height: "200px",
              }}
              className="mx-auto"
            />
          </div>
        </div>
        {/* TODO: Překlopit do samostatné komponenty? */}
        <div className="flex flex-col gap-4">
          <h2>Jak to funguje?</h2>
          {functions.map(item => {
            return (
              <div className="flex justify-between gap-3">
                <div className="bg-violet-10 text-violet-70 w-[52px] h-[52px] aspect-square rounded-md flex justify-center items-center">
                  <HuggingEmojiSvg width={30} height={30} />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-gray-80 font-medium">{item.title}</h4>
                  <p>{item.content}</p>
                </div>
              </div>
            );
          })}
        </div>
        <Button
          as="link"
          path="/lovereport/intro"
          color="primary"
          buttonText="Vytvořit si LoveReport"
          className="w-full pb-3"
        />
      </Content>
    </>
  );
};

export default LoveReport;
