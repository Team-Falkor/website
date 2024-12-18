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
    <div className="flex gap-5 border-b pb-5 items-center overflow-hidden bg-gray-800/30 p-4 rounded-md">
      <img
        src={imgSrc}
        alt={`${platform} logo`}
        className="aspect-square size-12 object-contain"
      />
      <p className="text-xl font-bold capitalize">{`${version} Falkor for ${platform}`}</p>
    </div>
  );
};
