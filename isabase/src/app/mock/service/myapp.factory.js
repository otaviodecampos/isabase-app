(function () {
    'use strict'

    angular.module('isabase-mock')
        .factory('MyAppMock', Mock);

    /* @ngInject */
    function Mock(resourceMock, MockUtil, RESOURCE, MYAPP) {

        var url = MockUtil.url('http://api.isabase.com.br/myapp')
            , data = MockUtil.array(MYAPP)
            , mock = resourceMock(url, data);

        return mock;
    };

})();