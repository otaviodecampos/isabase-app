(function () {
    'use strict'

    angular.module('isabase-app')
        .service('Navigation', Service);

    /* @ngInject */
    function Service($state) {
        
        this.back = function() {
            $state.go($state.$current.parent.self.name, $state.params);
        };
        
    };

})();