import dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";
import cleanCss from "gulp-clean-css"; //Сжатие CSS файла
import webpcss from "gulp-webpcss"; //Вывод WEBP изображений
import autoprefixer from "gulp-autoprefixer"; //Добавление вендорных префиксов
import groupCssMediaQueries from "gulp-group-css-media-queries"; //Группировка медиазапросов
import debug from "gulp-debug"; //Отслеживаем в консоли прохождение плагинов через .pipe

const sass = gulpSass(dartSass);

export const scss = () => {
  return (
    app.gulp
      .src(app.path.src.scss, { sourcemaps: app.isDev })
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: "SCSS",
            message: "Error: <%= error.message %>",
          })
        )
      )
      .pipe(
        sass({
          outputStyle: "expanded",
        })
      )
      .pipe(app.plugins.if(app.isBuild, groupCssMediaQueries()))
      .pipe(
        app.plugins.if(
          app.isBuild,
          webpcss({
            webpClass: ".webp",
            noWebpClass: ".no-webp",
          })
        )
      )
      .pipe(app.plugins.replace(/@img\//g, "../img/"))
      // .pipe(debug({ title: "@img complete" }))
      .pipe(app.gulp.dest(app.path.build.css)) // Раскомментировать, если нужен не сжатый дубль файла стилей
      .pipe(app.plugins.if(app.isBuild, cleanCss()))
      .pipe(
        app.plugins.if(
          app.isBuild,
          autoprefixer({
            overrideBrowserslist: ["last 3 versions", "> 5%"],
            grid: true,
            cascade: true,
          })
        )
      )
      .pipe(app.plugins.if(app.isBuild, rename({ extname: ".min.css" })))
      .pipe(debug({ title: "mincss complete" }))
      .pipe(app.gulp.dest(app.path.build.css))
      .pipe(app.plugins.browsersync.stream())
    // .pipe(browserSync.reload({ stream: true }))
  );
};
