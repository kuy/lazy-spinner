var gulp = require('gulp');
var util = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');

var opts = {
  entries: ['./src/index.js'],
  debug: true,
  transform: [babelify],
  cache: {},
  packageCache: {}
};

var b = watchify(browserify(opts));
b.on('update', bundle);
b.on('log', util.log);

function bundle() {
  return b.bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./public/assets'));
}

gulp.task('default', bundle);
