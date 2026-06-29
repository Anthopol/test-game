import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'src/main.js',          // single entry
      output: {
        entryFileNames: 'bundle.js',
        format: 'iife'               // IIFE is fine for a single bundle
        // codeSplitting: false by default – we keep it false
      }
    }
  },
  plugins: [
    viteStaticCopy({
      targets: [
        { src: 'index.html', dest: '.' }
      ]
    })
  ],
  server: {
    port: 3000
  }
});