import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useFileDownloader } from "../hooks/use-file-download";

interface ReleaseNotesDialogProps {
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
	releaseNotes: string;
	downloadHref: string;
	showType: "redownload" | "download";
}

// Define custom renderers for markdown elements using Tailwind classes
const markdownComponents: Components = {
	h1: ({ node, ...props }) => (
		<h1 className="mt-4 mb-2 text-3xl font-bold" {...props} />
	),
	h2: ({ node, ...props }) => (
		<h2 className="mt-6 mb-3 pb-2 text-2xl font-semibold border-b" {...props} />
	),
	h3: ({ node, ...props }) => (
		<h3 className="mt-4 mb-2 text-xl font-semibold" {...props} />
	),
	p: ({ node, ...props }) => (
		<p className="leading-7 [&:not(:first-child)]:mt-4" {...props} />
	),
	ul: ({ node, ...props }) => (
		<ul className="my-4 ml-6 list-disc [&>li]:mt-2" {...props} />
	),
	ol: ({ node, ...props }) => (
		<ol className="my-4 ml-6 list-decimal [&>li]:mt-2" {...props} />
	),
	a: ({ node, ...props }) => (
		<a className="font-medium text-primary underline" {...props} />
	),
	blockquote: ({ node, ...props }) => (
		<blockquote className="mt-6 border-l-2 pl-6 italic" {...props} />
	),
	code: ({ node, ...props }) => (
		<code
			className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
			{...props}
		/>
	),
};

export function ReleaseNotesDialog({
	isOpen,
	onOpenChange,
	releaseNotes,
	downloadHref,
	showType,
}: ReleaseNotesDialogProps) {
	const { downloadFile } = useFileDownloader();

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-2xl max-h-[80vh] flex flex-col">
				<DialogHeader>
					<DialogTitle>Release Notes</DialogTitle>
					<DialogDescription>
						Here's what's new in this version. Your download will begin shortly.
					</DialogDescription>
				</DialogHeader>
				<div className="flex-1 overflow-y-auto p-1 pr-4">
					<ReactMarkdown
						remarkPlugins={[remarkGfm]}
						// Apply our custom components to style the output
						components={markdownComponents}
					>
						{releaseNotes}
					</ReactMarkdown>
				</div>
				<DialogFooter>
					<Button size="lg" onClick={() => downloadFile(downloadHref)}>
						{showType === "redownload" ? "Re-download" : "Download"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
