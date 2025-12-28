"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface LocationMapProps {
  className?: string;
}

// Business location - 63 Ferris Lane, Barrie, ON L4M 5C4
const HQ_LOCATION = {
  lat: 44.404560,
  lng: -79.696693,
};

// House icon (same as ServiceAreaMap)
const createHouseIcon = () => `
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.1L1 12h3v9h6v-6h4v6h6v-9h3L12 2.1zm0 2.691l6 5.4V19h-2v-6H8v6H6v-8.809l6-5.4z"/>
  </svg>
`;

export function LocationMap({ className = "" }: LocationMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken || map.current) return;

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [HQ_LOCATION.lng, HQ_LOCATION.lat],
      zoom: 14,
      attributionControl: false,
      interactive: false, // Disable all interactions
    });

    const mapInstance = map.current;

    mapInstance.on("load", () => {
      // Create marker element (same style as ServiceAreaMap HQ marker)
      const el = document.createElement("div");
      el.className = "map-marker hq";

      const icon = document.createElement("div");
      icon.className = "map-marker-icon";
      icon.innerHTML = createHouseIcon();
      el.appendChild(icon);

      // Add marker
      new mapboxgl.Marker({ element: el, anchor: "bottom" })
        .setLngLat([HQ_LOCATION.lng, HQ_LOCATION.lat])
        .addTo(mapInstance);
    });

    return () => {
      mapInstance.remove();
      map.current = null;
    };
  }, [mapboxToken]);

  if (!mapboxToken) {
    return (
      <div
        className={`flex items-center justify-center bg-dark-800 rounded-xl border border-dark-700 aspect-video md:aspect-[4/3] ${className}`}
      >
        <p className="text-neutral-400 text-sm">Map unavailable</p>
      </div>
    );
  }

  return (
    <div className={`relative rounded-xl overflow-hidden ${className}`}>
      <div
        ref={mapContainer}
        className="w-full aspect-video md:aspect-[4/3]"
      />
      <div className="absolute inset-0 border border-dark-700 rounded-xl pointer-events-none" />
    </div>
  );
}
