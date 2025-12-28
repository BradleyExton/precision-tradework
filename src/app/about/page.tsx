import { Metadata } from "next";
import Link from "next/link";
import { Award, Heart, MessageSquare, Target } from "lucide-react";
import { Container, Button, Card, SectionHeading } from "@/components/ui";
import { ServiceAreaSection } from "@/components/home";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Precision Tradework - professional renovation and finishing services in Barrie, Simcoe County and Muskoka. Quality craftsmanship you can trust.",
};

const values = [
  {
    icon: Award,
    title: "Quality First",
    description:
      "We never cut corners. Every project receives the same attention to detail, regardless of size.",
  },
  {
    icon: Heart,
    title: "Integrity",
    description:
      "Honest communication, fair pricing, and doing what we say we'll do. Every time.",
  },
  {
    icon: MessageSquare,
    title: "Communication",
    description:
      "Regular updates keep you informed. No surprises, just transparent progress on your project.",
  },
  {
    icon: Target,
    title: "Precision",
    description:
      "It's in our name for a reason. Accurate measurements, clean lines, and flawless finishes.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-dark-950">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-100 mb-4 sm:mb-6">
              About Precision Tradework
            </h1>
            <p className="text-lg sm:text-xl text-neutral-300">
              Professional renovation and finishing services built on quality
              craftsmanship and honest communication.
            </p>
          </div>
        </Container>
      </section>

      {/* Story */}
      <section className="py-12 md:py-16 bg-dark-900">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading
                eyebrow="Our Story"
                title="Built on Craftsmanship"
                centered={false}
              />
              <div className="space-y-4 text-neutral-300">
                <p>
                  Precision Tradework was founded with a simple mission: deliver
                  quality renovation and finishing work that homeowners can
                  trust. Based in Barrie, we serve clients throughout Simcoe
                  County and Muskoka.
                </p>
                <p>
                  With years of experience in the trades, we understand what it
                  takes to complete projects right the first time. From framing
                  and drywall to trim carpentry and painting, we bring the same
                  level of care and precision to every job.
                </p>
                <p>
                  We believe in clear communication, fair pricing, and standing
                  behind our work. When you work with Precision Tradework, you
                  can expect a straightforward process from consultation to
                  completion.
                </p>
              </div>
            </div>
            <div className="bg-dark-800 border border-dark-700 rounded-xl p-8 lg:p-12">
              <blockquote className="text-xl text-neutral-200 italic mb-6">
                &ldquo;Quality work takes time and attention. We don&apos;t rush
                projects, we do them right.&rdquo;
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-500/20 rounded-full flex items-center justify-center">
                  <span className="text-primary-500 font-bold text-lg">J</span>
                </div>
                <div>
                  <p className="text-neutral-100 font-medium">James</p>
                  <p className="text-neutral-400 text-sm">
                    Owner, Precision Tradework
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-12 md:py-16 bg-dark-950">
        <Container>
          <SectionHeading
            eyebrow="What We Stand For"
            title="Our Values"
            subtitle="The principles that guide every project we take on"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => {
              const IconComponent = value.icon;
              return (
                <Card key={value.title} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-primary-500/10 rounded-full">
                      <IconComponent className="w-8 h-8 text-primary-500" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-100 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-neutral-400 text-sm">{value.description}</p>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Service Area */}
      <ServiceAreaSection />

      {/* CTA */}
      <section className="py-12 md:py-16 bg-dark-900">
        <Container size="narrow">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-100 mb-4">
              Ready to Work Together?
            </h2>
            <p className="text-base sm:text-lg text-neutral-400 mb-6 sm:mb-8 max-w-xl mx-auto">
              Let&apos;s discuss your project and see how we can help bring your
              vision to life.
            </p>
            <Link href="/contact">
              <Button size="lg">Request a Consultation</Button>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
