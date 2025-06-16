import { createFileRoute } from "@tanstack/react-router";
import { Version } from "@/@types";
import Footer from "@/components/footer";
import SvgBG from "@/components/svgBG";
import { DownloadHeader } from "@/features/download/components/DownloadHeader";
import { DownloadHelp } from "@/features/download/components/DownloadHelp";
import { DownloadLinks } from "@/features/download/components/DownloadLinks";
import { DownloadLoading } from "@/features/download/components/DownloadLoading";
import useGithubLatestRelease from "@/features/download/hooks/use-github-latest-releases";
import { formatVersion } from "@/features/download/utils/formatVersion";
import { constants } from "@/utils";

export const Route = createFileRoute("/download/")({
	component: DownloadPage,
});

function DownloadPage() {
	const { data: release, isLoading } = useGithubLatestRelease(
		"team-falkor",
		"falkor",
	);

	if (isLoading) {
		return <DownloadLoading />;
	}

	const rawVersionString = release ? release.tag_name : constants.app_version;

	const versionToUse: Version = formatVersion(rawVersionString);

	const versionMessage = release
		? `Latest version from GitHub: ${versionToUse}`
		: `Current version: ${versionToUse}`;

	return (
		<div className="min-h-screen bg-background">
			<div className="relative overflow-hidden p-2 px-4 pb-16">
				<SvgBG />
				<DownloadHeader versionMessage={versionMessage} />
				<DownloadLinks version={versionToUse} />
				<DownloadHelp />
			</div>
			<Footer />
		</div>
	);
}
