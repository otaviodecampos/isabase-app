(function() {
    'use strict'

    angular.module('isabase-app')
        .config(States);

    /* @ngInject */
    function States($stateProvider) {

        $stateProvider
            .state('app.myapp', {
                url: '/myapp',
                templateUrl: 'isabase-app/myapp.tpl.html',
                controller: 'MyAppCtrl as myAppCtrl',
                params: {
                    selected: {
                        squash: true
                    }
                }
            });

    }

})();