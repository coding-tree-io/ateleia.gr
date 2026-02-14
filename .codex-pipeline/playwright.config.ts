import { defineConfig } from "@playwright/test";

const baseURL = process.env.BASE_URL ?? "https://example.com";

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  expect: {
    timeout: 5_000
  },
  retries: 0,
  use: {
    baseURL,
    headless: true
  },
  reporter: [
    ["list"],
    ["html", { outputFolder: "reports/playwright-html", open: "never" }]
  ]
});
