(function () {
    'use strict'

    angular.module('isabase-mock')
        .factory('MyAppMock', Mock);

    /* @ngInject */
    function Mock(resourceMock, MockUtil, RESOURCE, MOCK_MYAPP, ModelMock) {

        var url = MockUtil.url(RESOURCE.myapp)
            , data = MockUtil.array(MOCK_MYAPP)
            , mock = resourceMock(url, data);

        mock.indexRoute.addPostProc(function (data, request) {
            angular.forEach(data, function (app, i) {
                var count = 0;
                angular.forEach(ModelMock.dataSource, function(model, i2) {
                   if(model.appId == app.id) {
                       count++;
                   }
                });
                app.models = count;
            });
            return data;
        });

        return mock;
    };

})();