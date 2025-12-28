"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui";
import { Logo } from "./Logo";
import { Navigation } from "./Navigation";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-dark-900/95 backdrop-blur-sm border-b border-dark-800 py-3"
          : "bg-transparent py-4"
      )}
    >
      <Container>
        <div className="flex items-center justify-between">
          <Logo size="md" />

          <Navigation />

          <div className="flex items-center gap-4">
            {/* Phone - desktop only */}
            <a
              href="tel:+17058962761"
              className="hidden lg:flex items-center gap-2 text-neutral-200 hover:text-primary-500 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>705-896-2761</span>
            </a>

            {/* CTA Button - desktop only */}
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center justify-center px-5 py-2.5 bg-primary-500 text-dark-950 font-semibold rounded-lg hover:bg-primary-400 transition-colors"
            >
              Get a Quote
            </Link>

            <MobileMenu />
          </div>
        </div>
      </Container>
    </header>
  );
}
