const isProd = process.argv.includes("--production");
const isDev = !isProd;

module.exports = {
  isProd: isProd,
  isDev: isDev,

  htmlmin: {
    collapseWhitespace: isProd,
    removeComments: isProd,
  },

  imagemin: {
    verbose: true,
  },
};
