import { constants } from "@/utils";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/discord")({
  component: Discord,
});

function Discord() {
  useEffect(() => {
    if (!window) return;

    window.location.href = constants.discord_invite_link;
  }, []);

  return null;
}
