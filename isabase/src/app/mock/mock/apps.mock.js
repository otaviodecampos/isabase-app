(function () {
    'use strict'

    angular.module('isa-mock')
        .factory('appsMock', Mock);

    /* @ngInject */
    function Mock(resourceMock, mockUtil, modelsMock, RESOURCE_URL, APPS) {

        var url = mockUtil.url(RESOURCE_URL.apps)
            , data = mockUtil.array(APPS, 'name')
            , mock = resourceMock(url, data);

        mock.indexRoute.addPostProc(function (data, request) {
            angular.forEach(data, function (app, i) {
                var count = 0;
                angular.forEach(modelsMock.dataSource, function(model, i2) {
                   if(model.appName == app.name) {
                       count++;
                   }
                });
                app.modelsSize = count;
            });
            return data;
        });
        
        mock.updateAction = function(request) {
            var newItem = request.body;
            var storage = this.getStorage(request.pathArgs.slice(0, -1));
            var appName = request.pathArgs[request.pathArgs.length-1];
            var storagedApp;
            angular.forEach(_.values(storage), function(app) {
                if(appName == app.name) {
                    storagedApp = app;
                    return false;
                }
            });
            if (storagedApp) {
              newItem.id = storage[storagedApp.id].id;
              storage[storagedApp.id] = newItem;
              return newItem;
            }
          };
          
          mock.deleteAction = function(request) {
            var storage = this.getStorage(request.pathArgs.slice(0, -1));
            var appName = request.pathArgs[request.pathArgs.length-1];
            
            var storagedApp;
            angular.forEach(_.values(storage), function(app) {
                if(appName == app.name) {
                    storagedApp = app;
                    return false;
                }
            });
            
            if (storagedApp) {
              var item = storage[storagedApp.id];
              delete storage[storagedApp.id];
              return item;
            }
          };

        mock.getStorage = function (params, autoCreate) {
            var storage = data
                , appName;

            if (params.length > 0) {
                appName = params[0];
                if (appName == 'new') {
                    storage = {};
                } else {
                    angular.forEach(storage, function (item, i) {
                        if (item.name == appName) {
                            storage = item;
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