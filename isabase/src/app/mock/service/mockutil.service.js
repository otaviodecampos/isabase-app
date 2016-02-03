(function() {
    'use strict'

    angular.module('isabase-mock')
        .service('MockUtil', Service);

    /* @ngInject */
    function Service() {

        this.array = function (array, fieldNameId) {
            var mock = {};

            angular.forEach(array, function(item, i) {
                var id = item[fieldNameId];
                mock[id] = item;
                item.id = i;
            });

            return mock;
        }

        this.url = function (url) {
            var match = url.match(/\/:\w+/);
            if(match) {
                url = url.substring(0, url.indexOf(match[0]));
            }
            return url;
        }

    };

})();