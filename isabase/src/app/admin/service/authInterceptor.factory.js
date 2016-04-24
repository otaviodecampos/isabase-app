(function () {

    angular.module('isabase-app')
        .factory('authInterceptor', Service);

    /* @ngInject */
    function Service($location) {
        return {
            'response': function (response) {
                if (response.status === 401) {
                    $location.url('/login');
                }

                return response;
            }
        }
    }

})();