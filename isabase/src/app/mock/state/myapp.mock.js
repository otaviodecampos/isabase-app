(function () {
    'use strict'

    angular.module('isabase-mock')
        .factory('MyAppMock', Mock);

    /* @ngInject */
    function Mock(resourceMock, MockUtil, RESOURCE, MYAPP, ModelMock) {

        var url = MockUtil.url(RESOURCE.myapp)
            , data = MockUtil.array(MYAPP)
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

        mock.getStorage = function (ids, autoCreate) {
            var storage = data;
            if (ids.length > 0) {
                var id = ids[0];
                if (id == 'new') {
                    storage = {};
                } else {
                    angular.forEach(storage, function (item, i) {
                        if (item.id == id) {
                            storage = item;
                            return false;
                        }
                    });
                }
                if (storage == data) {
                    storage = null;
                }
            }
            return storage;
        };

        return mock;
    };

})();