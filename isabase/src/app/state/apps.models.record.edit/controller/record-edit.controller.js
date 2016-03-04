(function () {
    'use strict'

    angular.module('isabase-app')
        .controller('RecordEditCtrl', Controller);

    /* @ngInject */
    function Controller($stateParams, Apps, Models, Records, Notification, Navigation) {
        var that = this
            , modelName = $stateParams.modelName;

        this.selected = null;
        this.myapp = Apps.get($stateParams);
        this.model = Models.get($stateParams);

        this.model.$promise.then(function (model) {
            that.record = Records.get($stateParams);
            that.record.$promise.then(null, Navigation.back);
        });

        this.save = function () {
            this.record.$save({modelName: modelName}, function (record) {
                Notification.success('record', that.record.id, 'saveSuccess');
                Navigation.setParamsAndBack({recordId: record.id});
            }, function (e) {
                Notification.error('record', that.record.id, 'saveFail');
                console.log(e);
            });
        }

        this.remove = function () {
            this.record.$remove(function () {
                Notification.success('record', that.record.id, 'removeSuccess');
                Navigation.back();
            }, function (e) {
                Notification.error('record', that.record.id, 'removeFail');
            });
        }

        this.clear = function () {
            angular.forEach(this.model.fields, function (field) {
                that.record[field.name] = null;
            });
        }

    }

})();