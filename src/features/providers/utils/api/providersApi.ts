import {
	ApiResponse,
	PluginProvider,
	PluginSetupJSON,
} from "@team-falkor/shared-types";
import { constants } from "@/utils";

const { API_URL } = constants;

type GetProvidersParams = {
	limit?: number;
	offset?: number;
	search?: string;
};

type GetProvidersResponse = ApiResponse<Array<PluginProvider>>;

export const providersApi = {
	getProviders: async (
		params?: GetProvidersParams,
	): Promise<GetProvidersResponse> => {
		const searchParams = new URLSearchParams();
		if (params?.limit) searchParams.append("limit", params.limit.toString());
		if (params?.offset) searchParams.append("offset", params.offset.toString());
		if (params?.search) searchParams.append("search", params.search);

		const response = await fetch(
			`${API_URL}/providers?${searchParams.toString()}`,
		);
		return await response.json();
	},

	addProvider: async (setupData: {
		setupJSON?: PluginSetupJSON;
		setupUrl?: string;
	}): Promise<ApiResponse<PluginSetupJSON>> => {
		const response = await fetch(`${API_URL}/providers`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(setupData),
		});
		const data: ApiResponse<PluginSetupJSON> = await response.json();

		return data;
	},
};
