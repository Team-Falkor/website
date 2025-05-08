import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import Footer from "@/components/footer";
import SvgBG from "@/components/svgBG";
import { Button } from "@/components/ui/button";
import { ProviderList } from "@/features/providers/components/ProviderList";
import { SearchBar } from "@/features/providers/components/SearchBar";
import { useProviders } from "@/features/providers/hooks/useProviders";
import { cn } from "@/utils";

export const Route = createFileRoute("/plugins/providers/")({
	component: RouteComponent,
});

function RouteComponent() {
	const [searchQuery, setSearchQuery] = useState("");
	const { providers, error, isLoading } = useProviders();

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

	const filteredProviders = providers?.data?.filter((p) => {
		if (!searchQuery) return true;
		const provider = JSON.parse(p.setupJSON as unknown as string);
		return (
			provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			provider.description.toLowerCase().includes(searchQuery.toLowerCase())
		);
	});

	return (
		<div
			className={cn("min-h-screen bg-gradient-to-b from-gray-900 to-gray-950")}
		>
			<div className={cn("relative p-2 px-4 pb-16 overflow-hidden min-h-svh")}>
				<SvgBG />

				<motion.div
					initial="hidden"
					animate="visible"
					variants={containerVariants}
					className={cn(
						"px-4 pt-8 pb-6 mx-auto max-w-4xl sm:px-6 sm:pt-10 sm:pb-8",
					)}
				>
					<div className="text-center">
						<motion.h1
							variants={itemVariants}
							className={cn(
								"mt-8 text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl",
								"bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600",
							)}
						>
							Community Providers
						</motion.h1>
						<motion.p
							variants={itemVariants}
							className={cn(
								"mt-4 text-base leading-7 text-gray-300 sm:mt-6 sm:text-lg lg:text-xl",
							)}
						>
							Explore a wide range of community providers.
							<br />
							Connect to various sources to enhance your experience.
						</motion.p>
						<motion.p
							variants={itemVariants}
							className={cn("mt-2 text-sm text-muted-foreground")}
						>
							Community Providers are run by third-party developers and are not
							affiliated with Falkor.
							<br />
							Community Providers are not endorsed by Falkor or any of its
							affiliates.
						</motion.p>
					</div>
				</motion.div>

				<motion.div
					initial="hidden"
					animate="visible"
					variants={containerVariants}
					className={cn(
						"px-4 pt-12 mx-auto max-w-4xl sm:px-6 lg:max-w-6xl lg:pt-16",
					)}
				>
					<motion.div
						variants={itemVariants}
						className={cn("flex justify-between mb-6")}
					>
						<Button
							asChild
							className={cn(
								"transform hover:scale-[1.02] transition-all duration-300 z-10 relative",
							)}
						>
							<Link to="/plugins/providers/add">
								<Plus className="mr-2 h-4 w-4" /> Add Provider
							</Link>
						</Button>

						<SearchBar onSearch={setSearchQuery} />
					</motion.div>

					<motion.div variants={itemVariants}>
						<ProviderList
							providers={filteredProviders || []}
							isLoading={isLoading}
							error={error}
						/>
					</motion.div>
				</motion.div>
			</div>
			<Footer />
		</div>
	);
}
