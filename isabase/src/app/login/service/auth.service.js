(function () {

    angular.module('isabase-app')
        .service('Auth', Service);

    /* @ngInject */
    function Service($q, $http, RESOURCE_URL, $http, $base64) {

        // $http.defaults.headers.common.Authorization = "Basic " + $base64.encode('otaviodecampos:123');

        this.isAuthenticated = function () {
            return $http.get(RESOURCE_URL.auth);
        }

        this.authenticate = function (username, password) {
            return $http.post(RESOURCE_URL.auth, {
                username: username,
                password: password
            });
        }

    }

})();