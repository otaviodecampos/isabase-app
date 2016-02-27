(function() {
    'use strict'

    angular.module('isabase-app')
        .run(Run);

    /* @ngInject */
    function Run($rootScope, $state, $stateParams, APP, Navigation) {

        $rootScope.stateParams = $stateParams;
        $rootScope.app = APP;
        $rootScope.back = Navigation.back;

        $rootScope.$on('$stateChangeStart', function (event, toState) {
            var moveToParent = $state.includes(toState.name);
            if (moveToParent) {
                $rootScope.moveToParent = true;
            } else {
                $rootScope.moveToParent = false;
            }
        });

    };

})();