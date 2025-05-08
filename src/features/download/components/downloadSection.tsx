import { motion } from "framer-motion";
import { Platform, Version } from "@/@types";
import { DownloadButton, DownloadButtonProps } from "./downloadButton";
import { PlatformInfo } from "./platformInfo";

interface DownloadSectionProps {
	platform: Platform;
	version: Version;
	imgSrc: string;
	buttons: DownloadButtonProps[];
}

export const DownloadSection = ({
	platform,
	version,
	imgSrc,
	buttons,
}: DownloadSectionProps) => {
	const buttonVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: (i: number) => ({
			opacity: 1,
			y: 0,
			transition: {
				delay: 0.1 * i,
				duration: 0.4,
				ease: "easeOut",
			},
		}),
	};

	return (
		<div className="space-y-6 bg-gray-800/30 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
			<PlatformInfo platform={platform} version={version} imgSrc={imgSrc} />
			<div className="flex flex-wrap gap-3 justify-center sm:justify-start p-5 pt-0">
				{buttons.map((button, index) => (
					<motion.div
						key={button.label}
						custom={index}
						initial="hidden"
						animate="visible"
						variants={buttonVariants}
					>
						<DownloadButton {...button} />
					</motion.div>
				))}
			</div>
		</div>
	);
};
