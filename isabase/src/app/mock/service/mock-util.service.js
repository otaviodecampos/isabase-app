(function() {
    'use strict'

    angular.module('isabase-mock')
        .service('MockUtil', Service);

    /* @ngInject */
    function Service() {

        this.array = function (array) {
            var mock = {};

            angular.forEach(array, function(item, i) {
                mock[i] = item;
                item.id = i;
            });

            return mock;
        }

        this.url = function (url) {
            url = url.replace(/\/:\w+/g, '/?');
            url = url.substring(0, url.lastIndexOf('/?'));
            return url;
        }

    };

})();