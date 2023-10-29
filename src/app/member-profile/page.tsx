import React from "react";
import CardContainer from "library/atoms/CardContainer";
import Image from "next/image";

export type MemberDetailsProps = {
  name: string;
  profilePhoto: any;
  state: string;
  gender: string;
  age: number;
  location: string;
  hobby?: Array<string>;
  memberData?: any;
  test?: any;
};

export default function MemberProfile({
  name,
  profilePhoto,
  state,
  gender,
  age,
  location,
  hobby,
  test,
}: MemberDetailsProps) {
  console.log("test", test);
  const profilePhotoUrl = profilePhoto.slice(0, 4) === "http" ? profilePhoto : `https:${profilePhoto}`;
  return (
    <main className="w-full pt-2">
      {/* <CardContainer variant="default" className="flex flex-col items-start gap-4 text-[#355675]"> */}
      <div className="flex flex-col space-y-5">
        <div className="justify-center items-center">
          <Image src={profilePhotoUrl} alt="User photo" width={358} height={280} className={"rounded-3xl"} />
        </div>
        <div>
          <div className="text-[24px]">@{name || "No name"}</div>
          <div className="text-[18px]">{`${gender || "No gender"}, ${age || "No age"} let`}</div>
          <div className="text-[18px]">{location || "No location"}</div>
        </div>
        <div>
          <p className="text-[18px]">
            Ahoj, jsem Anna, jsem vášnivou fotografkou. Mým největším koníčkem je však cestování. Miluji objevování
            nových kultur, poznávání neznámých míst a ochutnávání místních specialit...
          </p>
        </div>
        <div className="text-[18px]">
          <p className="">Par zalib:</p>
          <ul className="list-disc pl-5 ">
            {hobby?.slice(0, 4).map((element, index) => <li key={index}>{element}</li>)}
          </ul>
        </div>
        <div className="text-[14px] font-semibold underline">Přečíst víc o uživateli</div>
        <div className="flex flex-col">
          <div className="text-[18px]">31 přátel</div>
          <div className="flex flex-row text-[14px] space-x-2 underline">
            <p>Přidat mezi přátele</p>
            <p>Do oblíbených</p>
          </div>
        </div>
      </div>
      {/* </CardContainer> */}
      <CardContainer variant="default" className="flex flex-col items-start gap-4 text-[#355675]">
        <div className="text-[24px]">Společní přátelé</div>
        <div>
          <Image
            src={"https://mingly.cz/wp-content/uploads/avatars/7641/65312bd90b0f0-bpfull.png"}
            alt="User photo"
            width={46}
            height={46}
            className={"rounded-full"}
          />
        </div>
        <div className="text-[14px] underline">Prohlédnout vše</div>
      </CardContainer>
      <div className="text-[14px] underline pt-2 text-right px-2">Nahlásit profil</div>
      <button className="border border-[#0998FFB2] rounded-md py-2 px-12">
        <p className="text-[#32C5FF] text-[20px] font-semibold">Zpět</p>
      </button>
    </main>
  );
}
