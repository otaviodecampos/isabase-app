(function () {
    'use strict'

    angular.module('isabase-app')
        .controller('RecordsCtrl', Controller);

    /* @ngInject */
    function Controller($stateParams, $previousState, Notification, Apps, Models, Records, JSUtil) {
        var that = this
            , appName = $stateParams.appName
            , modelName = $stateParams.modelName;

        this.selected = null;
        this.myapp = Apps.get($stateParams);
        this.model = Models.get($stateParams);

        this.model.$promise.then(function (model) {
            that.records = Records.query($stateParams);
        });

        this.getModelFieldValue = function (object, field) {
            if (angular.isArray(object)) {
                return object.map(function (value, i) {
                    return JSUtil.getObjectValue(value, field.displayField);
                }).join(',  ');
            }
            return JSUtil.getObjectValue(object, field.displayField);
        }

        this.select = function (record) {
            this.selected = this.selected == record ? null : record;
        }

        this.removeSelected = function () {
            this.selected.$remove(function () {
                var index = that.records.indexOf(that.selected);
                that.records.splice(index, 1);
                Notification.success('record', that.selected.id, 'removeSuccess');
                that.selected = null;
            }, function (e) {
                Notification.error('record', that.selected.id, 'removeFail');
            });
        }

        this.init = function (record) {
            if ($previousState.get() && record.id == $previousState.get().params.recordId) {
                that.selected = record;
            }
        }

    }

})();