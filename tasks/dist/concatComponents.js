var gulp = require('gulp')
    , concat = require('gulp-concat');

module.exports = function () {

    return gulp.src(this.componentsDir)
        .pipe(concat('components.js'))
        .pipe(gulp.dest(this.concatOutputDir));
        
}