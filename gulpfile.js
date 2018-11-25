const gulp = require('gulp');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify-es').default;
const rename = require('gulp-rename');

gulp.task('build-sass', () => {
  gulp
    .src('./source/assets/sass/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./public/assets/css'));
});

gulp.task('build-js', () => {
  gulp
    .src('./source/assets/js/*.js')
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('./public/assets/js'));
});

gulp.task('watch', () => {
  gulp.watch('./source/assets/sass/*.scss', ['build-sass']);
  gulp.watch('./source/assets/js/*.js', ['build-js']);
});

gulp.task('default', ['build-sass', 'build-js', 'watch']);
