import { motion } from "framer-motion";
import { PackageManager, Version } from "@/@types";
import {
	containerVariants,
	itemVariants,
} from "@/features/download/utils/animations";
import { downloadApp } from "@/utils";
import { useFileDownloader } from "../hooks/use-file-download";
import { DownloadSection } from "./download-section";

interface DownloadLinksProps {
	version: Version;
	onDownloadClick: (href: string) => void;
}

export function DownloadLinks({
	version,
	onDownloadClick,
}: DownloadLinksProps) {
	const { downloadFile } = useFileDownloader();

	const triggerDownload = (pckgManager: PackageManager, version: Version) => {
		const href = downloadApp(pckgManager, version);
		if (!href) return;
		downloadFile(href);
	};

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
						onDownloadClick={onDownloadClick}
						buttons={[
							{
								label: "Download for Windows",
								variant: "secondary",
								href: downloadApp("windows", version),
								onClick: () => {
									triggerDownload("windows", version);
								},
							},
						]}
					/>
				</motion.div>

				<motion.div
					variants={itemVariants}
					className="transform transition-all duration-300 hover:scale-[1.02]"
				>
					<DownloadSection
						platform="linux"
						version={version}
						imgSrc="/linux.png"
						onDownloadClick={onDownloadClick}
						buttons={[
							{
								label: "AppImage",
								variant: "secondary",
								href: downloadApp("appimage", version),
								onClick: () => {
									triggerDownload("appimage", version);
								},
							},
							{
								label: "Debian",
								variant: "secondary",
								href: downloadApp("debian", version),
								onClick: () => {
									triggerDownload("debian", version);
								},
							},
							{
								label: "Tar.gz",
								variant: "secondary",
								href: downloadApp("tar.gz", version),
								onClick: () => {
									triggerDownload("tar.gz", version);
								},
							},
							{
								label: "Pacman",
								variant: "secondary",
								href: downloadApp("pacman", version),
								onClick: () => {
									triggerDownload("pacman", version);
								},
							},
							{
								label: "RPM",
								variant: "secondary",
								href: downloadApp("rpm", version),
								onClick: () => {
									triggerDownload("rpm", version);
								},
							},
						]}
					/>
				</motion.div>
			</div>
		</motion.div>
	);
}
