var gulp = require('gulp');
var connect = require('gulp-connect');
var marked = require('gulp-marked');
var rename = require('gulp-rename');
var fs = require('fs');
var footer = require('gulp-footer');
var header = require('gulp-header');

var paths = {
  'docs': 'docs/*.md',
  'pages': './*.md',
  'blog': 'blog/*.md',
  'site': ['header.html', 'footer.html']
};

gulp.task('build', ['docs', 'pages']);

gulp.task('docs', function () {
  var content = {
    footer: fs.readFileSync('footer.html'),
    header: fs.readFileSync('header.html')
  };
  gulp.src(paths.docs)
    .pipe(marked())
    .pipe(rename(function (path) {
      path.extname = '.html';
    }))
    .pipe(header(content.header))
    .pipe(footer(content.footer))
    .pipe(gulp.dest('docs'));
});

gulp.task('pages', function () {
  var content = {
    footer: fs.readFileSync('footer.html'),
    header: fs.readFileSync('header.html')
  };
  gulp.src(paths.pages)
    .pipe(marked())
    .pipe(rename(function (path) {
      path.extname = '.html';
    }))
    .pipe(header(content.header))
    .pipe(footer(content.footer))
    .pipe(gulp.dest('.'));
});

gulp.task('blog', function () {
  var content = {
    footer: fs.readFileSync('footer.html'),
    header: fs.readFileSync('header.html')
  };
  gulp.src(paths.blog)
    .pipe(marked())
    .pipe(rename(function (path) {
      path.extname = '.html';
    }))
    .pipe(header(content.header))
    .pipe(footer(content.footer))
    .pipe(gulp.dest('blog'));
});

gulp.task('connect', function() {
  connect.server({
    port: 3001
  });
});

gulp.task('watch', function() {
  gulp.watch([paths.docs, paths.blog, paths.site], ['build']);
});

gulp.task('server', ['build', 'connect', 'watch']);
