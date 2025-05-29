import { type JSX, useEffect, useRef, useState } from "react";
import { constants } from "@/utils";

const debounce = (fn: () => void, delay: number) => {
	let timeoutId: ReturnType<typeof setTimeout> | undefined;
	return () => {
		if (timeoutId) clearTimeout(timeoutId);
		timeoutId = setTimeout(fn, delay);
	};
};

const parseFormattedMessage = (message: string) => {
	const parts: (string | JSX.Element)[] = [];
	let lastIndex = 0;
	const regex = /(\*\*(.*?)\*\*|\*(.*?)\*)/g;
	let match: RegExpExecArray | null = regex.exec(message);

	while (match !== null) {
		if (match.index > lastIndex) {
			parts.push(message.slice(lastIndex, match.index));
		}
		if (match[2]) {
			parts.push(<b key={match.index}>{match[2]}</b>);
		} else if (match[3]) {
			parts.push(<i key={match.index}>{match[3]}</i>);
		}
		lastIndex = regex.lastIndex;
		match = regex.exec(message);
	}
	if (lastIndex < message.length) {
		parts.push(message.slice(lastIndex));
	}
	return parts;
};

const MessageBanner = () => {
	const [showBanner, setShowBanner] = useState(false);
	const [isOverflowing, setIsOverflowing] = useState(false);
	const bannerRef = useRef<HTMLDivElement>(null);
	const { banner_message } = constants;

	useEffect(() => {
		setShowBanner(Boolean(banner_message));
	}, [banner_message]);

	useEffect(() => {
		const checkOverflow = () => {
			const el = bannerRef.current;
			setIsOverflowing(Boolean(el && el.scrollWidth > el.clientWidth));
		};
		const debounced = debounce(checkOverflow, 150);
		checkOverflow();
		window.addEventListener("resize", debounced);
		return () => window.removeEventListener("resize", debounced);
	}, []);

	if (!showBanner) return null;

	return (
		<div className="relative w-full bg-purple-800/25 flex justify-center items-center p-1 py-2 sm:py-3 text-sm sm:text-base overflow-hidden z-50">
			<div
				ref={bannerRef}
				className={`whitespace-nowrap transition-all duration-300 ${
					isOverflowing ? "animate-marquee" : ""
				}`}
				style={{ maxWidth: "100%" }}
			>
				{parseFormattedMessage(banner_message)}
			</div>
		</div>
	);
};

export default MessageBanner;
