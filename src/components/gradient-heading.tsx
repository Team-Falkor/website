import { clsx } from "clsx";
import { type MotionProps, motion } from "framer-motion";
import React from "react";
import { itemVariants } from "@/features/download/utils/animations";

interface GradientHeadingProps extends MotionProps {
	children: React.ReactNode;
	className?: string;
}

export const GradientHeading = ({
	children,
	className,
	...props
}: GradientHeadingProps) => {
	return (
		<motion.h1
			variants={itemVariants}
			className={clsx(
				"bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl",
				"pb-2",
				className,
			)}
			{...props}
		>
			{children}
		</motion.h1>
	);
};
