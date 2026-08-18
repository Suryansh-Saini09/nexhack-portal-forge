import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8081,
    proxy: {
      '/api': {
        target: 'http://localhost:5005',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [
    {
      name: 'multi-page-dev-middleware',
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          const url = req.url?.split('?')[0];
          if (url === '/nexhack1' || url === '/nexhack1/' || url?.startsWith('/archives') || url === '/nexhack1-archive') {
            req.url = '/nexhack1/index.html';
          } else if (url === '/nexhack' || url === '/nexhack/') {
            req.url = '/nexhack/index.html';
          } else if (url === '/nexhack2' || url === '/nexhack2/') {
            req.url = '/nexhack2/index.html';
          }
          next();
        });
      }
    },
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        nexhack: path.resolve(__dirname, "nexhack/index.html"),
        nexhack1: path.resolve(__dirname, "nexhack1/index.html"),
        nexhack2: path.resolve(__dirname, "nexhack2/index.html"),
      },
    },
  },
}));
