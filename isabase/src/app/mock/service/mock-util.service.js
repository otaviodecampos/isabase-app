(function() {
    'use strict'

    angular.module('isa-mock')
        .service('mockUtil', Service);

    /* @ngInject */
    function Service() {

        this.array = function (array) {
            var mock = {};

            angular.forEach(array, function(item, i) {
                var id = item.id != undefined ? item.id : i;
                mock[id] = item;
                item.id = id;
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