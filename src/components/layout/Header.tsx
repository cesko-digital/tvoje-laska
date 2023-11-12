"use client";

import Link from "next/link";
import Image from "next/image";

import logo from "/public/assets/images/logo.svg";
import { ArrowLeftSvg } from "library/icons/arrows";
import { BellSvg } from "library/icons/symbols";
import classNames from "helpers/classNames";
import { SessionProvider, signOut, useSession } from "next-auth/react";

const Header = () => {
  const session = useSession();


  // TODO: need check Z
  if (session.status === "unauthenticated") {
    return null;
  }


  // TODO: Co dělat v případě loading stavu? Co zobrazovat?
  return session.data ? (
    <div />
  ) : (
    // <HeaderLoggedIn />
    <HeaderLoggedOut />
  );
};

//TODO: Bude nám ještě k něčemu tento Header?
const HeaderLoggedIn = () => {
  return (
    <header className="flex items-center justify-between py-2.5 px-4 relative h-12 z-50 mt-[54px]">
      {/* TODO: Upravit cestu k tlačítku Zpět na dynamickou */}

      <Link href="/">
        <div className="flex items-center gap-3 text-violet-70">
          <ArrowLeftSvg width={14} height={14} />
          <p>Zpět</p>
        </div>
      </Link>

      <Link href="/" className={classNames("absolute left-1/2  transform -translate-x-1/2")}>
        <Image src={logo} width={70} height={20} alt="Mingly logo" />
      </Link>

      <div className="text-violet-70">
        <BellSvg width={20} height={22} />
      </div>
    </header>
  );
};

const HeaderLoggedOut = () => {
  return (
    <header className="flex items-center justify-between py-2.5 px-4 relative h-12 z-50 mt-[54px]">
      <Link href="/" className={classNames("absolute left-1/2  transform -translate-x-1/2")}>
        <Image src={logo} width={70} height={20} alt="Mingly logo" />
      </Link>
    </header>
  );
};

export default Header;
