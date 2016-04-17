(function () {
    'use strict'

    angular.module('isabase-app')
        .controller('RecordEditCtrl', Controller);

    /* @ngInject */
    function Controller($stateParams, models, records, notification, navigation) {
        var that = this
            , appName = $stateParams.appName
            , modelName = $stateParams.modelName;

        this.selected = null;
        this.model = models.get($stateParams);
        this.model.$promise.then(null, navigation.back);

        that.record = records.get($stateParams);
        that.record.$promise.then(null, navigation.back);

        this.save = function () {
            this.record.$save({appName: appName, modelName: modelName, recordId: that.record.id == 'new' ? '' : that.record.id}, function (record) {
                notification.success('record', that.record.id, 'saveSuccess');
                navigation.setParamsAndBack({recordId: record.id});
            }, function (e) {
                notification.error('record', that.record.id, 'saveFail');
                console.log(e);
            });
        }

        this.remove = function () {
            this.record.$remove($stateParams, function () {
                notification.success('record', that.record.id, 'removeSuccess');
                navigation.back();
            }, function (e) {
                notification.error('record', that.record.id, 'removeFail');
                console.log(e);
            });
        }

        this.clear = function () {
            angular.forEach(this.model.fields, function (field) {
                that.record[field.name] = null;
            });
        }

    }

})();