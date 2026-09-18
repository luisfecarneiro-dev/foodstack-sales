import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  use: {
    baseURL: process.env.E2E_BASE_URL ?? "http://127.0.0.1:3100"
  },
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: "npx next start -H 127.0.0.1 -p 3100",
        url: "http://127.0.0.1:3100",
        reuseExistingServer: true,
        timeout: 60_000
      },
  projects: [
    { name: "chromium-desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile-chrome", use: { ...devices["Pixel 7"] } }
  ]
});
