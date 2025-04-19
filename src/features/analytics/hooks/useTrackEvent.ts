import { constants } from "@/utils";
import { useRouterState } from "@tanstack/react-router";
import { useCallback } from "react";
import { useSessionId } from "./useSessionId";

const { API_URL } = constants;

type BaseEventData<TContext> = {
  eventType: string;
  context?: TContext;
};

export const useTrackEvent = () => {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const sessionId = useSessionId();

  const trackEvent = useCallback(
    async <TContext extends Record<string, unknown> = Record<string, unknown>>(
      eventData: BaseEventData<TContext>
    ): Promise<void> => {
      if (!sessionId?.length) return;
      try {
        await fetch(`${API_URL}/analytics/event`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            eventType: eventData.eventType,
            path: pathname,
            sessionId,
            context: eventData.context,
          }),
        });
      } catch (error) {
        console.error("Error recording event:", error);
      }
    },
    [pathname, sessionId]
  );

  return trackEvent;
};
