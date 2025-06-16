import { motion } from "framer-motion";
import { BugReportSection } from "@/features/download/components";
import { fadeInUpVariants } from "@/features/download/utils/animations";

export function DownloadHelp() {
	return (
		<motion.div
			variants={fadeInUpVariants}
			initial="hidden"
			animate="visible"
			transition={{ delay: 0.6 }}
			className="pt-16 mt-8"
		>
			<div className="max-w-5xl mx-auto">
				<div className="text-center mb-12">
					<h2 className="text-2xl font-bold text-foreground sm:text-3xl mb-4">
						Need Help?
					</h2>
					<p className="text-muted-foreground max-w-2xl mx-auto">
						We're here to support you with any issues or questions you might
						have.
					</p>
				</div>
				<BugReportSection />
			</div>
		</motion.div>
	);
}
