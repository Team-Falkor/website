import { HTMLAttributes } from "react";
import { cn } from "@/utils";
import { ImageModal } from "../imageModal";

interface Props extends HTMLAttributes<HTMLImageElement> {
	src: string;
	alt: string;
}

const FeaturesImg = ({ src, alt, className, ...props }: Props) => {
	return (
		<div className="relative pt-16 overflow-hidden">
			{/* Enhanced background decoration */}
			<div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-background/80 pointer-events-none" />

			<div className="relative px-6 mx-auto overflow-hidden max-w-7xl lg:px-8">
				<div className="relative group">
					<ImageModal
						src={src}
						alt={alt}
						className={cn(
							"relative w-[76rem] rounded-2xl bg-card/30 backdrop-blur-md shadow-2xl ring-1 ring-border/40 transition-all duration-700 group-hover:ring-primary/50 group-hover:shadow-primary/30 group-hover:shadow-2xl group-hover:scale-[1.02]",
							className,
						)}
						{...props}
					/>
				</div>

				{/* Enhanced gradient overlay */}
				<div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
			</div>
		</div>
	);
};

export default FeaturesImg;
