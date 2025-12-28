"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface LocationMapProps {
  className?: string;
}

// HQ Location
const HQ_LOCATION = {
  lng: -79.6903,
  lat: 44.3894,
  address: "63 Ferris Lane, Unit E4",
  city: "Barrie, ON L4M 5C4",
};

// SVG Icon for marker
const createMarkerIcon = () => `
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
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
    });

    const mapInstance = map.current;

    mapInstance.on("load", () => {
      // Create marker element
      const el = document.createElement("div");
      el.className = "location-marker";
      el.innerHTML = `
        <div class="location-marker-icon">${createMarkerIcon()}</div>
        <div class="location-marker-pulse"></div>
      `;

      // Add marker
      new mapboxgl.Marker({ element: el })
        .setLngLat([HQ_LOCATION.lng, HQ_LOCATION.lat])
        .addTo(mapInstance);

      // Add navigation controls
      mapInstance.addControl(
        new mapboxgl.NavigationControl({ showCompass: false }),
        "bottom-right"
      );
    });

    // Disable scroll zoom
    mapInstance.scrollZoom.disable();

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
      {/* Get Directions link */}
      <a
        href={`https://www.google.com/maps/dir/?api=1&destination=${HQ_LOCATION.lat},${HQ_LOCATION.lng}`}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-3 left-3 px-3 py-1.5 bg-dark-900/90 backdrop-blur-sm text-neutral-200 text-xs font-medium rounded-lg border border-dark-700 hover:bg-dark-800 hover:border-primary-500/50 transition-colors"
      >
        Get Directions
      </a>
      {/* Border overlay */}
      <div className="absolute inset-0 border border-dark-700 rounded-xl pointer-events-none" />

      <style jsx global>{`
        .location-marker {
          position: relative;
          cursor: pointer;
        }
        .location-marker-icon {
          width: 36px;
          height: 36px;
          color: var(--primary-500, #C9A85C);
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
        }
        .location-marker-icon svg {
          width: 100%;
          height: 100%;
        }
        .location-marker-pulse {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 40px;
          height: 40px;
          background: rgba(201, 168, 92, 0.3);
          border-radius: 50%;
          animation: pulse 2s ease-out infinite;
          z-index: -1;
        }
        @keyframes pulse {
          0% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
          }
        }
        .mapboxgl-ctrl-group {
          background: rgba(26, 26, 26, 0.9) !important;
          border: 1px solid rgba(58, 58, 58, 0.5) !important;
        }
        .mapboxgl-ctrl-group button {
          background: transparent !important;
        }
        .mapboxgl-ctrl-group button + button {
          border-top: 1px solid rgba(58, 58, 58, 0.5) !important;
        }
        .mapboxgl-ctrl-icon {
          filter: invert(1);
        }
      `}</style>
    </div>
  );
}
