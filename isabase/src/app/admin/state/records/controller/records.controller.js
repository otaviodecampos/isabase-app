(function () {
    'use strict'

    angular.module('isabase-app')
        .controller('RecordsCtrl', Controller);

    /* @ngInject */
    function Controller($stateParams, $previousState, notification, navigation, apps, models, records, jsUtil, util) {
        var that = this
            , selectable = true
            , appName = $stateParams.appName || navigation.getCurrentParam('appName')
            , modelName = $stateParams.modelName || navigation.getCurrentParam('modelName');

        this.selected = null;
        this.myapp = null;
        this.apps = apps.query();

        if(appName) {
            apps.get({appName: appName}, function(app) {
                that.selectApp(app);
            });
        }

        if(appName && modelName) {
            models.get({appName: appName, modelName: modelName}, function(model) {
                that.selectModel(appName, model);
            });
        }

        this.selectApp = function (app) {
            that.model = null;
            this.myapp = app;
            this.models = models.query({appName: app.name});
            appName = navigation.setCurrentParam('appName', app.name);
        }

        this.selectModel = function (appName, model) {
            that.model = model;
            that.loadRecords(appName, model.name);
            appName = navigation.setCurrentParam('appName', appName);
            modelName = navigation.setCurrentParam('modelName', model.name);
        }

        this.loadRecords = function(appName, modelName) {
            if(appName && modelName) {
                this.records = records.query({appName: appName, modelName: modelName});
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