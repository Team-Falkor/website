import SvgBG from "@/components/svgBG";
import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/download/")({
  component: Download,
});

function Download() {
  return (
    <div className="p-2">
      <SvgBG />

      <div className="px-6 pt-10 pb-6 mx-auto max-w-6xl">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col justify-center items-center w-full text-center">
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Downloads
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-300">
              Falkor is available for Windows, and Linux.
              <br /> for best experience. Please use the latest version
              available.
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 pt-20 mx-auto max-w-6xl flex flex-col gap-16">
        {/* LINUX */}
        <div className="flex flex-col gap-4">
          {/* LINUX IMAGE */}
          <div className="flex gap-4 border-b pb-5 overflow-hidden items-center">
            <img
              src="/linux.png"
              className="aspect-square size-12 object-contain"
            />
            <p className="text-xl">V0.0.4 Falkor for linux</p>
          </div>

          {/* CONTAINER */}
          <div className="flex gap-3 justify-start items-center">
            <Button variant={"secondary"} size="lg" className="h-14 text-lg">
              AppImage
            </Button>

            <Button variant={"secondary"} size="lg" className="h-14 text-lg">
              Debian
            </Button>

            <Button variant={"secondary"} size="lg" className="h-14 text-lg">
              Snap
            </Button>

            <Button variant={"secondary"} size="lg" className="h-14 text-lg">
              Pacman
            </Button>

            <Button variant={"secondary"} size="lg" className="h-14 text-lg">
              RPM
            </Button>
          </div>
        </div>
        {/* WINDOWS */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 border-b pb-5 overflow-hidden items-center">
            <img
              src="/windows.png"
              className="aspect-square size-12 object-contain"
            />
            <p className="text-xl">V0.0.4 Falkor for windows</p>
          </div>

          {/* CONTAINER */}
          <div className="flex gap-3 justify-start items-center">
            <Button variant={"secondary"} size="lg" className="h-14 text-lg">
              Download for Windows
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
