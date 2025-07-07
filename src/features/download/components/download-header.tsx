import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { GradientHeading } from "@/components/gradient-heading";
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
				<GradientHeading>Download Falkor</GradientHeading>
				
				{/* Thank You Message - Prominent Position */}
				<motion.div
					variants={fadeInUpVariants}
					className="mt-8 mx-auto max-w-4xl px-6 py-4 rounded-xl bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border border-primary/20 backdrop-blur-sm"
				>
					<motion.p
						variants={itemVariants}
						className="text-lg leading-7 text-foreground sm:text-xl font-semibold"
					>
						💜 Thank you from Team Falkor for sticking with the project! If you're new and just trying the project, 
						<span className="text-primary font-bold">THANK YOU</span> for taking time out of your day to try our app. It means more than anything to me.
					</motion.p>
				</motion.div>

				<motion.p
					variants={itemVariants}
					className="mt-8 text-lg leading-7 text-muted-foreground sm:text-xl max-w-2xl mx-auto"
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
