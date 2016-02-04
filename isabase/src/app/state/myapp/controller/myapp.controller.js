(function() {
    'use strict'

    angular.module('isabase-app')
        .controller('MyAppCtrl', Controller);

    /* @ngInject */
    function Controller($stateParams, MyApp, Notification) {
        var that = this;

        this.selected = null;
        this.myapps = MyApp.query();

        this.select = function(app) {
            if(this.selected == app) {
                app = null;
            }
            this.selected = app;
        }

        this.removeSelected = function() {
            this.selected.$remove(function() {
                var index = that.myapps.indexOf(that.selected);
                that.myapps.splice(index, 1);
                Notification.success('myapps', that.selected.name, 'remove-success');
                that.selected = null;
            }, function(e) {
                Notification.error('myapps', that.selected.name, 'remove-error');
            });
        }

        this.init = function(app) {
            if(app.id == $stateParams.selected) {
                that.selected = app;
            }
        }
    }

})();