export * from "./mdTypes";

export type Platform = "windows" | "linux";

export type Version = `V${string}` | "latest";

export type PackageManager =
  | `windows`
  | "debian"
  | "snap"
  | "pacman"
  | "appimage"
  | "rpm"
  | "tar.gz";
