export * from "./mdTypes";

export type Platform = "windows" | "linux";

export type Version = `V${string}` | "latest";

export type PackageManager =
  | "windows"
  | "debian"
  | "snap"
  | "pacman"
  | "appimage"
  | "rpm"
  | "tar.gz";

export interface APIResponse<T = unknown> {
  data: T | undefined | null;
  success: boolean;
  message: string | undefined | null;
  error: boolean;
}
