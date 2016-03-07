(function () {

    angular.module('isabase-app')
        .run(Run);

    /* @ngInject */
    function Run($http, $rootScope, navigation, $base64) {
        $http.defaults.headers.common.Authorization = "Basic " + $base64.encode('otaviodecampos:123');
        
        $rootScope.navigation = navigation;
    }

})();