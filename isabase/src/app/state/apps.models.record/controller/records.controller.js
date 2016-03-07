(function () {
    'use strict'

    angular.module('isabase-app')
        .controller('RecordsCtrl', Controller);

    /* @ngInject */
    function Controller($stateParams, $previousState, notification, navigation, models, records, jsUtil) {
        var that = this
            , appName = $stateParams.appName
            , modelName = $stateParams.modelName;

        this.selected = null;
        this.model = models.get($stateParams);

        this.model.$promise.then(function (model) {
            that.records = records.query($stateParams);
        }, navigation.back);

        this.getModelFieldValue = function (object, field) {
            if (angular.isArray(object)) {
                return object.map(function (value, i) {
                    return jsUtil.getObjectValue(value, field.displayField);
                }).join(',  ');
            }
            return jsUtil.getObjectValue(object, field.displayField);
        }

        this.select = function (record) {
            this.selected = this.selected == record ? null : record;
        }

        this.removeSelected = function () {
            this.selected.$remove($stateParams, function () {
                var index = that.records.indexOf(that.selected);
                that.records.splice(index, 1);
                notification.success('record', that.selected.id, 'removeSuccess');
                that.selected = null;
            }, function (e) {
                notification.error('record', that.selected.id, 'removeFail');
            });
        }

        this.init = function (record) {
            if ($previousState.get() && record.id == $previousState.get().params.recordId) {
                that.selected = record;
            }
        }

    }

})();