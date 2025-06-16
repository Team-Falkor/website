import { twMerge } from "tailwind-merge";

/**
 * Defines the props for the SvgBG component.
 */
interface SvgBGProps {
	/**
	 * Optional additional classes to apply to the SVG element for customization.
	 */
	className?: string;
}

/**
 * A full-screen, fixed SVG grid background that always stays behind other content.
 * This component is written in TypeScript.
 *
 * @param {SvgBGProps} props - The component props.
 * @returns {JSX.Element}
 */
const SvgBG = ({ className }: SvgBGProps) => {
	return (
		<svg
			className={twMerge(
				// Base styles: fixed position, full-screen, and behind everything.
				"fixed inset-0 z-0 h-full w-full stroke-white/10",
				// Masking to create a fading effect at the top right.
				"[mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]",
				className,
			)}
			aria-hidden="true"
		>
			<defs>
				<pattern
					id="grid-pattern"
					width="200"
					height="200"
					x="50%"
					y={-1}
					patternUnits="userSpaceOnUse"
				>
					<path d="M.5 200V.5H200" fill="none" />
				</pattern>
			</defs>
			{/* This SVG is for the subtle glowing effect */}
			<svg x="50%" y={-1} className="overflow-visible fill-gray-800/20">
				<path
					d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
					strokeWidth="0"
				/>
			</svg>
			{/* This rectangle fills the entire SVG with the defined pattern */}
			<rect
				width="100%"
				height="100%"
				strokeWidth="0"
				fill="url(#grid-pattern)"
			/>
		</svg>
	);
};

export default SvgBG;
