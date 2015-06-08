var wiredep = require('wiredep').stream;

gulp.task('wiredep', function () {
  gulp.src(__dirname + '/../styles/*.scss')
    .pipe(wiredep({cwd: __dirname + '/..'}))
    .pipe(gulp.dest(__dirname + '/../styles'));

  gulp.src(__dirname + '/../html/*.html')
    .pipe(wiredep({
      cwd: __dirname + '/..',
      exclude: [ 'bower_components/angular[^/]*/.*\.js' ]}))
    .pipe(gulp.dest(__dirname + '/../html'));
});
