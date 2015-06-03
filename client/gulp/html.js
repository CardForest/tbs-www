gulp.task('views', function () {
  return gulp.src(__dirname + '/../html/views/**/*.html')
    .pipe($.newer(deployDir))
    .pipe(gulp.dest(deployDir + '/views'));
});

if (prod) {
  gulp.task('html', ['styles', 'scripts'], function () {
    var assets = $.useref.assets();

    var workflow = gulp.src(__dirname + '/../html/*.html')
      .pipe(assets)
      .pipe($.if('*.js', $.uglify()))
      .pipe($.if('*.css', $.csso()))
      .pipe(assets.restore())
      .pipe($.useref())
      .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
      .pipe(gulp.dest(deployDir));
    if (live) {
      workflow = workflow.pipe(bs.stream({match: '**/*.html'}));
    }
    return workflow;
  });
} else {
  gulp.task('html', function () {
    return gulp.src(__dirname + '/../html/*.html')
      .pipe($.newer(deployDir))
      .pipe(gulp.dest(deployDir));
  });
}
