(function () {

    angular.module('isabase-app')
        .run(Run);

    /* @ngInject */
    function Run($rootScope, navigation, Auth) {

        $rootScope.navigation = navigation;
        $rootScope.auth = Auth;

    }

})();