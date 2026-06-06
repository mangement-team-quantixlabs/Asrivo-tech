"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mainNavLinks, siteConfig, type NavLink } from "@/lib/constants";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "glass border-b border-white/10 shadow-md"
          : "border-b border-white/10"
      )}
      style={{
        backgroundColor: isScrolled
          ? undefined         // glass handles it
          : "#0A1931",       // deep royal navy always
      }}
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="relative z-10 flex items-center gap-2"
          aria-label={`${siteConfig.name} - Home`}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-electric">
            <span className="text-lg font-bold text-white font-[var(--font-sora)]">A</span>
          </div>
          <span
            className="text-xl font-bold tracking-tight transition-colors font-[var(--font-sora)] text-white"
          >
            {siteConfig.name}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {mainNavLinks.map((link) => (
            <NavItem
              key={link.href}
              link={link}
              isScrolled={isScrolled}
              activeDropdown={activeDropdown}
              setActiveDropdown={setActiveDropdown}
              pathname={pathname}
            />
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/contact"
            className="inline-flex h-10 items-center gap-2 rounded-full bg-theme-orange px-5 text-sm font-semibold text-white transition-all hover:bg-theme-orange/90 hover:shadow-lg hover:shadow-theme-orange/25 active:scale-[0.98]"
          >
            Talk to an Expert
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="relative z-10 flex h-10 w-10 items-center justify-center rounded-lg transition-colors lg:hidden text-white hover:bg-white/10"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileOpen}
        >
          {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-b border-border bg-white lg:hidden"
          >
            <div className="mx-auto max-w-7xl space-y-1 px-4 pb-6 pt-2 sm:px-6">
              {mainNavLinks.map((link) => (
                <MobileNavItem
                  key={link.href}
                  link={link}
                  activeDropdown={activeDropdown}
                  setActiveDropdown={setActiveDropdown}
                />
              ))}
              <div className="pt-4">
                <Link
                  href="/contact"
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-theme-orange text-sm font-semibold text-white transition-all hover:bg-theme-orange/90"
                >
                  Talk to an Expert
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ---- Desktop Nav Item ----
function NavItem({
  link,
  isScrolled,
  activeDropdown,
  setActiveDropdown,
  pathname,
}: {
  link: NavLink;
  isScrolled: boolean;
  activeDropdown: string | null;
  setActiveDropdown: (v: string | null) => void;
  pathname: string;
}) {
  const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
  const hasChildren = link.children && link.children.length > 0;
  const isOpen = activeDropdown === link.label;

  if (!hasChildren) {
    return (
      <Link
        href={link.href}
        className={cn(
          "relative px-3.5 py-2 text-sm font-medium transition-colors rounded-lg",
          isScrolled
            ? isActive
              ? "text-theme-teal"
              : "text-slate-700 hover:text-brand-cobalt hover:bg-brand-gray-100"
            : isActive
              ? "text-theme-teal"
              : "text-white/85 hover:text-white hover:bg-white/10"
        )}
      >
        {link.label}
        {isActive && (
          <motion.div
            layoutId="nav-active"
            className="absolute -bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-theme-teal"
          />
        )}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setActiveDropdown(link.label)}
      onMouseLeave={() => setActiveDropdown(null)}
    >
      <button
        className={cn(
          "flex items-center gap-1 px-3.5 py-2 text-sm font-medium transition-colors rounded-lg",
          isScrolled
            ? isActive
              ? "text-theme-teal"
              : "text-slate-700 hover:text-brand-cobalt hover:bg-brand-gray-100"
            : isActive
              ? "text-theme-teal"
              : "text-white/85 hover:text-white hover:bg-white/10"
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {link.label}
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2"
          >
            <div className="w-[540px] overflow-hidden rounded-xl border border-border bg-white p-4 shadow-xl shadow-black/5">
              <div className="grid grid-cols-2 gap-1">
                {link.children!.map((child) => {
                  const Icon = child.icon;
                  return (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="group flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-brand-gray-100"
                    >
                      {Icon && (
                        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-cobalt/5 text-brand-cobalt transition-colors group-hover:bg-brand-cobalt group-hover:text-white">
                          <Icon className="h-4.5 w-4.5" />
                        </div>
                      )}
                      <div>
                        <div className="text-sm font-semibold text-brand-cobalt group-hover:text-brand-electric">
                          {child.label}
                        </div>
                        {child.description && (
                          <div className="mt-0.5 text-xs text-brand-gray-400 leading-relaxed">
                            {child.description}
                          </div>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
              <div className="mt-3 border-t border-border pt-3">
                <Link
                  href={link.href}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-brand-electric hover:bg-brand-electric/5"
                >
                  View all {link.label.toLowerCase()}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---- Mobile Nav Item ----
function MobileNavItem({
  link,
  activeDropdown,
  setActiveDropdown,
}: {
  link: NavLink;
  activeDropdown: string | null;
  setActiveDropdown: (v: string | null) => void;
}) {
  const hasChildren = link.children && link.children.length > 0;
  const isOpen = activeDropdown === link.label;

  if (!hasChildren) {
    return (
      <Link
        href={link.href}
        className="flex h-11 items-center rounded-lg px-3 text-base font-medium text-brand-gray-700 hover:bg-brand-gray-100 hover:text-brand-cobalt"
      >
        {link.label}
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => setActiveDropdown(isOpen ? null : link.label)}
        className="flex h-11 w-full items-center justify-between rounded-lg px-3 text-base font-medium text-brand-gray-700 hover:bg-brand-gray-100"
        aria-expanded={isOpen}
      >
        {link.label}
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden"
          >
            <div className="space-y-0.5 pb-2 pl-4">
              {link.children!.map((child) => {
                const Icon = child.icon;
                return (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-brand-gray-700 hover:bg-brand-gray-100 hover:text-brand-cobalt"
                  >
                    {Icon && <Icon className="h-4 w-4 text-brand-gray-400" />}
                    {child.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
