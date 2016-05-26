(function () {
    'use strict'

    angular.module('isabase-app')
        .controller('AppsCtrl', Controller);

    /* @ngInject */
    function Controller(apps) {
        var that = this;

        that.selected = null;
        that.myapps = apps.query();

    }

})();