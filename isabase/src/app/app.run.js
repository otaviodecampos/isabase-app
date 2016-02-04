(function() {
    'use strict'

    angular.module('isabase-app')
        .run(Run);

    /* @ngInject */
    function Run($rootScope, $stateParams, APP, Navigation) {

        $rootScope.stateParams = $stateParams;
        $rootScope.app = APP;
        $rootScope.back = Navigation.back;

    };

})();