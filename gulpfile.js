var concat = require('gulp-concat');
var connect = require('gulp-connect');
var footer = require('gulp-footer');
var fs = require('fs');
var gulp = require('gulp');
var header = require('gulp-header');
var marked = require('gulp-markdown');
var rename = require('gulp-rename');
var sort = require('sort-stream');
var pygmetize = require('pygmentize-bundled');

var paths = {
  'blog': 'blog/*.md',
  'componentsDir': './bower_components/',
  'docs': 'docs/*.md',
  'docsDir': './docs/',
  'pages': './*.md',
  'site': ['header.html', 'footer.html']
};

gulp.task('copydocs', function() {
  var readmes = [];
  var files = fs.readdirSync(paths.componentsDir);
  for (var i = 0; i < files.length; i++) {
    if (files[i][0] !== '.' && files[i].substring(0,6) === 'brick-') {
      var path = paths.componentsDir + files[i];
      var stat = fs.statSync(path);
      if (stat.isDirectory) {
        if (fs.existsSync(path + '/readme.md')) {
          readmes.push(path + '/readme.md');
        }
      }
    }
  }
  return gulp.src(readmes, {'base': paths.componentsDir})
    .pipe(rename(function (path){
      var name = path.dirname;
      path.dirname = '.';
      path.basename = name;
    }))
    .pipe(gulp.dest(paths.docsDir));
});

gulp.task('build', ['docs', 'pages', 'blog']);

gulp.task('docs', ['copydocs'], function () {
  var content = {
    footer: fs.readFileSync('footer.html'),
    header: fs.readFileSync('header.html')
  };
  gulp.src(paths.docs)
    .pipe(marked({
      highlight: function (code, lang, callback) {
        pygmetize({ lang: lang, format: 'html' }, code, function (err, result) {
          callback(err, result.toString());
        });
      }
    }))
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
    .pipe(marked({
      highlight: function (code, lang, callback) {
        pygmetize({ lang: lang, format: 'html' }, code, function (err, result) {
          callback(err, result.toString());
        });
      }
    }))
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
    .pipe(sort(function (a, b) {
      return a.path < b.path;
    }))
    .pipe(marked({
      highlight: function (code, lang, callback) {
        pygmetize({ lang: lang, format: 'html' }, code, function (err, result) {
          callback(err, result.toString());
        });
      }
    }))
    .pipe(rename(function (path) {
      path.extname = '.html';
    }))
    .pipe(header('<section>'))
    .pipe(footer('</section>'))
    .pipe(concat('index.html'))
    .pipe(header(content.header))
    .pipe(footer(content.footer))
    .pipe(gulp.dest('blog'));

  gulp.src(paths.blog)
    .pipe(marked({
      highlight: function (code, lang, callback) {
        pygmetize({ lang: lang, format: 'html' }, code, function (err, result) {
          callback(err, result.toString());
        });
      }
    }))
    .pipe(rename(function (path) {
      path.extname = '.html';
    }))
    .pipe(header('<section>'))
    .pipe(footer('</section>'))
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

gulp.task('default', ['server']);
