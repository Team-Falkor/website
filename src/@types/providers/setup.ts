export type PluginId = `${string}.${string}.${string}` | `${string}.${string}`;

export interface PluginSetupJSON {
  id: PluginId;
  version: string;
  config: false | PluginConfig;
  multiple_choice: boolean;
  name: string;
  description: string;
  logo: string;
  banner?: string;
  api_url?: string;
  setup_path?: string;
  author?: PluginSetupJSONAuthor;
}

export interface PluginSetupJSONAuthor {
  name?: string;
  url?: string;
}

export interface PluginConfig {
  search?: string[];
}

export type PluginSetupWithoutConfig = Omit<PluginSetupJSON, "config">;
