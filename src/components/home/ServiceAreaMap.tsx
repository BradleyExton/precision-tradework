"use client";

import { useEffect, useRef, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { serviceAreas } from "@/lib/service-area";

interface ServiceAreaMapProps {
  className?: string;
  highlightedLocation?: string | null;
  onLocationSelect?: (location: string | null) => void;
}

// Map configuration
const MAP_CENTER: [number, number] = [-79.55, 44.7]; // Centered on service area
const MAP_ZOOM = 6.9;

// Service area polygon - includes Collingwood, Huntsville, and surrounding areas
const SERVICE_AREA_POLYGON: GeoJSON.Feature = {
  type: "Feature",
  properties: {},
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [-80.35, 44.15],   // SW corner
        [-80.4, 44.55],    // W side - includes Collingwood
        [-80.1, 45.0],     // NW
        [-79.5, 45.45],    // N side
        [-79.0, 45.5],     // NE - includes Huntsville
        [-78.9, 45.1],     // E side
        [-79.0, 44.7],     // SE
        [-79.2, 44.2],     // S side
        [-79.7, 44.1],     // SW
        [-80.35, 44.15],   // Close polygon
      ],
    ],
  },
};

// SVG Icon for HQ marker
const createHouseIcon = () => `
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.1L1 12h3v9h6v-6h4v6h6v-9h3L12 2.1zm0 2.691l6 5.4V19h-2v-6H8v6H6v-8.809l6-5.4z"/>
  </svg>
`;

// Town markers with coordinates
export const LOCATION_MARKERS = [
  { name: "Barrie", lng: -79.6903, lat: 44.3894, isHQ: true },
  { name: "Orillia", lng: -79.4197, lat: 44.6082, isHQ: false },
  { name: "Collingwood", lng: -80.2168, lat: 44.5001, isHQ: false },
  { name: "Midland", lng: -79.8877, lat: 44.7494, isHQ: false },
  { name: "Gravenhurst", lng: -79.3724, lat: 44.9188, isHQ: false },
  { name: "Bracebridge", lng: -79.3074, lat: 45.0421, isHQ: false },
  { name: "Huntsville", lng: -79.2167, lat: 45.3334, isHQ: false },
  { name: "Innisfil", lng: -79.5833, lat: 44.3000, isHQ: false },
  { name: "Wasaga Beach", lng: -80.0167, lat: 44.5167, isHQ: false },
  { name: "Penetanguishene", lng: -79.9333, lat: 44.7667, isHQ: false },
];

export function ServiceAreaMap({
  className = "",
  highlightedLocation,
  onLocationSelect,
}: ServiceAreaMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<Map<string, { marker: mapboxgl.Marker; element: HTMLDivElement }>>(new Map());

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  // Create marker element (only used for HQ)
  const createMarkerElement = useCallback((location: typeof LOCATION_MARKERS[0]) => {
    const el = document.createElement("div");
    el.className = "map-marker hq";
    el.setAttribute("data-location", location.name);

    // Add icon
    const icon = document.createElement("div");
    icon.className = "map-marker-icon";
    icon.innerHTML = createHouseIcon();
    el.appendChild(icon);

    // Add label
    const label = document.createElement("span");
    label.className = "map-marker-label";
    label.textContent = location.name;
    el.appendChild(label);

    return el;
  }, []);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || !mapboxToken || map.current) return;

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: MAP_CENTER,
      zoom: MAP_ZOOM,
      attributionControl: false,
      logoPosition: "bottom-right",
    });

    const mapInstance = map.current;

    mapInstance.on("load", () => {
      // Add service area polygon
      mapInstance.addSource("service-area", {
        type: "geojson",
        data: SERVICE_AREA_POLYGON,
      });

      mapInstance.addLayer({
        id: "service-area-fill",
        type: "fill",
        source: "service-area",
        paint: {
          "fill-color": "#C9A85C",
          "fill-opacity": 0.08,
        },
      });

      mapInstance.addLayer({
        id: "service-area-line",
        type: "line",
        source: "service-area",
        paint: {
          "line-color": "#C9A85C",
          "line-width": 2,
          "line-opacity": 0.4,
          "line-dasharray": [2, 2],
        },
      });

      // Add marker only for HQ
      LOCATION_MARKERS.filter(loc => loc.isHQ).forEach((location) => {
        const el = createMarkerElement(location);

        const marker = new mapboxgl.Marker({ element: el })
          .setLngLat([location.lng, location.lat])
          .addTo(mapInstance);

        // Click handler
        el.addEventListener("click", (e) => {
          e.stopPropagation();
          onLocationSelect?.(location.name);
        });

        markers.current.set(location.name, { marker, element: el });
      });
    });

    // Click on map to deselect
    mapInstance.on("click", () => {
      onLocationSelect?.(null);
    });

    // Disable scroll zoom for better UX
    mapInstance.scrollZoom.disable();

    return () => {
      mapInstance.remove();
      map.current = null;
    };
  }, [mapboxToken, createMarkerElement, onLocationSelect]);

  // Handle highlighted location changes
  useEffect(() => {
    if (!map.current) return;

    // Update marker styles
    markers.current.forEach(({ element }, name) => {
      if (name === highlightedLocation) {
        element.classList.add("highlighted");
      } else {
        element.classList.remove("highlighted");
      }
    });

    // Fly to highlighted location
    if (highlightedLocation) {
      // Check if it's a region first
      const region = serviceAreas.regions.find((r) => r.name === highlightedLocation);
      if (region && map.current) {
        map.current.flyTo({
          center: [region.center.lng, region.center.lat],
          zoom: region.zoom,
          duration: 1000,
          essential: true,
        });
      } else {
        // Fall back to city location
        const location = LOCATION_MARKERS.find((l) => l.name === highlightedLocation);
        if (location && map.current) {
          map.current.flyTo({
            center: [location.lng, location.lat],
            zoom: 9.5,
            duration: 1000,
            essential: true,
          });
        }
      }
    } else if (map.current) {
      // Reset to default view
      map.current.flyTo({
        center: MAP_CENTER,
        zoom: MAP_ZOOM,
        duration: 800,
        essential: true,
      });
    }
  }, [highlightedLocation]);

  // Fallback if no token
  if (!mapboxToken) {
    return <FallbackMessage className={className} />;
  }

  return (
    <div className={`relative rounded-xl overflow-hidden ${className}`}>
      <div
        ref={mapContainer}
        className="w-full h-[300px] md:h-[400px] lg:h-[450px]"
      />
      {/* Subtle border overlay */}
      <div className="absolute inset-0 border border-dark-700 rounded-xl pointer-events-none" />
    </div>
  );
}

function FallbackMessage({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center bg-dark-800 rounded-xl border border-dark-700 h-[300px] md:h-[400px] lg:h-[450px] ${className}`}
    >
      <p className="text-neutral-400 text-sm">
        Add <code className="text-primary-500">NEXT_PUBLIC_MAPBOX_TOKEN</code> to
        enable map
      </p>
    </div>
  );
}
