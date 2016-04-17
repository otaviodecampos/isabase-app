(function () {
    'use strict'

    angular.module('isabase-app')
        .controller('ModelsCtrl', Controller);

    /* @ngInject */
    function Controller($stateParams, $previousState, notification, apps, models, navigation, util) {
        var that = this
            , selectable = true
            , appName = $stateParams.appName;

        this.selected = null;
        this.apps = apps.query();

        if(appName) {
            this.myapp = apps.get($stateParams);
            this.models = models.query($stateParams);
        }

        this.selectApp = function (app) {
            if(!this.myapp || this.myapp.name != app.name) {
                this.myapp = app;
                this.models = models.query({appName: app.name});
                navigation.setParams({appName: app.name});
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
            navigation.go('admin.models.records', { appName: appName, modelName: model.name });
        }

        this.removeSelected = function () {
            this.selected.$remove($stateParams, function () {
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