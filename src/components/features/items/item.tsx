import { JSX } from "react";

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
		<div className="relative flex flex-col h-full p-6 hover:bg-muted-foreground/10 rounded-lg">
			<div className="flex items-start gap-4">
				<div className="text-purple-400">{icon}</div>
				<div className="text-lg font-semibold text-white">{title}</div>
			</div>
			<dd className="grow mt-2 text-muted-foreground">{children}</dd>
			<div className="flex items-center gap-4 mt-4">
				{isAvailable ? (
					<a
						href={link}
						target={"_blank"}
						rel="noopener noreferrer"
						className="inline-flex items-center px-2 py-1 text-xs font-medium text-purple-400 rounded-md bg-purple-500/10 ring-purple-500/20 ring-1 ring-inset"
					>
						Available
					</a>
				) : (
					<span className="inline-flex items-center px-2 py-1 text-xs font-medium text-yellow-400 rounded-md bg-yellow-500/10 ring-yellow-500/20 ring-1 ring-inset">
						Coming Soon
					</span>
				)}
			</div>
		</div>
	);
};

export default FeatureItem;
