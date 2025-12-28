import { cn } from "@/lib/utils";
import { TextareaHTMLAttributes, forwardRef } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
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
        <textarea
          ref={ref}
          id={id}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={errorId}
          className={cn(
            "w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-neutral-100 placeholder:text-neutral-400 transition-colors duration-200 resize-y min-h-[100px] md:min-h-[120px]",
            "focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            {
              "border-error focus:border-error focus:ring-error": error,
            },
            className
          )}
          {...props}
        />
        {error && (
          <p id={errorId} className="mt-1 text-sm text-error" role="alert">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
