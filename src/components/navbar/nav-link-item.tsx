import { Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import React from "react";
import { cn } from "@/utils";

export type NavLink = {
	name: string;
	path: string;
	isExternal: boolean;
};

type NavLinkItemProps = NavLink & {
	onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

export const NavLinkItem = ({
	name,
	path,
	isExternal,
	onClick,
}: NavLinkItemProps) => {
	const baseClassName =
		"text-foreground/80 hover:text-primary transition-colors duration-200";
	const desktopClassName = "[.active]:text-primary [.active]:font-semibold";

	if (isExternal) {
		return (
			<a
				href={path}
				target="_blank"
				rel="noopener noreferrer"
				className={cn(baseClassName, desktopClassName, "flex items-center")}
				onClick={onClick}
			>
				{name}
				<ExternalLink className="ml-1 inline-block h-3 w-3" />
			</a>
		);
	}

	return (
		<Link
			to={path}
			className={cn(baseClassName, desktopClassName)}
			onClick={onClick}
		>
			{name}
		</Link>
	);
};
