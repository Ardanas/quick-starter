import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/cli.ts'],
  format: ['cjs', 'esm'],
  minify: false,
  clean: true,
  platform: 'node',
  outDir: 'dist',
})
