const { src, dest } = require("gulp");

//Конфигурация
const path = require("../config/path.js");

//Плагины
const plumber = require("gulp-plumber"); //перехватчик ошибок
const notify = require("gulp-notify"); //обработчик ошибок и вывод сообщений для plumber
const newer = require("gulp-newer");

//Обработка Font
const font = () => {
  return src(path.font.src)
    .pipe(
      plumber({
        errorHandler: notify.onError((error) => ({
          title: "Font",
          message: error.message,
        })),
      })
    )
    .pipe(newer(path.font.dest))
    .pipe(dest(path.font.dest));
};

module.exports = font;
