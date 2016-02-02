(function() {
    'use strict'

    angular.module('isabase-app')
        .controller('MyAppCtrl', Controller);

    /* @ngInject */
    function Controller(MyApp) {
        this.myapps = MyApp.query();
    }

})();