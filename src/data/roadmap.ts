import { RoadmapEvent } from "@team-falkor/shared-types";

export const events: Array<RoadmapEvent> = [
  {
    phase: "LAUNCH",
    status: "IN_PROGRESS",
    items: [
      {
        title: "In-app updater with changelog",
        completed: true,
      },
      {
        title: "Community-created providers",
        completed: true,
      },
      {
        title:
          "Merge theme and genre into a single 'Filter' page with filtering options",
        completed: true,
      },
      {
        title: "Calendar view for upcoming releases",
        completed: true,
      },
      {
        title:
          "Automatically enqueue debrid downloads that aren’t cached, display a ‘Downloading via debrid’ status, and auto-start them once cached on the server",
        completed: false,
      },
      {
        title: "Improved integrated download and torrent client",
        completed: false,
      },
      {
        title: "Import achievements",
        completed: false,
      },
      {
        title: "Save data manager",
        completed: false,
      },
      {
        title: "Extended debrid options: delete and renew key",
        completed: false,
      },
    
      {
        title:
          "Plugin support to extend app functionality with community-made extensions",
        completed: false,
      },
    ],
  },
  {
    phase: "POST_LAUNCH",
    status: "PLANNED",
    items: [
      {
        title: "Premiumize support",
        completed: false,
      },
      {
        title:
          "Bind download/torrent client to VPN and add option to disable seeding",
        completed: false,
      },
      {
        title:
          "Social features: friends, groups, messaging, and achievement sharing (always free)",
        completed: false,
      },
      {
        title: "Cloud sync for game saves",
        completed: false,
      },
    ],
  },
  {
    phase: "FUTURE",
    status: "PLANNED",
    items: [
      {
        title:
          "Auto-detect and import games (e.g., .exe) from a user-defined path with automatic metadata",
        completed: false,
      },
      {
        title: "Support for additional debrid services",
        completed: false,
      },
      {
        title: "Additional metadata sources",
        completed: false,
      },
      {
        title: "Launch games on Linux with Proton",
        completed: false,
      },
    ],
  },
];
