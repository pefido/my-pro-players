var gulp = require('gulp');
var flatten = require('gulp-flatten');
var clean = require('gulp-clean');
var connect = require('gulp-connect');
var browserify = require('browserify');
var fs = require('fs');

var cleanTask = () => {
  return (
    gulp.src('./dist/*', { read: false })
      .pipe(clean())
  )
}

var jsTask = () => {
  return (
    browserify({
      entries: 'src/app.js',
    })
      .bundle()
      .pipe(connect.reload())
      .pipe(fs.createWriteStream('./dist/bundle.js'))

  )
}

var cssTask = () => {
  return gulp.src('src/style.css')
    .pipe(
      gulp.dest('./dist/')
    )
}

var templatesTask = () => {
  return (
    gulp
      .src('src/**/*.html')
      .pipe(flatten())
      .pipe(gulp.dest('./dist/'))
      .pipe(connect.reload())
  )
}

var serverTask = (done) => {
  connect.server({
    root: './dist',
    livereload: true,
    fallback: './dist/index.html'
  });
  done();
}

var watchHtml = () => gulp.watch('src/**/*.html', { ignoreInitial: false }, templatesTask);
var watchJs = () => gulp.watch('src/**/*.js', { ignoreInitial: false }, jsTask);
var watchCss = () => gulp.watch('src/**/*.css', { ignoreInitial: false }, cssTask);
var watch = gulp.series(
  cleanTask,
  gulp.parallel(watchHtml, watchJs, watchCss)
);

exports.css = cssTask;
exports.build = gulp.series(
  cleanTask,
  gulp.parallel(jsTask, cssTask, templatesTask)
);
exports.watch = watch
exports.clean = cleanTask
exports.serve = serverTask
exports.default = gulp.parallel(
  serverTask,
  watch
)
