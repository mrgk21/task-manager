import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		visualizer({
			gzipSize: true,
			template: "sunburst",
			filename: "stats/bundle.html",
			title: "roll up stats",
		}),
	],
});
