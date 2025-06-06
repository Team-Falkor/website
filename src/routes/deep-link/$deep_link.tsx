import { createFileRoute } from "@tanstack/react-router";
import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import SvgBG from "@/components/svgBG";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils";

export const Route = createFileRoute("/deep-link/$deep_link")({
	component: RouteComponent,
});

function RouteComponent() {
	const params = Route.useParams();
	const search = Route.useSearch();

	const queryString = new URLSearchParams(search).toString();
	const deepLinkUrl = `falkor://${params.deep_link}${queryString ? "?" + queryString : ""}`;

	const [copied, setCopied] = useState(false);

	useEffect(() => {
		if (params.deep_link) {
			window.location.href = deepLinkUrl;
		}
	}, [params.deep_link, deepLinkUrl]);

	const handleCopy = async () => {
		await navigator.clipboard.writeText(deepLinkUrl);
		setCopied(true);
		setTimeout(() => setCopied(false), 1500);
	};

	return (
		<div
			className={cn(
				"min-h-screen bg-gradient-to-b from-background/90 to-background/95",
			)}
		>
			<div
				className={cn(
					"relative min-h-screen flex flex-col justify-center items-center px-4 py-8 sm:px-8",
				)}
			>
				<SvgBG />
				<div
					className={cn(
						"w-full max-w-lg bg-background/80 rounded-xl shadow-lg p-6 sm:p-10 flex flex-col items-center",
					)}
				>
					<h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-foreground">
						Deep Link
					</h1>
					<p className="text-base sm:text-lg text-muted-foreground text-center break-all mb-2">
						Redirecting to:
					</p>
					<div className="w-full my-2">
						<div className="relative">
							<code
								className={cn(
									"relative block w-full text-xs sm:text-sm font-mono bg-muted text-primary rounded border border-border p-2 pr-14 break-all text-left overflow-x-auto select-all",
								)}
								style={{ wordBreak: "break-all" }}
							>
								{deepLinkUrl}
							</code>
							<Button
								size="icon"
								variant="ghost"
								onClick={handleCopy}
								className={cn(
									"absolute top-2 right-2 transition-colors z-10",
									copied
										? "bg-primary text-primary-foreground"
										: "bg-muted text-muted-foreground",
									"hover:bg-accent focus-visible:ring-2 focus-visible:ring-primary",
								)}
								aria-label="Copy deep link"
								tabIndex={0}
							>
								<span className="sr-only">Copy deep link</span>
								<span className="relative flex items-center justify-center">
									<Copy
										className={cn(
											"absolute transition-all duration-200",
											copied ? "opacity-0 scale-90" : "opacity-100 scale-100",
										)}
										size={18}
									/>
									<Check
										className={cn(
											"absolute transition-all duration-200",
											copied ? "opacity-100 scale-100" : "opacity-0 scale-90",
										)}
										size={18}
									/>
								</span>
							</Button>
						</div>
					</div>
					<p className="mt-4 text-xs text-muted-foreground text-center">
						If you are not redirected, copy and paste the above link into your
						browser or app.
					</p>
				</div>
			</div>
		</div>
	);
}
