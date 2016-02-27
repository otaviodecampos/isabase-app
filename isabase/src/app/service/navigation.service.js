(function () {
    'use strict'

    angular.module('isabase-app')
        .service('Navigation', Service);

    /* @ngInject */
    function Service($state) {
        
        this.back = function(params) {
            console.log('Navigation: back: ' + JSON.stringify(params));
            $state.go('^', params);
        };
        
    };

})();