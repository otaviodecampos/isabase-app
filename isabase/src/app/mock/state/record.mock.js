(function () {
    'use strict'

    angular.module('isabase-mock')
        .factory('RecordMock', Mock);

    /* @ngInject */
    function Mock(resourceMock, MockUtil, RESOURCE, RECORD) {

        var url = MockUtil.url(RESOURCE.record)
            , data = MockUtil.array(RECORD)
            , mock = resourceMock(url, data);

        mock.indexRoute.addPostProc(function (data, request) {
            var filtered = []
                , appId = request.pathArgs[0]
                , modelId = request.pathArgs[1];

            angular.forEach(data, function (item, i) {
                if (appId == item.appId && modelId == item.modelId) {
                    filtered.push(item);
                }
            });
            return filtered;
        });

        mock.getStorage = function (ids, autoCreate) {
            var storage = data;
            if (ids.length > 2) {
                var id = ids[2];
                if (id == 'new') {
                    storage = {
                        appId: ids[0],
                        modelId: ids[1]
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