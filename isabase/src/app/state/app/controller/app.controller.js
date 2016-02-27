(function() {
    'use strict'

    angular.module('isabase-app')
        .controller('AppCtrl', Controller);

    /* @ngInject */
    function Controller($previousState, App, Notification) {
        var that = this;
        var title = 'myapps';

        this.selected = null;
        this.myapps = App.query();

        this.select = function(app) {
            this.selected = this.selected == app ? null : app;
        }

        this.removeSelected = function() {
            this.selected.$remove(function() {
                var index = that.myapps.indexOf(that.selected);
                that.myapps.splice(index, 1);
                Notification.success(title, that.selected.name, 'remove-success');
                that.selected = null;
            }, function(e) {
                Notification.error(title, that.selected.name, 'remove-error');
            });
        }

        this.init = function(app) {
            if($previousState.get() && app.name == $previousState.get().params.appName) {
                that.selected = app;
            }
        }
    }

})();