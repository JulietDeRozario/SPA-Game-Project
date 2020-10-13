if (process.env.NODE_ENV === "production") {
  module.exports = {
    plugins: [
      require('postcss-import'),
      require('precss'),
      require("autoprefixer"),
      require("cssnano"),
      // Tous les modules CSS que tu souhaites
    ],
  };
}
