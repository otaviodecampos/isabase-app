(function () {
    'use strict'

    angular.module('isabase-app')
        .controller('RecordCtrl', Controller);

    /* @ngInject */
    function Controller($stateParams, $previousState, Notification, App, Model, Record, JSUtil) {
        var that = this
            , title = 'records'
            , appName = $stateParams.appName
            , modelName = $stateParams.modelName;

        this.selected = null;
        this.myapp = App.get($stateParams);
        this.model = Model.get($stateParams);

        this.model.$promise.then(function(model) {
            that.records = Record.query($stateParams);
        });

        this.getModelFieldValue = function(object, field) {
            if(angular.isArray(object)) {
                return object.map(function(value, i) {
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
                Notification.success(title, that.selected.id, 'remove-success');
                that.selected = null;
            }, function (e) {
                Notification.error(title, that.selected.id, 'remove-error');
            });
        }

        this.init = function (record) {
            if($previousState.get() && record.id == $previousState.get().params.recordId) {
                that.selected = record;
            }
        }

    }

})();