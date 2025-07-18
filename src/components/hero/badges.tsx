import { ChevronRight } from "lucide-react";
import useGithubLatestRelease from "@/features/download/hooks/use-github-latest-releases";

const HeroBadges = () => {
	const {
		data: latestRelease,
		isLoading,
		error,
	} = useGithubLatestRelease("team-falkor", "falkor");

	return (
		<div className="flex items-center justify-start w-full gap-x-5">
			<span className="px-3 py-1 text-sm font-semibold leading-6 text-purple-400 rounded-full bg-purple-700/25 ring-1 ring-inset ring-purple-700/40">
				{isLoading
					? "Loading..."
					: error
						? "v1.0.0"
						: latestRelease?.tag_name || "v1.0.0"}
			</span>
			<span className="inline-flex items-center gap-1.5 text-sm font-medium leading-6 text-gray-300">
				Available now
				<ChevronRight strokeWidth={3} />
			</span>
		</div>
	);
};

export default HeroBadges;
