import type { Variants } from "framer-motion";

export const containerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
			delayChildren: 0.1,
		},
	},
};

export const itemVariants: Variants = {
	hidden: { y: 20, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			type: "spring" as const,
			stiffness: 100,
		},
	},
};

export const fadeInUpVariants: Variants = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6 },
	},
};

// Variants for buttons inside DownloadSection
export const staggeredButtonVariants: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: {
			delay: 0.1 * i,
			duration: 0.4,
			ease: "easeOut" as const,
		},
	}),
};

// Reusable hover/tap animation for buttons
export const buttonHoverTap = {
	hover: { scale: 1.05 },
	tap: { scale: 0.98 },
};

// Fun wiggle animation for icons
export const iconWiggle = {
	initial: { rotate: 0 },
	animate: { rotate: [0, 10, -10, 0] },
	transition: { duration: 0.5, delay: 1, repeat: 0 },
};
