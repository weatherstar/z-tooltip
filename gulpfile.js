var path      = require('path');

var gulp      = require('gulp');
var uglify    = require('gulp-uglify');
var rename    = require('gulp-rename');
var minifycss = require('gulp-minify-css');

var DIST_DIR = path.join(__dirname, 'dist');
var SRC_DIR = path.join(__dirname, 'src');

gulp.task('default', ['build']);

gulp.task('build', ['script', 'css']);

gulp.task('script', function () {
    gulp.src(SRC_DIR + '/*.js')
        .pipe(uglify())
        .pipe(rename({
            suffix: 'min'
        }))
        .pipe(gulp.dest(DIST_DIR))
});

gulp.task('css', function () {
   gulp.src(SRC_DIR + '/*.css')
       .pipe(minifycss())
       .pipe(rename({
           suffix: 'min'
       }))
       .pipe(gulp.dest(DIST_DIR))
});