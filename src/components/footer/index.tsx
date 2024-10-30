"use client";

import { constants } from "@/utils";
import { FaDiscord, FaGithub } from "react-icons/fa6";
import { SiKofi } from "react-icons/si";

const Footer = () => {
  const { ko_fi_url } = constants;
  return (
    <div className="mt-8 flex flex-col items-center justify-between gap-5 p-5 px-14 text-center sm:flex-row sm:gap-1 sm:text-left bg-gray-900/90 shadow-[0_0_20px_rgba(255,128,19,0.5)]">
      <div className="flex flex-col gap-1.5">
        <p className="text-sm font-medium text-gray-200">
          © {new Date().getFullYear()} Falkor
        </p>

        <p className="text-sm text-gray-400">
          Made with{" "}
          <span className="inline-block text-red-500 animate-pulse">❤️</span> by
          Team Falkor
        </p>
      </div>

      <div className="flex flex-row gap-3">
        <a
          className="size-5 transition-all hover:text-orange-400"
          target="_blank"
          href={"/github/website"}
        >
          <FaGithub className="size-full hover:scale-110 transition-transform duration-300" />
        </a>

        <a
          className="size-5 transition-all hover:text-orange-400"
          target="_blank"
          href={"/discord"}
        >
          <FaDiscord className="size-full hover:scale-110 transition-transform duration-300" />
        </a>

        <a
          className="size-5 transition-all hover:text-orange-400"
          target="_blank"
          href={ko_fi_url}
        >
          <SiKofi className="size-full hover:scale-110 transition-transform duration-300" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
