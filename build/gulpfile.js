const gulp = require('gulp');
const zip = require('gulp-zip');
 
gulp.task('build', () =>
    gulp.src([
        '../**/pwa_assets/**/*',
        '../package.json',
        '../bizzo.config.json',
        '../gulpfile.js'
    ])
        .pipe(zip('bizzo-pwa.zip'))
        .pipe(gulp.dest('./dist'))
);
