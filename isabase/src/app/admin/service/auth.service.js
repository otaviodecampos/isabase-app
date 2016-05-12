(function () {

    angular.module('isabase-app')
        .service('Auth', Service);

    /* @ngInject */
    function Service($http, $base64, RESOURCE_URL) {

        var that = this;

        that.isAuthenticated = function () {
            return $http.get(RESOURCE_URL.auth);
        }

        that.authenticate = function (username, password) {
            $http.defaults.headers.common.Authorization = that.encode(username, password);
            return $http.post(RESOURCE_URL.auth);
        }

        that.invalidate = function() {
            $http.delete(RESOURCE_URL.auth).then(function() {
                $http.defaults.headers.common.Authorization = null;
            });
        }

        that.encode = function (username, password) {
            return "Basic " + $base64.encode(username + ':' + password);
        }

        that.decode = function (encodedAuthorization) {
            var decoded = $base64.decode(encodedAuthorization.replace('Basic ', ''));
            decoded = decoded.split(':');

            return {
                username: decoded[0],
                password: decoded[1]
            };
        }

    }

})();