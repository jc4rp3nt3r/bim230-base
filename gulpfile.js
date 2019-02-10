var gulp = require('gulp');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var bundle = require('gulp-bundle-assets');
var babel = require('gulp-babel');
var minify = require("gulp-babel-minify");
var rmrf = require('rmrf');
var fileinclude = require('gulp-file-include');
var plumber = require('gulp-plumber');
var browsersync = require('browser-sync').create();

gulp.task('serve', function () {
    browsersync.init({ server: { baseDir: './dist' } });

    gulp.watch("src/scss/**/*.scss", ['sass']);
    gulp.watch("src/js/**/*.js", ['js']);
    gulp.watch("src/views/**/*", ['views']);
    gulp.watch("src/img/**/*", ['img']);
    gulp.watch('./bundle.config.js', ['bundle'])
})

gulp.task('sass', function () {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(plumber())
        .pipe(concat('custom.scss'))
        .pipe(sass({ includePaths: ['./node_modules'], outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename('custom.min.css'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browsersync.stream());
});

gulp.task('js', function () {
    return gulp.src('src/js/**/*.js')
        .pipe(plumber())
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(minify({ mangle: { keepClassName: true } }))
        .pipe(gulp.dest('./dist/js'))
        .pipe(browsersync.stream());
})

gulp.task('views', function () {
    return gulp.src(['./src/views/*', '!./src/views/includes/' ])
        .pipe(plumber())
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./dist'))
        .pipe(browsersync.reload({ stream: true }));
});

gulp.task('img', function () {
    return gulp.src('./src/img/**/*')
        .pipe(plumber())
        .pipe(gulp.dest('./dist/img'))
        .pipe(browsersync.stream());
});

gulp.task('bundle', function () {
    return gulp.src('./bundle.config.js')
        .pipe(plumber())
        .pipe(bundle())
        .pipe(gulp.dest('./dist/vendors'))
        .pipe(browsersync.stream());
});

gulp.task('clean', function () {
    return rmrf('./dist')
});

gulp.task('default', ['clean', 'bundle', 'sass', 'js', 'views', 'img', 'serve']);
gulp.task('build', ['clean', 'bundle', 'sass', 'js', 'views', 'img']);