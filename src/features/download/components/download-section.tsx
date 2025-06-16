import { motion } from "framer-motion";
import { Platform, Version } from "@/@types";
import { staggeredButtonVariants } from "@/features/download/utils/animations";
import { DownloadButton, DownloadButtonProps } from "./download-button";
import { PlatformInfo } from "./platform-Info";

interface DownloadSectionProps {
	platform: Platform;
	version: Version;
	imgSrc: string;
	buttons: DownloadButtonProps[];
	onDownloadClick: (href: string) => void;
}

export const DownloadSection = ({
	platform,
	version,
	imgSrc,
	buttons,
	onDownloadClick,
}: DownloadSectionProps) => {
	return (
		<div className="space-y-6 bg-card/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-border hover:border-primary/20 transition-all duration-300">
			<PlatformInfo platform={platform} version={version} imgSrc={imgSrc} />
			<div className="flex flex-wrap gap-3 justify-center sm:justify-start p-5 pt-0">
				{buttons.map((button, index) => (
					<motion.div
						key={button.label}
						custom={index}
						initial="hidden"
						animate="visible"
						variants={staggeredButtonVariants}
					>
						<DownloadButton
							{...button}
							onClick={() => {
								onDownloadClick(button.href ?? "");
								button.onClick?.();
							}}
						/>
					</motion.div>
				))}
			</div>
		</div>
	);
};
