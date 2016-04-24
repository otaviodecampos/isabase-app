(function () {
    'use strict'

    angular.module('isa-mock')
        .factory('authMock', Mock);

    /* @ngInject */
    function Mock($httpBackend, Auth, RESOURCE_URL) {

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
                if(headers.Authorization) {
                    var authorization = Auth.decode(headers.Authorization);
                    if (authorization.username == expectedUsername && authorization.password == expectedPassword) {
                        isAuthenticated = true;
                        return [200, true];
                    }
                }
                return [401, false];
            });

        $httpBackend.when('DELETE', RESOURCE_URL.auth)
            .respond(function (method, url, data, headers, params) {
                isAuthenticated = false;
                return [200, true];
            });

        return {};
    };

})();