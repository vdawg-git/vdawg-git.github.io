const { iconsPlugin, getIconCollections } = require("@egoist/tailwindcss-icons")

module.exports = {
	plugins: [
		iconsPlugin({
			collections: getIconCollections(["skill-icons", "pixelarticons"]),
		}),
	],
}
