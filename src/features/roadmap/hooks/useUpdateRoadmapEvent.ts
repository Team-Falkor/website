import { constants } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  ApiResponse,
  RoadmapEventData,
  RoadmapEventItemData,
} from "@team-falkor/shared-types";

const { API_URL } = constants;

interface UpdateEventInput {
  id: number;
  phase?: RoadmapEventData["phase"];
  status?: RoadmapEventData["status"];
  items?: RoadmapEventItemData[];
}

export function useUpdateRoadmapEvent() {
  const queryClient = useQueryClient();

  return useMutation<RoadmapEventData, Error, UpdateEventInput>({
    mutationFn: async ({ id, phase, status, items }) => {
      const res = await fetch(`${API_URL}/roadmap/admin/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phase, status, items }),
      });
      const json: ApiResponse<RoadmapEventData> = await res.json();
      if (!res.ok || !json.success)
        throw new Error(json.message || "Failed to update roadmap event");
      return json.data as RoadmapEventData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roadmap"] });
    },
  });
}
