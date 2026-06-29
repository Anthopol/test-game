import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'src/main.js',
        index: 'index.html'   // <-- add this line
      },
      output: {
        entryFileNames: 'bundle.js',
        format: 'iife',
        codeSplitting: true
      }
    }
  },
  server: {
    port: 3000
  }
});