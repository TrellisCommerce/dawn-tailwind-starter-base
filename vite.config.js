import { defineConfig } from 'vite';

export default defineConfig({
  root: '.', // Set the root to the project folder
  build: {
    outDir: 'dist', // This can be your output directory for production build
    rollupOptions: {
      input: 'src/entrypoints/index.js', // Set the entry point to your application
    },
  },
  css: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
});
