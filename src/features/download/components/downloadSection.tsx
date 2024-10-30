import { Platform, Version } from "@/@types";
import { DownloadButton, DownloadButtonProps } from "./downloadButton";
import { PlatformInfo } from "./platformInfo";

interface DownloadSectionProps {
  platform: Platform;
  version: Version;
  imgSrc: string;
  buttons: DownloadButtonProps[];
}

export const DownloadSection = ({
  platform,
  version,
  imgSrc,
  buttons,
}: DownloadSectionProps) => {
  return (
    <div className="space-y-4">
      <PlatformInfo platform={platform} version={version} imgSrc={imgSrc} />
      <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
        {buttons.map((button) => (
          <DownloadButton key={button.label} {...button} />
        ))}
      </div>
    </div>
  );
};
