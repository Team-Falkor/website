import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import SvgBG from "@/components/svgBG";
import { SignUpForm } from "@/features/auth/components/SignUpForm";

export const Route = createFileRoute("/sign-up/")({
	component: SignUp,
});

function SignUp() {
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

	return (
		<div className="w-full min-h-[600px] h-screen relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-950">
			<SvgBG />
			<motion.div
				initial="hidden"
				animate="visible"
				variants={containerVariants}
				className="flex items-center justify-center py-12 h-full"
			>
				<motion.div variants={itemVariants}>
					<div className="mx-auto grid w-[350px] gap-6">
						<motion.div
							variants={itemVariants}
							className="grid gap-2 text-center"
						>
							<h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
								Sign Up
							</h1>
							<p className="text-balance text-gray-300 w-full">
								Create an account to get started with Falkor
							</p>
						</motion.div>
						<motion.div variants={itemVariants}>
							<SignUpForm />
						</motion.div>
					</div>
				</motion.div>
			</motion.div>
		</div>
	);
}
