(function() {
    'use strict'

    angular.module('isabase-app')
        .config(States);

    /* @ngInject */
    function States($stateProvider) {

        $stateProvider
            .state('app.myapp.edit', {
                url: '/:appName/edit',
                views: {
                    '@app': {
                        templateUrl: 'isabase-app/app-edit.tpl.html',
                        controller: 'MyAppEditCtrl as ctrl'
                    }
                }
            });

    }

})();