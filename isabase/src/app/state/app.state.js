(function() {
    'use strict'

    angular.module('isabase-app')
        .config(States);

    /* @ngInject */
    function States($urlRouterProvider, $stateProvider, APP) {

        $urlRouterProvider.otherwise(APP.defaultUrl);

        $stateProvider
            .state('app', {
                url: '',
                abstract: true,
                templateUrl: 'isabase-app/app.tpl.html'
            });

    };

})();