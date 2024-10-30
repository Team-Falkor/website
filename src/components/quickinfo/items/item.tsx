import { FC } from "react";

interface QuickInfoItemProps {
  title: string;
  children: string;
  icon: JSX.Element;
}

const QuickInfoItem: FC<QuickInfoItemProps> = ({ children, icon, title }) => {
  return (
    <div className="flex flex-col">
      <dt className="flex flex-col items-start text-base font-semibold leading-7 text-white">
        <div className="flex items-center justify-center w-10 h-10 mb-6 bg-orange-600 rounded-lg shadow-lg shadow-orange-800 transition-transform transform hover:scale-110">
          {icon}
        </div>
        <p className="w-full text-orange-400">{title}</p>
      </dt>
      <dd className="flex flex-col flex-auto mt-1 text-base leading-7 text-gray-300">
        <p className="flex-auto">{children}</p>
      </dd>
    </div>
  );
};

export default QuickInfoItem;
