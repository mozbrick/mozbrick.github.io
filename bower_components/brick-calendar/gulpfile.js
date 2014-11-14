/* jshint node:true */
var bump = require('gulp-bump');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var ghpages = require('gulp-gh-pages');
var gulp = require('gulp');
var helptext = require('gulp-helptext');
var jshint = require('gulp-jshint');
var stylus = require('gulp-stylus');

var paths = {
  'main': 'src/brick-calendar.html',
  'scripts': 'src/*.js',
  'stylesheets': 'src/*.styl',
  'src': 'src/*',
  'index': 'index.html',
  'bowerComponents': 'bower_components/**/*',
  'testfiles': ['test/*', 'bower_components/webcomponentsjs/webcomponents.js']
};

gulp.task('lint', function() {
  gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('styles', function() {
  gulp.src(paths.stylesheets)
    .pipe(stylus())
    .pipe(concat('brick-calendar.css'))
    .pipe(gulp.dest('src'));
});

// build scripts and styles
gulp.task('build', ['lint','styles']);


gulp.task('connect', function() {
  connect.server({
    port: 3001
  });
});


gulp.task('watch', function () {
  gulp.watch(paths.scripts, ['lint']);
  gulp.watch(paths.stylesheets, ['styles']);
});

// do a build, start a server, watch for changes
gulp.task('server', ['build','connect','watch']);

// Bump up the Version (patch)
gulp.task('bump', function(){
  gulp.src(['bower.json','package.json'])
  .pipe(bump())
  .pipe(gulp.dest('./'));
});

gulp.task('help', helptext({
  'default': 'Shows the help message',
  'help': 'This help message',
  'styles': 'Compiles stylus',
  'lint': 'Runs JSHint on your code',
  'server': 'Starts the development server',
  'test': 'Runs the tests',
  'bump': 'Bumps up the Version',
  'deploy': 'Publish to Github pages'
}));

// publish to gh pages
gulp.task('deploy', function () {
  gulp.src([
    paths.index,
    paths.src,
    paths.bowerComponents
  ],{base:'./'})
    .pipe(ghpages());
});

gulp.task('default', ['help']);
