export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  icon: string;
  image: string;
  metaTitle: string;
  metaDescription: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
  rating: number;
  service?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budgetRange: string;
  timeline: string;
  projectDescription: string;
  address?: string;
  inServiceArea: boolean;
  referralSource?: string;
}
