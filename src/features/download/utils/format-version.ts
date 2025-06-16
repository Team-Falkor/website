import { Version } from "@/@types";

/**
 * Formats a raw version string (e.g., "v1.2.3" or "1.2.3")
 * into the strict `Version` type (e.g., "V1.2.3").
 * @param rawVersion - The string from the API or constants.
 * @returns A correctly formatted `Version` string.
 */
export const formatVersion = (rawVersion: string): Version => {
	if (rawVersion.toLowerCase() === "latest") {
		return "latest";
	}

	// Remove a potential leading 'v' and ensure it starts with 'V'
	const versionNumber = rawVersion.startsWith("v")
		? rawVersion.substring(1)
		: rawVersion;

	// We use a type assertion here because we are programmatically
	// guaranteeing the string now matches the `V${string}` format.
	return `v${versionNumber}` as Version;
};
