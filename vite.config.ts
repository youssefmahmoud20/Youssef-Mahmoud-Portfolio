import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks: {
          animation: ["motion/react"],
          icons: [
            "@fortawesome/react-fontawesome",
            "@fortawesome/free-solid-svg-icons",
            "@fortawesome/free-regular-svg-icons",
            "@fortawesome/free-brands-svg-icons",
          ],
          react: ["react", "react-dom", "react-router-dom"],
        },
      },
    },
  },
  server: { port: 5173, strictPort: true },
});
