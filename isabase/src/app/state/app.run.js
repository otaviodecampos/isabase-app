(function() {
    'use strict'

    angular.module('isabase-app')
        .run(Run);

    /* @ngInject */
    function Run($rootScope, Navigation) {

        $rootScope.back = Navigation.back;

    };

})();