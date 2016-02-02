(function() {
    'use strict'

    angular.module('isabase-mock')
        .run(Run);

    /* @ngInject */
    function Run($httpBackend, MyAppMock) {

        $httpBackend.whenGET(/^\/assets/).passThrough();

    };

})();