"use client";

import Button from "library/atoms/Button";
import Content from "library/atoms/Content";
import ListItem from "library/atoms/ListItem";
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
      <div className="flex flex-col gap-3 ">
        {/* TODO: Překlopit do samostatné komponenty? */}

        {info.map((item, index) => {
          return (
            <div key={item.title}>
              <ListItem item={item} />
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
                  className="my-4 mx-auto"
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
