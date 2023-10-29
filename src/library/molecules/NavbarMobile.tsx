"use client";

import Link from "next/link";
import { ReactNode, useState } from "react";
import classNames from "helpers/classNames";
import { usePathname } from "next/navigation";
import {
  DatingActiveSvg,
  DatingInactiveSvg,
  HomeActiveSvg,
  HomeInactiveSvg,
  MessagesActiveSvg,
  MessagesInactiveSvg,
  RoomsActiveSvg,
  RoomsInactiveSvg,
  SelfDevelopmentActiveSvg,
  SelfDevelopmentInactiveSvg,
} from "library/icons/menu-items";

type MenuItem = {
  title: string;
  icon: ReactNode;
  activeIcon?: ReactNode;
  to: string;
};

// TODO: Upravit linky
const menuItems: MenuItem[] = [
  {
    title: "Domů",
    icon: <HomeInactiveSvg width={34} height={30} />,
    activeIcon: <HomeActiveSvg width={34} height={30} />,
    to: "/",
  },
  {
    title: "Seznamka",
    icon: <DatingInactiveSvg width={30} height={30} />,
    activeIcon: <DatingActiveSvg width={30} height={30} />,
    to: "/seznamka",
  },
  {
    title: "Zprávy",
    icon: <MessagesInactiveSvg width={38} height={30} />,
    activeIcon: <MessagesActiveSvg width={38} height={30} />,
    to: "/zpravy",
  },
  {
    title: "Místnosti",
    icon: <RoomsInactiveSvg width={30} height={30} />,
    activeIcon: <RoomsActiveSvg width={30} height={30} />,
    to: "/mistnosti",
  },
  {
    title: "Seberozvoj",
    icon: <SelfDevelopmentInactiveSvg width={30} height={30} />,
    activeIcon: <SelfDevelopmentActiveSvg width={30} height={30} />,
    to: "/seberozvoj",
  },
];

function NavLink({
  title,
  icon,
  activeIcon,
  to,
  onClick,
  active,
}: {
  icon: ReactNode;
  activeIcon?: ReactNode;
  title: string;
  to: string;
  onClick?: () => void;
  active: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      href={to}
      onClick={onClick}
      className={classNames(
        "flex-1 flex flex-col items-center justify-center h-full text-xs gap-1 font-normal text-gray-900",
        "hover:text-gray-900",
        "focus:text-gray-900",
        "data-[active]:text-primary-600 data-[active]:bg-primary-50 bg-violet-90",
        active ? "text-violet-20" : "text-violet-40",
        isHovered && !active ? "text-violet-50" : "",
      )}
    >
      {active ? activeIcon : icon}

      <span
        className={classNames(
          "block max-w-[16ch] truncate",
          active ? "text-violet-20" : "text-violet-40 opacity-50",
          isHovered && !active ? "text-violet-50" : "",
        )}
      >
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
            activeIcon={menuItem.activeIcon}
            to={menuItem.to}
            active={isCurrentPage}
          />
        );
      })}
    </nav>
  );
};

export default NavbarMobile;
