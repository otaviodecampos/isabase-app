(function() {
    'use strict'

    angular.module('isabase-app')
        .controller('MyAppCtrl', Controller);

    /* @ngInject */
    function Controller($state, $stateParams, $previousState, MyApp, Notification) {
        var that = this;
        var title = 'myapps';

        console.log($previousState.get());

        this.selected = null;
        this.myapps = MyApp.query();

        this.select = function(app) {
            this.selected = this.selected == app ? null : app;
            $state.go('.', {selectedApp: this.selected ? this.selected.name : ''}, {notify: false});
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
            if(app.name == $stateParams.selectedApp) {
                that.selected = app;
            }
        }
    }

})();