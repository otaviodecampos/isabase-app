(function() {
    'use strict'

    angular.module('isabase-app')
        .controller('HeaderCtrl', Controller);

    /* @ngInject */
    function Controller(HEADER) {

        this.items = HEADER.topbar;
        this.dropdownItems = HEADER.userMenu;

    }

})();