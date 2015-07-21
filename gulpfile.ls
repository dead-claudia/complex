'use strict'

require! {
    gulp
    'gulp-livescript': livescript
    'gulp-mocha': mocha
}

gulp.task 'compile' ->
    gulp.src 'src'
        .pipe livescript bare: true
        .pipe gulp.dest 'dist'

gulp.task 'test' ['compile'] ->
    gulp.src 'test' .pipe mocha ui: 'tdd' reporter: 'spec'
