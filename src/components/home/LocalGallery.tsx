"use client";

import Image from "next/image";
import { useState } from "react";
import { MapPin } from "lucide-react";

const localImages = [
  {
    src: "/images/local/georgian-bay.jpg",
    alt: "Georgian Bay shoreline at sunset, Ontario",
    caption: "Georgian Bay",
    fallbackGradient: "from-blue-900/40 via-teal-800/30 to-dark-800",
  },
  {
    src: "/images/local/lake-simcoe.jpg",
    alt: "Lake Simcoe waterfront near Barrie, Ontario",
    caption: "Lake Simcoe",
    fallbackGradient: "from-sky-900/40 via-blue-800/30 to-dark-800",
  },
  {
    src: "/images/local/muskoka.jpg",
    alt: "Muskoka cottage country with dock and lake",
    caption: "Muskoka",
    fallbackGradient: "from-emerald-900/40 via-teal-800/30 to-dark-800",
  },
];

interface LocalGalleryProps {
  className?: string;
}

function GalleryCard({
  image,
}: {
  image: (typeof localImages)[0];
}) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative group overflow-hidden rounded-xl aspect-[4/3] bg-dark-800">
      {!hasError ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 33vw"
          onError={() => setHasError(true)}
        />
      ) : (
        <div
          className={`absolute inset-0 bg-gradient-to-br ${image.fallbackGradient} flex items-center justify-center`}
        >
          <MapPin className="w-12 h-12 text-primary-500/30" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <span className="text-neutral-100 font-medium text-sm">
          {image.caption}
        </span>
      </div>
    </div>
  );
}

export function LocalGallery({ className = "" }: LocalGalleryProps) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 ${className}`}>
      {localImages.map((image) => (
        <GalleryCard key={image.src} image={image} />
      ))}
    </div>
  );
}
