"use client";

import { constants } from "@/utils";
import { FaDiscord, FaGithub } from "react-icons/fa6";
import { SiKofi } from "react-icons/si";

const Footer = () => {
  const { ko_fi_url } = constants;
  return (
    <div className="mt-5 flex flex-col items-center justify-between gap-5 bg-muted/30 p-5 px-14 text-center sm:flex-row sm:gap-1 sm:text-left">
      <div className="flex flex-col gap-1.5">
        <p className="text-sm font-medium">
          © {new Date().getFullYear()} Falkor
        </p>

        <p className="text-sm text-muted-foreground">
          Made with ❤️ by Team Falkor
        </p>
      </div>

      <div className="flex flex-row gap-3">
        <a
          className="size-5 transition-all hover:text-purple-400"
          target="_blank"
          href={"/github/website"}
        >
          <FaGithub className="size-full" />
        </a>

        <a
          className="size-5 transition-all  hover:text-purple-400"
          target="_blank"
          href={"/discord"}
        >
          <FaDiscord className="size-full" />
        </a>

        <a
          className="size-5 transition-all hover:text-purple-400"
          target="_blank"
          href={ko_fi_url}
        >
          <SiKofi className="size-full" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
