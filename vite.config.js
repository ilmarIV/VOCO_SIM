import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import viteImagemin from "@vheemstra/vite-plugin-imagemin";
import react from "@vitejs/plugin-react";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminPngquant from "imagemin-pngquant";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		viteImagemin({
			plugins: {
				jpg: imageminMozjpeg({ quality: 80 }),
				jpeg: imageminMozjpeg({ quality: 80 }),
				png: imageminPngquant({
					quality: [0.8, 0.9],
					speed: 4,
				}),
			},
		}),
	],
});
