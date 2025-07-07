import { XIcon, ZoomInIcon } from "lucide-react";
import { ImgHTMLAttributes, useEffect, useRef, useState } from "react";
import { cn } from "@/utils";

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
	onOpen?: () => void;
	onClose?: () => void;
	onStateChange?: (isOpen: boolean) => void;
}

export const ImageModal = ({
	onStateChange,
	onOpen,
	onClose,
	className,
	...props
}: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	const dialogRef = useRef<HTMLDialogElement>(null);

	// Sync the isOpen state with the dialog element and trigger onStateChange.
	useEffect(() => {
		onStateChange?.(isOpen);

		if (!dialogRef.current) return;

		if (isOpen) {
			if (dialogRef.current.open) return;
			dialogRef.current.showModal();
			return;
		}

		if (!dialogRef.current.open) return;
		dialogRef.current.close();
	}, [isOpen, onStateChange]);

	// When the modal is opened, trigger onOpen.
	useEffect(() => {
		if (!isOpen) return;
		onOpen?.();
	}, [isOpen, onOpen]);

	// Stop scrolling when the modal is open.
	useEffect(() => {
		if (!isOpen) return;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "auto";
		};
	}, [isOpen]);

	const handleClose = () => {
		setIsOpen(false);
		onClose?.();
	};

	useEffect(() => {
		const dialogEl = dialogRef.current;
		if (!dialogEl) return;

		const handleDialogClose = () => {
			if (!isOpen) return;
			setIsOpen(false);
			onClose?.();
		};

		dialogEl.addEventListener("close", handleDialogClose);
		return () => {
			dialogEl.removeEventListener("close", handleDialogClose);
		};
	}, [isOpen, onClose]);

	return (
		<div>
			{/* Enhanced Trigger Image */}
			<div
				onClick={() => setIsOpen(true)}
				className="group cursor-pointer transition-all duration-300 hover:scale-[1.02] focus-within:outline-none focus-within:ring-2 focus-within:ring-primary/50 rounded-xl overflow-hidden"
				tabIndex={0}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.preventDefault();
						setIsOpen(true);
					}
				}}
				role="button"
				aria-label="Open image in full screen"
			>
				<img
					className={cn(
						"transition-all duration-300 group-hover:brightness-110",
						className,
					)}
					{...props}
				/>
				{/* Hover overlay with icon */}
				<div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
				{/* Zoom icon overlay */}
				<div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
					<div className="p-3 rounded-full bg-background/90 backdrop-blur-md border border-border/50 shadow-xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
						<ZoomInIcon className="w-6 h-6 text-foreground" />
					</div>
				</div>
			</div>

			{/* Enhanced Modal Dialog */}
			<dialog
				ref={dialogRef}
				onClick={(e) => e.target === e.currentTarget && handleClose()}
				className="w-full h-full max-w-[100svw] max-h-[100svh] p-4 bg-transparent backdrop:bg-background/90 backdrop:backdrop-blur-xl transition-all duration-500 ease-out animate-in fade-in-0"
			>
				<div className="relative size-full flex justify-center items-center animate-in zoom-in-95 duration-500">
					{/* Enhanced close button */}
					<button
						onClick={handleClose}
						className="absolute top-4 right-4 z-10 p-3 rounded-full bg-card/80 backdrop-blur-md border border-border/50 transition-all duration-200 hover:bg-card hover:border-border hover:scale-110 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-visible:ring-2 outline-none cursor-pointer shadow-xl hover:shadow-2xl group"
						aria-label="Close modal"
					>
						<XIcon className="w-5 h-5 text-foreground transition-transform duration-200 group-hover:rotate-90" />
					</button>

					{/* Enhanced modal image */}
					<img
						{...props}
						className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl ring-1 ring-border/20 transition-all duration-300 hover:ring-primary/30"
					/>
				</div>
			</dialog>
		</div>
	);
};
