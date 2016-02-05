(function() {
    'use strict'

    angular.module('isabase-app')
        .config(Config);

    /* @ngInject */
    function Config($translateProvider, $locationProvider, $breadcrumbProvider, APP) {

        $locationProvider.html5Mode(false);

        $translateProvider.preferredLanguage(APP.locale.preferredLanguage);
        $translateProvider.useSanitizeValueStrategy(null);
        $translateProvider.useStaticFilesLoader({
            prefix: APP.locale.translationDir + "/",
            suffix: '.json'
        });

        $breadcrumbProvider.setOptions({
            templateUrl: 'isabase-app/breadcrumb.tpl.html'
        });
    };

})();