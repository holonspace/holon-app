import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import fs from "fs"
import path from "path"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({
    babel: {
      plugins: [['babel-plugin-react-compiler']],
    },
  }), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 443, // HTTPS 通常使用 443 端口，若沒權限可用 5173
    host: 'holonspace.com',
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'holonspace.com+2-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'holonspace.com+2.pem')),
    },
  },
})
