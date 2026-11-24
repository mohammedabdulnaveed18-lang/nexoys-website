import { createServerFn } from "@tanstack/react-start";
import {
  careerInquirySchema,
  digitalInquirySchema,
  inquiryReference,
  type InquiryResult,
} from "@/lib/inquiries";

const FAIL = "We couldn't send your request right now. Please try again, or email us directly.";

export const submitDigitalInquiry = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => digitalInquirySchema.parse(input))
  .handler(async ({ data }): Promise<InquiryResult> => {
    // Silently accept bot submissions without storing them.
    if (data.website) return { ok: true, reference: "CS-D-RECEIVED" };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("digital_inquiries")
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company || null,
        service: data.service,
        budget: data.budget,
        timeline: data.timeline || null,
        details: data.details,
      })
      .select("id")
      .single();
    if (error || !row) {
      console.error("digital inquiry insert failed", error?.message);
      return { ok: false, error: FAIL };
    }
    return { ok: true, reference: inquiryReference("D", row.id) };
  });

export const submitCareerInquiry = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => careerInquirySchema.parse(input))
  .handler(async ({ data }): Promise<InquiryResult> => {
    if (data.website) return { ok: true, reference: "CS-C-RECEIVED" };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("career_inquiries")
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        current_job_role: data.currentRole,
        target_job_role: data.targetRole,
        experience: data.experience,
        service: data.service,
        target_country: data.targetCountry,
        details: data.details || null,
      })
      .select("id")
      .single();
    if (error || !row) {
      console.error("career inquiry insert failed", error?.message);
      return { ok: false, error: FAIL };
    }
    return { ok: true, reference: inquiryReference("C", row.id) };
  });
