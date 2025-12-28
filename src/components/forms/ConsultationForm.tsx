"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { Button, Input, Select, Textarea } from "@/components/ui";

const consultationSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  projectType: z.string().min(1, "Please select a project type"),
  budgetRange: z.string().min(1, "Please select a budget range"),
  timeline: z.string().min(1, "Please select a timeline"),
  projectDescription: z
    .string()
    .min(20, "Please describe your project (at least 20 characters)"),
  address: z.string().optional(),
  inServiceArea: z.boolean().refine((val) => val === true, {
    message: "We currently only serve Barrie, Simcoe County, and Muskoka",
  }),
  referralSource: z.string().optional(),
  website: z.string().optional(),
});

type ConsultationFormData = z.infer<typeof consultationSchema>;

const projectTypeOptions = [
  { value: "framing", label: "Framing" },
  { value: "drywall", label: "Drywall" },
  { value: "trim-carpentry", label: "Trim Carpentry" },
  { value: "flooring", label: "Flooring" },
  { value: "kitchen", label: "Kitchen" },
  { value: "painting", label: "Painting & Finishing" },
  { value: "multiple", label: "Multiple Services" },
  { value: "other", label: "Other" },
];

const budgetOptions = [
  { value: "under-5k", label: "Under $5,000" },
  { value: "5k-10k", label: "$5,000 - $10,000" },
  { value: "10k-25k", label: "$10,000 - $25,000" },
  { value: "25k-50k", label: "$25,000 - $50,000" },
  { value: "50k-plus", label: "$50,000+" },
  { value: "unsure", label: "Not sure yet" },
];

const timelineOptions = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-2-months", label: "Within 1-2 months" },
  { value: "3-6-months", label: "Within 3-6 months" },
  { value: "flexible", label: "Flexible / Just planning" },
];

const referralOptions = [
  { value: "google", label: "Google Search" },
  { value: "referral", label: "Friend or Family" },
  { value: "social", label: "Social Media" },
  { value: "other", label: "Other" },
];

const STEPS = [
  { id: 1, title: "Contact" },
  { id: 2, title: "Project" },
  { id: 3, title: "Details" },
];

// Fields to validate per step
const stepFields: Record<number, (keyof ConsultationFormData)[]> = {
  1: ["name", "phone", "email"],
  2: ["projectType", "budgetRange", "timeline", "projectDescription"],
  3: ["inServiceArea"],
};

