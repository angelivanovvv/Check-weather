const gulp = require('gulp'),
    webpack = require('webpack'),
    clean = require('gulp-clean');

const SOURCEPATHS = {
    jsSource: 'src/scripts/*.js'
};

const APPPATH = {
    root: 'app',
    js: 'app/scripts'
};

gulp.task('clean-scripts', function() {
    return gulp.src(APPPATH.js + '/*.js', { read: false, force: true })
        .pipe(clean());
});

gulp.task('scripts', ['clean-scripts'], function(callback) {
    webpack(require('../../webpack.config.js'), function(err, stats) {
        if (err) {
            console.log(err, toString());
        }
        console.log(stats.toString());
        callback();
    });
});