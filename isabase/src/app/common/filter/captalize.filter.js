(function() {
    'use strict'

    angular.module('common')
        .filter('capitalize', Filter);

    function Filter() {
        return function(text) {
            if(text) {
                return text.substring(0, 1).toUpperCase() + text.substring(1).toLowerCase();
            }
        }
    }

})();