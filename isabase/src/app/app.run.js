(function() {
    'use strict'

    angular.module('isabase-app')
        .run(Run);

    /* @ngInject */
    function Run($rootScope, Navigation, $stateParams) {

        $rootScope.back = Navigation.back;
        $rootScope.stateParams = $stateParams;

    };

})();