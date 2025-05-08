import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import SvgBG from "@/components/svgBG";
import { LoginForm } from "@/features/auth/components/LoginForm";

export const Route = createFileRoute("/login/")({
	component: Login,
});

function Login() {
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
		<div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] h-screen bg-gradient-to-b from-gray-900 to-gray-950 pt-16 sm:pt-0">
			<SvgBG />
			<motion.div
				initial="hidden"
				animate="visible"
				variants={containerVariants}
				className="flex items-center justify-center py-12 relative z-10"
			>
				<div className="mx-auto grid w-[350px] gap-6">
					<motion.div
						variants={itemVariants}
						className="grid gap-2 text-center"
					>
						<h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
							Login
						</h1>
						<p className="text-balance text-gray-300 w-full">
							Enter your email below to login to your account
						</p>
					</motion.div>
					<motion.div variants={itemVariants}>
						<LoginForm />
					</motion.div>
				</div>
			</motion.div>
			<div className="hidden bg-muted lg:block">
				<img
					src="/bg.png"
					alt="Image"
					width="1920"
					height="1080"
					draggable={false}
					className="h-full w-full object-cover dark:brightness-[0.5] dark:grayscale"
				/>
			</div>
		</div>
	);
}
