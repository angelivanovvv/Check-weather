const gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    clean = require('gulp-clean');

const SOURCEPATHS = {
    assets: 'src/assets/**/*'
};

const APPPATH = {
    root: 'app',
    assets: 'app/assets'
};

gulp.task('clean-assets', function() {
    return gulp.src(APPPATH.assets + '/*', { read: false, force: true })
        .pipe(clean());
});

gulp.task('assets', ['clean-assets'], function() {
    return gulp.src(SOURCEPATHS.assets)
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            multipass: true
        }))
        .pipe(gulp.dest(APPPATH.assets));
});