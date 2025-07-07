import { adminClient, usernameClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { constants } from "./constants";

const { API_URL } = constants;

export const authClient = createAuthClient({
	baseURL: API_URL,
	basePath: "/auth",
	plugins: [adminClient(), usernameClient()],
});
