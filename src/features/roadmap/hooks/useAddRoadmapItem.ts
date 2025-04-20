import { constants } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  APIResponse,
  RoadmapEventData,
  RoadmapEventItem,
} from "@team-falkor/shared-types";

const { API_URL } = constants;

interface AddRoadmapItemInput extends RoadmapEventItem {
  id: number;
}

export function useAddRoadmapItem() {
  const queryClient = useQueryClient();

  return useMutation<RoadmapEventData, Error, AddRoadmapItemInput>({
    mutationFn: async ({ id, ...item }) => {
      const res = await fetch(`${API_URL}/roadmap/admin/${id}/item`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      const json: APIResponse<RoadmapEventData> = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to create roadmap item");
      }
      return json.data as RoadmapEventData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roadmap"] });
    },
  });
}
