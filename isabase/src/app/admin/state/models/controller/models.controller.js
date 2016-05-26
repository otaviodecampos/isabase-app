(function () {
    'use strict'

    angular.module('isabase-app')
        .controller('ModelsCtrl', Controller);

    /* @ngInject */
    function Controller($stateParams, $previousState, notification, apps, models, navigation, util) {
        var that = this
            , selectable = true
            , appName = $stateParams.appName || navigation.getCurrentParam('appName');

        this.selected = null;
        this.apps = apps.query();

        if(appName) {
            this.myapp = apps.get({appName: appName});
            this.models = models.query({appName: appName});
        }

        this.selectApp = function (app) {
            if(!this.myapp || this.myapp.name != app.name) {
                this.myapp = app;
                this.models = models.query({appName: app.name});
                appName = navigation.setCurrentParam('appName', app.name);
            }
        }

        this.select = function (model) {
            util.doubleTimeout(function() {
                if (selectable) {
                    that.selected = that.selected == model ? null : model;
                }
            });
        }

        this.open = function(model) {
            selectable = false;
            navigation.go('admin.records', { appName: appName, modelName: model.name });
        }

        this.removeSelected = function () {
            this.selected.$remove({appName: appName}, function () {
                var index = that.models.indexOf(that.selected);
                that.models.splice(index, 1);
                notification.success('model', that.selected.name, 'removeSuccess');
                that.selected = null;
            }, function (e) {
                notification.error('model', that.selected.name, 'removeError');
                console.log(e);
            });
        }

        this.init = function (model) {
            if($previousState.get() && model.name == $previousState.get().params.modelName) {
                that.selected = model;
            }
        }

    }

})();