"use client";

import React from "react";
import Link from "next/link";
import { SessionProvider, signOut, useSession } from "next-auth/react";
import { LoggedUser } from "models/user-models";

const Header = () => {
  return (
    <>
      <SessionProvider>
        <HeaderWithSession />
      </SessionProvider>
    </>
  );
};

const HeaderWithSession = () => {
  const session = useSession();
  const nickname = (session?.data as any as LoggedUser)?.nickname;
  const isLoading = session.status === "loading";

  return (
    <div className="bg-black py-4 px-8 text-white flex justify-between">
      <div className="flex gap-x-4">
        <Link href="/">Home</Link>
        {nickname && !isLoading && <Link href="/profile">My Profile</Link>}
        <Link href="/kontakt">Kontakt</Link>
      </div>

      {!isLoading &&
        (nickname ? (
          <>
            {nickname}{" "}
            <a href="#" onClick={e => signOut()}>
              Odhlásit
            </a>
          </>
        ) : (
          <Link href="/auth/sign-in">Přihlásit</Link>
        ))}
    </div>
  );
};

export default Header;
