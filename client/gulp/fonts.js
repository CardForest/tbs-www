gulp.task('fonts', function () {
  return gulp.src(require('main-bower-files')({
    filter: '**/*.{eot,svg,ttf,woff,woff2}',
    paths: __dirname +  '/..'
  }).concat(__dirname + '/../fonts/**/*'))
    .pipe($.newer(deployDir + '/fonts'))
    .pipe(gulp.dest(deployDir + '/fonts'));
});
