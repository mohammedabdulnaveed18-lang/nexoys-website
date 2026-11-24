import { z } from "zod";

/** Shared, browser-safe inquiry rules used by both the forms and the server. */

export const digitalServices = [
  "Website Design & Development",
  "Business Website",
  "Landing Page",
  "Custom Web Application",
  "Frontend Development",
  "Backend Development",
  "API Development & Integrations",
  "Website Optimization",
  "Maintenance & Support",
  "Not sure yet — need advice",
] as const;

export const digitalBudgets = [
  "Under $1,000",
  "$1,000 – $3,000",
  "$3,000 – $7,500",
  "$7,500 – $15,000",
  "$15,000+",
  "Not sure yet",
] as const;

export const digitalTimelines = ["As soon as possible", "Within 1 month", "1–3 months", "Flexible"] as const;

export const careerServices = ["Foundation Plan", "Sprint Plan", "Complete Plan"] as const;

export const careerExperience = ["0–2 years", "3–5 years", "6–9 years", "10+ years"] as const;

export const careerCountries = ["USA", "Canada", "UK", "More than one"] as const;

const phoneRe = /^[+()\-.\s\d]{7,20}$/;

const name = z.string().trim().min(2, "Please enter your full name").max(100, "Name is too long");
const email = z.string().trim().email("Please enter a valid email address").max(255, "Email is too long");
const phone = z
  .string()
  .trim()
  .regex(phoneRe, "Please enter a valid phone number")
  .refine((v) => v.replace(/\D/g, "").length >= 7, "Please enter a valid phone number");
/** Hidden field real visitors never fill in; bots usually do. */
const honeypot = z.string().max(200).optional();

const oneOf = <T extends readonly [string, ...string[]]>(values: T, message: string) =>
  z.enum(values as unknown as [T[number], ...T[number][]], { errorMap: () => ({ message }) });

export const digitalInquirySchema = z.object({
  name,
  email,
  phone,
  company: z.string().trim().max(150, "Company name is too long").optional().or(z.literal("")),
  service: oneOf(digitalServices, "Please choose the service you need"),
  budget: oneOf(digitalBudgets, "Please choose a budget range"),
  timeline: z.union([oneOf(digitalTimelines, "Please choose a timeline"), z.literal("")]).optional(),
  details: z
    .string()
    .trim()
    .min(20, "Please tell us a little more (at least 20 characters)")
    .max(3000, "Please keep project details under 3000 characters"),
  website: honeypot,
});

export const careerInquirySchema = z.object({
  name,
  email,
  phone,
  currentRole: z.string().trim().min(2, "Please enter your current job role").max(120, "Role is too long"),
  targetRole: z.string().trim().min(2, "Please enter the role you are targeting").max(120, "Role is too long"),
  experience: oneOf(careerExperience, "Please choose your experience"),
  service: oneOf(careerServices, "Please choose the service you need"),
  targetCountry: oneOf(careerCountries, "Please select your target country"),
  details: z.string().trim().max(2000, "Please keep additional details under 2000 characters").optional().or(z.literal("")),
  website: honeypot,
});

export type DigitalInquiry = z.infer<typeof digitalInquirySchema>;
export type CareerInquiry = z.infer<typeof careerInquirySchema>;

export type InquiryResult = { ok: true; reference: string } | { ok: false; error: string };

/** Short, human-friendly reference shown to the visitor after submitting. */
export function inquiryReference(prefix: "D" | "C", id: string): string {
  return `CS-${prefix}-${id.replace(/-/g, "").slice(0, 6).toUpperCase()}`;
}

/** Map a plan id from the pricing cards to the matching career service option. */
export function serviceForPlan(plan: string | undefined): CareerInquiry["service"] | undefined {
  const map: Record<string, CareerInquiry["service"]> = {
    foundation: "Foundation Plan",
    sprint: "Sprint Plan",
    complete: "Complete Plan",
  };
  return plan ? map[plan] : undefined;
}
