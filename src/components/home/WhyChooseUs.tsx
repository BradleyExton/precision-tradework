"use client";

import { motion } from "framer-motion";
import { Award, MessageSquare, Shield, MapPin } from "lucide-react";
import { Container, Card, SectionHeading } from "@/components/ui";
import { fadeUp, staggerContainer, VIEWPORT_ONCE } from "@/lib/animations";

const features = [
  {
    icon: Award,
    title: "Quality Craftsmanship",
    description:
      "Attention to detail on every project. We take pride in delivering work that exceeds expectations.",
  },
  {
    icon: MessageSquare,
    title: "Clear Communication",
    description:
      "Regular updates throughout your project. No surprises, just transparent progress reports.",
  },
  {
    icon: Shield,
    title: "Licensed & Insured",
    description:
      "Full protection for your peace of mind. We carry comprehensive liability insurance and WSIB coverage.",
  },
  {
    icon: MapPin,
    title: "Local Expertise",
    description:
      "Serving Simcoe County & Muskoka with dedicated service. We know the area and understand local needs.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-dark-950">
      <Container>
        <SectionHeading
          eyebrow="Our Commitment"
          title="Why Choose Precision Tradework"
          subtitle="We're committed to delivering exceptional results on every project"
        />

        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={staggerContainer}
        >
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <motion.div key={feature.title} variants={fadeUp}>
                <Card className="text-center h-full p-4 sm:p-6">
                  <div className="flex justify-center mb-2 sm:mb-4">
                    <div className="p-2 sm:p-4 bg-primary-500/10 rounded-full">
                      <IconComponent className="w-5 h-5 sm:w-8 sm:h-8 text-primary-500" />
                    </div>
                  </div>
                  <h3 className="text-sm sm:text-lg font-semibold text-neutral-100 mb-1 sm:mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-400 text-xs sm:text-sm leading-snug">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
