var gulp        = require('gulp');
var webserver   = require('gulp-webserver');
var inject      = require('gulp-inject');
var opn         = require('opn');

var server = {
    host: 'localhost',
    port: '3000'
};

gulp.task('webserver', function() {
    gulp.src( '.' )
        .pipe(webserver({
            host:             server.host,
            port:             server.port,
            livereload:       true,
            directoryListing: false
        }));
});

gulp.task('openbrowser', function() {
    opn( 'http://' + server.host + ':' + server.port);
});

gulp.task('serve', function() {
    gulp.start('webserver');
    gulp.start('openbrowser');
    gulp.start('inject');

});
/*

gulp.task('build', function() {
    gulp.src('./index.html')
        .pipe(build ({ GA_ID: '123456' }))
        .pipe(gulp.dest('dist'))
});
*/

gulp.task('inject', function () {
    var target = gulp.src('./index.html');
    var sources = gulp.src(['./app/assets/**/*.css'], {read: false});

    return target.pipe(inject(sources))
        .pipe(gulp.dest('./'));
});