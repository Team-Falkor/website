import { APIResponse } from "..";

export * from "./setup";

export interface Provider {
  id: string;
  setupUrl: string;
  setupJSON: string;
  name: string;
  offical: boolean;
  createdAt: string;
  updatedAt: string;
  approved: boolean;
}

export type ProvidersResponse = APIResponse<Array<Provider>>;
