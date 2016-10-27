'use strict';

var gulp = require('gulp');
var minify = require('gulp-minify');

// compress js files
gulp.task('compress', function () {
    gulp.src(['js/*.js', '!js/*.min.js'])
        .pipe(minify({
            ext: '.min.js'
        }))
        .pipe(gulp.dest('js'))
});

// gulp default task
gulp.task('default', ['compress']);