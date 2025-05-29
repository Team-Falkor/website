export interface GithubUser {
	login: string;
	id: number;
	node_id: string;
	avatar_url: string;
	gravatar_id: string | null;
	url: string;
	html_url: string;
	followers_url: string;
	following_url: string;
	gists_url: string;
	starred_url: string;
	subscriptions_url: string;
	organizations_url: string;
	repos_url: string;
	events_url: string;
	received_events_url: string;
	type: string;
	site_admin: boolean;
}

export interface GithubReleaseAsset {
	url: string;
	id: number;
	node_id: string;
	name: string;
	label: string | null;
	uploader: GithubUser | null;
	content_type: string;
	state: "uploaded" | string;
	size: number;
	download_count: number;
	created_at: string;
	updated_at: string;
	browser_download_url: string;
}

export interface GithubRelease {
	url: string;
	assets_url: string;
	upload_url: string;
	html_url: string;
	id: number;
	node_id: string;
	author: GithubUser;
	tag_name: string;
	target_commitish: string;
	name: string | null;
	draft: boolean;
	prerelease: boolean;
	created_at: string;
	published_at: string | null;
	assets: GithubReleaseAsset[];
	tarball_url: string | null;
	zipball_url: string | null;
	body: string | null;
	mentions_count?: number;
	reactions?: {
		url: string;
		total_count: number;
		"+1": number;
		"-1": number;
		laugh: number;
		hooray: number;
		confused: number;
		heart: number;
		rocket: number;
		eyes: number;
	};
}

export interface UseGithubLatestReleasesResult {
	releases: GithubRelease[];
	loading: boolean;
	error: Error | null;
}
