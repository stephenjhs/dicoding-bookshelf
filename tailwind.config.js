const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: ["./*.html", "./dist/js/*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Source Sans Pro", ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [],
}