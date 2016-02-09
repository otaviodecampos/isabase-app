(function () {
    'use strict'

    angular.module('isabase-mock')
        .factory('ModelMock', Mock);

    /* @ngInject */
    function Mock(resourceMock, MockUtil, RESOURCE, MOCK_MODEL) {

        var url = MockUtil.url(RESOURCE.model)
            , data = MockUtil.array(MOCK_MODEL)
            , mock = resourceMock(url, data);

        mock.indexRoute.addPostProc(function (data, request) {
            var filtered = [];
            var appId = request.pathArgs[0];
            angular.forEach(data, function (item, i) {
                if (appId == item.appId) {
                    filtered.push(item);
                }
            });
            return filtered;
        });

        mock.getStorage = function (ids, autoCreate) {
            var storage = data;
            if (ids.length > 1) {
                var id = ids[1];
                if (id == 'new') {
                    storage = {
                        appId: ids[0]
                    };
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