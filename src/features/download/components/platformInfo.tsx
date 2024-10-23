// platformInfo.tsx
interface PlatformInfoProps {
  platform: string;
  version: string;
  imgSrc: string;
}

export const PlatformInfo = ({
  platform,
  version,
  imgSrc,
}: PlatformInfoProps) => {
  return (
    <div className="flex gap-5 border-b pb-5 overflow-hidden items-center">
      <img
        src={imgSrc}
        alt={`${platform} logo`}
        className="aspect-square size-12 object-contain"
      />
      <p className="text-xl font-bold">{`${version} Falkor for ${platform}`}</p>
    </div>
  );
};
