import { Service } from "@/types";

export const services: Service[] = [
  {
    slug: "framing",
    title: "Framing",
    shortDescription: "Non-structural framing for residential and commercial projects",
    fullDescription: "Professional non-structural framing services for interior walls, partitions, and room divisions. We ensure precise measurements and solid construction for your renovation or new build project.",
    features: [
      "Interior wall framing",
      "Partition walls",
      "Basement framing",
      "Commercial tenant improvements",
      "Load-bearing header support",
      "Steel and wood stud framing"
    ],
    icon: "Frame",
    image: "/images/services/framing.png",
    metaTitle: "Framing Services in Barrie & Simcoe County | Precision Tradework",
    metaDescription: "Professional non-structural framing services in Barrie, Simcoe County and Muskoka. Interior walls, partitions, basement framing. Request a consultation today."
  },
  {
    slug: "drywall",
    title: "Drywall",
    shortDescription: "Complete drywall installation, taping, and textured ceilings",
    fullDescription: "Full-service drywall solutions from installation to finishing. We specialize in smooth finishes, textured ceilings, and repairs that blend seamlessly with existing surfaces.",
    features: [
      "Drywall installation",
      "Taping and mudding",
      "Textured ceilings",
      "Smooth ceiling finishes",
      "Knockdown texture",
      "Drywall repairs and patching",
      "Water damage repair"
    ],
    icon: "Layers",
    image: "/images/services/drywall.png",
    metaTitle: "Drywall Installation & Taping in Barrie | Precision Tradework",
    metaDescription: "Expert drywall installation, taping, and textured ceilings in Barrie, Simcoe County and Muskoka. Smooth finishes and repairs. Request a consultation."
  },
  {
    slug: "trim-carpentry",
    title: "Trim Carpentry",
    shortDescription: "Interior and exterior doors, crown moulding, baseboards, and wainscoting",
    fullDescription: "Expert trim carpentry that adds the finishing touches to your space. From elegant crown moulding to custom wainscoting, we deliver craftsmanship that elevates your home's appearance and value.",
    features: [
      "Interior door installation",
      "Exterior door installation",
      "Crown moulding",
      "Baseboard installation",
      "Window casings and trim",
      "Wainscoting",
      "Chair rail",
      "Custom millwork"
    ],
    icon: "DoorOpen",
    image: "/images/services/mold.png",
    metaTitle: "Trim Carpentry & Moulding in Barrie | Precision Tradework",
    metaDescription: "Professional trim carpentry in Barrie, Simcoe County and Muskoka. Crown moulding, baseboards, doors, wainscoting. Quality craftsmanship guaranteed."
  },
  {
    slug: "flooring",
    title: "Flooring",
    shortDescription: "Vinyl, laminate, hardwood, and tile installation",
    fullDescription: "Transform your floors with our professional installation services. We work with all major flooring types and ensure a flawless finish that stands up to daily life for years to come.",
    features: [
      "Luxury vinyl plank (LVP)",
      "Laminate flooring",
      "Hardwood installation",
      "Hardwood refinishing",
      "Tile flooring",
      "Floor repairs",
      "Subfloor preparation",
      "Transitions and trim"
    ],
    icon: "Grid3X3",
    image: "/images/services/flooring.png",
    metaTitle: "Flooring Installation in Barrie & Simcoe County | Precision Tradework",
    metaDescription: "Professional flooring installation in Barrie, Simcoe County and Muskoka. Hardwood, vinyl, laminate, tile. Quality installation guaranteed."
  },
  {
    slug: "kitchens",
    title: "Kitchens",
    shortDescription: "Countertop and cabinetry supply and installation",
    fullDescription: "Complete kitchen transformation services including countertop and cabinetry supply and installation. We help you create a functional, beautiful kitchen that serves as the heart of your home.",
    features: [
      "Cabinet installation",
      "Cabinet supply and install",
      "Countertop installation",
      "Countertop supply and install",
      "Kitchen hardware",
      "Pantry systems",
      "Kitchen islands"
    ],
    icon: "ChefHat",
    image: "/images/services/kitchen.png",
    metaTitle: "Kitchen Cabinets & Countertops in Barrie | Precision Tradework",
    metaDescription: "Kitchen cabinet and countertop installation in Barrie, Simcoe County and Muskoka. Supply and install services available. Request a consultation."
  },
  {
    slug: "painting",
    title: "Painting & Finishing",
    shortDescription: "Interior painting and stair refinishing",
    fullDescription: "Professional painting and finishing services to complete your renovation. From fresh interior paint to beautiful stair refinishing, we deliver clean, lasting finishes that transform your space.",
    features: [
      "Interior painting",
      "Stair refinishing",
      "Cabinet painting",
      "Trim painting",
      "Ceiling painting",
      "Drywall repair and paint",
      "Color consultation"
    ],
    icon: "PaintBucket",
    image: "/images/services/painting-finishing.png",
    metaTitle: "Painting & Stair Refinishing in Barrie | Precision Tradework",
    metaDescription: "Professional interior painting and stair refinishing in Barrie, Simcoe County and Muskoka. Quality finishes for your home. Request a consultation."
  }
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(s => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return services.map(s => s.slug);
}
