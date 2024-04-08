import { nxE2EPreset } from "@nx/cypress/plugins/cypress-preset";
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, { cypressDir: "cypress", bundler: "vite" }),
    baseUrl: 'http://localhost:3000',
  },
  viewportWidth: 1920,
  viewportHeight: 1080,
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});

