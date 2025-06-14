import { type UseQueryResult, useQuery } from "@tanstack/react-query";
import { GithubRelease } from "@/@types"; // Assuming this type definition is correct

/**
 * Fetches the latest GitHub release for a given repository.
 * @param owner - The owner of the repository.
 * @param repo - The name of the repository.
 * @param signal - An optional AbortSignal to cancel the request.
 * @returns A promise that resolves to the latest GithubRelease object.
 */
const fetchGithubLatestRelease = async (
	owner: string,
	repo: string,
	signal?: AbortSignal,
): Promise<GithubRelease> => {
	// Use the dedicated endpoint for the latest release
	const apiUrl = `https://api.github.com/repos/${owner}/${repo}/releases/latest`;
	const response = await fetch(apiUrl, {
		signal,
		headers: {
			Accept: "application/vnd.github.v3+json",
		},
	});

	if (!response.ok) {
		let errorData: { message?: string } = {};
		try {
			errorData = await response.json();
		} catch {
			// Fallback if the error response is not valid JSON
			errorData = { message: response.statusText };
		}
		throw new Error(
			`GitHub API Error: ${response.status} - ${
				errorData.message || "Failed to fetch the latest release"
			}`,
		);
	}
	return response.json();
};

/**
 * A React Query hook to get the latest GitHub release for a repository.
 * @param owner - The owner of the repository.
 * @param repo - The name of the repository.
 * @returns The result of the TanStack Query operation.
 */
function useGithubLatestRelease(
	owner: string,
	repo: string,
): UseQueryResult<GithubRelease, Error> {
	const queryKey = ["githubLatestRelease", owner, repo];

	return useQuery<GithubRelease, Error>({
		queryKey: queryKey,
		queryFn: ({ signal }) => fetchGithubLatestRelease(owner, repo, signal),
		// The query will not run until both owner and repo are provided
		enabled: !!(owner && repo),
	});
}

export default useGithubLatestRelease;
