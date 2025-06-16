import { motion } from "framer-motion";
import { GithubIcon, MessageCircleIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
	buttonHoverTap,
	containerVariants,
	itemVariants,
} from "@/features/download/utils/animations";
import { cn } from "@/utils";

export const BugReportSection = () => {
	return (
		<motion.div
			variants={containerVariants}
			initial="hidden"
			animate="visible"
			className="flex flex-col items-center text-center mt-10 max-w-3xl mx-auto bg-card/50 backdrop-blur-sm rounded-xl p-8 border border-border shadow-lg"
		>
			<motion.h2
				variants={itemVariants}
				className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
			>
				Encountering Issues?
			</motion.h2>
			<motion.p
				variants={itemVariants}
				className="mt-4 text-lg text-muted-foreground max-w-2xl"
			>
				If you experience any bugs or have suggestions, feel free to open an
				issue on our GitHub Issues page or join our Discord server.
			</motion.p>
			<motion.div
				variants={itemVariants}
				className="mt-8 flex flex-wrap gap-4 justify-center"
			>
				<motion.a
					variants={buttonHoverTap}
					whileHover="hover"
					whileTap="tap"
					href="https://github.com/Team-Falkor/app/issues"
					target="_blank"
					rel="noopener noreferrer"
					className={cn(
						buttonVariants({
							variant: "secondary",
							size: "lg",
						}),
						"h-14 text-lg px-6 shadow-md hover:bg-primary/20",
					)}
				>
					<GithubIcon className="mr-2 h-5 w-5" />
					Report on GitHub
				</motion.a>
				<motion.a
					variants={buttonHoverTap}
					whileHover="hover"
					whileTap="tap"
					href="https://falkor.moe/discord"
					target="_blank"
					rel="noopener noreferrer"
					className={cn(
						buttonVariants({
							variant: "secondary",
							size: "lg",
						}),
						"h-14 text-lg px-6 shadow-md hover:bg-primary/20",
					)}
				>
					<MessageCircleIcon className="mr-2 h-5 w-5" />
					Join Discord
				</motion.a>
			</motion.div>
		</motion.div>
	);
};
