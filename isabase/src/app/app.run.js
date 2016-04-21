(function () {

    angular.module('isabase-app')
        .run(Run);

    /* @ngInject */
    function Run($rootScope, navigation) {

        $rootScope.navigation = navigation;

    }

})();