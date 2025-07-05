import { JSX } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/utils";

interface QuickInfoItemProps {
	title: string;
	children: string;
	icon: JSX.Element;
	className?: string;
}

const QuickInfoItem = ({
	children,
	icon,
	title,
	className,
}: QuickInfoItemProps) => {
	return (
		<Card
			className={cn(
				"group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card/80 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1",
				className,
			)}
		>
			{/* Gradient overlay for visual depth */}
			<div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

			<CardHeader className="pb-4">
				<div className="flex items-center gap-4">
					<div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl shadow-lg group-hover:shadow-primary/25 transition-all duration-300 group-hover:scale-110">
						<div className="text-primary-foreground">{icon}</div>
					</div>
					<h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
						{title}
					</h3>
				</div>
			</CardHeader>

			<CardContent className="pt-0">
				<p className="text-muted-foreground leading-relaxed group-hover:text-foreground/90 transition-colors duration-300">
					{children}
				</p>
			</CardContent>
		</Card>
	);
};

export default QuickInfoItem;
