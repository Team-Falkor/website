import { constants } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse, RoadmapEventData } from "@team-falkor/shared-types";

const { API_URL } = constants;

export function useRoadmapEvents() {
  return useQuery<Array<RoadmapEventData>>({
    queryKey: ["roadmap"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/roadmap`);
      const json: ApiResponse<Array<RoadmapEventData>> = await res.json();
      if (!res.ok || !json.success)
        throw new Error(json.message || "Failed to fetch roadmap");
      return json.data as Array<RoadmapEventData>;
    },
  });
}
