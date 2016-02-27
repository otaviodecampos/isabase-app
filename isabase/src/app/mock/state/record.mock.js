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
                , appName = request.pathArgs[0]
                , modelName = request.pathArgs[1];

            angular.forEach(data, function (item, i) {
                if (appName == item.appName && (modelName == item.modelName || modelName == item.modelId)) {
                    filtered.push(item);
                }
            });
            return filtered;
        });

        mock.updateAction = function(request) {
            var newItem = request.body;
            var storage = this.getStorage(request.pathArgs.slice(0, -1));
            var recordId = request.pathArgs[request.pathArgs.length-1];
            var storagedRecord;
            angular.forEach(_.values(storage), function(record) {
                if(recordId == record.id) {
                    storagedRecord = record;
                    return false;
                }
            });
            if (storagedRecord) {
              newItem.id = storage[storagedRecord.id].id;
              storage[storagedRecord.id] = newItem;
              return newItem;
            }
          };

        mock.getStorage = function (params, autoCreate) {
            var storage = data
                , id
                , appName;

            if (params.length == 3) {
                id = params[2];
                appName = params[0];
                if (id == 'new') {
                    storage = {
                        appName: params[0],
                        modelName: params[1]
                    };
                } else {
                    angular.forEach(storage, function (item, i) {
                        if (appName == item.appName && item.id == id) {
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