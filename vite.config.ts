import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import EnvironmentPlugin from "vite-plugin-environment";

export default defineConfig((configEnv) => {
  const isDevelopment = configEnv.mode === "development";

  return {
    plugins: [react(), EnvironmentPlugin(["API_KEY"])],
    resolve: {
      alias: {
        components: resolve(__dirname, "src", "components"),
        hooks: resolve(__dirname, "src", "hooks"),
        styles: resolve(__dirname, "src", "styles"),
        pages: resolve(__dirname, "src", "pages"),
        services: resolve(__dirname, "src", "services"),
        routes: resolve(__dirname, "src", "routes"),
        libs: resolve(__dirname, "src", "libs"),
        types: resolve(__dirname, "src", "types"),
        utils: resolve(__dirname, "src", "utils"),
      },
    },
    css: {
      modules: {
        generateScopedName: isDevelopment
          ? "[name]__[local]__[hash:base64:5]"
          : "[hash:base64:5]",
      },
    },
  };
});
