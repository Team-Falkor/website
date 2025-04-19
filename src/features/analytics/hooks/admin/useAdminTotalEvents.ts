import { constants } from "@/utils";
import { useQuery } from "@tanstack/react-query";

const { API_URL } = constants;

export function useAdminTotalEvents() {
  return useQuery({
    queryKey: ["admin", "events", "total"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/analytics/admin/events/total`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch total events");
      }
      return response.json();
    },
  });
}
