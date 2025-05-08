import { createFileRoute } from "@tanstack/react-router";
import { constants } from "@/utils";

export const Route = createFileRoute("/github/$name")({
	component: Github,
});

function Github() {
	const params = Route.useParams();

	if (!constants.github_repos.includes(params.name)) window.location.href = "/";
	else
		window.location.href = `https://github.com/team-falkor/${params.name?.replace("app", "falkor")}`;

	return null;
}
