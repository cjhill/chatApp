var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var del = require('del');
var gulp = require('gulp');
var gulpIf = require('gulp-if');
var imagemin = require('gulp-imagemin');
var path = require('path');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var scsslint = require('gulp-scss-lint');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');

var config = {
    styles: {
        src: 'app/scss/*.scss',
        dest: 'app',
        watch: 'app/scss/**/*.scss',
        browsers: ['last 2 version', 'ie >= 9']
    }
}

gulp.task('sass', function() {
    return gulp.src(config.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .on('error', sass.logError)
        .pipe(autoprefixer({
            browsers: config.styles.browsers
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.styles.dest))
});

gulp.task('watch', function() {
    gulp.watch(config.styles.watch, ['sass']);
});

gulp.task('default', ['sass']);
