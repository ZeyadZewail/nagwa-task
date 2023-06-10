/** @type {import('tailwindcss').Config} */
import theme from "./src/constants/theme.ts";

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
