var gulp = require('gulp')
    , ngjson = require('gulp-ng-json')
    , concat = require('gulp-concat')
    , templateCache = require('gulp-angular-templatecache')
    , es = require('event-stream')
    , order = require("gulp-order")
    , ngAnnotate = require('gulp-ng-annotate');

module.exports = function () {

    var _this = this;

    var input = this.input(this.appDir, ['**/*.json', '**/*.js'])
        , inputTpl = this.input(this.appDir, ['**/*.tpl.html'])
        , inputVendor = this.componentsDir;

    var options = {
        module: this.buildName,
        transformUrl: function(url) {
            return _this.buildName + '/' + url.match(/[\w-.]+.tpl.html$/g)[0];
        }
    }

    var tplStream = gulp.src(inputTpl)
        .pipe(templateCache(options));

    var jsStream = gulp.src(input)
        .pipe(ngjson.module())
        .pipe(ngjson.constant());

    var vendorStream = gulp.src(inputVendor);

    return es.merge(jsStream, tplStream, vendorStream)
        .pipe(order([
            "**/jquery.js",
            "**/angular.js",
            "**/angular-translate.js",
            "**/semantic.js",
            "**/*.module.json",
            "**/*.module.js",
            "**/*.constant.json",
            "**/*.provider.js",
            "**/*.config.js",
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