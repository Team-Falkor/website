import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/github/$name")({
  component: Github,
});

function Github() {
  const params = Route.useParams();

  useEffect(() => {
    if (!["app", "website"].includes(params.name)) window.location.href = "/";
    else window.location.href = `https://github.com/team-falkor/${params.name}`;
  }, [params.name]);

  return null;
}
