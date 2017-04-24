var gulp = require('gulp'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync').create(),
  sourcemaps = require('gulp-sourcemaps'),
  autoprefixer = require('gulp-autoprefixer'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  imagemin = require('gulp-imagemin'),
  changed = require('gulp-changed'),
  htmlReplace = require('gulp-html-replace'),
  htmlMin = require('gulp-htmlmin'),
  coffee = require('gulp-coffee'),
  es = require('event-stream'),
  babel = require('gulp-babel'),
  clean = require('gulp-clean');

function errorLog(error) {
  console.error(error);
}

gulp.task('html', function () {

  return gulp.src('src/templates/html/**/*.html')
    .pipe(htmlMin({
      sortAttributes: true,
      sortClassName: true,
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('build/'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('styles', function () {
  return gulp.src('src/scss/**/*.scss')
    .pipe(concat('style.css'))
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 3 versions']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.stream());
});

gulp.task('jsECMAScript6', function () {
    return gulp.src('src/js/ECMAScript6/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('config.js'))
        .pipe(uglify())
        .on('error', errorLog)
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/js'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('img', function () {
  return gulp.src('src/img/**/*')
    .pipe(changed('build/img'))
    .pipe(imagemin())
    .pipe(gulp.dest('build/img'))
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
        baseDir: "build"
    }
  });
});

gulp.task('clean', function() {
  return gulp.src('build', {read: false})
    .pipe(clean());
});

// =================================
gulp.task('watch', function () {
  gulp.watch('src/js/ECMAScript6/**/*.js', ['jsECMAScript6']);
  gulp.watch('src/scss/**/*.scss', ['styles']);
  gulp.watch('src/templates/html/**/*.html', ['html']);
})

gulp.task('default', ['html', 'styles', 'jsECMAScript6', 'img', 'browserSync', 'watch']);
