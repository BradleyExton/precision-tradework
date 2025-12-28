import Script from "next/script";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HomeImprovement",
  name: "Precision Tradework",
  image: "https://precisiontradework.ca/logo.png",
  url: "https://precisiontradework.ca",
  telephone: "+1-705-896-2761",
  email: "james@precisiontradework.ca",
  address: {
    "@type": "PostalAddress",
    streetAddress: "63 Ferris Lane, Unit E4",
    addressLocality: "Barrie",
    addressRegion: "ON",
    postalCode: "L4M 5C4",
    addressCountry: "CA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 44.3894,
    longitude: -79.6903,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "17:00",
    },
  ],
  areaServed: [
    {
      "@type": "City",
      name: "Barrie",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Ontario",
      },
    },
    {
      "@type": "AdministrativeArea",
      name: "Simcoe County",
    },
    {
      "@type": "AdministrativeArea",
      name: "Muskoka",
    },
  ],
  priceRange: "$$",
  sameAs: [],
};

export function LocalBusinessStructuredData() {
  return (
    <Script
      id="local-business-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(localBusinessSchema),
      }}
    />
  );
}

interface ServiceStructuredDataProps {
  serviceName: string;
  serviceDescription: string;
}

export function ServiceStructuredData({
  serviceName,
  serviceDescription,
}: ServiceStructuredDataProps) {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    description: serviceDescription,
    provider: {
      "@type": "HomeImprovement",
      name: "Precision Tradework",
    },
    areaServed: ["Barrie", "Simcoe County", "Muskoka"],
    serviceType: serviceName,
  };

  return (
    <Script
      id={`service-schema-${serviceName.toLowerCase().replace(/\s+/g, "-")}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(serviceSchema),
      }}
    />
  );
}
