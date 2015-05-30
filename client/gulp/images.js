gulp.task('images', function () {
  return gulp.src(__dirname + '/../images/**/*')
    // TODO (maybe) gulp-imagemin + gulp-cache
    .pipe($.newer(deployDir + '/images'))
    .pipe(gulp.dest(deployDir + '/images'));
});
