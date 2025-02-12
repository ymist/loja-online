/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
module.exports = {
	darkMode: ["class"],
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",

		// Or if using `src` directory:
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
		colors: {
			palette: {
				primary: {
					main: "#1a907f",
					dark: "#0e635a",
					light: "#4ab5a9",
				},
				secondary: {
					main: "#ff6600",
					dark: "#cc5200",
					light: "#ff8533",
				},
				tertiary: {
					main: "#bdebd6",
					dark: "#91c9b7",
					light: "#e6fff5",
				},
				base: {
					main: "white",
					dark: "#000",
					gray500: "#c2c2c2",
					gray100: "#dee2e6",
					danger: "red",
					gray: {
						100: "#f8f9fa",
						200: "#f2f3f5",
						300: "#ebeef0",
						400: "#e5e8eb",
						500: "#dee2e6",
						600: "#b2b5b8",
						700: "#85888a",
						800: "#595a5c",
						900: "#2c2d2e",
					},
					gold: "#fd9e02",
				},
			},
			text: {
				dark: {
					primary: "#101026",
					secondary: "#1d1d2e",
					grey_900: "#212529",
				},
				light: {
					primary: "#fff",
				},
			},
		},
		fontFamily: {},
	},
	plugins: [
		require("tailwindcss-animate"),
		require("daisyui"),
		nextui({
			themes: {
				light: {
					colors: {
						background: "#FFFFFF", // or DEFAULT
						foreground: "#11181C", // or 50 to 900 DEFAULT
						secondary: {
							50: "#e6f1fe",
							100: "#cce3fd",
							200: "#99c7fb",
							300: "#66aaf9",
							400: "#338ef7",
							500: "#006FEE",
							600: "#005bc4",
							700: "#004493",
							800: "#002e62",
							900: "#001731",
							DEFAULT: "#006FEE",
							foreground: "#ffffff",
						},
					},
				},
				dark: {
					colors: {
						background: "#000000", // or DEFAULT
						foreground: "#ECEDEE", // or 50 to 900 DEFAULT
						secondary: {
							50: "#e6f1fe",
							100: "#cce3fd",
							200: "#99c7fb",
							300: "#66aaf9",
							400: "#338ef7",
							500: "#006FEE",
							600: "#005bc4",
							700: "#004493",
							800: "#002e62",
							900: "#001731",
							DEFAULT: "#006FEE",
							foreground: "#ffffff",
						},
					},
					// ... rest of the colors
				},
				mytheme: {
					// custom theme
					extend: "dark",
					colors: {
						primary: {
							DEFAULT: "#BEF264",
							foreground: "#000000",
						},
						focus: "#BEF264",
					},
				},
			},
		}),
	],
};
