(function() {
    'use strict'

    angular.module('isabase-app')
        .config(States);

    /* @ngInject */
    function States($stateProvider) {

        $stateProvider
            .state('app.myapp', {
                url: '/myapp?selectedApp',
                templateUrl: 'isabase-app/myapp.tpl.html',
                controller: 'MyAppCtrl as ctrl',
                params: {
                    selectedApp: {
                        squash: true
                    }
                }
            });

    }

})();