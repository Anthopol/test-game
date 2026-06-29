import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'src/main.js',
      output: {
        entryFileNames: 'bundle.js',
        format: 'iife'
      }
    }
  },
  server: {
    port: 3000
  }
});