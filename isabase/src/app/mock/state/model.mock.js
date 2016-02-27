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
                , appName = request.pathArgs[0];

            angular.forEach(data, function (model, i) {
                if (appName == model.appName) {
                    filtered.push(model);

                    var count = 0;
                    angular.forEach(RecordMock.dataSource, function (record, i2) {
                        if (model.appName == record.appName && (record.modelId == model.id || record.modelId == model.name || record.modelName == model.name)) {
                            count++;
                        }
                    });

                    model.records = count;
                }
            });

            return filtered;
        });
        
        mock.updateAction = function(request) {
            var newItem = request.body;
            var storage = this.getStorage(request.pathArgs.slice(0, -1));
            var modelName = request.pathArgs[request.pathArgs.length-1];
            var storagedModel;
            angular.forEach(_.values(storage), function(model) {
                if(modelName == model.name) {
                    storagedModel = model;
                    return false;
                }
            });
            if (storagedModel) {
              newItem.id = storage[storagedModel.id].id;
              storage[storagedModel.id] = newItem;
              return newItem;
            }
          };
          
          mock.deleteAction = function(request) {
            var storage = this.getStorage(request.pathArgs.slice(0, -1));
            var modelName = request.pathArgs[request.pathArgs.length-1];
            
            var storagedModel;
            angular.forEach(_.values(storage), function(model) {
                if(modelName == model.name) {
                    storagedModel = model;
                    return false;
                }
            });
            
            if (storagedModel) {
              var item = storage[storagedModel.id];
              delete storage[storagedModel.id];
              return item;
            }
          };
        
        mock.getStorage = function (params, autoCreate) {
            var storage = data
                , id
                , appName;

            if (params.length > 1) {
                id = params[1];
                appName = params[0];
                if (id == 'new') {
                    storage = {
                        appName: params[0]
                    };
                } else {
                    angular.forEach(storage, function (item, i) {
                        if (appName == item.appName && (item.id == id || item.name == id)) {
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