import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

const FaQ = () => {
	return (
		<div className="mt-24 sm:mt-40" id="frequently-asked-questions">
			<div className="px-6 mx-auto max-w-7xl lg:px-8">
				<h1 className="text-2xl font-bold tracking-tight text-white sm:text-4xl mb-1.5">
					Frequently Asked Questions
				</h1>
				<Accordion type="multiple" className="w-full">
					<AccordionItem value="item-1">
						<AccordionTrigger>What is Falkor?</AccordionTrigger>
						<AccordionContent>
							Falkor is an open-source launcher that allows you to browse games,
							explore upcoming releases, and find the best deals with built-in
							IsThereAnyDeal integration to compare prices (please note,
							purchases are made through your default browser, not within the
							app). Designed to be flexible and expandable, Falkor’s core
							functionality is enhanced by community-created providers, giving
							users the power to customize and extend the app in countless ways.
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="item-2">
						<AccordionTrigger>
							Is the app available for download?
						</AccordionTrigger>
						<AccordionContent>
							The app is currntly in testing phase and can be downloaded{" "}
							<a
								href={"/download"}
								className="underline transition-all hover:opacity-70"
							>
								here
							</a>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="item-3">
						<AccordionTrigger>
							Can I contribute to the project?
						</AccordionTrigger>
						<AccordionContent>
							Absolutely! We welcome contributions from the community. You can
							check out the GitHub repository{" "}
							<a
								href={"/github/app"}
								className="underline transition-all hover:opacity-70"
							>
								here
							</a>{" "}
							and get started by submitting issues, creating pull requests, or
							developing new providers.
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="item-4">
						<AccordionTrigger>
							What platforms will Falkor support?
						</AccordionTrigger>
						<AccordionContent>
							Falkor is being developed with cross-platform support in mind,
							including Windows and Linux. Stay tuned for updates as we work on
							releases for these platforms.
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="item-5">
						<AccordionTrigger>Is Falkor free to use?</AccordionTrigger>
						<AccordionContent>
							Yes! Falkor is completely free and open-source. You can use,
							modify, and share it under the terms of the open-source license.
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="item-6">
						<AccordionTrigger>
							How do I stay updated on Falkor's development??
						</AccordionTrigger>
						<AccordionContent>
							You can follow our progress on GitHub or keep up with the{" "}
							<a
								href="/discord"
								className="underline transition-all hover:opacity-70"
							>
								Discord
							</a>{" "}
							community for updates, feature discussions, and announcements.
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="item-7">
						<AccordionTrigger>
							Do I need to be a developer to use Falkor?
						</AccordionTrigger>
						<AccordionContent>
							Not at all! While Falkor supports advanced features like custom
							providers, its basic functionality is designed to be user-friendly
							for non-developers. Developers, however, can take full advantage
							of the open-source nature and create their own plugins.
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		</div>
	);
};

export default FaQ;
