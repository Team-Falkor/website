import { Link } from "@tanstack/react-router";
import { ExternalLink, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { FaDiscord as Discord, FaGithub as Github } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/utils";
import { constants } from "@/utils/constants";
import { SiKofi } from "react-icons/si";

export const Navbar = () => {
  const pathname = window.location.pathname;
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [shouldShowNavbar, setShouldShowNavbar] = useState(true);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(isMobile ? true : window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  useEffect(() => {
    const pathnameSplit = pathname.split("/");
    if (pathnameSplit.includes("admin")) setShouldShowNavbar(false);
    else setShouldShowNavbar(true);
  }, [pathname]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navLinks = [
    { name: "Home", path: "/", openInNewTab: false },
    { name: "Download", path: "/download", openInNewTab: false },
    { name: "Plugins", path: "/plugins/providers", openInNewTab: false },
    { name: "Discord", path: "/discord", openInNewTab: true },
  ];

  if (!shouldShowNavbar) return null;

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/40 py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo and Brand */}
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-xl text-foreground"
        >
          <img src="/icon.png" alt="Falkor" className="size-14" />
          <span className="hidden sm:inline">Falkor</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-foreground/80 hover:text-primary transition-colors duration-200 [.active]:text-primary [.active]:font-semibold"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-2">
          {/* Social Links */}
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

          {/* Login/Sign Up */}
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Account
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/login">Login</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/sign-up">Sign Up</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}

          <Button asChild>
            <Link to="/download">
              Download
              <ExternalLink className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
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

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden fixed inset-x-0 bg-background/95 backdrop-blur-sm border-b border-border/40 transition-all duration-300 overflow-hidden",
          isMobileMenuOpen ? "max-h-[500px] py-4" : "max-h-0"
        )}
      >
        <div className="container mx-auto px-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-foreground/80 hover:text-primary py-2 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          <div className="flex flex-col gap-2 pt-2 border-t border-border/40">
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
          </div>

          <div className="flex gap-4 pt-2 border-t border-border/40">
            <a
              href={constants.github_app_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/80 hover:text-primary py-2 transition-colors duration-200 flex items-center gap-2"
              aria-label="GitHub"
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
