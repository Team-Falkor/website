import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { constants } from "@/utils/constants";

const FaQ = () => {
	return (
		<div className="mt-24 sm:mt-40" id="frequently-asked-questions">
			<div className="px-6 mx-auto max-w-7xl lg:px-8">
				<h1 className="text-2xl font-bold tracking-tight text-white sm:text-4xl mb-1.5">
					Falkor Game Launcher: Frequently Asked Questions (FAQ)
				</h1>
				<Accordion type="multiple" className="w-full">
					<AccordionItem value="item-1">
						<AccordionTrigger>What is Falkor?</AccordionTrigger>
						<AccordionContent>
							Falkor is an open-source game launcher that allows you to browse
							games, explore upcoming releases, and find the best deals with
							built-in IsThereAnyDeal integration. Please note: purchases are
							made through your default browser, not directly within the app.
							Designed to be flexible and expandable, Falkor’s core
							functionality is significantly enhanced by community-created
							providers, empowering users to extensively customize and extend
							the app's capabilities.
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="item-2">
						<AccordionTrigger>
							Why choose Falkor over other game launchers?
						</AccordionTrigger>
						<AccordionContent>
							We believe Falkor stands out for several key reasons: First and
							foremost, we deeply care about your privacy - your data stays
							yours, with no unnecessary tracking or data collection. We're
							committed to building a top-quality application that simply works,
							focusing on performance, reliability, and user experience above
							all else. As an open-source project, Falkor offers complete
							transparency and community-driven development, ensuring the
							launcher evolves based on real user needs. Everything that Falkor
							does will and will always be open source software, including our
							API, guaranteeing full transparency and community ownership of the
							entire ecosystem. Plus, with our extensible provider system, you
							get the flexibility to customize your gaming experience exactly
							how you want it, all while supporting a passionate team that
							genuinely cares about creating something special for the gaming
							community.
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="item-3">
						<AccordionTrigger>
							Is the Falkor game launcher available for download?
						</AccordionTrigger>
						<AccordionContent>
							Yes! The Falkor app is now available for download. You can{" "}
							<a
								href={"/download"}
								className="underline transition-all hover:opacity-70"
							>
								download it here
							</a>{" "}
							to get started.
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="item-4">
						<AccordionTrigger>
							How can I contribute to the Falkor open-source project?
						</AccordionTrigger>
						<AccordionContent>
							Absolutely! We warmly welcome contributions from our community.
							You can find the{" "}
							<a
								href={constants.github_app_url}
								target="_blank"
								rel="noopener noreferrer"
								className="underline transition-all hover:opacity-70"
							>
								Falkor GitHub repository
							</a>{" "}
							to get started by submitting issues, creating pull requests, or
							developing new providers.
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="item-5">
						<AccordionTrigger>
							Which platforms does Falkor support?
						</AccordionTrigger>
						<AccordionContent>
							Falkor is being developed with comprehensive cross-platform
							support in mind, including Windows and Linux. Stay tuned for
							updates as we work towards stable releases for these operating
							systems.
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="item-6">
						<AccordionTrigger>Is Falkor free to use?</AccordionTrigger>
						<AccordionContent>
							Yes! Falkor is completely free and open-source. Our entire project
							is open-source, and you can explore{" "}
							<a
								href="https://github.com/orgs/Team-Falkor/repositories"
								target="_blank"
								rel="noopener noreferrer"
								className="underline transition-all hover:opacity-70"
							>
								all our repositories directly on our Team Falkor GitHub
								organization page
							</a>
							. You can freely use, modify, and share it under the terms of the
							open-source license.
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="item-7">
						<AccordionTrigger>
							How do I stay updated on Falkor's development?
						</AccordionTrigger>
						<AccordionContent>
							You can follow the progress of the{" "}
							<a
								href={constants.github_app_url}
								target="_blank"
								rel="noopener noreferrer"
								className="underline transition-all hover:opacity-70"
							>
								Falkor app on GitHub
							</a>{" "}
							or join our vibrant{" "}
							<a
								href={constants.discord_invite_link}
								target="_blank"
								rel="noopener noreferrer"
								className="underline transition-all hover:opacity-70"
							>
								Discord community
							</a>{" "}
							for updates, feature discussions, and announcements.
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="item-8">
						<AccordionTrigger>
							Do I need to be a developer to use Falkor?
						</AccordionTrigger>
						<AccordionContent>
							Not at all! While Falkor supports advanced features like custom
							providers, its basic functionality is designed to be user-friendly
							for everyone. Developers, however, can take full advantage of its
							open-source nature to create their own plugins and extensions.
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		</div>
	);
};

export default FaQ;
