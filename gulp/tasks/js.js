import webpack from "webpack-stream";
import babel from "gulp-babel";
import rename from "gulp-rename";

export const js = () => {
  return (
    app.gulp
      .src(app.path.src.js, { sourcemaps: app.isDev })
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: "JS",
            message: "Error: <%= error.message %>",
          })
        )
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
      .pipe(
        webpack({
          mode: app.isBuild ? "production" : "development",
          output: {
            filename: "scripts.min.js",
          },
        })
      )
      .pipe(app.gulp.dest(app.path.build.js))
      // .pipe(uglify())
      // .pipe(rename({ suffix: ".min" }))
      // .pipe(app.gulp.dest(app.path.build.js)) Не получается одновременно использовать webpack и uglify
      .pipe(app.plugins.browsersync.stream())
  );
};
