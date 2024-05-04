import { defineConfig } from "tsup";

export default defineConfig({
  target: "node18",
  entry: ["src/cli/index.ts"],
  format: ["cjs"],
  minify: true,
  clean: true,
  platform: "node",
  outDir: "dist",
});