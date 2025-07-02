import { Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/utils/auth-client";
import type { SignUpBody } from "../@types";
import { useSession } from "../hooks/useSession";

export function SignUpForm() {
	const { session } = useSession();
	const navigate = useNavigate();
	const [formData, setFormData] = useState<SignUpBody>({
		email: "",
		password: "",
		username: "",
		name: "anonymous",
	});
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	useEffect(() => {
		if (session) {
			navigate({
				to: "/",
			});
		}
	}, [session, navigate]);

	const signUp = async () => {
		const res = await authClient.signUp.email({
			email: formData.email,
			password: formData.password,
			username: formData.username,
			name: formData.name,
		});

		if (res?.error) {
			toast.error(res.error?.message ?? "error signing up");
			return;
		}

		if (res?.data) {
			toast.success("account created");
			navigate({
				to: "/auth/sign-in",
			});
			return;
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (formData.password !== confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}

		signUp();
	};

	return (
		<Card className="mx-auto backdrop-blur-sm bg-background/80 border-muted/30 shadow-lg w-sm">
			<CardHeader className="space-y-1">
				<CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
				<CardDescription className="text-balance">
					Create an account to get started with Falkor
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="grid gap-4">
					<div className="grid gap-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="example@falkor.dev"
							required
							className="border-muted/50"
							value={formData.email}
							onChange={(e) =>
								setFormData((prev) => ({ ...prev, email: e.target.value }))
							}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="name">name</Label>
						<Input
							id="name"
							type="text"
							placeholder="anonymous"
							required
							className="border-muted/50"
							value={formData.name}
							onChange={(e) =>
								setFormData((prev) => ({ ...prev, name: e.target.value }))
							}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="username">Username</Label>
						<Input
							id="username"
							type="text"
							placeholder="falkor"
							required
							className="border-muted/50"
							value={formData.username}
							onChange={(e) =>
								setFormData((prev) => ({ ...prev, username: e.target.value }))
							}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="password">Password</Label>
						<div className="relative">
							<Input
								id="password"
								type={showPassword ? "text" : "password"}
								placeholder="********"
								required
								className="border-muted/50 pr-10"
								value={formData.password}
								onChange={(e) =>
									setFormData((prev) => ({ ...prev, password: e.target.value }))
								}
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
							>
								{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
							</button>
						</div>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="confirmPassword">Confirm Password</Label>
						<div className="relative">
							<Input
								id="confirmPassword"
								type={showConfirmPassword ? "text" : "password"}
								placeholder="********"
								required
								className="border-muted/50 pr-10"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
							<button
								type="button"
								onClick={() => setShowConfirmPassword(!showConfirmPassword)}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
							>
								{showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
							</button>
						</div>
					</div>
					<Button type="submit" className="w-full mt-2">
						{"Create an account"}
					</Button>
					<div className="mt-4 text-center text-sm">
						Already have an account?{" "}
						<Link
							to="/auth/sign-in"
							className="underline hover:text-primary transition-colors"
						>
							Sign in
						</Link>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}
