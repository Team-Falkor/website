import { constants } from "@/utils";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/discord/")({
  component: Discord,
});

function Discord() {
  return (window.location.href = constants.discord_invite_link);
}
