import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

import SvgBG from "@/components/svgBG";
import { DynamicBreadcrumbs } from "@/components/ui/dynamic-breadcrumbs";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/features/admin/components/sidebar";
import { AdminAnalytics } from "@/features/analytics/components/AdminAnalytics";
import { AdminGuard } from "@/features/auth/components/AdminGuard";

export const Route = createFileRoute("/admin/analytics/")({
	component: AnalyticsDashboard,
});

function AnalyticsDashboard() {
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

	return (
		<AdminGuard>
			<div className="min-h-svh bg-gradient-to-b from-gray-900 to-gray-950 relative overflow-hidden">
				<SvgBG />
				<motion.div
					initial="hidden"
					animate="visible"
					variants={containerVariants}
					className="relative z-10 h-full"
				>
					<SidebarProvider>
						<div className="flex h-svh w-full overflow-hidden">
							<AdminSidebar className="overflow-hidden" />
							<div className="flex-1 flex flex-col h-full overflow-auto">
								<header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 sticky top-0 bg-background z-10">
									<SidebarTrigger className="-ml-1" />
									<Separator orientation="vertical" className="mr-2 h-4" />
									<DynamicBreadcrumbs />
								</header>
								<main className="flex-1 overflow-auto p-4 md:p-6">
									<div className="px-4 mx-auto">
										<motion.h1
											variants={itemVariants}
											className="text-3xl font-bold tracking-tight mb-6"
										>
											Analytics Dashboard
										</motion.h1>
										<motion.div variants={itemVariants} className="h-full">
											<AdminAnalytics />
										</motion.div>
									</div>
								</main>
							</div>
						</div>
					</SidebarProvider>
				</motion.div>
			</div>
		</AdminGuard>
	);
}
