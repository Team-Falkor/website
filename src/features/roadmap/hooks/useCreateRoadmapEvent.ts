import { constants } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  APIResponse,
  RoadmapEvent,
  RoadmapEventData,
} from "@team-falkor/shared-types";

const { API_URL } = constants;

export function useCreateRoadmapEvent() {
  const queryClient = useQueryClient();

  return useMutation<RoadmapEventData, Error, RoadmapEvent>({
    mutationFn: async (input) => {
      const res = await fetch(`${API_URL}/roadmap/admin`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const json: APIResponse<RoadmapEventData> = await res.json();
      if (!res.ok || !json.success)
        throw new Error(json.message || "Failed to create roadmap event");
      return json.data as RoadmapEventData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roadmap"] });
    },
  });
}
