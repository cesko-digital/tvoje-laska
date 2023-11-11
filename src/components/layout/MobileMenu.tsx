"use client";

import Footer from "library/molecules/Footer";
import NavbarMobile from "library/molecules/NavbarMobile";
import { SessionProvider, useSession } from "next-auth/react";

const MobileMenu = () => {
  const session = useSession();

  // TODO: need check Z
  if (session.status === "unauthenticated") {
    return null;
  }


  // TODO: Co dělat v případě loading stavu? Co zobrazovat?
  return session.data ? <NavbarMobile /> : <Footer />;
};

export default MobileMenu;
