import { useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import { isAdmin } from "@/utils";
import { authClient } from "@/utils/auth-client";

const { useSession } = authClient;

interface AdminGuardProps {
	children: React.ReactNode;
}

export function AdminGuard({ children }: AdminGuardProps) {
	const { data: session, isPending } = useSession();
	const navigate = useNavigate();
	const isUserAAdmin = useMemo(
		() => isAdmin(session?.user?.role ?? "USER"),
		[session],
	);

	useEffect(() => {
		// Only redirect if we're not in a loading state
		if (!isPending) {
			if (!session?.user) {
				navigate({ to: "/auth/sign-in" });
				return;
			}

			if (!isUserAAdmin) {
				navigate({ to: "/" });
			}
		}
	}, [navigate, isUserAAdmin, isPending, session?.user]);

	if (isPending) {
		return null;
	}

	// Only render children if user is an admin
	return isUserAAdmin ? <>{children}</> : null;
}
