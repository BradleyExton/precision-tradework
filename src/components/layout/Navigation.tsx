"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { services } from "@/lib/services";
import { slideDown } from "@/lib/animations";

type NavLink =
  | { href: string; label: string; children?: never }
  | { href?: never; label: string; children: { href: string; label: string }[] };

const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  {
    label: "Services",
    children: services.map((service) => ({
      href: `/services/${service.slug}`,
      label: service.title,
    })),
  },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const pathname = usePathname();
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsServicesOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="hidden md:flex items-center gap-8">
      {navLinks.map((link) => {
        if (link.children) {
          return (
            <div key={link.label} className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className={cn(
                  "flex items-center gap-1 text-neutral-200 hover:text-primary-500 transition-colors",
                  pathname.startsWith("/services") && "text-primary-500"
                )}
              >
                {link.label}
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform duration-200",
                    isServicesOpen && "rotate-180"
                  )}
                />
              </button>

              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    className="absolute top-full left-0 mt-2 w-56 bg-dark-800 border border-dark-700 rounded-lg shadow-xl py-2 z-50"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={slideDown}
                  >
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setIsServicesOpen(false)}
                        className={cn(
                          "block px-4 py-2 text-neutral-200 hover:bg-dark-700 hover:text-primary-500 transition-colors",
                          pathname === child.href &&
                            "text-primary-500 bg-dark-700"
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        }

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "text-neutral-200 hover:text-primary-500 transition-colors",
              pathname === link.href && "text-primary-500"
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
