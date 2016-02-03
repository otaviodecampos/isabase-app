(function() {
    'use strict'

    angular.module('isabase-app')
        .config(States);

    /* @ngInject */
    function States($stateProvider) {

        $stateProvider
            .state('app.myapp.edit', {
                url: '/:id',
                views: {
                    '@app': {
                        templateUrl: 'isabase-app/myapp-edit.tpl.html',
                        controller: 'MyAppEditCtrl as editCtrl'
                    }
                }
            });

    }

})();