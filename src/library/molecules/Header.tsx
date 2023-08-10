import Link from "next/link";
import Image from "next/image";

import logo from "/public/assets/images/logo.svg";
import { ArrowLeftSvg } from "library/icons/arrows";
import { BellSvg } from "library/icons/symbols";
import classNames from "helpers/classNames";

type Props = {
  isBackButton?: boolean;
  userLoggenIn?: boolean;
};

const HeaderNew = ({ isBackButton = false, userLoggenIn }: Props) => {
  return (
    <header className="flex items-center justify-between py-2.5 px-4 relative h-12 z-50">
      {/* TODO: Upravit cestu k tlačítku Zpět na dynamickou */}
      {/* TODO: Přidat logickou podmínku pro zobrazování tlačítka Zpět */}
      {isBackButton ? (
        <Link href="/">
          <div className="flex items-center gap-3 text-violet-70">
            <ArrowLeftSvg width={14} height={14} />
            <p>Zpět</p>
          </div>
        </Link>
      ) : (
        <div />
      )}
      <Link href="/" className={classNames("absolute left-1/2  transform -translate-x-1/2", isBackButton ? "" : "")}>
        <Image src={logo} width={70} height={20} alt="Mingly logo" />
      </Link>
      {/* TODO: Přidat podmínku pro přihlášeného uživatele (zobrazení zvonečku) */}
      {userLoggenIn && (
        <div className="text-violet-70">
          <BellSvg width={20} height={22} />
        </div>
      )}
    </header>
  );
  {
    /* TODO: Upravit odsazení obsahu od headeru až bude jasno z designu */
  }
};
export default HeaderNew;
