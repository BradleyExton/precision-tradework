import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Frame,
  Layers,
  DoorOpen,
  Grid3X3,
  ChefHat,
  PaintBucket,
  CheckCircle,
  Phone,
} from "lucide-react";
import { Container, Button, Card, SectionHeading, Breadcrumbs, Accordion } from "@/components/ui";
import { services, getServiceBySlug, getAllServiceSlugs } from "@/lib/services";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Frame,
  Layers,
  DoorOpen,
  Grid3X3,
  ChefHat,
  PaintBucket,
};

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      images: [service.image],
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle,
      description: service.metaDescription,
      images: [service.image],
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const IconComponent = iconMap[service.icon];
  const otherServices = services.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-dark-950 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-dark-950/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-950 via-dark-950/90 to-transparent" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-3xl">
            <Breadcrumbs
              items={[
                { label: "Services", href: "/#services" },
                { label: service.title },
              ]}
              className="mb-6"
            />
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-primary-500/10 rounded-xl backdrop-blur-sm border border-primary-500/20">
                {IconComponent && (
                  <IconComponent className="w-10 h-10 text-primary-500" />
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-neutral-100">
                {service.title}
              </h1>
            </div>
            <p className="text-xl text-neutral-300 mb-8">
              {service.fullDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button size="lg">Request a Consultation</Button>
              </Link>
              <a href="tel:+17058962761">
                <Button variant="secondary" size="lg">
                  <Phone className="w-5 h-5 mr-2" />
                  Call 705-896-2761
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="py-12 md:py-16 bg-dark-900">
        <Container>
          <SectionHeading
            eyebrow={`${service.title} Services`}
            title="What We Offer"
            subtitle="Comprehensive solutions for your project"
          />

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {service.features.map((feature, index) => (
              <Card key={index} className="flex items-start gap-2 sm:gap-4 p-3 sm:p-6">
                <div className="p-1.5 sm:p-2 bg-primary-500/10 rounded-lg flex-shrink-0">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500" />
                </div>
                <span className="text-neutral-200 text-xs sm:text-base">{feature}</span>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="py-12 md:py-16 bg-dark-950">
        <Container size="narrow">
          <SectionHeading
            eyebrow="Our Approach"
            title={`How Our ${service.title} Process Works`}
          />

          {/* Mobile: Horizontal Stepper */}
          <div className="md:hidden">
            <div className="flex justify-between items-start">
              {[
                { num: 1, title: "Consult" },
                { num: 2, title: "Quote" },
                { num: 3, title: "Execute" },
                { num: 4, title: "Review" },
              ].map((step, index) => (
                <div key={step.num} className="flex flex-col items-center flex-1">
                  <div className="relative flex items-center w-full justify-center">
                    {index > 0 && (
                      <div className="absolute right-1/2 w-full h-0.5 bg-primary-500/30" />
                    )}
                    <div className="relative z-10 w-10 h-10 bg-primary-500 text-dark-950 rounded-full flex items-center justify-center font-bold">
                      {step.num}
                    </div>
                  </div>
                  <span className="text-xs text-neutral-300 mt-2 text-center">
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: Vertical Steps */}
          <div className="hidden md:block space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-primary-500 text-dark-950 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-100 mb-1">
                  Initial Consultation
                </h3>
                <p className="text-neutral-400">
                  We discuss your project requirements, assess the scope of
                  work, and understand your vision and timeline.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-primary-500 text-dark-950 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-100 mb-1">
                  Detailed Quote
                </h3>
                <p className="text-neutral-400">
                  You receive a comprehensive quote with clear pricing, material
                  specifications, and project timeline.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-primary-500 text-dark-950 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-100 mb-1">
                  Professional Execution
                </h3>
                <p className="text-neutral-400">
                  Our team completes the work with precision, keeping you
                  informed throughout the project.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-primary-500 text-dark-950 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-100 mb-1">
                  Final Walkthrough
                </h3>
                <p className="text-neutral-400">
                  We conduct a thorough review with you to ensure everything
                  meets your expectations.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="py-12 md:py-16 bg-dark-900">
          <Container size="narrow">
            <SectionHeading
              eyebrow="Common Questions"
              title={`${service.title} FAQs`}
            />
            <Accordion items={service.faqs} />
          </Container>
        </section>
      )}

      {/* Other Services */}
      <section className="py-12 md:py-16 bg-dark-950">
        <Container>
          <SectionHeading
            eyebrow="More Services"
            title="Other Services You May Need"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6">
            {otherServices.map((otherService) => {
              const OtherIcon = iconMap[otherService.icon];
              return (
                <Link
                  key={otherService.slug}
                  href={`/services/${otherService.slug}`}
                >
                  <Card hover className="h-full group p-4 sm:p-6">
                    <div className="flex items-center sm:items-start gap-3 sm:gap-4">
                      <div className="p-2 sm:p-3 bg-primary-500/10 rounded-lg group-hover:bg-primary-500/20 transition-colors flex-shrink-0">
                        {OtherIcon && (
                          <OtherIcon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold text-neutral-100 group-hover:text-primary-500 transition-colors">
                          {otherService.title}
                        </h3>
                        <p className="hidden sm:block text-neutral-400 text-sm mt-1">
                          {otherService.shortDescription}
                        </p>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 bg-dark-950">
        <Container size="narrow">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-100 mb-4">
              Ready to Discuss Your {service.title} Project?
            </h2>
            <p className="text-base sm:text-lg text-neutral-400 mb-6 sm:mb-8 max-w-xl mx-auto">
              Contact us for a free consultation and detailed quote. We&apos;re
              here to help bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button size="lg">Request a Consultation</Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
