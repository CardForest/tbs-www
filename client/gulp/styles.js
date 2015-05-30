gulp.task('styles', function () {
  var workflow = gulp.src(__dirname + '/../styles/main.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      outputStyle: 'nested', // libsass doesn't support expanded yet
      precision: 10,
      includePaths: [__dirname + '/..'],
      onError: console.error.bind(console, 'Sass error:')
    }))
    .pipe($.postcss([
      require('autoprefixer-core')({browsers: ['last 1 version']})
    ]))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('deployDev/styles'));
  if (live && !prod) {
    workflow = workflow.pipe(bs.stream());
  }
  return workflow;
});
