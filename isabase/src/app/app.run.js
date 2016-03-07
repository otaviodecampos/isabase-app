(function () {

    angular.module('isabase-app')
        .run(Run);

    /* @ngInject */
    function Run($http, $base64) {
        $http.defaults.headers.common.Authorization = "Basic " + $base64.encode('otaviodecampos:123');
    }

})();