(function () {
    'use strict'

    angular.module('isabase-mock')
        .factory('authMock', Mock);

    /* @ngInject */
    function Mock($httpBackend, RESOURCE_URL) {

        var isAuthenticated = false
            , expectedUsername = 'otaviodecampos'
            , expectedPassword = '123';

        $httpBackend.when('GET', RESOURCE_URL.auth)
            .respond(function (method, url, data, headers, params) {
                if (isAuthenticated) {
                    return [200, true];
                } else {
                    return [401, false];
                }
            });

        $httpBackend.when('POST', RESOURCE_URL.auth)
            .respond(function (method, url, data, headers, params) {
                var authData = angular.fromJson(data);
                if (authData.username == expectedUsername && authData.password == expectedPassword) {
                    isAuthenticated = true;
                    return [200, true];
                }
                return [401, false];
            });

        return {};
    };

})();