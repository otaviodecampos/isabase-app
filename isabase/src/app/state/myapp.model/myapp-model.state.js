(function() {
    'use strict'

    angular.module('isabase-app')
        .config(States);

    /* @ngInject */
    function States($stateProvider) {

        $stateProvider
            .state('app.myapp.models', {
                url: '/:appId/models',
                views: {
                    '@app': {
                        templateUrl: 'isabase-app/app-model.tpl.html',
                        controller: 'MyAppModelsCtrl as modelCtrl'
                    }
                }
            });

    }

})();