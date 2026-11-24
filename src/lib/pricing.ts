export type Plan = {
  id: "foundation" | "sprint" | "complete";
  label: string;
  heading: string;
  blurb: string;
  popular?: boolean;
  price: number;
  note: string;
  features: string[];
};

export const plans: Plan[] = [
  {
    id: "foundation",
    label: "Foundation",
    heading: "Build your career foundation.",
    blurb: "Get your profile ready for a stronger job search.",
    price: 79,
    note: "A simple starting point",
    features: [
      "Career/profile assessment",
      "Resume optimization",
      "ATS optimization",
      "LinkedIn optimization",
      "Job-search strategy",
      "Target-role guidance",
    ],
  },
  {
    id: "sprint",
    label: "Sprint",
    heading: "Actively manage your job search.",
    blurb: "Hands-on support for an active job search.",
    popular: true,
    price: 179,
    note: "Hands-on active search",
    features: [
      "Everything in Foundation",
      "Targeted job matching",
      "Job-specific resume customization",
      "Cover letters where useful",
      "Managed application assistance",
      "Application tracking",
      "Weekly progress reports",
      "Up to 10 targeted applications/day",
    ],
  },
  {
    id: "complete",
    label: "Complete",
    heading: "Support from search to offer.",
    blurb: "Priority support through applications, interviews and offers.",
    price: 269,
    note: "Comprehensive support",
    features: [
      "Everything in Sprint",
      "Priority support",
      "Interview preparation",
      "Mock interview support",
      "Recruiter follow-up",
      "Offer & salary support",
    ],
  },
];
