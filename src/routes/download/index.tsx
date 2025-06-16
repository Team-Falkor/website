import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Version } from "@/@types";
import Footer from "@/components/footer";
import SvgBG from "@/components/svgBG";
import {
	DownloadHeader,
	DownloadHelp,
	DownloadLinks,
	DownloadLoading,
	ReleaseNotesDialog,
} from "@/features/download/components";
import useGithubLatestRelease from "@/features/download/hooks/use-github-latest-releases";
import { formatVersion } from "@/features/download/utils/format-version";
import { constants } from "@/utils";

export const Route = createFileRoute("/download/")({
	component: DownloadPage,
});

function DownloadPage() {
	const { data: release, isLoading } = useGithubLatestRelease(
		"team-falkor",
		"falkor",
	);

	const [dialogState, setDialogState] = useState({
		isOpen: false,
		href: "",
	});

	if (isLoading) {
		return <DownloadLoading />;
	}

	const rawVersionString = release ? release.tag_name : constants.app_version;

	const versionToUse: Version = formatVersion(rawVersionString);

	const versionMessage = release
		? `Latest version from GitHub: ${versionToUse}`
		: `Current version: ${versionToUse}`;

	const handleDownloadClick = (href: string) => {
		setDialogState({ isOpen: true, href });
	};

	return (
		<div className="min-h-screen bg-background">
			<SvgBG />
			<div className="relative overflow-hidden p-2 px-4 pb-16 z-10">
				<DownloadHeader versionMessage={versionMessage} />
				<DownloadLinks
					version={versionToUse}
					onDownloadClick={handleDownloadClick}
				/>
				<DownloadHelp />
			</div>
			<Footer />

			<ReleaseNotesDialog
				isOpen={dialogState.isOpen}
				onOpenChange={(isOpen) => setDialogState({ ...dialogState, isOpen })}
				releaseNotes={release?.body ?? "No release notes available."}
				downloadHref={dialogState.href}
				showType={"redownload"}
			/>
		</div>
	);
}
