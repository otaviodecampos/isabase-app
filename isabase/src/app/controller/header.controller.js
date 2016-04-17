(function() {
    'use strict'

    angular.module('isabase-app')
        .controller('HeaderCtrl', Controller);

    /* @ngInject */
    function Controller(HEADER_ITEMS, HEADER_DROPDOWN_ITEMS) {

        this.items = HEADER_ITEMS;
        this.dropdownItems = HEADER_DROPDOWN_ITEMS;

    }

})();