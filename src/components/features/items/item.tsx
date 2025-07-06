import { ExternalLink } from "lucide-react";
import { JSX } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/utils";

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
	const CardContentComponent = (
		<>
			{/* Enhanced gradient overlay for visual depth */}
			<div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-primary/3 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
			<div className="absolute inset-0 bg-gradient-to-t from-card/50 via-transparent to-transparent" />

			<CardHeader>
				<div className="flex items-center gap-4">
					<div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl shadow-lg group-hover:shadow-primary/25 transition-all duration-300 group-hover:scale-110">
						<div className="text-primary-foreground">{icon}</div>
					</div>
					<div className="flex-1 min-w-0">
						<h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
							{title}
						</h3>
					</div>
					{link && isAvailable && (
						<ExternalLink className="w-5 h-5 text-primary opacity-60 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110" />
					)}
				</div>
			</CardHeader>

			<CardContent className="pt-0 flex flex-col h-full">
				<p className="text-muted-foreground leading-relaxed group-hover:text-foreground/90 transition-colors duration-300 flex-grow">
					{children}
				</p>
			</CardContent>
		</>
	);

	if (isAvailable && link) {
		return (
			<a
				href={link}
				target="_blank"
				rel="noopener noreferrer"
				aria-label={`Learn more about ${title}`}
				className="block h-full"
			>
				<Card
					className={cn(
						"group relative overflow-hidden h-full border-border/30 bg-card/60 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-card/90 hover:shadow-xl hover:shadow-primary/15 hover:-translate-y-2 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary/50 cursor-pointer",
					)}
				>
					{CardContentComponent}
				</Card>
			</a>
		);
	}

	return (
		<Card
			className={cn(
				"group relative overflow-hidden h-full border-border/30 bg-card/60 backdrop-blur-sm transition-all duration-300 hover:border-border/60 hover:bg-card/90 hover:shadow-lg hover:-translate-y-1",
			)}
		>
			{CardContentComponent}
		</Card>
	);
};

export default FeatureItem;
