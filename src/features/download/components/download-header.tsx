import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import {
	containerVariants,
	fadeInUpVariants,
	itemVariants,
} from "@/features/download/utils/animations";

interface DownloadHeaderProps {
	versionMessage: string;
}

export function DownloadHeader({ versionMessage }: DownloadHeaderProps) {
	return (
		<motion.div
			initial="hidden"
			animate="visible"
			variants={containerVariants}
			className="mx-auto max-w-5xl px-4 pt-24 pb-6 sm:px-6 sm:pb-8"
		>
			<div className="text-center">
				<motion.h1
					variants={itemVariants}
					className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
				>
					Download Falkor
				</motion.h1>
				<motion.p
					variants={itemVariants}
					className="mt-6 text-lg leading-7 text-muted-foreground sm:text-xl max-w-2xl mx-auto"
				>
					Get started with Falkor on your preferred platform. Choose from the
					options below to download the latest version.
				</motion.p>
				<motion.div
					variants={fadeInUpVariants}
					className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mt-6"
				>
					<CheckCircle2 className="size-4" />
					<span className="text-sm font-medium">{versionMessage}</span>
				</motion.div>
			</div>
		</motion.div>
	);
}
