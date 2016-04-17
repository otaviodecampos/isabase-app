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
        this.myapp = null;
        this.apps = apps.query();

        if(appName) {
            apps.get($stateParams, function(app) {
                that.selectApp(app);
            });
        }

        if(appName && modelName) {
            models.get($stateParams, function(model) {
                that.selectModel(that.myapp, model);
            });
        }

        this.selectApp = function (app) {
            if(!this.myapp || this.myapp.name != app.name) {
                this.myapp = app;
                this.models = models.query({appName: app.name});
                this.records = null;
                navigation.setParams({appName: app.name});
            }
        }

        this.selectModel = function (app, model) {
            if(!this.model || this.model.name != model.name) {
                this.records = records.query({appName: app.name, modelName: model.name}, function() {
                    that.model = model;
                });
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
            navigation.go('admin.records.edit', { appName: appName, modelName: modelName, recordId: record.id });
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