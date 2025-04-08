import { isAdmin } from "@/utils";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import { useMe } from "../hooks/useMe";

interface AdminGuardProps {
  children: React.ReactNode;
}

export function AdminGuard({ children }: AdminGuardProps) {
  const { user, isLoading } = useMe();
  const navigate = useNavigate();
  const isUserAAdmin = useMemo(() => isAdmin(user?.role ?? "USER"), [user]);

  useEffect(() => {
    // Only redirect if we're not in a loading state
    if (!isLoading) {
      if (!user) {
        navigate({ to: "/login" });
        return;
      }

      if (!isUserAAdmin) {
        navigate({ to: "/" });
      }
    }
  }, [user, isLoading, navigate, isUserAAdmin]);

  if (isLoading) {
    return null; // Or a loading spinner
  }

  // Only render children if user is an admin
  return isUserAAdmin ? <>{children}</> : null;
}
