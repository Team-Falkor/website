type FeatureItemProps = {
  title: string;
  children: string;
  icon: JSX.Element;
  isAvailable?: boolean;
  link?: string;
};

const FeatureItem = ({
  children,
  icon,
  title,
  isAvailable,
  link,
}: FeatureItemProps) => {
  return (
    <div className="relative flex flex-col h-full p-6 transition-all duration-300 ease-out bg-gray-800 rounded-lg hover:bg-purple-900/10 ring-2 ring-orange-500/20">
      <div className="flex items-start gap-4">
        <div className="text-orange-400 animate-pulse">{icon}</div>
        <div className="text-lg font-semibold text-orange-300">{title}</div>
      </div>
      <dd className="flex-grow mt-2 text-gray-400">{children}</dd>
      <div className="flex items-center gap-4 mt-4">
        {isAvailable ? (
          <a
            href={link}
            target={"_blank"}
            rel="noopener noreferrer"
            className="inline-flex items-center px-2 py-1 text-xs font-medium text-orange-400 bg-orange-500/10 rounded-md animate-pulse ring-1 ring-inset ring-orange-500/20"
          >
            Available
          </a>
        ) : (
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-yellow-400 bg-yellow-500/10 rounded-md animate-pulse ring-1 ring-inset ring-yellow-500/20">
            Coming Soon
          </span>
        )}
      </div>
    </div>
  );
};

export default FeatureItem;
