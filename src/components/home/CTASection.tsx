import Link from "next/link";
import { Phone } from "lucide-react";
import { Container, Button } from "@/components/ui";

export function CTASection() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-dark-950 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-transparent to-primary-500/5" />

      <Container size="narrow" className="relative z-10">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-100 mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-base sm:text-lg text-neutral-400 mb-6 sm:mb-8 max-w-xl mx-auto">
            Request a consultation and let&apos;s discuss your vision. We&apos;ll
            provide a detailed quote with no obligation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link href="/contact">
              <Button size="lg">Request a Consultation</Button>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-2 text-neutral-300">
            <span>Or call us at</span>
            <a
              href="tel:+17058962761"
              className="inline-flex items-center gap-2 text-primary-500 font-semibold hover:underline"
            >
              <Phone className="w-4 h-4" />
              705-896-2761
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
