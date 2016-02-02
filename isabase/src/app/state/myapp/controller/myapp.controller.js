(function() {
    'use strict'

    angular.module('isabase-app')
        .controller('MyAppCtrl', Controller);

    /* @ngInject */
    function Controller(MyApp) {
        this.selected = null;
        this.myapps = MyApp.query();

        this.select = function(app) {
            if(this.selected == app) {
                app = null;
            }
            this.selected = app;
        }
    }

})();