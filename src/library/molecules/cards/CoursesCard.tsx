import CardContainer from "library/atoms/CardContainer";
import Tag from "library/atoms/Tag";
import TextLink from "library/atoms/TextLink";
import { ArrowRightSvg } from "library/icons/arrows";
import { TimerSvg } from "library/icons/symbols";
import Image from "next/image";
import { useState } from "react";
import ellipse20 from "../../../../public/assets/images/ellipse-20.svg";
import ellipse21 from "../../../../public/assets/images/ellipse-21.svg";
import ellipse22 from "../../../../public/assets/images/ellipse-22.svg";
import classNames from "helpers/classNames";

type Props = {
  title: string;
  image: string;
  path: string;
  duration: string;
  active: boolean;
};

const CoursesCard = ({ title, image, path, duration, active }: Props) => {
  const [state, setState] = useState<"default" | "hovered" | "disabled">("default");

  return (
    <CardContainer
      variant="bubble"
      className={classNames(
        "flex flex-col items-start gap-4 relative overflow-hidden",
        state === "default" && active
          ? "bg-violet-60"
          : state === "hovered" && active
          ? "bg-violet-70 cursor-pointer"
          : state === "disabled" || !active
          ? "bg-gray-20"
          : "",
      )}
      onMouseEnter={() => {
        state === "default" && active && setState("hovered");
      }}
      onMouseLeave={() => {
        state === "hovered" && active && setState("default");
      }}
    >
      {state !== "disabled" && active && (
        <>
          <Image
            src={ellipse20}
            width={167}
            height={190}
            alt="Ellipse"
            className="absolute -bottom-12 right-5 z-10"
            style={{
              width: "167px",
              height: "190px",
            }}
          />
          <Image
            src={ellipse21}
            width={167}
            height={190}
            alt="Ellipse"
            className="absolute -bottom-12 right-0 z-10"
            style={{
              width: "167px",
              height: "190px",
            }}
          />
          <Image
            src={ellipse22}
            width={167}
            height={190}
            alt="Ellipse"
            className="absolute -bottom-12 right-0 z-10"
            style={{
              width: "167px",
              height: "190px",
            }}
          />
        </>
      )}
      <>
        <div className="flex flex-col justify-between gap-8">
          {state === "default" && active ? (
            <>
              <h6 className="text-white">{title}</h6>
              <div className="flex gap-6 items-center">
                <Tag variant="dark" title={duration} startIcon={<TimerSvg width={15} />} className="text-xs" />
                <TextLink
                  title="Spustit"
                  as="link"
                  path={path}
                  color="secondary"
                  endIcon={<ArrowRightSvg width={7} />}
                />
              </div>
            </>
          ) : state === "hovered" && active ? (
            <>
              <h6 className="text-white">{title}</h6>
              <div className="flex gap-6 items-center">
                <Tag variant="dark" title={duration} startIcon={<TimerSvg width={15} />} className="text-xs" />
                <TextLink
                  title="Spustit"
                  as="link"
                  path={path}
                  color="secondary"
                  endIcon={<ArrowRightSvg width={7} />}
                  className="no-underline" // TODO: Nemělo by se podtrhnout při hoveru?
                />
              </div>
            </>
          ) : (
            state === "disabled" ||
            (!active && (
              <>
                <h6 className="text-gray-60">{title}</h6>
                <div className="flex gap-6 items-center">
                  <Tag variant="disabled" title={duration} startIcon={<TimerSvg width={15} />} className="text-xs" />
                </div>
              </>
            ))
          )}
        </div>
        <Image
          src={image}
          alt={title}
          width={150}
          height={150}
          className={`absolute right-0 bottom-0 h-full z-20 ${state === "disabled" || (!active && "grayscale")}`}
        />
      </>
    </CardContainer>
  );
};

const CoursesCardList = ({ courses }: { courses: Props[] }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {courses.map(course => (
        <CoursesCard key={course.title} {...course} />
      ))}
    </div>
  );
};

export default CoursesCardList;
