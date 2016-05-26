(function () {

    angular.module('isabase-app')
        .factory('authInterceptor', Service);

    /* @ngInject */
    function Service($location, $q) {
        return {
            'responseError': function (response) {
                if (response.status === 401 && $location.url() != '/login') {
                    $location.url('/login');
                }
                return $q.reject(response);
            }
        }
    }

})();