import { describe, expect, it } from "vitest";
import { careerInquirySchema, careerServices, digitalInquirySchema, inquiryReference, serviceForPlan } from "@/lib/inquiries";

const digital = {
  name: "Jane Smith",
  email: "jane@acme.com",
  phone: "+1 555 123 4567",
  company: "",
  service: "Business Website",
  budget: "$1,000 – $3,000",
  timeline: "",
  details: "We need a five-page business website with a contact form.",
};

const career = {
  name: "Rahul Sharma",
  email: "rahul@example.com",
  phone: "+91 91775 40276",
  currentRole: "Java Developer",
  targetRole: "Senior Software Engineer",
  experience: "3–5 years",
  service: "Sprint Plan",
  targetCountry: "Canada",
  details: "",
};

describe("Digital Solutions inquiry", () => {
  it("accepts a complete request with company name left empty", () => {
    expect(digitalInquirySchema.safeParse(digital).success).toBe(true);
  });
  it("requires a phone number", () => {
    expect(digitalInquirySchema.safeParse({ ...digital, phone: "" }).success).toBe(false);
  });
  it("requires a budget range", () => {
    expect(digitalInquirySchema.safeParse({ ...digital, budget: "" }).success).toBe(false);
  });
  it("requires at least 20 characters of project details", () => {
    expect(digitalInquirySchema.safeParse({ ...digital, details: "A website" }).success).toBe(false);
  });
});

describe("Career Solutions inquiry", () => {
  it("accepts a complete request with additional details left empty", () => {
    expect(careerInquirySchema.safeParse(career).success).toBe(true);
  });
  it("requires current and target job roles", () => {
    expect(careerInquirySchema.safeParse({ ...career, currentRole: "" }).success).toBe(false);
    expect(careerInquirySchema.safeParse({ ...career, targetRole: "" }).success).toBe(false);
  });
  it("rejects an invalid email", () => {
    expect(careerInquirySchema.safeParse({ ...career, email: "rahul@" }).success).toBe(false);
  });
  it("does not accept a digital service as a career service", () => {
    expect(careerInquirySchema.safeParse({ ...career, service: "Business Website" }).success).toBe(false);
  });
});

describe("Career Solutions target country", () => {
  it("is required", () => {
    const r = careerInquirySchema.safeParse({ ...career, targetCountry: "" });
    expect(r.success).toBe(false);
    if (!r.success) expect(r.error.issues[0]?.message).toBe("Please select your target country");
  });
  it("rejects a country outside the list", () => {
    expect(careerInquirySchema.safeParse({ ...career, targetCountry: "Germany" }).success).toBe(false);
  });
});

describe("Career Solutions service options", () => {
  it("offers exactly the three plans and nothing else", () => {
    expect([...careerServices]).toEqual(["Foundation Plan", "Sprint Plan", "Complete Plan"]);
  });
  it("rejects an individual service such as Strategy Review", () => {
    expect(careerInquirySchema.safeParse({ ...career, service: "Strategy Review" }).success).toBe(false);
    expect(careerInquirySchema.safeParse({ ...career, service: "Interview Preparation" }).success).toBe(false);
  });
  it("rejects an empty service choice", () => {
    expect(careerInquirySchema.safeParse({ ...career, service: "" }).success).toBe(false);
  });
});

describe("Inquiry helpers", () => {
  it("choosing the Sprint pricing card preselects the Sprint plan", () => {
    expect(serviceForPlan("sprint")).toBe("Sprint Plan");
  });
  it("references are prefixed by division", () => {
    expect(inquiryReference("D", "abcdef12-3456-7890-abcd-ef1234567890")).toBe("CS-D-ABCDEF");
    expect(inquiryReference("C", "abcdef12-3456-7890-abcd-ef1234567890")).toBe("CS-C-ABCDEF");
  });
});
