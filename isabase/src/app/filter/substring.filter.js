(function() {
    'use strict'

    angular.module('isabase-app')
        .filter('substring', Substring)
        .filter('substringlast', SubstringLast);

    function Substring() {
        return function(str, start, end) {
            if(str) {
                return str.substring(start, end);
            }
        };
    }

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