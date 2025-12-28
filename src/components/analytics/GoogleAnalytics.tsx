"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function GoogleAnalytics() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (consent === "accepted") {
      setHasConsent(true);
    }

    const handleConsentChange = () => {
      const updatedConsent = localStorage.getItem("cookie-consent");
      setHasConsent(updatedConsent === "accepted");
    };

    window.addEventListener("storage", handleConsentChange);
    window.addEventListener("cookie-consent-change", handleConsentChange);

    return () => {
      window.removeEventListener("storage", handleConsentChange);
      window.removeEventListener("cookie-consent-change", handleConsentChange);
    };
  }, []);

  if (!GA_MEASUREMENT_ID || !hasConsent) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}

export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}
