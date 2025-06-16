import { motion } from "framer-motion";
import { DownloadIcon } from "lucide-react";
import { JSX, useRef } from "react";
import { buttonVariants } from "@/components/ui/button";
import { useTrackEvent } from "@/features/analytics/hooks/useTrackEvent";
import {
	buttonHoverTap,
	iconWiggle,
} from "@/features/download/utils/animations";
import { cn } from "@/utils";

export interface DownloadButtonProps {
	variant?:
		| "default"
		| "destructive"
		| "outline"
		| "secondary"
		| "ghost"
		| "link"
		| null
		| undefined;
	label: string;
	icon?: JSX.Element;
	onClick?: () => void;
	href?: string | null;
	downloadBehavior?: "dialog" | "direct";
}

export const DownloadButton = ({
	variant,
	label,
	icon,
	onClick,
	href,
}: DownloadButtonProps) => {
	const trackEvent = useTrackEvent();
	const hasClicked = useRef(false);

	const handleClick = () => {
		if (onClick) onClick();

		if (hasClicked.current) return;
		hasClicked.current = true;
		trackEvent<{ label: string; href?: string }>({
			eventType: "download",
			context: { label, ...(href ? { href } : {}) },
		});
		setTimeout(() => {
			hasClicked.current = false;
		}, 1000);
	};

	const buttonContent = (
		<>
			<motion.span
				initial={iconWiggle.initial}
				animate={iconWiggle.animate}
				transition={iconWiggle.transition}
			>
				{icon || <DownloadIcon />}
			</motion.span>
			{label}
		</>
	);

	const classNames = cn(
		buttonVariants({ variant, size: "lg" }),
		"h-14 text-lg flex items-center gap-3 transition-all shadow-md hover:shadow-xl focus-visible:shadow-xl backdrop-blur-sm",
	);

	if (onClick) {
		return (
			<motion.button
				whileHover="hover"
				whileTap="tap"
				variants={buttonHoverTap}
				className={classNames}
				onClick={handleClick}
			>
				{buttonContent}
			</motion.button>
		);
	}

	return (
		<motion.a
			whileHover="hover"
			whileTap="tap"
			variants={buttonHoverTap}
			className={classNames}
			href={href ?? undefined}
			target="_blank"
			rel="noopener noreferrer"
			// We can still track clicks on standard links
			onClick={handleClick}
		>
			{buttonContent}
		</motion.a>
	);
};
