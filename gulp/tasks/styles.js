const gulp = require('gulp'),
  sass = require('gulp-sass'),
  merge = require('merge-stream'),
  concat = require('gulp-concat'),
  clean = require('gulp-clean'),
  autoPrefixer = require('gulp-autoprefixer');

const SOURCEPATHS = {
  sassApp: 'src/scss/app.scss'
};

const APPPATH = {
  root: 'app',
  css: 'app/styles'
};

gulp.task('clean-styles', function() {
  return gulp
    .src('app/css/**/*.css', { read: false, force: true })
    .pipe(clean());
});

gulp.task('styles', ['clean-styles'], function() {
  let bootstrapFiles = gulp.src('./node_modules/bootstrap/dist/css/bootstrap.css');
  let sassNormalize;
  let sassFiles;

  sassNormalize = gulp
      .src('./node_modules/normalize-scss/sass/_normalize.scss')
      .pipe(autoPrefixer())
      .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError));

  sassFiles = gulp
    .src(SOURCEPATHS.sassApp)
    .pipe(autoPrefixer())
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError));

  return merge(sassFiles, sassNormalize, bootstrapFiles)
    .pipe(concat('app.css'))
    .pipe(gulp.dest(APPPATH.css));
});
