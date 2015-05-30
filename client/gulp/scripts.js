gulp.task('scripts', function() {
  // Single entry point to browserify
  var workflow = gulp.src(__dirname + '/../scripts/main.js')
    .pipe($.browserify())
    .pipe(gulp.dest('deployDev/scripts'));
  if (live && !prod) {
    workflow = workflow.pipe(bs.stream());
  }
  return workflow;
});
