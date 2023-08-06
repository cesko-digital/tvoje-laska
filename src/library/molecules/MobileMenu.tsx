"use client";

import Link from "next/link";
import { ReactNode } from "react";
import classNames from "helpers/classNames";
import { usePathname } from "next/navigation";
import { DatingSvg, HomeSvg, MessagesSvg, RoomsSvg } from "library/icons/menu-items";

type MenuItem = {
  title: string;
  icon: ReactNode;
  to: string;
};

// TODO: Upravit linky
const menuItems: MenuItem[] = [
  {
    title: "Domů",
    icon: <HomeSvg width={34} height={30} />,
    to: "/",
  },
  {
    title: "Seznamka",
    icon: <DatingSvg width={30} height={30} />,
    to: "/seznamka",
  },
  {
    title: "Zprávy",
    icon: <MessagesSvg width={38} height={30} />,
    to: "/zpravy",
  },
  {
    title: "Místnosti",
    icon: <RoomsSvg width={30} height={30} />,
    to: "/mistnosti",
  },
];

function NavLink({
  title,
  icon,
  to,
  onClick,
  active,
}: {
  icon: ReactNode;
  title: string;
  to: string;
  onClick?: () => void;
  active: boolean;
}) {
  return (
    <Link
      href={to}
      onClick={onClick}
      className={classNames(
        "flex-1 flex flex-col items-center justify-center h-full text-xs gap-1 font-normal text-gray-900",
        "hover:text-gray-900",
        "focus:text-gray-900",
        "data-[active]:text-primary-600 data-[active]:bg-primary-50",
        active ? "text-violet-70" : "text-violet-20",
      )}
    >
      {icon}

      <span className={classNames("block max-w-[16ch] truncate", active ? "text-violet-70" : "text-violet-20")}>
        {title}
      </span>
    </Link>
  );
}

interface NavbarMobileProps {
  className?: string;
}

const NavbarMobile = ({ className }: NavbarMobileProps) => {
  const pathname = usePathname();

  return (
    <nav
      className={classNames(
        "flex h-16 bg-white shadow-[0px_-10px_10px_rgba(0,0,0,0.04),0px_-1px_2px_rgba(0,0,0,0.06)]",
        className!,
      )}
    >
      {menuItems.map(menuItem => {
        const isCurrentPage = pathname === menuItem.to;

        return (
          <NavLink
            key={menuItem.title}
            title={menuItem.title}
            icon={menuItem.icon}
            to={menuItem.to}
            active={isCurrentPage}
          />
        );
      })}
    </nav>
  );
};

export default NavbarMobile;
