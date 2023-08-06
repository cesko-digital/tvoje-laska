import Link from "next/link";
import Image from "next/image";

import logo from "/public/assets/images/logo.svg";
import { ArrowLeftSvg } from "library/icons/arrows";
import { BellSvg } from "library/icons/symbols";

type Props = {
  title?: string;
  children?: React.ReactNode;
};

const MobileLayout = ({ title, children }: Props) => {
  return (
    <div className="flex flex-col px-4">
      <header className="flex items-center justify-between py-2.5 relative">
        {/* TODO: Upravit cestu k tlačítku zpět na dynamickou */}
        <Link href="/">
          <div className="flex items-center gap-3 text-violet-70">
            <ArrowLeftSvg width={14} height={14} />
            <p>Zpět</p>
          </div>
        </Link>
        <Link href="/" className="absolute left-1/2 transform -translate-x-1/2">
          <Image src={logo} width={70} height={20} alt="Mingly logo" />
        </Link>
        {/* TODO: Přidat podmínku pro přihlášeného uživatele */}
        <span className="text-violet-70">
          <BellSvg width={20} height={22} />
        </span>
      </header>
      {/* TODO: Upravit odsazení obsahu od headeru až bude jasno z designu */}
      <div className="my-4">
        <h1 className="leading-[120%]">{title}</h1>
        {children}
      </div>
    </div>
  );
};
export default MobileLayout;
