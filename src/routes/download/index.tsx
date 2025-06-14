import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CheckCircle2, Disc3 } from "lucide-react";
import { Version } from "@/@types";
import Footer from "@/components/footer";
import SvgBG from "@/components/svgBG";
import {
	BugReportSection,
	DownloadSection,
} from "@/features/download/components";
import useGithubLatestRelease from "@/hooks/use-github-latest-releases";
import { constants, downloadApp } from "@/utils";

export const Route = createFileRoute("/download/")({
	component: Download,
});

function Download() {
	const { data: release, isLoading } = useGithubLatestRelease(
		"team-falkor",
		"falkor",
	);

	let versionToUse: string = constants.app_version;
	let versionSourceMessage: string | null = null;

	if (release) {
		versionToUse = release.tag_name;
		versionSourceMessage = `Latest version from GitHub: ${versionToUse}`;
	}

	const versionForProps: Version = versionToUse as Version;

	const animationDelay = 0.1;
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
				delayChildren: animationDelay,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: { type: "spring", stiffness: 100 },
		},
	};

	const fadeInUpVariants = {
		hidden: { opacity: 0, y: 30 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
	};

	if (isLoading) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-900 to-gray-950 gap-4">
				<div className="flex flex-col items-center gap-6 p-8 rounded-xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 shadow-lg">
					<Disc3 className="animate-spin size-12 text-blue-400" />
					<p className="text-2xl font-medium text-white">
						Loading latest download information...
					</p>
					<p className="text-gray-400 text-center max-w-md">
						We're fetching the most recent version of Falkor for you.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
			<div className="relative overflow-hidden p-2 px-4 pb-16">
				<SvgBG />

				<motion.div
					initial="hidden"
					animate="visible"
					variants={containerVariants}
					className="mx-auto max-w-5xl px-4 pt-24 pb-6 sm:px-6 sm:pb-8"
				>
					<div className="text-center">
						<motion.h1
							variants={itemVariants}
							className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
						>
							Download Falkor
						</motion.h1>

						<motion.p
							variants={itemVariants}
							className="mt-6 text-lg leading-7 text-gray-300 sm:text-xl max-w-2xl mx-auto"
						>
							Get started with Falkor on your preferred platform. Choose from
							the options below to download the latest version.
						</motion.p>

						<motion.div
							variants={fadeInUpVariants}
							className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 mt-6"
						>
							<CheckCircle2 className="size-4" />
							<span className="text-sm font-medium">
								{versionSourceMessage || `Current version: ${versionForProps}`}
							</span>
						</motion.div>
					</div>
				</motion.div>

				<motion.div
					initial="hidden"
					animate="visible"
					variants={containerVariants}
					className="mx-auto max-w-5xl px-4 pt-8 sm:px-6 lg:pt-12"
				>
					<div className="flex flex-col gap-8">
						<motion.div
							variants={itemVariants}
							className="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
						>
							<DownloadSection
								platform="windows"
								version={versionForProps}
								imgSrc="/windows.png"
								buttons={[
									{
										label: "Download for Windows",
										variant: "secondary",
										href: downloadApp("windows", versionForProps),
									},
								]}
							/>
						</motion.div>

						<motion.div
							variants={itemVariants}
							className="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
						>
							<DownloadSection
								platform="linux"
								version={versionForProps}
								imgSrc="/linux.png"
								buttons={[
									{
										label: "AppImage",
										variant: "secondary",
										href: downloadApp("appimage", versionForProps),
									},
									{
										label: "Debian",
										variant: "secondary",
										href: downloadApp("debian", versionForProps),
									},
									{
										label: "Tar.gz",
										variant: "secondary",
										href: downloadApp("tar.gz", versionForProps),
									},
									{
										label: "Pacman",
										variant: "secondary",
										href: downloadApp("pacman", versionForProps),
									},
									{
										label: "RPM",
										variant: "secondary",
										href: downloadApp("rpm", versionForProps),
									},
								]}
							/>
						</motion.div>
					</div>
				</motion.div>

				<motion.div
					variants={fadeInUpVariants}
					initial="hidden"
					animate="visible"
					transition={{ delay: 0.6 }}
					className="pt-16 mt-8"
				>
					<div className="max-w-5xl mx-auto">
						<div className="text-center mb-12">
							<h2 className="text-2xl font-bold text-white sm:text-3xl mb-4">
								Need Help?
							</h2>
							<p className="text-gray-400 max-w-2xl mx-auto">
								We're here to support you with any issues or questions you might
								have.
							</p>
						</div>
						<BugReportSection />
					</div>
				</motion.div>
			</div>

			<Footer />
		</div>
	);
}
