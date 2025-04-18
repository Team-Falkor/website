export const constants = {
  discord_invite_link: "https://discord.gg/5cxfH6ak9h",
  github_website_url: "https://github.com/team-falkor/website",
  github_app_url: "https://github.com/team-falkor/app",
  ko_fi_url: "https://ko-fi.com/prostarz",
  github_repos: ["app", "website", "discord-bot"],
  app_version: "v0.2.0-alpha",
  banner_message: "Test Build V0.0.1 W/ Achievements support",
  example_setup_json: {
    id: "my.awesome.plugin",
    version: "1.0.0",
    multiple_choice: false,
    name: "my-plugin",
    description: "My awesome Falkor plugin",
    logo: "URL_ADDRESS_to_image.com",
    banner: "URL_ADDRESS_to_image.com",
    author: {
      name: "team-falkor",
      url: "https://falkor.moe",
    },
  },
  API_URL: import.meta.env?.PUBLIC_API_URL ?? "https://api.falkor.moe",
};
