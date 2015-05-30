global.gulp = require('gulp');
var gutil = require('gulp-util');
global.log = gutil.log;
global.colors = gutil.colors;
global.$ = require('gulp-load-plugins')();
var argv = require('yargs').options(
  {
    'p': {
      alias: ['prod'],
      boolean: true
    },
    'l': {
      alias: ['live', 'reload'],
      boolean: true
    }
  }
).argv;
global.prod = argv.p ? true : false;
global.deployDir = argv.p ? 'deployProd' : 'deployDev';
global.live = process.env.LIVE || argv.l;

log(colors.bold('BUILD MODE: ') + (argv.p ? colors.bgRed : colors.black.bgGreen)((live ? 'live ' : '') +
    ((argv.p ? 'production' : 'development'))));

// load some custom tasks
var fs = require('fs');
var path = require('path');
function loadTasksFromDir(relativePath) {
  var dir = path.join(__dirname, relativePath);
  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).forEach(function (file) {
      require('./' + relativePath + '/' + file);
    });
  } else {
    log('couldn\'t load tasks from ' + relativePath);
  }
}
loadTasksFromDir('client/gulp');

gulp.task('clean', require('del').bind(null, ['deployProd', 'deployDev']));

if (!live) {
  gulp.task('default', ['extras', 'fonts', 'styles', 'html', 'images', 'scripts', 'styles']);
} else { // live build
  global.bs = require('browser-sync').create();
  gulp.task('default', ['nodemon', 'extras', 'fonts', 'styles', 'html', 'images', 'scripts', 'styles'], function (cb) {
    bs.init({
      ghostMode: false,
      open: false,
      notify: false,
      port: 9000,
      proxy: "localhost:9001"
    }, cb);

    //// watch for changes
    var deployWatch = [
      deployDir + '/*.*',
      deployDir + '/fonts/*.*',
      deployDir + '/images/*.*'
    ];
    if (prod) {
      deployWatch.push('!' + deployDir + '/*.html');
    }
    gulp.watch(deployWatch).on('change', bs.reload);

    gulp.watch('client/extras/*.*', ['extras']);
    gulp.watch('client/fonts/**/*', ['fonts']);
    gulp.watch('client/html/*.html', ['html']);
    gulp.watch('client/images/**/*', ['images']);

    if (prod) {
      gulp.watch(['client/scripts/**/*.js', 'client/styles/*.scss'], ['html']);
    } else {
      gulp.watch('client/scripts/**/*.js', ['scripts']);
      gulp.watch('client/styles/*.scss', ['styles']);
    }

    //gulp.watch('bower.json', ['wiredep', 'fonts']);

  });

  var nodemon = require('nodemon');

  gulp.task('nodemon', function (cb) {
    nodemon({
      script: 'server/index.js',
      watch: ['server'],
      ext: 'js'
    }).once('start', cb);
  });
}
