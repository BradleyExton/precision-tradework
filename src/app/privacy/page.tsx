import { Metadata } from "next";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for Precision Tradework. Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-dark-950">
        <Container size="narrow">
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-100 mb-6">
            Privacy Policy
          </h1>
          <p className="text-neutral-400">Last updated: December 2024</p>
        </Container>
      </section>

      <section className="py-16 bg-dark-900">
        <Container size="narrow">
          <div className="prose prose-invert max-w-none">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-neutral-100 mb-4">
                  Introduction
                </h2>
                <p className="text-neutral-300 mb-4">
                  Precision Tradework (&quot;we,&quot; &quot;our,&quot; or
                  &quot;us&quot;) is committed to protecting your privacy. This
                  Privacy Policy explains how we collect, use, disclose, and
                  safeguard your information when you visit our website
                  precisiontradework.ca or use our services.
                </p>
                <p className="text-neutral-300">
                  We comply with the Personal Information Protection and
                  Electronic Documents Act (PIPEDA) and applicable Canadian
                  privacy laws.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-neutral-100 mb-4">
                  Information We Collect
                </h2>
                <h3 className="text-lg font-semibold text-neutral-100 mb-2">
                  Information You Provide
                </h3>
                <p className="text-neutral-300 mb-4">
                  When you submit a consultation request through our website, we
                  collect:
                </p>
                <ul className="list-disc list-inside text-neutral-300 mb-4 space-y-1">
                  <li>Name and contact information (email, phone number)</li>
                  <li>Project details (type, budget, timeline, description)</li>
                  <li>Property address (if provided)</li>
                  <li>How you heard about us</li>
                </ul>

                <h3 className="text-lg font-semibold text-neutral-100 mb-2">
                  Information Collected Automatically
                </h3>
                <p className="text-neutral-300 mb-4">
                  When you visit our website, we may automatically collect
                  certain information through cookies and similar technologies:
                </p>
                <ul className="list-disc list-inside text-neutral-300 space-y-1">
                  <li>
                    Device information (browser type, operating system, device
                    type)
                  </li>
                  <li>IP address and approximate location</li>
                  <li>Pages visited and time spent on site</li>
                  <li>Referring website</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-neutral-100 mb-4">
                  How We Use Your Information
                </h2>
                <p className="text-neutral-300 mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside text-neutral-300 space-y-1">
                  <li>Respond to your consultation requests</li>
                  <li>Provide quotes and estimates for projects</li>
                  <li>Communicate with you about your project</li>
                  <li>Improve our website and services</li>
                  <li>Analyze website usage and performance</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-neutral-100 mb-4">
                  Cookies and Analytics
                </h2>
                <p className="text-neutral-300 mb-4">
                  We use Google Analytics 4 to analyze website traffic and
                  improve our services. This service uses cookies to collect
                  anonymous information about how visitors use our site.
                </p>
                <p className="text-neutral-300 mb-4">
                  You can control cookie preferences through your browser
                  settings. When you first visit our site, you will be asked to
                  accept or decline cookies.
                </p>
                <p className="text-neutral-300">
                  For more information about Google Analytics, visit{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    className="text-primary-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google&apos;s Privacy Policy
                  </a>
                  .
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-neutral-100 mb-4">
                  Information Sharing
                </h2>
                <p className="text-neutral-300 mb-4">
                  We do not sell, trade, or rent your personal information to
                  third parties. We may share your information only in the
                  following circumstances:
                </p>
                <ul className="list-disc list-inside text-neutral-300 space-y-1">
                  <li>
                    With service providers who help us operate our business
                    (e.g., email services)
                  </li>
                  <li>When required by law or to protect our legal rights</li>
                  <li>With your consent</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-neutral-100 mb-4">
                  Data Security
                </h2>
                <p className="text-neutral-300">
                  We implement appropriate technical and organizational measures
                  to protect your personal information against unauthorized
                  access, alteration, disclosure, or destruction. However, no
                  method of transmission over the Internet is 100% secure.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-neutral-100 mb-4">
                  Data Retention
                </h2>
                <p className="text-neutral-300">
                  We retain your personal information only for as long as
                  necessary to fulfill the purposes for which it was collected,
                  including to satisfy legal, accounting, or reporting
                  requirements. Contact information from consultation requests
                  is retained for the duration of our business relationship and
                  as required by applicable laws.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-neutral-100 mb-4">
                  Your Rights
                </h2>
                <p className="text-neutral-300 mb-4">
                  Under Canadian privacy law, you have the right to:
                </p>
                <ul className="list-disc list-inside text-neutral-300 space-y-1">
                  <li>
                    Access the personal information we hold about you
                  </li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Withdraw consent for data processing</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-neutral-100 mb-4">
                  Contact Us
                </h2>
                <p className="text-neutral-300 mb-4">
                  If you have questions about this Privacy Policy or wish to
                  exercise your privacy rights, please contact us:
                </p>
                <div className="bg-dark-800 border border-dark-700 rounded-lg p-6">
                  <p className="text-neutral-100 font-medium">
                    Precision Tradework
                  </p>
                  <p className="text-neutral-300">63 Ferris Lane, Unit E4</p>
                  <p className="text-neutral-300">Barrie, ON L4M 5C4</p>
                  <p className="text-neutral-300 mt-2">
                    Email:{" "}
                    <a
                      href="mailto:james@precisiontradework.ca"
                      className="text-primary-500 hover:underline"
                    >
                      james@precisiontradework.ca
                    </a>
                  </p>
                  <p className="text-neutral-300">
                    Phone:{" "}
                    <a
                      href="tel:+17058962761"
                      className="text-primary-500 hover:underline"
                    >
                      705-896-2761
                    </a>
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-neutral-100 mb-4">
                  Changes to This Policy
                </h2>
                <p className="text-neutral-300">
                  We may update this Privacy Policy from time to time. Any
                  changes will be posted on this page with an updated revision
                  date. We encourage you to review this policy periodically.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
