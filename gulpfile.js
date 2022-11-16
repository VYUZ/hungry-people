// Основной модуль
import gulp from "gulp";
// Импорт путей
import { path } from "./gulp/config/path.js";

// Импорт общих плагинов
import { plugins } from "./gulp/config/plugins.js";

// Передаем значения в глобальную переменную
global.app = {
  isBuild: process.argv.includes("--build"),
  isDev: !process.argv.includes("--build"),
  path: path,
  gulp: gulp,
  plugins: plugins,
};

// Импорт задач
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { css } from "./gulp/tasks/css.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { zip } from "./gulp/tasks/zip.js";

// Наблюдатель за изменениями в файлах
function watcher() {
  gulp.watch(path.watch.files, { delay: 3000 }, copy);
  gulp.watch(path.watch.html, { delay: 3000 }, html);
  gulp.watch(path.watch.scss, { delay: 3000 }, scss);
  gulp.watch(path.watch.js, { delay: 3000 }, js);
  gulp.watch(path.watch.images, { delay: 3000 }, images);
}

// Последовательная обработка шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

// Основные задачи
const mainTasks = gulp.series(fonts, css, gulp.parallel(copy, scss, html, js, images));

// Построение сценариев выполнения задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(build, zip);

// Экспорт сценариев
export { dev };
export { build };
export { deployZIP };

// Выполнение сценария по умолчанию
// gulp.task("default", dev);

//Альтер Выполнение сценария по умолчанию
// exports.default = app.isBuild ? build : dev;
gulp.task("default", app.isBuild ? build : dev);
