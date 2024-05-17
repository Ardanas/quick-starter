import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/cli.ts', 'src/index.ts'],
  format: ['esm'],
  minify: false,
  clean: true,
  platform: 'node',
  outDir: 'dist',
  dts: true,
})
