import rename from "gulp-rename";
import cleanCss from "gulp-clean-css"; //Сжатие CSS файла
import autoprefixer from "gulp-autoprefixer"; //Добавление вендорных префиксов
import groupCssMediaQueries from "gulp-group-css-media-queries"; //Группировка медиазапросов
// import concat from "gulp-concat"; // Конкатенация в один файл

export const css = () => {
  return (
    app.gulp
      .src(app.path.src.css, { sourcemaps: app.isDev })
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: "CSS",
            message: "Error: <%= error.message %>",
          })
        )
      )
      // .pipe(concat("style.css")) //Раскомментить, если работаю без sass, а просто с css и надо конкатенировать в один файл
      .pipe(app.plugins.if(app.isBuild, groupCssMediaQueries()))
      //.pipe(app.gulp.dest(app.path.build.css)) // Раскомментировать, если нужен не сжатый дубль файла стилей
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
      .pipe(rename({ extname: ".min.css" }))
      .pipe(app.gulp.dest(app.path.build.css))
      .pipe(app.plugins.browsersync.stream())
  );
};
