import { defineConfig } from "vite";
export default defineConfig(({ mode }) => ({
  build: {
    outDir:
      mode === "video-test"
        ? ".test-build"
        : mode === "components"
          ? "dist/components"
          : "dist",
    ...(mode === "components" || mode === "video-test"
      ? {
          lib: {
            entry:
              mode === "components"
                ? "portfolio-parts/index.js"
                : "tests/video-entry.js",
            formats: ["es"],
            fileName: mode === "components" ? "portfolio-parts" : "VideoCard",
          },
        }
      : {}),
    rollupOptions: {
      external:
        mode === "components" || mode === "video-test"
          ? ["react", "react/jsx-runtime"]
          : [],
      output: { banner: '"use client";' },
      onwarn(warning, warn) {
        if (warning.code === "MODULE_LEVEL_DIRECTIVE") return;
        warn(warning);
      },
    },
  },
}));
