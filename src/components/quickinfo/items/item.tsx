import { JSX } from "react";

interface QuickInfoItemProps {
	title: string;
	children: string;
	icon: JSX.Element;
}

const QuickInfoItem = ({ children, icon, title }: QuickInfoItemProps) => {
	return (
		<div className="flex flex-col">
			<dt className="flex flex-col items-start text-base font-semibold leading-7 text-white">
				<div className="flex items-center justify-center w-10 h-10 mb-6 bg-purple-700 rounded-lg">
					{icon}
				</div>
				<p className="w-full">{title}</p>
			</dt>
			<dd className="flex flex-col flex-auto mt-1 text-base leading-7 text-gray-300">
				<p className="flex-auto">{children}</p>
			</dd>
		</div>
	);
};

export default QuickInfoItem;
