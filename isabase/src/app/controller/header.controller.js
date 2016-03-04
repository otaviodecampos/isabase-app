(function() {
    'use strict'

    angular.module('isabase-app')
        .controller('HeaderCtrl', Controller);

    /* @ngInject */
    function Controller(HEADER_ITEMS) {

        this.items = HEADER_ITEMS;

    }

})();