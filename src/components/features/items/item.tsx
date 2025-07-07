import { ExternalLink } from "lucide-react";
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
	const CardContent = (
		<>
			<div className="flex items-start gap-4 mb-3">
				<div className="flex-shrink-0 p-2 rounded-lg bg-primary/20 text-primary transition-colors group-hover:bg-primary/30 group-hover:text-primary">
					{icon}
				</div>
				<div className="flex-1 min-w-0">
					<h3 className="text-lg font-semibold text-foreground leading-tight">
						{title}
					</h3>
				</div>
			</div>
			<p className="grow text-muted-foreground leading-relaxed mb-4">
				{children}
			</p>
			<div className="flex items-center justify-between mt-auto">
				{isAvailable ? (
					<div className="flex items-center gap-2">
						<span className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-primary-foreground rounded-full bg-primary ring-primary/30 ring-1 ring-inset">
							Available
						</span>
						{link && (
							<ExternalLink className="w-4 h-4 text-primary opacity-60 group-hover:opacity-100 transition-opacity" />
						)}
					</div>
				) : (
					<span className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-secondary-foreground rounded-full bg-secondary ring-secondary/30 ring-1 ring-inset">
						Coming Soon
					</span>
				)}
			</div>
		</>
	);

	if (isAvailable && link) {
		return (
			<a
				href={link}
				target="_blank"
				rel="noopener noreferrer"
				className="group relative flex flex-col h-full p-6 rounded-lg border border-transparent hover:border-primary/20 hover:bg-muted/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/30"
				aria-label={`Learn more about ${title}`}
			>
				{CardContent}
			</a>
		);
	}

	return (
		<div className="group relative flex flex-col h-full p-6 rounded-lg border border-transparent hover:border-muted-foreground/20 hover:bg-muted/50 transition-all duration-200">
			{CardContent}
		</div>
	);
};

export default FeatureItem;
