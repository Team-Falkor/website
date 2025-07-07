import { useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import { isAdmin } from "@/utils";
import { useSession } from "../hooks/useSession";

interface AdminGuardProps {
	children: React.ReactNode;
}

export function AdminGuard({ children }: AdminGuardProps) {
	const { user, isPending } = useSession();
	const navigate = useNavigate();
	const isUserAAdmin = useMemo(() => isAdmin(user?.role ?? "USER"), [user]);

	useEffect(() => {
		// Only redirect if we're not in a loading state
		if (!isPending) {
			if (!user) {
				navigate({ to: "/auth/sign-in" });
				return;
			}

			if (!isUserAAdmin) {
				navigate({ to: "/" });
			}
		}
	}, [navigate, isUserAAdmin, isPending, user]);

	if (isPending) {
		return null;
	}

	// Only render children if user is an admin
	return isUserAAdmin ? <>{children}</> : null;
}
