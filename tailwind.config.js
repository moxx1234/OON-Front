/** @type {import('tailwindcss').Config} */
module.exports = {
	prefix: 'tw-',
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		screens: {
			'tall': { raw: '(min-height: 800px)' }
		}
	},
	plugins: [],
}

