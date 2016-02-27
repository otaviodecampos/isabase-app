(function() {
    'use strict'

    angular.module('isabase-app')
        .config(States);

    /* @ngInject */
    function States($stateProvider) {

        $stateProvider
            .state('admin.app', {
                url: '/app',
                templateUrl: 'isabase-app/app.state.tpl.html',
                controller: 'AppCtrl as ctrl'
            });

    }

})();