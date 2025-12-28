"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { services } from "@/lib/services";
import { slideInRight, backdrop } from "@/lib/animations";

export function MobileMenu() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);

  // Handle client-side mounting for portal
  useEffect(() => {
    setMounted(true);
  }, []);

  const closeMenu = () => {
    setIsOpen(false);
    setIsServicesOpen(false);
  };

  // Handle Escape key to close menu
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Prevent body scroll when menu is open
    document.body.style.overflow = "hidden";

    // Focus the close button when menu opens
    firstFocusableRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2.5 text-neutral-200 hover:text-primary-500 transition-colors"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Portal menu to body to avoid backdrop-blur containing block issues */}
      {mounted && createPortal(
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 bg-dark-950/80 z-[60]"
                onClick={closeMenu}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={backdrop}
              />

              {/* Menu panel */}
              <motion.div
                ref={menuRef}
                role="dialog"
                aria-modal="true"
                aria-label="Navigation menu"
                className="fixed top-0 right-0 h-full w-[280px] bg-dark-900 border-l border-dark-700 z-[70] overflow-y-auto"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={slideInRight}
              >
                <div className="flex justify-end p-4">
                  <button
                    ref={firstFocusableRef}
                    onClick={closeMenu}
                    className="p-2.5 text-neutral-200 hover:text-primary-500 transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <nav className="px-4 py-2">
                  <Link
                    href="/"
                    onClick={closeMenu}
                    className={cn(
                      "block py-3 text-lg text-neutral-200 hover:text-primary-500 transition-colors border-b border-dark-800",
                      pathname === "/" && "text-primary-500"
                    )}
                  >
                    Home
                  </Link>

                  {/* Services dropdown */}
                  <div className="border-b border-dark-800">
                    <button
                      onClick={() => setIsServicesOpen(!isServicesOpen)}
                      aria-expanded={isServicesOpen}
                      className={cn(
                        "flex items-center justify-between w-full py-3 text-lg text-neutral-200 hover:text-primary-500 transition-colors",
                        pathname.startsWith("/services") && "text-primary-500"
                      )}
                    >
                      Services
                      <ChevronDown
                        className={cn(
                          "w-5 h-5 transition-transform duration-200",
                          isServicesOpen && "rotate-180"
                        )}
                      />
                    </button>

                    <AnimatePresence>
                      {isServicesOpen && (
                        <motion.div
                          className="pb-2 pl-4 overflow-hidden"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {services.map((service) => (
                            <Link
                              key={service.slug}
                              href={`/services/${service.slug}`}
                              onClick={closeMenu}
                              className={cn(
                                "block py-3 text-neutral-300 hover:text-primary-500 transition-colors",
                                pathname === `/services/${service.slug}` &&
                                  "text-primary-500"
                              )}
                            >
                              {service.title}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <Link
                    href="/about"
                    onClick={closeMenu}
                    className={cn(
                      "block py-3 text-lg text-neutral-200 hover:text-primary-500 transition-colors border-b border-dark-800",
                      pathname === "/about" && "text-primary-500"
                    )}
                  >
                    About
                  </Link>

                  <Link
                    href="/contact"
                    onClick={closeMenu}
                    className={cn(
                      "block py-3 text-lg text-neutral-200 hover:text-primary-500 transition-colors border-b border-dark-800",
                      pathname === "/contact" && "text-primary-500"
                    )}
                  >
                    Contact
                  </Link>

                  {/* CTA */}
                  <div className="mt-6">
                    <Link
                      href="/contact"
                      onClick={closeMenu}
                      className="block w-full py-3 px-4 bg-primary-500 text-dark-950 text-center font-semibold rounded-lg hover:bg-primary-400 transition-colors"
                    >
                      Get a Quote
                    </Link>
                    <a
                      href="tel:+17058962761"
                      className="block mt-3 py-3 text-center text-primary-500 font-medium"
                    >
                      705-896-2761
                    </a>
                  </div>
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
