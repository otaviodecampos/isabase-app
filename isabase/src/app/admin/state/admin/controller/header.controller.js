(function() {
    'use strict'

    angular.module('isabase-app')
        .controller('HeaderCtrl', Controller);

    /* @ngInject */
    function Controller(HEADER, Auth) {

        this.items = HEADER.topbar;
        this.dropdownItems = HEADER.userMenu;

    }

})();