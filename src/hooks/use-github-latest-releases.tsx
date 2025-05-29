// src/hooks/use-github-latest-releases.tsx

import { type UseQueryResult, useQuery } from "@tanstack/react-query";
import { GithubRelease } from "@/@types";

const fetchGithubReleases = async (
	owner: string,
	repo: string,
	count: number,
	signal?: AbortSignal,
): Promise<GithubRelease[]> => {
	const apiUrl = `https://api.github.com/repos/${owner}/${repo}/releases?per_page=${count}`;
	const response = await fetch(apiUrl, { signal });

	if (!response.ok) {
		let errorData: { message?: string } = {};
		try {
			errorData = await response.json();
		} catch (e) {
			console.error("Error parsing GitHub API response:", e);
			errorData = { message: response.statusText };
		}
		throw new Error(
			`GitHub API Error: ${response.status} - ${
				errorData.message || "Failed to fetch releases"
			}`,
		);
	}
	return response.json();
};

function useGithubLatestReleases(
	owner: string,
	repo: string,
	count: number = 5,
): UseQueryResult<GithubRelease[], Error> {
	const queryKey = ["githubReleases", owner, repo, count?.toString()];

	return useQuery<GithubRelease[], Error, GithubRelease[], string[]>({
		queryKey: queryKey,
		queryFn: ({ signal }) => fetchGithubReleases(owner, repo, count, signal),
		enabled: !!(owner && repo),
	});
}

export default useGithubLatestReleases;
