import { useRouterState } from "@tanstack/react-router";
import { useCallback, useEffect } from "react";
import { constants } from "@/utils";
import { useSessionId } from "./useSessionId";

const { API_URL } = constants;

export const useAnalytics = (): void => {
	const sessionId = useSessionId();
	const pathname = useRouterState({ select: (s) => s.location.pathname });

	const trackPageview = useCallback(async () => {
		if (!sessionId) return;

		try {
			await fetch(`${API_URL}/analytics/pageview`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					path: pathname,
					sessionId,
					userAgent: navigator.userAgent,
					countryCode: undefined,
				}),
			});
		} catch (error) {
			console.error("Error recording pageview:", error);
		}
	}, [pathname, sessionId]);

	useEffect(() => {
		trackPageview();
	}, [trackPageview]);
};
