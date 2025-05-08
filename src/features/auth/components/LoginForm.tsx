import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { LoginBody } from "../@types";
import { useLogin } from "../hooks/useLogin";

export function LoginForm() {
	const [formData, setFormData] = useState<
		LoginBody & { keepLoggedIn: boolean }
	>({
		email: "",
		password: "",
		keepLoggedIn: false,
	});

	const { login, isLoading } = useLogin();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		login(formData);
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
				<Input
					id="password"
					type="password"
					required
					placeholder="********"
					value={formData.password}
					onChange={(e) =>
						setFormData((prev) => ({ ...prev, password: e.target.value }))
					}
				/>
			</div>
			<div className="flex items-center justify-end space-x-2">
				<Label htmlFor="keepLoggedIn" className="text-sm font-normal">
					Keep me logged in
				</Label>
				<Checkbox
					id="keepLoggedIn"
					checked={formData.keepLoggedIn}
					onCheckedChange={(checked: boolean) =>
						setFormData((prev) => ({ ...prev, keepLoggedIn: checked }))
					}
				/>
			</div>
			<Button type="submit" className="w-full" disabled={isLoading}>
				{isLoading ? "Logging in..." : "Login"}
			</Button>
			<div className="mt-4 text-center text-sm">
				Don&apos;t have an account?{" "}
				<Link to="/sign-up" className="underline">
					Sign up
				</Link>
			</div>
		</form>
	);
}
