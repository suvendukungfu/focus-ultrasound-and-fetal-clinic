import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/',
  build: {
    target: 'es2015',
    sourcemap: false,
    outDir: 'dist',
    chunkSizeWarningLimit: 650,
  },
  server: {
    host: "0.0.0.0",
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

// System optimization: 2026-05-09

// Contribution optimization: 2026-05-09
