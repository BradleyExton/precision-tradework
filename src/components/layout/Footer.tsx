import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Container } from "@/components/ui";
import { Logo } from "./Logo";
import { services } from "@/lib/services";

const serviceAreas = [
  "Barrie",
  "Orillia",
  "Innisfil",
  "Collingwood",
  "Wasaga Beach",
  "Midland",
  "Gravenhurst",
  "Bracebridge",
  "Huntsville",
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-950 border-t border-dark-800">
      <Container>
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {/* Logo & About */}
            <div className="lg:col-span-1">
              <Logo size="md" className="mb-4" />
              <p className="text-neutral-400 text-sm mt-4 max-w-xs">
                Professional renovation and finishing services in Barrie,
                Simcoe County, and Muskoka.
              </p>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-neutral-100 font-semibold mb-4">Services</h3>
              <ul className="space-y-1">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="block py-2 text-neutral-400 hover:text-primary-500 transition-colors text-sm"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-neutral-100 font-semibold mb-4">Contact</h3>
              <ul className="space-y-1">
                <li>
                  <a
                    href="tel:+17058962761"
                    className="flex items-center gap-3 py-2 text-neutral-400 hover:text-primary-500 transition-colors text-sm"
                  >
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <span>705-896-2761</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:james@precisiontradework.ca"
                    className="flex items-center gap-3 py-2 text-neutral-400 hover:text-primary-500 transition-colors text-sm"
                  >
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    <span>james@precisiontradework.ca</span>
                  </a>
                </li>
                <li className="flex items-start gap-3 py-2 text-neutral-400 text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>
                    63 Ferris Lane, Unit E4
                    <br />
                    Barrie, ON L4M 5C4
                  </span>
                </li>
                <li className="flex items-center gap-3 py-2 text-neutral-400 text-sm">
                  <Clock className="w-4 h-4 flex-shrink-0" />
                  <span>Mon - Sat: 9:00 AM - 5:00 PM</span>
                </li>
              </ul>
            </div>

            {/* Service Areas */}
            <div>
              <h3 className="text-neutral-100 font-semibold mb-4">
                Service Areas
              </h3>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
                {serviceAreas.map((area) => (
                  <li
                    key={area}
                    className="text-neutral-400 text-sm"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-dark-800 py-4 md:py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-neutral-400 text-sm">
            &copy; {currentYear} Precision Tradework. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/faq"
              className="py-2 text-neutral-400 hover:text-primary-500 transition-colors text-sm"
            >
              FAQ
            </Link>
            <Link
              href="/privacy"
              className="py-2 text-neutral-400 hover:text-primary-500 transition-colors text-sm"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
