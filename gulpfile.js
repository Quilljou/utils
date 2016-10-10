var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');

gulp.task('compress', function (cb) {
  pump([
        gulp.src('utils.js'),
        uglify(),
        gulp.dest('dist')
    ],
    cb
  );
});


gulp.task('watch',['compress'],function(){
    gulp.watch('utils.js',['compress']);
})
