"use client";

import { FaDiscord, FaGithub } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="mt-5 flex flex-col items-center justify-between gap-5 bg-muted/30 p-5 px-14 text-center sm:flex-row sm:gap-1 sm:text-left">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium">
          © {new Date().getFullYear()} Falkor
        </p>

        <p className="text-sm text-muted-foreground">
          Made with ❤️ by Team Falkor
        </p>
      </div>

      <div className="flex flex-row gap-3">
        <a
          className="size-5 transition-all hover:opacity-50"
          target="_blank"
          href={"/github/website"}
        >
          <FaGithub className="size-full" />
        </a>

        <a
          className="size-5 transition-all hover:opacity-50"
          target="_blank"
          href={"/discord"}
        >
          <FaDiscord className="size-full" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
