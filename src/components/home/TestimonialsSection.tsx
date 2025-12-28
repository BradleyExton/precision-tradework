"use client";

import { useState } from "react";
import { motion, PanInfo } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Container, Card, SectionHeading } from "@/components/ui";
import { testimonials } from "@/lib/testimonials";
import { fadeUp, staggerContainer, VIEWPORT_ONCE } from "@/lib/animations";

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <Card className="relative h-full">
      <Quote className="absolute top-4 right-4 w-8 h-8 text-primary-500/20" />

      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star
            key={i}
            className="w-4 h-4 text-primary-500 fill-primary-500"
          />
        ))}
      </div>

      {/* Quote */}
      <p className="text-neutral-300 mb-6 leading-relaxed">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      {/* Author */}
      <div className="pt-4 border-t border-dark-700">
        <p className="text-neutral-100 font-medium">
          {testimonial.name}
        </p>
        <p className="text-neutral-400 text-sm">
          {testimonial.location}
          {testimonial.service && ` • ${testimonial.service}`}
        </p>
      </div>
    </Card>
  );
}

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x > threshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (info.offset.x < -threshold && currentIndex < testimonials.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-dark-900">
      <Container>
        <SectionHeading
          eyebrow="Testimonials"
          title="What Our Clients Say"
          subtitle="Real feedback from homeowners we've helped"
        />

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragEnd={handleDragEnd}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-1"
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-primary-500 w-6"
                    : "bg-dark-600 hover:bg-dark-500"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Swipe hint */}
          {testimonials.length > 1 && (
            <p className="text-center text-neutral-500 text-xs mt-3">
              Swipe to see more
            </p>
          )}
        </div>

        {/* Desktop Grid */}
        <motion.div
          className="hidden md:grid md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={staggerContainer}
        >
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.id} variants={fadeUp}>
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
