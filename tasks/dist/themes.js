var gulp = require('gulp')
justfiles = require('./util/justfiles');

module.exports = function build() {

    var input = this.input(this.themesDir, [
        '**/*'
    ]);

    return gulp.src(input, { base: './semantic/dist/themes' })
        .pipe(justfiles())
        .pipe(gulp.dest(this.themesOutputDir));
}