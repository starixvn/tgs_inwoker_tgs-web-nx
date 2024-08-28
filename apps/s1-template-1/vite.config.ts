import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig, searchForWorkspaceRoot } from "vite";

/// <reference types='vitest' />
export default defineConfig({
  cacheDir: "../node_modules/.vite/s1-template-1",

  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    port: 5000, // change your favorite port
    host: "localhost",
    fs: {
      allow: [searchForWorkspaceRoot(process.cwd())],
    },
  },
  preview: {
    port: 4300,
    host: "localhost",
  },

  plugins: [
    react({
      babel: {
        plugins: [
          [
            "babel-plugin-styled-components",
            {
              displayName: true,
              fileName: false,
            },
          ],
        ],
      },
    }),
    nxViteTsPaths(),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  // @ts-ignore
  test: {
    globals: true,
    cache: {
      dir: "../node_modules/.vitest",
    },
    environment: "jsdom",
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
  },
});
