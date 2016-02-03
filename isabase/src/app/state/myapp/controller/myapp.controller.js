(function() {
    'use strict'

    angular.module('isabase-app')
        .controller('MyAppCtrl', Controller);

    /* @ngInject */
    function Controller(MyApp) {
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
                that.selected = null;
            }, function(error) {
                console.log(error);
            });
        }
    }

})();