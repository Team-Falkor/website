import { createFileRoute } from "@tanstack/react-router";
import { constants } from "@/utils";

export const Route = createFileRoute("/discord/")({
	component: Discord,
});

function Discord() {
	return (window.location.href = constants.discord_invite_link);
}
