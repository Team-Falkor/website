import { APIResponse } from "@/@types";
import { Provider, ProvidersResponse } from "@/@types/providers";
import { constants } from "@/utils";

const { API_URL } = constants;

type GetPendingProvidersParams = {
  skip?: number;
  take?: number;
  sortBy?: "createdAt" | "name";
  sortOrder?: "asc" | "desc";
};

export const providersAdminApi = {
  getPendingProviders: async (
    params?: GetPendingProvidersParams
  ): Promise<ProvidersResponse> => {
    const searchParams = new URLSearchParams();
    if (params?.skip) searchParams.append("skip", params.skip.toString());
    if (params?.take) searchParams.append("take", params.take.toString());
    if (params?.sortBy) searchParams.append("sortBy", params.sortBy);
    if (params?.sortOrder) searchParams.append("sortOrder", params.sortOrder);

    const response = await fetch(
      `${API_URL}/providers/admin/pending?${searchParams.toString()}`,
      {
        credentials: "include",
      }
    );
    return response.json();
  },

  deleteProvider: async (id: string): Promise<APIResponse<Provider>> => {
    const response = await fetch(`${API_URL}/providers/admin`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
      credentials: "include",
    });
    return response.json();
  },

  approveProvider: async (id: string): Promise<APIResponse<Provider>> => {
    const response = await fetch(`${API_URL}/providers/admin/approve`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
      credentials: "include",
    });

    return response.json();
  },
};
