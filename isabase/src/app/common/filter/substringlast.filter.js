(function() {
    'use strict'

    angular.module('isa-common')
        .filter('substringlast', SubstringLast);

    function SubstringLast() {
        return function(str, laststr, sum) {
            if(str) {
                if (sum == undefined) {
                    sum = 0;
                }
                return str.substring(str.lastIndexOf(laststr) + sum, str.length);
            }
        };
    }

})();