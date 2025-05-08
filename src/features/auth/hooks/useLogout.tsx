import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { authApi } from "../utils/api/authApi";
import { clearTokens } from "../utils/tokenManager";

export const useLogout = () => {
	const navigate = useNavigate();

	const mutation = useMutation<unknown, Error, void>({
		mutationFn: () => authApi.logout(),
		onSuccess: () => {
			// Clear all tokens using the tokenManager utility
			clearTokens();

			toast("logged out succesfully!");

			// Redirect to login page
			navigate({ to: "/login" });
		},
	});

	return {
		logout: () => mutation.mutate(),
		isLoading: mutation.isPending,
		error: mutation.error,
		isError: mutation.isError,
	};
};
