(function() {
    'use strict'

    angular.module('isabase-app')
        .config(Config);

    /* @ngInject */
    function Config($translateProvider, $locationProvider, $httpProvider, $breadcrumbProvider, $urlRouterProvider, uiCalendarProvider, APP_CONFIG, CALENDAR_CONFIG) {

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

        uiCalendarProvider.setSetting('text', CALENDAR_CONFIG[APP_CONFIG.locale.preferredLanguage.replace('-', '')]);

        $httpProvider.interceptors.push('authInterceptor');

    };

})();