(function () {
    'use strict'

    angular.module('common')
        .service('jsUtil', Service);

    /* @ngInject */
    function Service() {

        this.getObjectValue = function(value, path) {
            if(angular.isArray(path)) {
                return path.map(function(path) {
                    return getValue(value, path);
                }).filter(function(path) {
                    return path;
                }).join(' - ');
            }
            return getValue(value, path);

            function getValue(value, path) {
                if(value != undefined && path != undefined) {
                    var arr = path.split(".");
                    while(arr.length && (value = value[arr.shift()]));
                }
                return value;
            }
        }

    }

})();