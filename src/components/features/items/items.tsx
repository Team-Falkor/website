import { Code2, HardDrive, Puzzle, Rocket, Trophy, Users } from "lucide-react";
import { JSX } from "react";

export const featureItems: Array<{
	icon: JSX.Element;
	title: string;
	description: string;
	isAvailable?: boolean;
	link?: string;
}> = [
	{
		icon: <Users className="w-6 h-6" />,
		title: "Plugins by Community",
		description:
			"Discover game-changing plugins, crafted by the community, just for you.",
		isAvailable: true,
	},
	{
		icon: <Trophy className="w-6 h-6" />,
		title: "Achievements",
		description:
			"Unlock bragging rights and keep the motivation high with our achievement system.",
		isAvailable: true,
	},
	{
		icon: <Code2 className="w-6 h-6" />,
		title: "Open Source",
		description:
			"Jump into a world of shared innovation, built openly, by everyone.",
		isAvailable: true,
		link: "/github/app",
	},
	{
		icon: <Puzzle className="w-6 h-6" />,
		title: "Game Library Management",
		description:
			"Effortlessly wrangle your game collection into perfect order.",
		isAvailable: true,
	},
	{
		icon: <Rocket className="w-6 h-6" />,
		title: "Launcher Integration",
		description:
			"Launch right into the action, no detours, with seamless integration.",
		isAvailable: true,
	},
	{
		icon: <HardDrive className="w-6 h-6" />,
		title: "Inbuilt Torrent Client",
		description: `Blazing fast, secure file downloading built right in, making life easier.`,
		isAvailable: true,
	},
];
