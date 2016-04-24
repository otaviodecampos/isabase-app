(function() {
    'use strict'

    angular.module('isabase-app')
        .config(Config);

    /* @ngInject */
    function Config($httpProvider, $breadcrumbProvider, $urlRouterProvider, ADMINSETTINGS) {

        $urlRouterProvider.otherwise(ADMINSETTINGS.defaultUrl);

        $breadcrumbProvider.setOptions({
            templateUrl: 'isabase-app/breadcrumb.tpl.html'
        });

        $httpProvider.interceptors.push('authInterceptor');

    };

})();