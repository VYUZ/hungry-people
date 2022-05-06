const { src, dest } = require("gulp");

//Конфигурация
const path = require("../config/path.js");

//Плагины
const plumber = require("gulp-plumber"); //перехватчик ошибок
const notify = require("gulp-notify"); //обработчик ошибок и вывод сообщений для plumber
const concat = require("gulp-concat");
const cssimport = require("gulp-cssimport");
const autoprefixer = require("gulp-autoprefixer");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const size = require("gulp-size");
const shorthand = require("gulp-shorthand");
const groupCssMediaQueries = require("gulp-group-css-media-queries");
const webpCss = require("gulp-webp-css");
const app = require("../config/app.js");

//Обработка CSS
const css = () => {
  return src(path.css.src, { sourcemaps: app.isDev })
    .pipe(
      plumber({
        errorHandler: notify.onError((error) => ({
          title: "CSS",
          message: error.message,
        })),
      })
    )
    .pipe(concat("style.css"))
    .pipe(cssimport())
    .pipe(webpCss())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 3 versions", "> 5%"],
        grid: true,
        cascade: false,
      })
    )
    .pipe(shorthand())
    .pipe(groupCssMediaQueries())
    .pipe(size({ title: "style.css" }))
    .pipe(dest(path.css.dest, { sourcemaps: app.isDev }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(csso())
    .pipe(size({ title: "style.min.css" }))
    .pipe(dest(path.css.dest, { sourcemaps: app.isDev }));
};

module.exports = css;
