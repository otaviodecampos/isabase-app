(function() {
    'use strict'

    angular.module('isabase-app')
        .config(States);

    /* @ngInject */
    function States($stateProvider) {

        $stateProvider
            .state('app.myaccount', {
                url: '/myaccount',
                templateUrl: 'isabase-app/myaccount.tpl.html',
                controller: 'MyAccountCtrl as ctrl'
            });

    }

})();