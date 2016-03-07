(function() {
    'use strict'

    angular.module('isabase-mock')
        .run(Run);

    /* @ngInject */
    function Run($httpBackend, appsMock, modelsMock, recordsMock) {

        $httpBackend.whenGET(/^\/assets/).passThrough();

        $httpBackend.whenGET('http://api.isabase.com.br/v1/auth').passThrough();

    };

})();