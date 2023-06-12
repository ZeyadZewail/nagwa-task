/** @type {import('tailwindcss').Config} */
import theme from "./src/Constants/theme.ts";

export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				...theme,
			},
		},
	},
	plugins: [],
};
