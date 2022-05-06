const { src, dest } = require("gulp");

//Конфигурация
const path = require("../config/path.js");

//Плагины
const plumber = require("gulp-plumber"); //перехватчик ошибок
const notify = require("gulp-notify"); //обработчик ошибок и вывод сообщений для plumber
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const app = require("../config/app.js");

//Обработка JavaScript
const js = () => {
  return src(path.js.src, { sourcemaps: app.isDev })
    .pipe(
      plumber({
        errorHandler: notify.onError((error) => ({
          title: "JavaScript",
          message: error.message,
        })),
      })
    )
    .pipe(
      babel({
        presets: [
          [
            "@babel/env",
            {
              targets: {
                // The % refers to the global coverage of users from browserslist
                browsers: ["last 2 versions", "> 0.25%, not dead"],
              },
            },
          ],
        ],
      })
    )
    .pipe(uglify())
    .pipe(dest(path.js.dest, { sourcemaps: app.isDev }));
};

module.exports = js;
