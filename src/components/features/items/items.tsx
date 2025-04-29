import {
  CalendarDays,
  Code2,
  HardDrive,
  Puzzle,
  Rocket,
  Users,
} from "lucide-react";
import { JSX } from "react";

export const featureItems: Array<{
  icon: JSX.Element;
  title: string;
  description: string;
  isAvailable?: boolean;
  link?: string;
}> = [
  {
    icon: <Users />,
    title: "Plugins by Community",
    description:
      "Enhance your gaming experience with plugins created by our community, tailored to your preferences.",
    isAvailable: true,
  },
  {
    icon: <CalendarDays />,
    title: "Calendar",
    description:
      "Stay ahead with our release calendar, marking the debut of new games so you never miss out on the latest titles.",
    isAvailable: false,
  },
  {
    icon: <Code2 />,
    title: "Open Source",
    description:
      "Dive into a platform that thrives on collaboration and innovation, powered by an open-source ethos.",
    isAvailable: true,
    link: "/github/app",
  },
  {
    icon: <Puzzle />,
    title: "Game Library Management",
    description:
      "Organize and manage your installed games effortlessly with our game library management tools.",
    isAvailable: true,
  },
  {
    icon: <Rocket />,
    title: "Launcher Integration",
    description:
      "Launch your games directly from the app, streamlining your playtime with our integrated launcher.",
    isAvailable: false,
  },
  {
    icon: <HardDrive />,
    title: "Inbuilt Torrent Client",
    description: `Experience seamless file sharing with our integrated torrent client, designed for fast and secure transfers.`,
    isAvailable: true,
  },
];
