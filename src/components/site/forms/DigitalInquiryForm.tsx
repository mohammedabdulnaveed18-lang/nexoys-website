import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useServerFn } from "@tanstack/react-start";
import { AlertCircle, ArrowRight, Code2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  digitalBudgets,
  digitalInquirySchema,
  digitalServices,
  digitalTimelines,
  type DigitalInquiry,
} from "@/lib/inquiries";
import { submitDigitalInquiry } from "@/lib/inquiries.functions";
import { FieldShell, Honeypot, SelectInput, TextArea, TextInput } from "./FormParts";
import { InquiryCard } from "./InquiryCard";

const empty: DigitalInquiry = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "" as DigitalInquiry["service"],
  budget: "" as DigitalInquiry["budget"],
  timeline: "",
  details: "",
  website: "",
};

export function DigitalInquiryForm({ defaultService, idPrefix = "digital" }: { defaultService?: string | undefined; idPrefix?: string }) {
  const submit = useServerFn(submitDigitalInquiry);
  const [reference, setReference] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<DigitalInquiry>({ resolver: zodResolver(digitalInquirySchema), defaultValues: empty, mode: "onTouched" });

  useEffect(() => {
    if (defaultService && (digitalServices as readonly string[]).includes(defaultService)) {
      setValue("service", defaultService as DigitalInquiry["service"], { shouldValidate: true });
    }
  }, [defaultService, setValue]);

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
      icon={Code2}
      eyebrow="Digital Solutions"
      title="Tell us about your project"
      subtitle="Websites, landing pages and custom web applications."
      reference={reference}
      successTitle="Project request received"
      successText="Thank you — our digital team will review your project details and contact you by email or phone to discuss the next step."
      onReset={() => setReference(null)}
    >
      <form onSubmit={onSubmit} noValidate className="relative grid gap-5 sm:grid-cols-2" aria-label="Digital Solutions inquiry form">
        <Honeypot {...register("website")} />
        <FieldShell id={id("name")} label="Full name" required error={errors.name?.message}>
          <TextInput id={id("name")} autoComplete="name" placeholder="Jane Smith" invalid={!!errors.name} {...register("name")} />
        </FieldShell>
        <FieldShell id={id("email")} label="Email" required error={errors.email?.message}>
          <TextInput id={id("email")} type="email" autoComplete="email" placeholder="jane@company.com" invalid={!!errors.email} {...register("email")} />
        </FieldShell>
        <FieldShell id={id("phone")} label="Phone number" required error={errors.phone?.message}>
          <TextInput id={id("phone")} type="tel" autoComplete="tel" placeholder="+1 555 123 4567" invalid={!!errors.phone} {...register("phone")} />
        </FieldShell>
        <FieldShell id={id("company")} label="Company name" error={errors.company?.message}>
          <TextInput id={id("company")} autoComplete="organization" placeholder="Acme Inc." invalid={!!errors.company} {...register("company")} />
        </FieldShell>
        <FieldShell id={id("service")} label="Service required" required error={errors.service?.message}>
          <Controller
            name="service"
            control={control}
            render={({ field }) => (
              <SelectInput
                id={id("service")}
                options={digitalServices}
                placeholder="Choose a service"
                invalid={!!errors.service}
                name={field.name}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                onBlur={field.onBlur}
              />
            )}
          />
        </FieldShell>
        <FieldShell id={id("budget")} label="Budget (USD)" required error={errors.budget?.message}>
          <Controller
            name="budget"
            control={control}
            render={({ field }) => (
              <SelectInput
                id={id("budget")}
                options={digitalBudgets}
                placeholder="Choose a range"
                invalid={!!errors.budget}
                name={field.name}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                onBlur={field.onBlur}
              />
            )}
          />
        </FieldShell>
        <FieldShell id={id("timeline")} label="Timeline" className="sm:col-span-2" error={errors.timeline?.message}>
          <Controller
            name="timeline"
            control={control}
            render={({ field }) => (
              <SelectInput
                id={id("timeline")}
                options={digitalTimelines}
                placeholder="When would you like to launch?"
                allowEmpty
                invalid={!!errors.timeline}
                name={field.name}
                value={field.value ?? ""}
                onChange={(e) => field.onChange(e.target.value)}
                onBlur={field.onBlur}
              />
            )}
          />
        </FieldShell>
        <FieldShell id={id("details")} label="Project details" required className="sm:col-span-2" error={errors.details?.message}>
          <TextArea
            id={id("details")}
            rows={5}
            placeholder="What are you building, who is it for, and what should it achieve? Links to sites you like are helpful."
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
