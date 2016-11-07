
var gulp = require('gulp');
var browserSync = require('browser-sync');
var babel = require('gulp-babel');

gulp.task('browsersync', function () {
    browserSync.init({
        notify: false,
        proxy: "localhost:8000"
    });

});

gulp.task('es6to5', function () {
    return gulp.src('static/js/assets/logic.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .on('error', function (e) {
            console.log('>>> ERROR', e);
            // emit here
            this.emit('end');
        })
        .pipe(gulp.dest('static/js/dist/'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('watchFiles', function () {
    gulp.watch('static/js/assets/logic.js', ['es6to5']);
    gulp.watch(['./**/*.{scss,css,html,py}'], browserSync.reload);

});

gulp.task('default', ['watchFiles', 'es6to5', 'browsersync']);