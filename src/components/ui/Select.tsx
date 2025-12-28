import { cn } from "@/lib/utils";
import { SelectHTMLAttributes, forwardRef } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, id, options, placeholder, ...props }, ref) => {
    const errorId = error && id ? `${id}-error` : undefined;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-neutral-200 mb-2"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={id}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={errorId}
          className={cn(
            "w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-neutral-100 transition-colors duration-200 appearance-none cursor-pointer",
            "focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            {
              "border-error focus:border-error focus:ring-error": error,
              "text-neutral-400": !props.value,
            },
            className
          )}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239A9A9A'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 12px center",
            backgroundSize: "20px",
          }}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p id={errorId} className="mt-1 text-sm text-error" role="alert">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };
