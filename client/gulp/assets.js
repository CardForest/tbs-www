gulp.task('assets', function () {
  return gulp.src(__dirname + '/../assets/**/*')
    // TODO (maybe) gulp-imagemin + gulp-cache
    .pipe($.newer(deployDir + '/assets'))
    .pipe(gulp.dest(deployDir + '/assets'));
});
