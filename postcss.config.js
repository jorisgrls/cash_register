const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const postcssNested = require("postcss-nested");

module.exports = {
  plugins: [tailwindcss, autoprefixer, postcssNested],
};