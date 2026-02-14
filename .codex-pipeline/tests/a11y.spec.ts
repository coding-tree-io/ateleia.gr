import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

function summarizeViolations(violations: { id: string; impact: string | null; nodes: Array<unknown> }[]): string {
  if (violations.length === 0) {
    return "No serious or critical accessibility violations found.";
  }

  return violations
    .map((violation) => `${violation.id} (${violation.impact ?? "unknown"}) on ${violation.nodes.length} node(s)`)
    .join("; ");
}

test("homepage has no serious or critical axe violations", async ({ page, baseURL }) => {
  if (!baseURL) {
    throw new Error("BASE_URL is not defined. Set BASE_URL before running npm run a11y:test.");
  }

  await page.goto(baseURL, { waitUntil: "domcontentloaded" });

  const result = await new AxeBuilder({ page }).analyze();
  const blockingViolations = result.violations.filter((violation) => violation.impact === "serious" || violation.impact === "critical");

  expect(blockingViolations, summarizeViolations(blockingViolations)).toHaveLength(0);
});
