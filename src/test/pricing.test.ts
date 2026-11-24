import { describe, expect, it } from "vitest";
import { plans } from "@/lib/pricing";

const byId = (id: string) => plans.find((p) => p.id === id)!;

describe("Career plan pricing", () => {
  it("there are exactly three plans: Foundation, Sprint, Complete", () => {
    expect(plans.map((p) => p.id)).toEqual(["foundation", "sprint", "complete"]);
  });
  it("Foundation is $79", () => {
    expect(byId("foundation").price).toBe(79);
  });
  it("Sprint is $179 and is the most popular plan", () => {
    expect(byId("sprint").price).toBe(179);
    expect(byId("sprint").popular).toBe(true);
  });
  it("Complete is $269", () => {
    expect(byId("complete").price).toBe(269);
  });
});
