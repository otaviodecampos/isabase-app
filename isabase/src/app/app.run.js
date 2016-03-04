(function() {
    'use strict'

    angular.module('isabase-app')
        .run(Run);

    /* @ngInject */
    function Run($rootScope, $state, $stateParams, Navigation, APP_CONFIG) {

        $rootScope.stateParams = $stateParams;
        $rootScope.appConfig = APP_CONFIG;
        $rootScope.back = Navigation.back;

        $rootScope.$on('$stateChangeStart', function (event, toState) {
            $rootScope.moveToParent = $state.includes(toState.name);
        });

    };

})();