(function() {
    'use strict'

    angular.module('isabase-app')
        .controller('TopmenuCtrl', Controller);

    /* @ngInject */
    function Controller(TOPMENU) {

        this.menu = TOPMENU;

    }

})();