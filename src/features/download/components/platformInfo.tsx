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
        className="w-16 h-16 object-contain transition-transform transform hover:scale-105"
      />
      <p className="text-xl font-bold text-orange-400 capitalize tracking-wide">
        {`${version} Falkor for ${platform}`}
      </p>
    </div>
  );
};
