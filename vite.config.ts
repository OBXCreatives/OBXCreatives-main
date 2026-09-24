import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const framerWork = fileURLToPath(new URL("./src/framer/Work", import.meta.url));

export default defineConfig({
  // The Framer export ships pre-compiled; keep the React Refresh transform off the 2MB runtime.
  plugins: [react({ exclude: /src[\\/]framer[\\/]Work[\\/].*\.js$/ })],
  resolve: {
    alias: [
      { find: "@framer-work", replacement: framerWork },
      // _framer-runtime.js bundles its own copy of framer-motion (12.39). Resolving the export's
      // `import … from "framer-motion"` to that same copy gives MenuLink's LayoutGroup/variants and
      // the runtime's RichText one shared set of motion contexts. With two copies, every MenuLink's
      // text shares a layoutId across instances and all but one render invisible.
      { find: /^framer-motion$/, replacement: `${framerWork}/_framer-runtime.js` },
    ],
  },
});
