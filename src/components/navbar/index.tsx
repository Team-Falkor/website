import { Link, useLocation } from "@tanstack/react-router";
import { ExternalLink, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { FaDiscord as Discord, FaGithub as Github } from "react-icons/fa";
import { SiKofi } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/utils";
import { constants } from "@/utils/constants";
import { type NavLink, NavLinkItem } from "./nav-link-item";

export const Navbar = () => {
	const location = useLocation();
	const [isScrolled, setIsScrolled] = useState(false);
	const isMobile = useIsMobile();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [shouldShowNavbar, setShouldShowNavbar] = useState(true);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(isMobile || window.scrollY > 0);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [isMobile]);

	useEffect(() => {
		const shouldHideNavbar = constants.hiddenNavbarRoutes.some((route) =>
			location.pathname.startsWith(route),
		);
		setShouldShowNavbar(!shouldHideNavbar);
		// Close mobile menu when navigating to a new page
		setIsMobileMenuOpen(false);
	}, [location.pathname]);

	const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

	const navLinks: NavLink[] = [
		{ name: "Home", path: "/", isExternal: false },
		{ name: "Download", path: "/download", isExternal: false },
		{ name: "Docs", path: "https://docs.falkor.moe", isExternal: true },
		{ name: "Plugins", path: "/plugins/providers", isExternal: false },
	];

	if (!shouldShowNavbar) return null;

	return (
		<nav
			className={cn(
				"fixed top-0 left-0 right-0 z-50 transition-all duration-300",
				isScrolled
					? "bg-background/80 backdrop-blur-md border-b border-border/40 py-3"
					: "bg-transparent py-5",
			)}
		>
			<div className="container mx-auto px-4 flex items-center justify-between">
				<Link
					to="/"
					className="flex items-center gap-2 font-bold text-xl text-foreground"
					onClick={() => setIsMobileMenuOpen(false)}
				>
					<img src="/icon.png" alt="Falkor" className="size-14" />
					<span className="hidden sm:inline">Falkor</span>
				</Link>

				<div className="hidden md:flex items-center gap-6">
					{navLinks.map((link) => (
						<NavLinkItem key={link.name} {...link} />
					))}
				</div>

				<div className="hidden md:flex items-center gap-2">
					<Button variant="ghost" size="icon" asChild>
						<a
							href={constants.ko_fi_url}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Ko-Fi"
						>
							<SiKofi />
						</a>
					</Button>

					<Button variant="ghost" size="icon" asChild>
						<a
							href={constants.github_app_url}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="GitHub"
						>
							<Github />
						</a>
					</Button>

					<Button variant="ghost" size="icon" asChild>
						<a
							href={constants.discord_invite_link}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Discord"
						>
							<Discord />
						</a>
					</Button>

					<Button asChild>
						<Link to="/download">
							Download
							<ExternalLink className="ml-1 h-4 w-4" />
						</Link>
					</Button>
				</div>

				<div className="flex md:hidden items-center gap-2">
					<Button
						variant="ghost"
						size="icon"
						onClick={toggleMobileMenu}
						aria-label="Toggle menu"
					>
						{isMobileMenuOpen ? <X /> : <Menu />}
					</Button>
				</div>
			</div>

			<div
				className={cn(
					"md:hidden fixed inset-x-0 bg-background/95 backdrop-blur-sm border-b border-border/40 transition-all duration-300 overflow-hidden",
					isMobileMenuOpen ? "max-h-[500px] py-4" : "max-h-0",
				)}
			>
				<div className="container mx-auto px-4 flex flex-col gap-4">
					{navLinks.map((link) => (
						<NavLinkItem
							key={link.name}
							{...link}
							onClick={() => setIsMobileMenuOpen(false)}
						/>
					))}

					{/* <div className="flex flex-col gap-2 pt-2 border-t border-border/40">
						<Link
							to="/login"
							className="text-foreground/80 hover:text-primary py-2 transition-colors duration-200"
							onClick={() => setIsMobileMenuOpen(false)}
						>
							Login
						</Link>
						<Link
							to="/sign-up"
							className="text-foreground/80 hover:text-primary py-2 transition-colors duration-200"
							onClick={() => setIsMobileMenuOpen(false)}
						>
							Sign Up
						</Link>
					</div> */}

					<div className="flex gap-4 pt-2 border-t border-border/40">
						<a
							href={constants.github_app_url}
							target="_blank"
							rel="noopener noreferrer"
							className="text-foreground/80 hover:text-primary py-2 transition-colors duration-200 flex items-center gap-2"
							aria-label="GitHub"
							onClick={() => setIsMobileMenuOpen(false)}
						>
							<Github className="h-5 w-5" />
							<span>GitHub</span>
						</a>
						<a
							href={constants.discord_invite_link}
							target="_blank"
							rel="noopener noreferrer"
							className="text-foreground/80 hover:text-primary py-2 transition-colors duration-200 flex items-center gap-2"
							aria-label="Discord"
							onClick={() => setIsMobileMenuOpen(false)}
						>
							<Discord className="h-5 w-5" />
							<span>Discord</span>
						</a>
					</div>

					<Button asChild className="mt-2">
						<Link to="/download" onClick={() => setIsMobileMenuOpen(false)}>
							Download
							<ExternalLink className="ml-1 h-4 w-4" />
						</Link>
					</Button>
				</div>
			</div>
		</nav>
	);
};
