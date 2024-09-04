import { FC } from 'react';

type FeatureItemProps = {
  title: string;
  children: string;
  icon: JSX.Element;

  isAvailable?: boolean;
  link?: string;
};

const FeatureItem: FC<FeatureItemProps> = ({ children, icon, title, isAvailable, link }) => {
  return (
    <div className="relative flex gap-4 pl-9">
      <div className="text-purple-400">{icon}</div>
      <div className="flex flex-col gap-2">
        <div className="inline text-lg font-semibold text-white">{title}</div>
        <dd className="h-24 text-muted-foreground">{children}</dd>

        <div className="flex items-center gap-4">
          {isAvailable ? (
            <a
              href={link}
              target={'_blank'}
              rel="noopener noreferrer"
              className="inline-flex items-center px-2 py-1 mt-2 text-xs font-medium text-purple-400 rounded-md bg-purple-500/10 ring-purple-500/20 ring-1 ring-inset"
            >
              Available
            </a>
          ) : (
            <span className="inline-flex items-center px-2 py-1 mt-2 text-xs font-medium text-yellow-400 rounded-md bg-yellow-500/10 ring-yellow-500/20 ring-1 ring-inset ">
              Coming Soon
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeatureItem;
