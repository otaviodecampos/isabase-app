(function() {
    'use strict'

    angular.module('common')
        .filter('substring', Substring);

    function Substring() {
        return function(str, start, end) {
            if(str) {
                return str.substring(start, end);
            }
        };
    }

})();