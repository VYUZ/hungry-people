const { src, dest } = require("gulp");

//Конфигурация
const path = require("../config/path.js");
const app = require("../config/app.js");

//Плагины
const plumber = require("gulp-plumber"); //перехватчик ошибок
const notify = require("gulp-notify"); //обработчик ошибок и вывод сообщений для plumber
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const webp = require("gulp-webp");
const gulpif = require("gulp-if");

//Обработка Image
const img = () => {
  return src(path.img.src)
    .pipe(
      plumber({
        errorHandler: notify.onError((error) => ({
          title: "Image",
          message: error.message,
        })),
      })
    )
    .pipe(newer(path.img.dest))
    .pipe(dest(path.img.dest))
    .pipe(src(path.img.src))
    .pipe(newer(path.img.dest))
    .pipe(webp())
    .pipe(gulpif(app.isProd, imagemin(app.imagemin)))
    .pipe(dest(path.img.dest));
};

module.exports = img;
