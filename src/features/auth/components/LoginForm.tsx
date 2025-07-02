import { Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/utils/auth-client";
import type { LoginBody } from "../@types";
import { useSession } from "../hooks/useSession";

export function LoginForm() {
	const { session } = useSession();
	const navigate = useNavigate();
	const [formData, setFormData] = useState<LoginBody>({
		email: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState(false);

	useEffect(() => {
		if (session) {
			navigate({
				to: "/",
			});
		}
	}, [session, navigate]);

	const login = async () => {
		const res = await authClient.signIn.email(formData);

		if (res?.error) {
			toast.error(res.error?.message ?? "error logging in");
			return;
		}

		if (res?.data) {
			toast.success("logged in");
			navigate({
				to: "/",
			});
			return;
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await login();
	};

	return (
		<form onSubmit={handleSubmit} className="grid gap-4">
			<div className="grid gap-2">
				<Label htmlFor="email">Email</Label>
				<Input
					id="email"
					type="email"
					placeholder="example@falkor.dev"
					required
					value={formData.email}
					onChange={(e) =>
						setFormData((prev) => ({ ...prev, email: e.target.value }))
					}
				/>
			</div>
			<div className="grid gap-2">
				<Label htmlFor="password">Password</Label>
				<div className="relative">
					<Input
						id="password"
						type={showPassword ? "text" : "password"}
						required
						placeholder="********"
						value={formData.password}
						onChange={(e) =>
							setFormData((prev) => ({ ...prev, password: e.target.value }))
						}
						className="pr-10"
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

			<Button type="submit" className="w-full">
				{"Login"}
			</Button>
			<div className="mt-4 text-center text-sm">
				Don&apos;t have an account?{" "}
				<Link to="/auth/sign-up" className="underline">
					Sign up
				</Link>
			</div>
		</form>
	);
}
