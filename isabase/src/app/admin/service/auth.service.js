(function () {

    angular.module('isabase-app')
        .service('Auth', Service);

    /* @ngInject */
    function Service($http, $base64, RESOURCE_URL) {

        var that = this;

        that.data = null;

        that.isAuthenticated = function () {
            return $http.get(RESOURCE_URL.auth);
        }

        that.authenticate = function (username, password) {
            $http.defaults.headers.common.Authorization = that.encode(username, password);

            var authPromise = $http.post(RESOURCE_URL.auth);

            authPromise.then(function(response) {
                that.data = response.data;
            });

            return authPromise;
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