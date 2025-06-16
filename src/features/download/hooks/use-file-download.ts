import { useCallback, useState } from "react";
import { toast } from "sonner";

export const useFileDownloader = () => {
	const [isDownloading, setIsDownloading] = useState(false);

	const downloadFile = useCallback(
		(href: string, filename?: string) => {
			if (isDownloading) return;

			setIsDownloading(true);

			toast("Download Started", {
				description: "Your file is now downloading.",
			});

			try {
				const link = document.createElement("a");
				link.href = href;
				link.setAttribute(
					"download",
					filename || href.split("/").pop() || "download",
				);

				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			} catch (error) {
				console.error("Download failed:", error);
				toast.error("Download Falkor", {
					description: "Could not start the file download.",
				});
			} finally {
				setTimeout(() => setIsDownloading(false), 300);
			}
		},
		[isDownloading],
	);

	return { downloadFile, isDownloading };
};
