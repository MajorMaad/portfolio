var gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

var env = process.env.NODE_ENV || 'development';
var outputDir = "public/dist/";

gulp.task('default', function () {
    gulp.run('styles', 'scripts');
});

gulp.task('styles', function() {
    var config = {};

    if (env === 'development') {
        config.sourceComments = 'map';
    }

    if (env === 'production') {
        config.outputStyle = 'compressed';
    }

    return gulp.src('public/src/scss/**/*.scss')
        .pipe(sass(config))
        .pipe(gulp.dest(outputDir + 'css'));
});

gulp.task('scripts', function() {
    return gulp.src('public/src/js/**/*.js')
        .pipe(concat('app.min.js'))
        .pipe(uglify({ mangle: false }))
        .pipe(gulp.dest(outputDir + 'js'));
});
