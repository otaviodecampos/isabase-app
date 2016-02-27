(function() {
    'use strict'

    angular.module('isabase-app')
        .config(States);

    /* @ngInject */
    function States($stateProvider) {

        $stateProvider
            .state('admin.account', {
                url: '/account',
                templateUrl: 'isabase-app/account.state.tpl.html',
                controller: 'AccountCtrl as ctrl'
            });

    }

})();