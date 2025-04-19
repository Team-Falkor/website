import { constants } from "@/utils";
import { useQuery } from "@tanstack/react-query";

const { API_URL } = constants;

export function useAdminTotalPageviews() {
  return useQuery({
    queryKey: ["admin", "pageviews", "total"],
    queryFn: async () => {
      const response = await fetch(
        `${API_URL}/analytics/admin/pageviews/total`,
        {
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch total pageviews");
      }
      return response.json();
    },
  });
}
