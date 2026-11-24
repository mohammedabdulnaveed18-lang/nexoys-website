import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useServerFn } from "@tanstack/react-start";
import { AlertCircle, ArrowRight, Compass, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  careerCountries,
  careerExperience,
  careerInquirySchema,
  careerServices,
  type CareerInquiry,
} from "@/lib/inquiries";
import { submitCareerInquiry } from "@/lib/inquiries.functions";
import { FieldShell, Honeypot, SelectInput, TextArea, TextInput } from "./FormParts";
import { InquiryCard } from "./InquiryCard";

const empty: CareerInquiry = {
  name: "",
  email: "",
  phone: "",
  currentRole: "",
  targetRole: "",
  experience: "" as CareerInquiry["experience"],
  service: "" as CareerInquiry["service"],
  targetCountry: "" as CareerInquiry["targetCountry"],
  details: "",
  website: "",
};

export function CareerInquiryForm({
  defaultService,
  selectionKey,
  idPrefix = "career",
}: {
  defaultService?: string | undefined;
  /** Changes whenever a plan button is clicked, so the plan is re-applied even if unchanged. */
  selectionKey?: number;
  idPrefix?: string;
}) {
  const submit = useServerFn(submitCareerInquiry);
  const [reference, setReference] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CareerInquiry>({ resolver: zodResolver(careerInquirySchema), defaultValues: empty, mode: "onTouched" });

  useEffect(() => {
    if (defaultService && (careerServices as readonly string[]).includes(defaultService)) {
      setValue("service", defaultService as CareerInquiry["service"], { shouldValidate: true });
    }
  }, [defaultService, selectionKey, setValue]);

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    try {
      const res = await submit({ data: values });
      if (res.ok) {
        setReference(res.reference);
        reset(empty);
      } else setServerError(res.error);
    } catch {
      setServerError("Please check the highlighted fields and try again.");
    }
  });

  const id = (n: string) => `${idPrefix}-${n}`;

  return (
    <InquiryCard
      icon={Compass}
      eyebrow="Career Solutions"
      title="Request your career consultation"
      subtitle="Resume, LinkedIn, job matching, applications and interviews."
      reference={reference}
      successTitle="Consultation request received"
      successText="Thank you — a career consultant will review your profile and goals and contact you by email or phone to plan the next step."
      onReset={() => setReference(null)}
    >
      <form onSubmit={onSubmit} noValidate className="relative grid gap-5 sm:grid-cols-2" aria-label="Career Solutions inquiry form">
        <Honeypot {...register("website")} />
        <FieldShell id={id("name")} label="Full name" required error={errors.name?.message}>
          <TextInput id={id("name")} autoComplete="name" placeholder="Rahul Sharma" invalid={!!errors.name} {...register("name")} />
        </FieldShell>
        <FieldShell id={id("email")} label="Email" required error={errors.email?.message}>
          <TextInput id={id("email")} type="email" autoComplete="email" placeholder="you@email.com" invalid={!!errors.email} {...register("email")} />
        </FieldShell>
        <FieldShell id={id("phone")} label="Phone number" required error={errors.phone?.message}>
          <TextInput id={id("phone")} type="tel" autoComplete="tel" placeholder="+1 555 123 4567" invalid={!!errors.phone} {...register("phone")} />
        </FieldShell>
        <FieldShell id={id("experience")} label="Experience" required error={errors.experience?.message}>
          <Controller
            name="experience"
            control={control}
            render={({ field }) => (
              <SelectInput
                id={id("experience")}
                options={careerExperience}
                placeholder="Years of experience"
                invalid={!!errors.experience}
                name={field.name}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                onBlur={field.onBlur}
              />
            )}
          />
        </FieldShell>
        <FieldShell id={id("currentRole")} label="Current job role" required error={errors.currentRole?.message}>
          <TextInput id={id("currentRole")} autoComplete="organization-title" placeholder="e.g. Java Developer" invalid={!!errors.currentRole} {...register("currentRole")} />
        </FieldShell>
        <FieldShell id={id("targetRole")} label="Target job role" required error={errors.targetRole?.message}>
          <TextInput id={id("targetRole")} placeholder="e.g. Senior Software Engineer" invalid={!!errors.targetRole} {...register("targetRole")} />
        </FieldShell>
        <FieldShell id={id("service")} label="Required service" required error={errors.service?.message}>
          <Controller
            name="service"
            control={control}
            render={({ field }) => (
              <SelectInput
                id={id("service")}
                options={careerServices}
                placeholder="Choose a service or plan"
                invalid={!!errors.service}
                name={field.name}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                onBlur={field.onBlur}
              />
            )}
          />
        </FieldShell>
        <FieldShell id={id("targetCountry")} label="Target country" required error={errors.targetCountry?.message}>
          <Controller
            name="targetCountry"
            control={control}
            render={({ field }) => (
              <SelectInput
                id={id("targetCountry")}
                options={careerCountries}
                placeholder="Where are you applying?"
                invalid={!!errors.targetCountry}
                name={field.name}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                onBlur={field.onBlur}
              />
            )}
          />
        </FieldShell>
        <FieldShell id={id("details")} label="Additional details" className="sm:col-span-2" error={errors.details?.message}>
          <TextArea
            id={id("details")}
            rows={4}
            placeholder="Anything that helps us prepare: visa or sponsorship needs, preferred locations, remote work, current job-search challenges…"
            invalid={!!errors.details}
            {...register("details")}
          />
        </FieldShell>
        {serverError && (
          <p role="alert" className="flex items-center gap-2 rounded-xl border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-danger sm:col-span-2">
            <AlertCircle className="h-4 w-4 shrink-0" /> {serverError}
          </p>
        )}
        <Button type="submit" variant="gold" size="xl" disabled={isSubmitting} className="group w-full sm:col-span-2">
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" /> Sending request…
            </>
          ) : (
            <>
              Submit Request <ArrowRight className="transition-transform duration-500 group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </form>
    </InquiryCard>
  );
}
