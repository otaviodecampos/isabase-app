var gulp = require('gulp')
    , ngjson = require('gulp-ng-json')
    , concat = require('gulp-concat')
    , templateCache = require('gulp-angular-templatecache')
    , es = require('event-stream')
    , order = require("gulp-order")
    , ngAnnotate = require('gulp-ng-annotate');

module.exports = function () {

    var that = this;

    var input = this.input(this.appDir, ['**/*.json', '**/*.js'])
        , inputTpl = this.input(this.appDir, ['**/*.tpl.html']);

    var options = {
        module: this.buildName,
        transformUrl: function(url) {
            return that.buildName + '/' + url.match(/[\w-.]+.tpl.html$/g)[0];
        }
    }

    var tplStream = gulp.src(inputTpl)
        .pipe(templateCache(options));

    var jsStream = gulp.src(input)
        .pipe(ngjson.module())
        .pipe(ngjson.constant())
        .pipe(ngjson.state());

    return es.merge(jsStream, tplStream)
        .pipe(order([
            "**/*.module.json",
            "**/*.module.js",
            "**/*.constant.json",
            "**/*.provider.js",
            "**/*.config.js",
            "**/*.state.json",
            "**/*.state.js",
            "**/*.js",
            "**/*.tpl.html"
        ]))
        .pipe(ngAnnotate({
            add: true,
            single_quotes: true
        }))
        .pipe(concat(this.buildName + '.js'))
        .pipe(gulp.dest(this.concatOutputDir));
}