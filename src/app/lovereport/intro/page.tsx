"use client";

import Button from "library/atoms/Button";
import Content from "library/atoms/Content";
import { HuggingEmojiSvg } from "library/icons/symbols";
import Image from "next/image";
import { useRouter } from "next/navigation";

const info = [
  {
    title: "6 částí",
    content: "LoveReport je rozdělen do 6 tematických celků",
  },
  {
    title: "5 – 10 minut",
    content: "Na jeho vyplnění budeš potřebovat přibližně 5 až 10 minut.",
  },
  {
    title: "Buď k sobě upřímný/á",
    content: "Na otázky odpovídej pravdivě a otevřeně. Jenom tak můžeme vše objektivně zhodnotit a pomoci ti.",
  },
  {
    title: "Převyplněné údaje",
    content:
      "Údaje z tvého profilu jsme použili do LoveReportu, abys měl/a vyplňování jednodušší. Můžeš je ale upravit.",
  },
];

const LoveReportIntro = () => {
  const router = useRouter();

  const handleCreateLovereport = () => {
    router.push("/lovereport/create");
  };

  return (
    <Content title="Můžeme začít?" className="flex flex-col">
      <div className="flex flex-col items-center gap-3 ">
        {/* TODO: Překlopit do samostatné komponenty? */}

        {info.map((item, index) => {
          return (
            <div key={item.title}>
              <div className="flex justify-between gap-3">
                <div className="bg-violet-10 text-violet-70 w-[52px] h-[52px] aspect-square rounded-md flex justify-center items-center">
                  <HuggingEmojiSvg width={30} height={30} />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-gray-80 font-medium">{item.title}</h4>
                  <p>{item.content}</p>
                </div>
              </div>
              {index === 1 && (
                <Image
                  src="/assets/images/lovereport_woman-secondary-image.svg"
                  alt="Graphic image"
                  width={200}
                  height={200}
                  style={{
                    width: "200px",
                    height: "200px",
                  }}
                  className="my-4"
                />
              )}
            </div>
          );
        })}
        <Button
          as="link"
          path="/lovereport/create"
          color="primary"
          buttonText="Jdu na to"
          className="w-full mt-4"
          onClick={handleCreateLovereport}
        />
      </div>
    </Content>
  );
};
export default LoveReportIntro;
