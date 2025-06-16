import { Disc3 } from "lucide-react";

export function DownloadLoading() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-background gap-4">
			<div className="flex flex-col items-center gap-6 p-8 rounded-xl bg-card/50 backdrop-blur-sm border border-border shadow-lg">
				<Disc3 className="animate-spin size-12 text-primary" />
				<p className="text-2xl font-medium text-foreground">
					Loading latest download information...
				</p>
				<p className="text-muted-foreground text-center max-w-md">
					We're fetching the most recent version of Falkor for you.
				</p>
			</div>
		</div>
	);
}
