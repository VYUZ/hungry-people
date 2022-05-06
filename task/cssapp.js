const { src, dest } = require("gulp");

//Конфигурация
const path = require("../config/path.js");

//Плагины
const plumber = require("gulp-plumber"); //перехватчик ошибок
const notify = require("gulp-notify"); //обработчик ошибок и вывод сообщений для plumber

//Обработка CSSAPP
const cssapp = () => {
  return src(path.cssapp.src)
    .pipe(
      plumber({
        errorHandler: notify.onError((error) => ({
          title: "CSSAPP",
          message: error.message,
        })),
      })
    )
    .pipe(dest(path.cssapp.dest));
};

module.exports = cssapp;
