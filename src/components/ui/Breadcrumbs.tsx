import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center gap-2 text-sm ${className}`}
    >
      <Link
        href="/"
        className="text-neutral-400 hover:text-primary-500 transition-colors"
        aria-label="Home"
      >
        <Home className="w-4 h-4" />
      </Link>

      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4 text-neutral-600" />
          {item.href ? (
            <Link
              href={item.href}
              className="text-neutral-400 hover:text-primary-500 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-neutral-300">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
