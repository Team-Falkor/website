import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Loader2, Plus } from "lucide-react";
import { useCallback, useState } from "react";
import Footer from "@/components/footer";
import SvgBG from "@/components/svgBG";
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
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
				delayChildren: 0.3,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: { type: "spring", stiffness: 100 },
		},
	};

	const [url, setUrl] = useState<string>("");
	const [isValidUrl, setIsValidUrl] = useState<boolean>(false);
	const { addProvider, isLoading: isAddingProviderLoading } = useAddProvider();

	const isValidUrlFn = useCallback((url: string) => {
		try {
			const isValidUrl = new URL(url);
			setIsValidUrl(isValidUrl?.href?.includes("/setup.json"));
		} catch (e) {
			return false;
		}
	}, []);

	const { data, error, isLoading } = useQuery({
		queryKey: ["providers", url],
		enabled: isValidUrl,
		queryFn: async () => {
			const res = await fetch(url);
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
		<div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 relative overflow-hidden">
			<SvgBG />
			<motion.div
				initial="hidden"
				animate="visible"
				variants={containerVariants}
				className="container mx-auto flex flex-col items-center justify-center min-h-screen py-8 px-4"
			>
				<motion.div variants={itemVariants}>
					<Card className="w-full max-w-2xl bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
						<CardHeader>
							<CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
								Add Provider
							</CardTitle>
							<CardDescription>
								Enter the URL of your provider's setup.json file to add it to
								Falkor
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div className="flex gap-2 justify-between">
									<Input
										placeholder="https://example.com/setup.json"
										value={url}
										onChange={(e) => {
											setUrl(e.target.value);
											isValidUrlFn(e.target.value);
										}}
										type="url"
										className={cn("transition-all duration-200")}
									/>
									<Button
										disabled={!isValidUrl || isAddingProviderLoading}
										onClick={() => {
											addProvider({
												setupJSON: data,
												setupUrl: url,
											});
										}}
									>
										<Plus /> Add Provider
									</Button>
								</div>
								<div className="relative rounded-lg border bg-muted/50 p-4">
									{!!isLoading && !!error && (
										<div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
											<Loader2 className="h-6 w-6 animate-spin text-primary" />
										</div>
									)}
									<pre className="overflow-auto max-h-[400px] text-sm">
										<code>
											{error
												? "Error loading provider data"
												: JSON.stringify(
														data ?? constants.example_setup_json,
														null,
														2,
													)}
										</code>
									</pre>
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
