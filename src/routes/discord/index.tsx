import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { constants } from "@/utils";

export const Route = createFileRoute("/discord/")({
	component: Discord,
});

function Discord() {
	useEffect(() => {
		window.location.href = constants.discord_invite_link;
	}, []);

	return null;
}
