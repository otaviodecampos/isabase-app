(function() {
    'use strict'

    angular.module('isabase-app')
        .config(Config);

    /* @ngInject */
    function Config($translateProvider, $locationProvider, uiCalendarProvider, APP_CONFIG, CALENDAR_CONFIG) {

        $locationProvider.html5Mode(false);

        $translateProvider.preferredLanguage(APP_CONFIG.locale.preferredLanguage);
        $translateProvider.useSanitizeValueStrategy(null);
        $translateProvider.useStaticFilesLoader({
            prefix: APP_CONFIG.locale.translationDir + "/",
            suffix: '.json'
        });

        uiCalendarProvider.setSetting('text', CALENDAR_CONFIG[APP_CONFIG.locale.preferredLanguage.replace('-', '')]);

    };

})();