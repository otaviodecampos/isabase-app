(function () {
    'use strict'

    angular.module('isabase-app')
        .controller('AppsCtrl', Controller);

    /* @ngInject */
    function Controller($previousState, apps, notification, navigation, util) {
        var that = this
            , selectable = true;

        this.selected = null;
        this.myapps = apps.query();

        this.select = function (app) {
            util.doubleTimeout(function() {
                if (selectable) {
                    that.selected = that.selected == app ? null : app;
                }
            });
        }

        this.open = function(app) {
            selectable = false;
            navigation.go('admin.models', { appName: app.name });
        }

        this.removeSelected = function () {
            this.selected.$remove(function () {
                var index = that.myapps.indexOf(that.selected);
                that.myapps.splice(index, 1);
                notification.success('app', that.selected.name, 'removeSuccess');
                that.selected = null;
            }, function (e) {
                notification.error('app', that.selected.name, 'removeFail');
                console.log(e);
            });
        }

        this.init = function (app) {
            if ($previousState.get() && app.name == $previousState.get().params.appName) {
                that.selected = app;
            }
        }
    }

})();