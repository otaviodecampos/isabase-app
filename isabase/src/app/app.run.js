(function() {
    'use strict'

    angular.module('isabase-app')
        .run(Run);

    /* @ngInject */
    function Run($rootScope, $state, $stateParams, $timeout, APP, Navigation) {

        $rootScope.stateParams = $stateParams;
        $rootScope.app = APP;
        $rootScope.back = Navigation.back;

        $rootScope.$on('$stateChangeStart', function (event, toState) {
            var back = $state.includes(toState.name);
            if (back) {
                $rootScope.back = true;
            } else {
                $rootScope.back = false;
            }
        });

    };

})();