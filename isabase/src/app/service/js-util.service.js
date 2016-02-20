(function () {
    'use strict'

    angular.module('isabase-app')
        .service('JSUtil', Service);

    /* @ngInject */
    function Service() {

        this.getObjectValue = function(obj, path) {
            if(angular.isArray(path)) {
                return path.map(function(path) {
                    return getValue(obj, path);
                }).join(' - ');
            }
            return getValue(obj, path);

            function getValue(obj, path) {
                var arr = path.split(".");
                while(arr.length && (obj = obj[arr.shift()]));
                return obj;
            }
        }

    }

})();