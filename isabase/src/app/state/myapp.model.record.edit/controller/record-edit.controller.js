(function () {
    'use strict'

    angular.module('isabase-app')
        .controller('RecordEditCtrl', Controller);

    /* @ngInject */
    function Controller($stateParams, MyApp, Model, Record, Notification, Navigation) {
        var that = this
            , title = 'record-edit'
            , appId = $stateParams.appId
            , modelId = $stateParams.modelId
            , recordId = $stateParams.recordId
            , modelName;

        this.selected = null;
        this.myapp = MyApp.get({id: $stateParams.appId});
        this.model = Model.get({appId: appId, id: modelId});

        this.model.$promise.then(function(model) {
            modelName = model.name;
            that.record = Record.get({appId: appId, modelName: modelName, recordId: recordId});
            that.record.$promise.then(null, function() {
                Navigation.back();
            });
        });

        this.save = function () {
            this.record.$save({modelName: modelId}, function(app) {
                Navigation.back({selected: recordId});
                Notification.success(title, that.record.id, 'save-success');
            }, function(e) {
                Notification.error(title, that.record.id, 'save-error');
            });
        }

        this.remove = function () {
            this.record.$remove(function () {
                Navigation.back();
                Notification.success(title, that.record.id, 'remove-success');
            }, function (e) {
                Notification.error(title, that.record.id, 'remove-error');
            });
        }

    }

})();