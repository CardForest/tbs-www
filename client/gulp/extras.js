gulp.task('extras', function () {
  return gulp.src(__dirname + '/../extras/*.*', {
    dot: true
  }).pipe($.newer(deployDir))
    .pipe(gulp.dest(deployDir));
});
