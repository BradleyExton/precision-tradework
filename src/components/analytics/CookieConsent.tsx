"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui";
import { slideUp } from "@/lib/animations";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Small delay to let page load first
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowBanner(false);
    window.dispatchEvent(new Event("cookie-consent-change"));
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShowBanner(false);
    window.dispatchEvent(new Event("cookie-consent-change"));
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={slideUp}
        >
          <div className="max-w-4xl mx-auto bg-dark-800 border border-dark-700 rounded-xl p-4 md:p-6 shadow-2xl">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex-1">
                <p className="text-neutral-200 text-sm md:text-base">
                  We use cookies to analyze site traffic and improve your
                  experience.{" "}
                  <Link
                    href="/privacy"
                    className="text-primary-500 hover:underline"
                  >
                    View our Privacy Policy
                  </Link>
                </p>
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDecline}
                  className="flex-1 md:flex-none"
                >
                  Decline
                </Button>
                <Button
                  size="sm"
                  onClick={handleAccept}
                  className="flex-1 md:flex-none"
                >
                  Accept
                </Button>
              </div>
              <button
                onClick={handleDecline}
                className="hidden md:block p-1 text-neutral-400 hover:text-neutral-200 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
