import { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Container, Card, Accordion } from "@/components/ui";
import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { LocationMap } from "@/components/contact/LocationMap";
import { faqs } from "@/lib/faqs";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Request a consultation for your renovation project in Barrie, Simcoe County or Muskoka. Contact Precision Tradework today for a free estimate.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-dark-950">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-100 mb-4 sm:mb-6">
              Request a Consultation
            </h1>
            <p className="text-lg sm:text-xl text-neutral-300">
              Tell us about your project and we&apos;ll get back to you within
              24 hours
            </p>
          </div>
        </Container>
      </section>

      {/* Form & Contact Info */}
      <section className="py-12 md:py-16 bg-dark-900">
        <Container>
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <ConsultationForm />
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Details */}
              <Card>
                <h3 className="text-lg font-semibold text-neutral-100 mb-6">
                  Contact Information
                </h3>
                <ul className="space-y-4">
                  <li>
                    <a
                      href="tel:+17058962761"
                      className="flex items-start gap-4 text-neutral-300 hover:text-primary-500 transition-colors group"
                    >
                      <div className="p-2 bg-dark-700 rounded-lg group-hover:bg-primary-500/10 transition-colors">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-neutral-400">Phone</p>
                        <p className="text-neutral-100 font-medium">
                          705-896-2761
                        </p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:james@precisiontradework.ca"
                      className="flex items-start gap-4 text-neutral-300 hover:text-primary-500 transition-colors group"
                    >
                      <div className="p-2 bg-dark-700 rounded-lg group-hover:bg-primary-500/10 transition-colors">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-neutral-400">Email</p>
                        <p className="text-neutral-100 font-medium">
                          james@precisiontradework.ca
                        </p>
                      </div>
                    </a>
                  </li>
                  <li className="flex items-start gap-4 text-neutral-300">
                    <div className="p-2 bg-dark-700 rounded-lg">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-400">Address</p>
                      <p className="text-neutral-100">
                        63 Ferris Lane, Unit E4
                        <br />
                        Barrie, ON L4M 5C4
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4 text-neutral-300">
                    <div className="p-2 bg-dark-700 rounded-lg">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-400">Hours</p>
                      <p className="text-neutral-100">
                        Monday - Saturday
                        <br />
                        9:00 AM - 5:00 PM
                      </p>
                    </div>
                  </li>
                </ul>
              </Card>

              {/* Map */}
              <LocationMap />
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16 bg-dark-950">
        <Container size="narrow">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-100 text-center mb-8 md:mb-12">
            Frequently Asked Questions
          </h2>

          <Accordion items={faqs} />
        </Container>
      </section>
    </>
  );
}
