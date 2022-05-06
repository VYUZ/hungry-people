const { src, dest } = require("gulp");

//Конфигурация
const path = require("../config/path.js");
const app = require("../config/app.js");

//Плагины
const plumber = require("gulp-plumber"); //перехватчик ошибок
const notify = require("gulp-notify"); //обработчик ошибок и вывод сообщений для plumber
const autoprefixer = require("gulp-autoprefixer");
const csso = require("gulp-csso"); //отличный минификатор
const rename = require("gulp-rename");
const size = require("gulp-size"); //показывает размер
const shorthand = require("gulp-shorthand"); //делает сокращённые формы записей
const groupCssMediaQueries = require("gulp-group-css-media-queries"); //избавляет от дублирования @media
const sass = require("gulp-sass")(require("sass"));
const webpCss = require("gulp-webp-css");
const debug = require("gulp-debug");

//Обработка SCSS
const scss = () => {
  return (
    src(path.scss.src, { sourcemaps: app.isDev })
      .pipe(
        plumber({
          errorHandler: notify.onError((error) => ({
            title: "SCSS",
            message: error.message,
          })),
        })
      )
      //.pipe(debug({ title: "plumber" }))
      .pipe(sass())
      //.pipe(debug({ title: "sass" }))
      .pipe(
        autoprefixer({
          overrideBrowserslist: ["last 3 versions", "> 5%"],
          grid: true,
          cascade: false,
        })
      )
      //.pipe(debug({ title: "autpref" }))
      .pipe(shorthand())
      //.pipe(debug({ title: "short" }))
      .pipe(groupCssMediaQueries())
      //.pipe(debug({ title: "gsmq" }))
      .pipe(webpCss())
      //.pipe(debug({ title: "webpcss" }))
      .pipe(size({ title: "style.css" }))
      //.pipe(debug({ title: "size" }))
      .pipe(dest(path.scss.dest, { sourcemaps: app.isDev }))
      //.pipe(debug({ title: "dest" }))
      .pipe(rename({ suffix: ".min" }))
      //.pipe(debug({ title: "rename" }))
      .pipe(csso())
      //.pipe(debug({ title: "csso" }))
      .pipe(size({ title: "style.min.css" }))
      //.pipe(debug({ title: "size" }))
      .pipe(dest(path.scss.dest, { sourcemaps: app.isDev }))
  );
  //.pipe(debug({ title: "dest" }));
};

module.exports = scss;
