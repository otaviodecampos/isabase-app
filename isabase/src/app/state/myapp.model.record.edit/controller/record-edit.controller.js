(function () {
    'use strict'

    angular.module('isabase-app')
        .controller('RecordEditCtrl', Controller);

    /* @ngInject */
    function Controller($state, $stateParams, MyApp, Model, Record, Notification, Navigation) {
        var that = this
            , title = 'record-edit'
            , modelName = $stateParams.modelName;

        this.selected = null;
        this.myapp = MyApp.get($stateParams);
        this.model = Model.get($stateParams);

        this.model.$promise.then(function(model) {
            that.record = Record.get($stateParams);
            that.record.$promise.then(null, Navigation.back);
        });

        this.save = function () {
            this.record.$save({modelName: modelName}, function(record) {
                Notification.success(title, that.record.id, 'save-success');
                Navigation.setParamsAndBack({recordId: record.id});
            }, function(e) {
                Notification.error(title, that.record.id, 'save-error');
                console.log(e);
            });
        }

        this.remove = function () {
            this.record.$remove(function () {
                Notification.success(title, that.record.id, 'remove-success');
                Navigation.back();
            }, function (e) {
                Notification.error(title, that.record.id, 'remove-error');
            });
        }

    }

})();