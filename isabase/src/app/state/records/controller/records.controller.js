(function () {
    'use strict'

    angular.module('isabase-app')
        .controller('RecordsCtrl', Controller);

    /* @ngInject */
    function Controller($stateParams, $previousState, notification, navigation, apps, models, records, jsUtil, util) {
        var that = this
            , selectable = true
            , appName = $stateParams.appName
            , modelName = $stateParams.modelName;

        this.selected = null;
        this.apps = apps.query();

        if(appName) {
            this.myapp = apps.get($stateParams);
            this.models = models.query($stateParams);
        }

        /*this.models = models.query({appName: 'all'});*/
        /*this.model = models.get($stateParams);

        this.model.$promise.then(function (model) {
            that.records = records.query($stateParams);
        }, navigation.back);*/

        this.selectApp = function (app) {
            if(!this.myapp || this.myapp.name != app.name) {
                this.myapp = app;
                this.models = models.query({appName: app.name});
                navigation.setParams({appName: app.name});
            }
        }

        this.selectModel = function (app, model) {
            if(!this.model || this.model.name != model.name) {
                this.model = model;
                this.records = records.query({appName: app.name, modelName: model.name});
                navigation.setParams({appName: app.name, modelName: model.name});
            }
        }

        this.select = function (record) {
            util.doubleTimeout(function() {
                that.selected = that.selected == record ? null : record;
            });
        }

        this.open = function(record) {
            selectable = false;
            navigation.go('admin.apps.models.records.edit', { appName: appName, modelName: modelName, recordId: record.id });
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

        this.getModelFieldValue = function (object, field) {
            if (angular.isArray(object)) {
                return object.map(function (value, i) {
                    return jsUtil.getObjectValue(value, field.displayField);
                }).join(',  ');
            }
            return jsUtil.getObjectValue(object, field.displayField);
        }

    }

})();