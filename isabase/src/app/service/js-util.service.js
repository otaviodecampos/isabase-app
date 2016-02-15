(function () {
    'use strict'

    angular.module('isabase-app')
        .service('JSUtil', Service);

    /* @ngInject */
    function Service() {

        this.getObjectValue = function(obj, desc) {
            var arr = desc.split(".");
            while(arr.length && (obj = obj[arr.shift()]));
            return obj;
        }

    }

})();