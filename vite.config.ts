import { createReadStream, cpSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";

const configsDir = resolve(process.cwd(), "configs");

export default defineConfig({
  root: "src",
  publicDir: "../public",
  plugins: [{
    name: "serve-configs",
    configureServer(server) {
      server.middlewares.use("/configs", (request, response, next) => {
        const requestedFile = decodeURIComponent(request.url?.split("?")[0].slice(1) ?? "");
        const configFile = resolve(configsDir, requestedFile);

        if (!requestedFile || !configFile.startsWith(`${configsDir}/`) || !existsSync(configFile)) {
          next();
          return;
        }

        response.setHeader("Content-Type", "application/json");
        response.setHeader("Cache-Control", "no-store");
        createReadStream(configFile).pipe(response);
      });
    },
    closeBundle() {
      const outputDir = resolve(process.cwd(), "dist/configs");
      if (existsSync(configsDir)) cpSync(configsDir, outputDir, { recursive: true });
    }
  }],
  build: {
    outDir: "../dist",
    emptyOutDir: true
  }
});