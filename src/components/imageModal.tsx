import { XIcon } from "lucide-react";
import { ImgHTMLAttributes, useEffect, useRef, useState } from "react";

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
			{/* Trigger Image */}
			<div onClick={() => setIsOpen(true)} style={{ cursor: "pointer" }}>
				<img className={className} {...props} />
			</div>

			{/* Modal Dialog */}
			<dialog
				ref={dialogRef}
				onClick={(e) => e.target === e.currentTarget && handleClose()}
				className="w-full h-full max-w-[100svw] max-h-[100svh] p-4 bg-transparent backdrop:bg-background/80 backdrop:backdrop-blur-md transition-all duration-300 ease-in-out"
			>
				<div className="relative size-full flex justify-center items-center">
					<button
						onClick={handleClose}
						className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/20 backdrop-blur-sm transition-all duration-200 hover:bg-background/30 focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-visible:ring-2 outline-none [&_svg]:size-5 [&_svg]:shrink-0 cursor-pointer shadow-lg"
					>
						<XIcon className="text-white" />
					</button>
					<img
						{...props}
						className="max-w-full max-h-full object-contain rounded-xl shadow-2xl ring-1 ring-white/10"
					/>
				</div>
			</dialog>
		</div>
	);
};
