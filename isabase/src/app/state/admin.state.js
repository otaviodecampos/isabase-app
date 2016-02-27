(function() {
    'use strict'

    angular.module('isabase-app')
        .config(States);

    /* @ngInject */
    function States($urlRouterProvider, $stateProvider, APP) {

        $urlRouterProvider.otherwise(APP.defaultUrl);

        $stateProvider
            .state('admin', {
                url: '',
                abstract: true,
                templateUrl: 'isabase-app/admin.tpl.html'
            });

    };

})();