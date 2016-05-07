var sass = require('gulp-sass');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-clean-css');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var rename = require('gulp-rename');
var runSeq = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');

module.exports = function(gulp) {

  gulp.task('sass', function(){
    gulp.src('./assets/scss/**/main.scss')
      .pipe(sourcemaps.init())
      .pipe(sass()).on('error', sass.logError) // Converts Sass to CSS with gulp-sass
      .pipe(minifyCSS())
      .pipe(rename('style.min.css'))
      .pipe(postcss([ autoprefixer({ browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9'] }) ]))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./assets/css'))
  });

  gulp.task('watch', function() {
    gulp.watch('./assets/scss/**/*.scss', ['sass']);
  });

  gulp.task('default', function() {
    runSeq(
      ['sass']
    );
  });
}