import { PackageManager, Version } from "@/@types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const downloadApp = (pckgManager: PackageManager, version: Version) => {
  const baseUrl = `https://github.com/team-falkor/app/releases/download/${version}`;
  switch (pckgManager) {
    case "appimage":
      return `${baseUrl}/falkor.AppImage`;
    case "debian":
      return `${baseUrl}/falkor.deb`;
    case "windows":
      return `${baseUrl}/falkor.exe`;
    case "pacman":
      return `${baseUrl}/falkor.pacman`;
    case "rpm":
      return `${baseUrl}/falkor.rpm`;
    case "snap":
      return `${baseUrl}/falkor.snap`;
    case "tar.gz":
      return `${baseUrl}/falkor.tar.gz`;
    default:
      return null;
  }
};
