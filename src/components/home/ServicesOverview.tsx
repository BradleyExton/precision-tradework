"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Frame,
  Layers,
  DoorOpen,
  Grid3X3,
  ChefHat,
  PaintBucket,
} from "lucide-react";
import { Container, SectionHeading } from "@/components/ui";
import { services } from "@/lib/services";
import { fadeUp, staggerContainer, VIEWPORT_ONCE } from "@/lib/animations";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Frame,
  Layers,
  DoorOpen,
  Grid3X3,
  ChefHat,
  PaintBucket,
};

export function ServicesOverview() {
  return (
    <section id="services" className="py-12 md:py-16 lg:py-20 bg-dark-900">
      <Container>
        <SectionHeading
          eyebrow="What We Do"
          title="Our Services"
          subtitle="Complete renovation and finishing services to transform your space"
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={staggerContainer}
        >
          {services.map((service) => {
            const IconComponent = iconMap[service.icon];
            return (
              <motion.div key={service.slug} variants={fadeUp}>
                <Link href={`/services/${service.slug}`}>
                  <div className="h-full group bg-dark-800 rounded-xl overflow-hidden border border-dark-700 hover:border-primary-500/50 transition-all">
                    {/* Service Image */}
                    <div className="relative h-32 sm:h-48 overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-800 to-transparent" />
                      {/* Icon Badge */}
                      <div className="absolute bottom-2 sm:bottom-3 left-3 sm:left-4 p-1.5 sm:p-2 bg-dark-800/90 rounded-lg border border-dark-700">
                        {IconComponent && (
                          <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500" />
                        )}
                      </div>
                    </div>
                    {/* Content */}
                    <div className="p-3 sm:p-5">
                      <h3 className="text-base sm:text-lg font-semibold text-neutral-100 mb-1 sm:mb-2 group-hover:text-primary-500 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-neutral-400 text-xs sm:text-sm mb-2 sm:mb-4 line-clamp-2 sm:line-clamp-none">
                        {service.shortDescription}
                      </p>
                      <span className="hidden sm:inline text-primary-500 text-sm font-medium group-hover:underline">
                        Learn More &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
