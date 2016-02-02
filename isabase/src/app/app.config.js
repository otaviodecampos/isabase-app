(function() {
    'use strict'

    angular.module('isabase-app')
        .config(Config);

    /* @ngInject */
    function Config($translateProvider, $locationProvider, APP) {
        $locationProvider.html5Mode(false);
        $translateProvider.preferredLanguage(APP.locale.preferredLanguage);
        $translateProvider.useSanitizeValueStrategy(null);
        $translateProvider.useStaticFilesLoader({
            prefix: APP.locale.translationDir + "/",
            suffix: '.json'
        });
    };

})();