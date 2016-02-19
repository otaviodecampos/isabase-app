(function () {
    'use strict'

    angular.module('isabase-app')
        .controller('RecordCtrl', Controller);

    /* @ngInject */
    function Controller($stateParams, Notification, MyApp, Model, Record, Navigation, JSUtil) {
        var that = this
            , title = 'records'
            , appId = $stateParams.appId
            , modelId = $stateParams.modelId;

        this.selected = null;
        this.myapp = MyApp.get({id: appId});
        this.model = Model.get({appId: appId, id: modelId});

        this.model.$promise.then(function(model) {
            that.records = Record.query({appId: appId, modelName: model.name });
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
            if (this.selected == record) {
                record = null;
            }
            this.selected = record;
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
            if (record.id == $stateParams.selected) {
                that.selected = record;
            }
        }

    }

})();