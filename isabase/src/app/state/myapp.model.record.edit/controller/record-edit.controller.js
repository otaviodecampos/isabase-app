(function () {
    'use strict'

    angular.module('isabase-app')
        .controller('RecordEditCtrl', Controller);

    /* @ngInject */
    function Controller($stateParams, MyApp, Model, Record, Notification, Navigation) {
        var that = this
            , title = 'record-edit'
            , appName = $stateParams.appName
            , modelName = $stateParams.modelName
            , recordId = $stateParams.recordId;

        this.selected = null;
        this.myapp = MyApp.get({appName: appName});
        this.model = Model.get({appName: appName, modelName: modelName});

        this.model.$promise.then(function(model) {
            that.record = Record.get({appName: appName, modelName: modelName, recordId: recordId});
            that.record.$promise.then(null, function() {
                Navigation.back();
            });
        });

        this.save = function () {
            this.record.$save({modelName: modelName}, function(app) {
                Navigation.back({selected: recordId});
                Notification.success(title, that.record.id, 'save-success');
            }, function(e) {
                Notification.error(title, that.record.id, 'save-error');
                console.log(e);
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