import { constants } from "@/utils";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/discord/flw")({
  component: DiscordFlw,
});

function DiscordFlw() {
  useEffect(() => {
    if (!window) return;

    window.location.href = constants.discord_invite_link_flww;
  }, []);

  return null;
}
