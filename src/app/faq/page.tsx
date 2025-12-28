import { Metadata } from "next";
import Link from "next/link";
import { Container, Accordion } from "@/components/ui";
import { faqs } from "@/lib/faqs";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Find answers to common questions about our renovation and finishing services in Barrie, Simcoe County and Muskoka. Learn about our process, pricing, and service areas.",
};

export default function FAQPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-dark-950">
        <Container size="narrow">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-100 mb-4 sm:mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-lg sm:text-xl text-neutral-300">
              Find answers to common questions about our services
            </p>
          </div>
        </Container>
      </section>

      {/* FAQ Content */}
      <section className="py-12 md:py-16 bg-dark-900">
        <Container size="narrow">
          <Accordion items={faqs} />

          {/* Still have questions? */}
          <div className="mt-12 text-center">
            <p className="text-neutral-400 mb-4">
              Still have questions? We&apos;re here to help.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-400 font-medium transition-colors"
            >
              Contact us
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
