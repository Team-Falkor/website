"use client";

import { constants } from "@/utils";
import { Link } from "@tanstack/react-router";
import { FaDiscord, FaGithub } from "react-icons/fa6";
import { SiKofi } from "react-icons/si";

const Footer = () => {
  const { ko_fi_url } = constants;
  return (
    <div className="flex flex-col items-center justify-between gap-5 p-5 mt-5 text-center bg-muted/30 px-14 sm:flex-row sm:gap-1 sm:text-left relative z-[1]">
      <div className="flex flex-col gap-1.5">
        <p className="text-sm font-medium">
          © {new Date().getFullYear()} Falkor
        </p>

        <p className="text-sm text-muted-foreground">
          Made with <span className="animate-pulse">❤️</span> by Team Falkor
        </p>
      </div>

      <div className="flex flex-row gap-3">
        <a
          className="transition-all size-5 hover:text-purple-400"
          target="_blank"
          href={"/github/website"}
        >
          <FaGithub className="size-full" />
        </a>

        <a
          className="transition-all size-5 hover:text-purple-400"
          target="_blank"
          href={"/discord"}
        >
          <FaDiscord className="size-full" />
        </a>

        <a
          className="transition-all size-5 hover:text-purple-400"
          target="_blank"
          href={ko_fi_url}
        >
          <SiKofi className="size-full" />
        </a>
      </div>

      {/* New links section */}
      <div className="flex flex-row gap-5 text-sm text-muted-foreground">
        <Link to="/roadmap" className="hover:text-purple-400 transition-colors">
          Roadmap
        </Link>
        <Link to="/login" className="hover:text-purple-400 transition-colors">
          Login
        </Link>
        <Link to="/sign-up" className="hover:text-purple-400 transition-colors">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Footer;
