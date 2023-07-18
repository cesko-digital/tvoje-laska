import React, { ReactNode } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const LayoutNavigation = ({ children }: { children: ReactNode }) => {
  const session = useSession();
  const email = session.data?.user?.email;

  return (
    <>
      <div className="bg-black py-4 px-8 text-white flex justify-between">
        <div className="flex gap-x-4">
          <Link href="/">Home</Link>
          {email && <Link href="/profile">My Profile</Link>}
          <Link href="/kontakt">Kontakt</Link>
        </div>

        {email ? (
          <>
            {email} <a onClick={() => signOut()}>Odhlásit</a>
          </>
        ) : (
          <>
            <Link href="/sign-in">Přihlásit</Link>
          </>
        )}
      </div>
      {children}
    </>
  );
};

export default LayoutNavigation;
