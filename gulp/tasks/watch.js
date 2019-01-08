const gulp = require('gulp');
const watch = require('gulp-watch');
const browserSync = require('browser-sync');

const SOURCEPATHS = {
    htmlSource: 'src/*.html',
    cssSource: 'src/scss/**/*.scss',
    jsSource: 'src/scripts/**',
    assetsSource: 'src/assets/**'
};

const APPPATH = {
    root: 'app',
    css: 'app/css',
    js: 'app/scripts'
};

gulp.task('server', ['styles'], function() {
    browserSync.init([APPPATH.css + '/*.css', APPPATH.root + '/*.html', APPPATH.js + '/*.js'], {
        server: {
            baseDir: APPPATH.root
        }
    });
});

gulp.task('scriptRefresh', ['scripts'], function() {
    browserSync.reload();
});

gulp.task('watch', ['server', 'html', 'styles', 'scriptRefresh', 'assets'], function() {
    gulp.watch([SOURCEPATHS.htmlSource], ['html']);
    gulp.watch([SOURCEPATHS.cssSource], ['styles']);
    gulp.watch([SOURCEPATHS.jsSource], ['scriptRefresh']);
    gulp.watch([SOURCEPATHS.assetsSource], ['assets']);
});