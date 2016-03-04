(function() {
    'use strict'

    angular.module('isabase-app')
        .config(Config);

    /* @ngInject */
    function Config($translateProvider, $locationProvider, $breadcrumbProvider, $urlRouterProvider, APP_CONFIG) {

        $locationProvider.html5Mode(false);

        $urlRouterProvider.otherwise(APP_CONFIG.defaultUrl);

        $translateProvider.preferredLanguage(APP_CONFIG.locale.preferredLanguage);
        $translateProvider.useSanitizeValueStrategy(null);
        $translateProvider.useStaticFilesLoader({
            prefix: APP_CONFIG.locale.translationDir + "/",
            suffix: '.json'
        });

        $breadcrumbProvider.setOptions({
            templateUrl: 'isabase-app/breadcrumb.tpl.html'
        });

    };

})();