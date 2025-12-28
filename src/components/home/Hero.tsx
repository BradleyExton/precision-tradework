"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, CheckCircle, MapPin, ChevronDown, Phone, Clock } from "lucide-react";
import { Container, Button } from "@/components/ui";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { businessStats } from "@/lib/service-area";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-dark-950">
      {/* Background image */}
      <Image
        src="/hero-background.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-dark-950/60" />

      {/* Gradient for text area - darker on left */}
      <div className="absolute inset-0 bg-gradient-to-r from-dark-950/80 via-dark-950/40 to-transparent" />

      <Container className="relative z-10">
        <motion.div
          className="max-w-3xl"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-100 leading-tight mb-4 sm:mb-6"
            variants={fadeUp}
          >
            Barrie&apos;s Trusted Renovation & Finishing Experts
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-neutral-300 mb-6 sm:mb-8 max-w-2xl"
            variants={fadeUp}
          >
            Professional renovation and finishing services in Simcoe County & Muskoka
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            variants={fadeUp}
          >
            <Link href="/contact">
              <Button size="lg">Request a Consultation</Button>
            </Link>
            <Link href="#services">
              <Button variant="secondary" size="lg">
                View Our Services
              </Button>
            </Link>
          </motion.div>

          {/* Phone CTA */}
          <motion.div className="mt-4" variants={fadeUp}>
            <a
              href="tel:+17058962761"
              className="inline-flex items-center gap-2 text-neutral-300 hover:text-primary-500 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Or call: <span className="font-semibold text-primary-500">705-896-2761</span></span>
            </a>
          </motion.div>

          {/* Trust Signals */}
          <motion.div
            className="flex flex-wrap gap-4 sm:gap-6 mt-8 pt-8 border-t border-white/10"
            variants={fadeUp}
          >
            <div className="flex items-center gap-2 text-neutral-300">
              <Calendar className="w-5 h-5 text-primary-500" />
              <span className="text-sm sm:text-base">{businessStats.yearsInBusiness}+ Years</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-300">
              <CheckCircle className="w-5 h-5 text-primary-500" />
              <span className="text-sm sm:text-base">{businessStats.projectsCompleted} Projects</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-300">
              <MapPin className="w-5 h-5 text-primary-500" />
              <span className="text-sm sm:text-base">{businessStats.serviceArea}</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-300">
              <Clock className="w-5 h-5 text-primary-500" />
              <span className="text-sm sm:text-base">Now Booking Q1 2025</span>
            </div>
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-neutral-400"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}
