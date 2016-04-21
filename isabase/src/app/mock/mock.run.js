(function() {
    'use strict'

    angular.module('isabase-mock')
        .run(Run);

    /* @ngInject */
    function Run($httpBackend, appsMock, modelsMock, recordsMock, authMock) {

        $httpBackend.whenGET(/^\/assets/).passThrough();

    };

})();