export function ConsultationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm<ConsultationFormData>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      inServiceArea: false,
    },
    mode: "onTouched",
  });

  const nextStep = async () => {
    const fields = stepFields[currentStep];
    const isValid = await trigger(fields);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data: ConsultationFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setIsSuccess(true);
      reset();
    } catch {
      setSubmitError(
        "There was an error submitting your request. Please try again or call us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-dark-800 border border-dark-700 rounded-xl p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-success/10 rounded-full">
            <CheckCircle className="w-12 h-12 text-success" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-neutral-100 mb-2">
          Thank You!
        </h3>
        <p className="text-neutral-300 mb-6">
          We&apos;ve received your consultation request and will get back to you
          within 24 hours.
        </p>
        <Button
          variant="secondary"
          onClick={() => {
            setIsSuccess(false);
            setCurrentStep(1);
          }}
        >
          Submit Another Request
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-dark-800 border border-dark-700 rounded-xl p-6 md:p-8"
    >
      {/* Step Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                    currentStep >= step.id
                      ? "bg-primary-500 text-dark-950"
                      : "bg-dark-700 text-neutral-400"
                  }`}
                >
                  {currentStep > step.id ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    step.id
                  )}
                </div>
                <span
                  className={`text-xs mt-2 ${
                    currentStep >= step.id
                      ? "text-primary-500"
                      : "text-neutral-500"
                  }`}
                >
                  {step.title}
                </span>
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={`h-0.5 flex-1 mx-2 -mt-6 transition-colors ${
                    currentStep > step.id ? "bg-primary-500" : "bg-dark-700"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <h2 className="text-2xl font-bold text-neutral-100 mb-2">
        Request a Consultation
      </h2>
      <p className="text-neutral-400 mb-6">
        {currentStep === 1 && "How can we reach you?"}
        {currentStep === 2 && "Tell us about your project"}
        {currentStep === 3 && "Almost done!"}
      </p>

      {submitError && (
        <div className="mb-6 p-4 bg-error/10 border border-error/30 rounded-lg text-error">
          {submitError}
        </div>
      )}

      {/* Honeypot field */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      {/* Step 1: Contact Information */}
      <div className={currentStep === 1 ? "block" : "hidden"}>
        <div className="space-y-4">
          <Input
            label="Full Name *"
            id="name"
            placeholder="Your name"
            autoComplete="name"
            {...register("name")}
            error={errors.name?.message}
          />
          <Input
            label="Phone Number *"
            id="phone"
            type="tel"
            placeholder="705-555-1234"
            autoComplete="tel"
            {...register("phone")}
            error={errors.phone?.message}
          />
          <Input
            label="Email Address *"
            id="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            {...register("email")}
            error={errors.email?.message}
          />
        </div>
      </div>

      {/* Step 2: Project Details */}
      <div className={currentStep === 2 ? "block" : "hidden"}>
        <div className="space-y-4">
          <Select
            label="Type of Project *"
            id="projectType"
            options={projectTypeOptions}
            placeholder="Select a project type"
            {...register("projectType")}
            error={errors.projectType?.message}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Budget Range *"
              id="budgetRange"
              options={budgetOptions}
              placeholder="Select budget range"
              {...register("budgetRange")}
              error={errors.budgetRange?.message}
            />
            <Select
              label="Timeline *"
              id="timeline"
              options={timelineOptions}
              placeholder="Select timeline"
              {...register("timeline")}
              error={errors.timeline?.message}
            />
          </div>
          <Textarea
            label="Describe Your Project *"
            id="projectDescription"
            placeholder="Tell us about your project, what you're looking to accomplish, and any specific requirements..."
            {...register("projectDescription")}
            error={errors.projectDescription?.message}
          />
        </div>
      </div>

      {/* Step 3: Additional Details */}
      <div className={currentStep === 3 ? "block" : "hidden"}>
        <div className="space-y-4">
          <Input
            label="Project Address (optional)"
            id="address"
            placeholder="Street address, city"
            autoComplete="street-address"
            {...register("address")}
          />
          <Select
            label="How did you hear about us?"
            id="referralSource"
            options={referralOptions}
            placeholder="Select an option"
            {...register("referralSource")}
          />
          <div className="pt-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="mt-1 w-5 h-5 rounded border-dark-600 bg-dark-900 text-primary-500 focus:ring-primary-500 focus:ring-offset-dark-800"
                {...register("inServiceArea")}
              />
              <span className="text-neutral-300 text-sm">
                I confirm my project is in Barrie, Simcoe County, or Muskoka *
              </span>
            </label>
            {errors.inServiceArea && (
              <p className="mt-1 text-sm text-error">
                {errors.inServiceArea.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4 mt-8">
        {currentStep > 1 && (
          <Button
            type="button"
            variant="secondary"
            onClick={prevStep}
            className="flex-1"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        )}

        {currentStep < 3 ? (
          <Button
            type="button"
            onClick={nextStep}
            className={currentStep === 1 ? "w-full" : "flex-1"}
          >
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            type="submit"
            className="flex-1"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              "Request Consultation"
            )}
          </Button>
        )}
      </div>

      <p className="mt-4 text-xs text-neutral-400 text-center">
        By submitting, you agree to our{" "}
        <a href="/privacy" className="text-primary-500 hover:underline">
          Privacy Policy
        </a>
      </p>
    </form>
  );
}
