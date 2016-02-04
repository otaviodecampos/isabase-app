(function () {
    'use strict'

    angular.module('isabase-app')
        .service('Navigation', Service);

    /* @ngInject */
    function Service($state) {
        
        this.back = function(params) {
            $state.go('^', params);
        };
        
    };

})();