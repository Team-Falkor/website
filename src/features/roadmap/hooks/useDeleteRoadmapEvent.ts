import { constants } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { APIResponse } from "@team-falkor/shared-types";

const { API_URL } = constants;

export function useDeleteRoadmapEvent() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: async (id) => {
      const res = await fetch(`${API_URL}/roadmap/admin/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const json: APIResponse<null> = await res.json();
      if (!res.ok || !json.success)
        throw new Error(json.message || "Failed to delete roadmap event");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roadmap"] });
    },
  });
}
