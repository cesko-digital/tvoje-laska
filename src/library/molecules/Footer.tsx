import { FacebookSvg, InstagramSvg, TikTokSvg, YoutubeSvg } from "library/icons/social-media";
import { ReactNode } from "react";

type Social = {
  title?: string;
  icon: ReactNode;
  link: string;
};

type Link = {
  title: string;
  link: string;
};

// TODO: Doplnit linky
const socials: Social[] = [
  {
    title: "Facebook",
    icon: <FacebookSvg width={26} />,
    link: "#",
  },
  {
    title: "Instagram",
    icon: <InstagramSvg width={26} />,
    link: "#",
  },
  {
    title: "Youtube",
    icon: <YoutubeSvg width={26} />,
    link: "#",
  },
  {
    title: "Tiktok",
    icon: <TikTokSvg width={26} />,
    link: "#",
  },
];

const links: Link[] = [
  {
    title: "Úvod",
    link: "#",
  },
  {
    title: "O nás",
    link: "#",
  },
  {
    title: "Cookies",
    link: "#",
  },
  {
    title: "Podmínky",
    link: "#",
  },
];

// TODO: Doplnit linky
const Footer = () => {
  return (
    <footer className="flex flex-col bg-violet-90 text-violet-10 py-6 px-4 gap-5">
      <div className="flex flex-col gap-2">
        <h6>Sleduj nás na sítích</h6>
        <ul className="flex gap-4 items-center text-violet-30">
          {socials.map((social, index) => {
            return (
              <li key={index}>
                <a href={social.link}>{social.icon}</a>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex flex-col gap-2">
        <h6>Ozvi se nám</h6>
        <a href="mailto:info@mingly.cz" className="text-violet-30 underline">
          info@mingly.cz
        </a>
        <p className="text-sm">
          Tento projekt funguje díky podpoře{" "}
          <a href="https://cesko.digital/" className="text-violet-30 underline">
            Česko.Digital.
          </a>
        </p>
      </div>
      <div>
        <h6>Užitečné odkazy</h6>
        <ul className="flex gap-4">
          {links.map((link, index) => {
            return (
              <li key={index}>
                <a href={link.link} className="text-violet-30 underline">
                  {link.title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
