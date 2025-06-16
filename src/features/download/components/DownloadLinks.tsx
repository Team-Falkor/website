import { motion } from "framer-motion";
import { Version } from "@/@types";
import {
	containerVariants,
	itemVariants,
} from "@/features/download/utils/animations";
import { downloadApp } from "@/utils";
import { DownloadSection } from "./downloadSection";

interface DownloadLinksProps {
	version: Version;
}

export function DownloadLinks({ version }: DownloadLinksProps) {
	return (
		<motion.div
			initial="hidden"
			animate="visible"
			variants={containerVariants}
			className="mx-auto max-w-5xl px-4 pt-8 sm:px-6 lg:pt-12"
		>
			<div className="flex flex-col gap-8">
				{/* This motion.div handles the animation and hover effect for the Windows card */}
				<motion.div
					variants={itemVariants}
					className="transform transition-all duration-300 hover:scale-[1.02]"
				>
					<DownloadSection
						platform="windows"
						version={version}
						imgSrc="/windows.png"
						buttons={[
							{
								label: "Download for Windows",
								variant: "secondary",
								href: downloadApp("windows", version),
							},
						]}
					/>
				</motion.div>

				{/* This motion.div handles the animation and hover effect for the Linux card */}
				<motion.div
					variants={itemVariants}
					className="transform transition-all duration-300 hover:scale-[1.02]"
				>
					<DownloadSection
						platform="linux"
						version={version}
						imgSrc="/linux.png"
						buttons={[
							{
								label: "AppImage",
								variant: "secondary",
								href: downloadApp("appimage", version),
							},
							{
								label: "Debian",
								variant: "secondary",
								href: downloadApp("debian", version),
							},
							{
								label: "Tar.gz",
								variant: "secondary",
								href: downloadApp("tar.gz", version),
							},
							{
								label: "Pacman",
								variant: "secondary",
								href: downloadApp("pacman", version),
							},
							{
								label: "RPM",
								variant: "secondary",
								href: downloadApp("rpm", version),
							},
						]}
					/>
				</motion.div>
			</div>
		</motion.div>
	);
}
