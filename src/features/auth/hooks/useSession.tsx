import { authClient } from "@/utils/auth-client";

export const useSession = () => {
	const { data, error, isPending, refetch } = authClient.useSession();

	return {
		user: data?.user,
		session: data?.session,
		error,
		isPending,
		refetch,
	};
};
