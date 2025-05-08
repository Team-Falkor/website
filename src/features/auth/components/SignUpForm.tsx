import { Link } from "@tanstack/react-router";
import { useState } from "react";
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
import type { SignUpBody } from "../@types";
import { useSignUp } from "../hooks/useSignUp";

export function SignUpForm() {
	const [formData, setFormData] = useState<SignUpBody>({
		email: "",
		password: "",
		username: "",
	});

	const { signUp, isLoading } = useSignUp();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		signUp(formData);
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
						<Input
							id="password"
							type="password"
							placeholder="********"
							required
							className="border-muted/50"
							value={formData.password}
							onChange={(e) =>
								setFormData((prev) => ({ ...prev, password: e.target.value }))
							}
						/>
					</div>
					<Button type="submit" className="w-full mt-2" disabled={isLoading}>
						{isLoading ? "Creating account..." : "Create an account"}
					</Button>
					<div className="mt-4 text-center text-sm">
						Already have an account?{" "}
						<Link
							to="/login"
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
