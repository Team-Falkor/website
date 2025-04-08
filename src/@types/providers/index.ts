import { APIResponse } from "..";
import { PluginSetupJSON } from "./setup";

export * from "./setup";

export interface Provider {
  id: string;
  setupUrl: string;
  setupJSON: PluginSetupJSON;
  name: string;
  offical: boolean;
  createdAt: string;
  updatedAt: string;
  approved: boolean;
}

export type ProvidersResponse = APIResponse<Array<Provider>>;
