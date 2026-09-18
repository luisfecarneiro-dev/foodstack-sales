import { defineConfig, devices } from "@playwright/test";

const externalServer = Boolean(process.env.E2E_BASE_URL);

export default defineConfig({
  testDir: "./tests/e2e",
  use: {
    baseURL: process.env.E2E_BASE_URL ?? "http://127.0.0.1:3100"
  },
  // Sem E2E_BASE_URL: Playwright gerencia o build de produção na porta 3100.
  ...(externalServer
    ? {}
    : {
        webServer: {
          command: "npx next start -H 127.0.0.1 -p 3100",
          url: "http://127.0.0.1:3100",
          reuseExistingServer: true,
          timeout: 60_000
        }
      }),
  projects: [
    { name: "chromium-desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile-chrome", use: { ...devices["Pixel 7"] } }
  ]
});
