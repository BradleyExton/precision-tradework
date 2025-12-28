"use client";

import { useState } from "react";
import { MapPin, ChevronDown } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui";
import { ServiceAreaMap, LOCATION_MARKERS } from "./ServiceAreaMap";
import { TrustSignals } from "./TrustSignals";
import { businessStats, serviceAreas } from "@/lib/service-area";

export function ServiceAreaSection() {
  const [highlightedLocation, setHighlightedLocation] = useState<string | null>(null);
  const [showCities, setShowCities] = useState(false);

  // Check if a location has coordinates (can be highlighted on map)
  const hasCoordinates = (name: string) => {
    return LOCATION_MARKERS.some((m) => m.name === name);
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-dark-950">
      <Container>
        <SectionHeading
          eyebrow="Local Experts"
          title="Proudly Serving Simcoe & Muskoka"
          subtitle="Quality craftsmanship from contractors who know the area — Georgian Bay to Lake Simcoe, cottage country and beyond."
        />

        {/* Main content grid: Map + Info */}
        <div className="grid lg:grid-cols-2 gap-4 md:gap-8 mb-12">
          {/* Left: Map */}
          <div className="order-2 lg:order-1">
            <ServiceAreaMap
              className="w-full"
              highlightedLocation={highlightedLocation}
              onLocationSelect={setHighlightedLocation}
            />
          </div>

          {/* Right: Trust signals + Areas */}
          <div className="order-1 lg:order-2 space-y-4 md:space-y-6">
            {/* Trust signals */}
            <TrustSignals
              yearsInBusiness={businessStats.yearsInBusiness}
              projectsCompleted={businessStats.projectsCompleted}
            />

            {/* Service Regions */}
            <div>
              <h3 className="text-sm text-neutral-400 mb-3 uppercase tracking-wider">
                Service Regions
              </h3>
              <div className="flex flex-wrap gap-3">
                {serviceAreas.regions.map((region) => {
                  const isHighlighted = highlightedLocation === region.name;

                  return (
                    <button
                      key={region.name}
                      onClick={() => setHighlightedLocation(isHighlighted ? null : region.name)}
                      className={`
                        flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 border cursor-pointer
                        ${isHighlighted
                          ? "bg-primary-500/30 border-primary-500 scale-105"
                          : "bg-primary-500/10 border-primary-500/30 hover:bg-primary-500/20"
                        }
                      `}
                    >
                      <MapPin
                        className={`w-4 h-4 transition-colors ${
                          isHighlighted ? "text-primary-400" : "text-primary-500"
                        }`}
                      />
                      <span className="text-neutral-100 font-medium">
                        {region.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile: View Cities toggle button */}
            <button
              onClick={() => setShowCities(!showCities)}
              className="md:hidden flex items-center gap-2 text-sm text-primary-500 hover:text-primary-400 transition-colors"
              aria-expanded={showCities}
            >
              <span>{showCities ? "Hide cities" : "View all cities"}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showCities ? "rotate-180" : ""}`} />
            </button>

            {/* Cities list - hidden on mobile until toggled, always visible on desktop */}
            <div className={`${showCities ? "block" : "hidden"} md:block`}>
              <div className="flex flex-wrap gap-2">
                {serviceAreas.regions.flatMap((region) =>
                  region.cities.map((city) => {
                    const cityName = typeof city === 'string' ? city : city.name;
                    const isHQ = typeof city === 'object' && city.isHeadquarters;
                    const isClickable = hasCoordinates(cityName);
                    const isHighlighted = highlightedLocation === cityName;

                    return (
                      <button
                        key={cityName}
                        onClick={() => isClickable && setHighlightedLocation(isHighlighted ? null : cityName)}
                        className={`
                          flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all duration-300 border
                          ${isHighlighted
                            ? "bg-primary-500/20 border-primary-500/50 text-primary-400 scale-105"
                            : "bg-dark-800 border-dark-700 text-neutral-400 hover:border-dark-600 hover:text-neutral-300"
                          }
                          ${isClickable ? "cursor-pointer" : "cursor-default"}
                        `}
                      >
                        {cityName}
                        {isHQ && (
                          <span className="text-[9px] text-primary-400 bg-primary-500/20 px-1 py-0.5 rounded">
                            HQ
                          </span>
                        )}
                      </button>
                    );
                  })
                )}
              </div>

              {/* Instruction hint */}
              <p className="mt-3 text-neutral-500 text-xs text-center lg:text-left">
                Click a location to see it on the map
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
