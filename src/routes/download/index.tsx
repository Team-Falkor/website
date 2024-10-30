import { Version } from "@/@types";
import Footer from "@/components/footer";
import SvgBG from "@/components/svgBG";
import {
  BugReportSection,
  DownloadSection,
} from "@/features/download/components";
import { constants, downloadApp } from "@/utils";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/download/")({
  component: Download,
});

function Download() {
  const version = constants.app_version as Version;

  return (
    <div className="text-orange-400">
      <div className="p-2 px-4 pb-16">
        <SvgBG />

        <div className="px-4 pt-8 pb-6 mx-auto max-w-4xl sm:px-6 sm:pt-10 sm:pb-8">
          <div className="text-center">
            <h1 className="mt-8 text-3xl font-bold tracking-tight text-orange-400 sm:text-5xl lg:text-6xl">
              Downloads 🎃
            </h1>

            <p className="mt-4 text-base leading-7 text-gray-300 sm:mt-6 sm:text-lg lg:text-xl">
              Falkor is available for Windows and Linux.
              <br />
              For the best experience, please use the latest version available.
            </p>
          </div>
        </div>

        <div className="px-4 pt-12 mx-auto max-w-4xl sm:px-6 lg:max-w-6xl lg:pt-16 space-y-16">
          {/* LINUX DOWNLOAD SECTION */}
          <DownloadSection
            platform="linux"
            version="V0.0.4"
            imgSrc="/linux.png"
            buttons={[
              {
                label: "AppImage 🕸️",
                variant: "secondary",
                href: downloadApp("appimage", version),
              },
              {
                label: "Debian 🎃",
                variant: "secondary",
                href: downloadApp("debian", version),
              },
              {
                label: "Snap 👻",
                variant: "secondary",
                href: downloadApp("snap", version),
              },
              {
                label: "Pacman 🧛",
                variant: "secondary",
                href: downloadApp("pacman", version),
              },
              {
                label: "RPM 🕷️",
                variant: "secondary",
                href: downloadApp("rpm", version),
              },
            ]}
          />

          {/* WINDOWS DOWNLOAD SECTION */}
          <DownloadSection
            platform="windows"
            version="V0.0.4"
            imgSrc="/windows.png"
            buttons={[
              {
                label: "Download for Windows 🦇",
                variant: "secondary",
                href: downloadApp("windows", version),
              },
            ]}
          />
        </div>

        <div className="pt-16">
          <BugReportSection />
        </div>
      </div>

      <Footer />
    </div>
  );
}
