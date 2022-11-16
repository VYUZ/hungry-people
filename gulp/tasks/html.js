import fileInclude from "gulp-file-include";
import webpHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";
import htmlmin from "gulp-htmlmin";
import size from "gulp-size";
import rename from "gulp-rename";
import debug from "gulp-debug";

export const html = () => {
  return (
    app.gulp
      .src(app.path.src.html)
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: "HTML",
            message: "Error: <%= error.message %>",
          })
        )
      )
      .pipe(fileInclude())
      .pipe(debug({ title: "fileInclude" }))
      .pipe(app.plugins.replace(/@img\//g, "img/"))
      // .pipe(debug({ title: "replace" }))
      .pipe(app.plugins.if(app.isBuild, webpHtmlNosvg()))
      // .pipe(debug({ title: "webpHtmlNosvg" }))
      .pipe(
        app.plugins.if(
          app.isBuild,
          versionNumber({
            value: "%DT%",
            append: {
              key: "_v",
              cover: 0,
              to: ["css", "js"],
            },
            output: {
              file: "gulp/version.json",
            },
          })
        )
      )
      .pipe(app.plugins.if(app.isBuild, rename({ extname: ".unresize.htm" })))
      .pipe(app.plugins.if(app.isBuild, app.gulp.dest(app.path.build.html)))
      .pipe(app.plugins.if(app.isBuild, rename({ basename: "index", extname: ".html" })))
      .pipe(app.plugins.if(app.isBuild, size({ title: "До сжатия" })))
      .pipe(app.plugins.if(app.isBuild, htmlmin({ collapseWhitespace: true, removeComments: true })))
      .pipe(app.plugins.if(app.isBuild, size({ title: "После сжатия" })))
      .pipe(app.gulp.dest(app.path.build.html))
      .pipe(app.plugins.browsersync.stream())
  );
};
