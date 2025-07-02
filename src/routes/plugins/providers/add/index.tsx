import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { motion, Variants } from "framer-motion";
import {
	AlertCircle,
	CheckCircle2,
	Clock,
	FileText,
	Globe,
	Loader2,
	Plus,
	Shield,
	Users,
} from "lucide-react";
import { useCallback, useState } from "react";
import Footer from "@/components/footer";
import SvgBG from "@/components/svgBG";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAddProvider } from "@/features/providers/hooks/useAddProvider";
import { cn, constants } from "@/utils";

export const Route = createFileRoute("/plugins/providers/add/")({
	component: RouteComponent,
});

function RouteComponent() {
	// Animation variants
	const containerVariants: Variants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.15,
				delayChildren: 0.2,
			},
		},
	};

	const itemVariants: Variants = {
		hidden: { y: 30, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: { type: "spring" as const, stiffness: 100, damping: 15 },
		},
	};

	const [url, setUrl] = useState<string>("");
	const [isValidUrl, setIsValidUrl] = useState<boolean>(false);
	const [urlError, setUrlError] = useState<string>("");
	const { addProvider, isLoading: isAddingProviderLoading } = useAddProvider();

	const isValidUrlFn = useCallback((url: string) => {
		if (!url.trim()) {
			setIsValidUrl(false);
			setUrlError("");
			return;
		}

		try {
			const parsedUrl = new URL(url);
			const isValid = parsedUrl.href.includes("/setup.json");
			setIsValidUrl(isValid);
			setUrlError(isValid ? "" : "URL must point to a setup.json file");
		} catch (_e) {
			setIsValidUrl(false);
			setUrlError("Please enter a valid URL");
		}
	}, []);

	const { data, error, isLoading } = useQuery({
		queryKey: ["providers", url],
		enabled: isValidUrl,
		queryFn: async () => {
			const res = await fetch(url);
			if (!res.ok) {
				throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
			}
			return await res.json();
		},
		retry: false,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchInterval: false,
		refetchIntervalInBackground: false,
	});

	return (
		<div className="min-h-screen bg-background relative overflow-hidden">
			<SvgBG />
			<motion.div
				initial="hidden"
				animate="visible"
				variants={containerVariants}
				className="container mx-auto px-4 py-16 sm:py-24 lg:py-32"
			>
				{/* Header Section */}
				<motion.div variants={itemVariants} className="text-center mb-12">
					<div className="flex items-center justify-center gap-3 mb-6">
						<div className="p-3 rounded-full bg-primary/10 border border-primary/20">
							<Plus className="h-8 w-8 text-primary" />
						</div>
					</div>
					<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
						<span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-purple-600">
							Submit Provider
						</span>
					</h1>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
						Contribute to the Falkor community by submitting your custom
						provider. Your submission will be reviewed by our team before being
						made available to all users.
					</p>

					{/* Submission Process Steps */}
					<div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 max-w-4xl mx-auto">
						<div className="flex items-center gap-3 text-sm">
							<div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-semibold text-xs">
								1
							</div>
							<span className="text-muted-foreground">Submit Provider</span>
						</div>
						<div className="hidden sm:block w-8 h-px bg-border"></div>
						<div className="flex items-center gap-3 text-sm">
							<div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground font-semibold text-xs">
								2
							</div>
							<span className="text-muted-foreground flex items-center gap-1">
								<Clock className="h-3 w-3" />
								Team Review
							</span>
						</div>
						<div className="hidden sm:block w-8 h-px bg-border"></div>
						<div className="flex items-center gap-3 text-sm">
							<div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground font-semibold text-xs">
								3
							</div>
							<span className="text-muted-foreground flex items-center gap-1">
								<Users className="h-3 w-3" />
								Public Access
							</span>
						</div>
					</div>
				</motion.div>

				{/* Main Content */}
				<div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12">
					{/* Input Section */}
					<motion.div variants={itemVariants}>
						<Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/20 transition-all duration-300">
							<CardHeader className="pb-6">
								<div className="flex items-center gap-3">
									<Globe className="h-6 w-6 text-primary" />
									<CardTitle className="text-2xl">Provider URL</CardTitle>
								</div>
								<CardDescription className="text-base">
									Enter the complete URL to your provider's setup.json
									configuration file
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								<div className="space-y-3">
									<Input
										placeholder="https://example.com/setup.json"
										value={url}
										onChange={(e) => {
											setUrl(e.target.value);
											isValidUrlFn(e.target.value);
										}}
										type="url"
										className={cn(
											"h-12 text-base transition-all duration-200",
											urlError &&
												"border-destructive focus-visible:ring-destructive",
											isValidUrl &&
												"border-green-500 focus-visible:ring-green-500",
										)}
									/>

									{/* URL Status */}
									{url && (
										<div className="flex items-center gap-2 text-sm">
											{isValidUrl ? (
												<>
													<CheckCircle2 className="h-4 w-4 text-green-500" />
													<span className="text-green-600 dark:text-green-400">
														Valid setup.json URL
													</span>
												</>
											) : urlError ? (
												<>
													<AlertCircle className="h-4 w-4 text-destructive" />
													<span className="text-destructive">{urlError}</span>
												</>
											) : null}
										</div>
									)}
								</div>

								{/* Action Button */}
								<Button
									size="lg"
									className="w-full h-12 text-base font-semibold"
									disabled={!isValidUrl || isAddingProviderLoading || isLoading}
									onClick={() => {
										addProvider({
											setupJSON: data,
											setupUrl: url,
										});
									}}
								>
									{isAddingProviderLoading ? (
										<>
											<Loader2 className="h-5 w-5 animate-spin mr-2" />
											Submitting Provider...
										</>
									) : (
										<>
											<Plus className="h-5 w-5 mr-2" />
											Submit for Review
										</>
									)}
								</Button>

								{/* Approval Process Info */}
								<Alert className="border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/20">
									<Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
									<AlertDescription className="text-blue-800 dark:text-blue-200">
										<strong>Review Process:</strong> Your provider will be
										reviewed by our team for security and quality before being
										made publicly available
									</AlertDescription>
								</Alert>

								{/* Security Notice */}
								<Alert className="border-amber-200 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-950/20">
									<Shield className="h-4 w-4 text-amber-600 dark:text-amber-400" />
									<AlertDescription className="text-amber-800 dark:text-amber-200">
										<strong>Security Notice:</strong> Only submit providers from
										trusted sources. All submissions undergo security review to
										protect the community.
									</AlertDescription>
								</Alert>
							</CardContent>
						</Card>
					</motion.div>

					{/* Preview Section */}
					<motion.div variants={itemVariants}>
						<Card className="bg-card/50 backdrop-blur-sm border-border/50 h-full">
							<CardHeader className="pb-6">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<div className="p-2 rounded-lg bg-muted">
											<code className="text-sm font-mono">JSON</code>
										</div>
										<CardTitle className="text-2xl">
											Configuration Preview
										</CardTitle>
									</div>
									{data && (
										<Badge
											variant="secondary"
											className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
										>
											<CheckCircle2 className="h-3 w-3 mr-1" />
											Loaded
										</Badge>
									)}
								</div>
								<CardDescription className="text-base">
									Preview of the provider configuration that will be added to
									Falkor
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="relative rounded-lg border bg-muted/30 overflow-hidden">
									{isLoading && (
										<div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10">
											<div className="flex items-center gap-3">
												<Loader2 className="h-6 w-6 animate-spin text-primary" />
												<span className="text-sm font-medium">
													Loading configuration...
												</span>
											</div>
										</div>
									)}

									{error && (
										<div className="p-6 text-center">
											<AlertCircle className="h-12 w-12 text-destructive mx-auto mb-3" />
											<h3 className="font-semibold text-destructive mb-2">
												Failed to Load Configuration
											</h3>
											<p className="text-sm text-muted-foreground">
												{error.message ||
													"Unable to fetch the provider configuration. Please check the URL and try again."}
											</p>
										</div>
									)}

									{!error && (
										<pre className="overflow-auto max-h-[500px] p-4 text-sm font-mono leading-relaxed">
											<code className="text-foreground">
												{JSON.stringify(
													data ?? constants.example_setup_json,
													null,
													2,
												)}
											</code>
										</pre>
									)}
								</div>
							</CardContent>
						</Card>
					</motion.div>
				</div>

				{/* Requirements Section */}
				<motion.div variants={itemVariants} className="mt-8">
					<Card className="bg-card/50 backdrop-blur-sm border-border/50">
						<CardHeader className="pb-6">
							<div className="flex items-center gap-3">
								<FileText className="h-6 w-6 text-primary" />
								<CardTitle className="text-2xl">
									Submission Requirements
								</CardTitle>
							</div>
							<CardDescription className="text-base">
								Please ensure your provider meets all requirements before
								submission
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid md:grid-cols-3 gap-6">
								<div className="flex items-start gap-3">
									<div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20">
										<CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
									</div>
									<div>
										<h3 className="font-semibold mb-2">Open Source</h3>
										<p className="text-sm text-muted-foreground">
											Your provider must be open source and publicly available
											for review and contribution.
										</p>
									</div>
								</div>
								<div className="flex items-start gap-3">
									<div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20">
										<Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
									</div>
									<div>
										<h3 className="font-semibold mb-2">Free to Use</h3>
										<p className="text-sm text-muted-foreground">
											The provider must be completely free for all users without
											any usage fees or restrictions.
										</p>
									</div>
								</div>
								<div className="flex items-start gap-3">
									<div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20">
										<Shield className="h-5 w-5 text-purple-600 dark:text-purple-400" />
									</div>
									<div>
										<h3 className="font-semibold mb-2">No Monetization</h3>
										<p className="text-sm text-muted-foreground">
											Providers cannot charge money, require payments, or
											include any form of monetization.
										</p>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</motion.div>
			</motion.div>
			<Footer />
		</div>
	);
}
