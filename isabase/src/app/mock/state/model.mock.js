(function () {
    'use strict'

    angular.module('isabase-mock')
        .factory('ModelMock', Mock);

    /* @ngInject */
    function Mock(resourceMock, MockUtil, RESOURCE, MODEL, RecordMock) {

        var url = MockUtil.url(RESOURCE.model)
            , data = MockUtil.array(MODEL)
            , mock = resourceMock(url, data);

        mock.indexRoute.addPostProc(function (data, request) {
            var filtered = []
                , appId = request.pathArgs[0];

            angular.forEach(data, function (model, i) {
                if (appId == model.appId) {
                    filtered.push(model);

                    var count = 0;
                    angular.forEach(RecordMock.dataSource, function (record, i2) {
                        if (model.appId == record.appId && (record.modelId == model.id || record.modelId == model.name || record.modelName == model.name)) {
                            count++;
                        }
                    });

                    model.records = count;
                }
            });

            return filtered;
        });

        mock.getStorage = function (ids, autoCreate) {
            var storage = data
                , id
                , appId;

            if (ids.length > 1) {
                id = ids[1];
                appId = ids[0];
                if (id == 'new') {
                    storage = {
                        appId: ids[0]
                    };
                } else {
                    angular.forEach(storage, function (item, i) {
                        if (appId == item.appId && (item.id == id || item.name == id)) {
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