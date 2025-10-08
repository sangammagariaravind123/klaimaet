import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
<<<<<<< HEAD
  base: "/",
=======
>>>>>>> 8ecad6747ca7603799d789bcb0cf4ca98e5d4785
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
