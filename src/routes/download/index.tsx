import Footer from "@/components/footer";
import SvgBG from "@/components/svgBG";
import {
  BugReportSection,
  DownloadSection,
} from "@/features/download/components";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/download/")({
  component: Download,
});

function Download() {
  return (
    <div>
      <div className="p-2 px-4 pb-16">
        <SvgBG />

        <div className="px-4 pt-8 pb-6 mx-auto max-w-4xl sm:px-6 sm:pt-10 sm:pb-8">
          <div className="text-center">
            <h1 className="mt-8 text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Downloads
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
            platform="Linux"
            version="V0.0.4"
            imgSrc="/linux.png"
            buttons={[
              { label: "AppImage", variant: "secondary" },
              { label: "Debian", variant: "secondary" },
              { label: "Snap", variant: "secondary" },
              { label: "Pacman", variant: "secondary" },
              { label: "RPM", variant: "secondary" },
            ]}
          />

          {/* WINDOWS DOWNLOAD SECTION */}
          <DownloadSection
            platform="Windows"
            version="V0.0.4"
            imgSrc="/windows.png"
            buttons={[{ label: "Download for Windows", variant: "secondary" }]}
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
