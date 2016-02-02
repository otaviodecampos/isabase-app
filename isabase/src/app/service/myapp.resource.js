(function () {
    'use strict'

    angular.module('isabase-app')
        .factory('MyApp', Service);

    /* @ngInject */
    function Service($resource, RESOURCE) {
        return $resource(RESOURCE.myapp, {name: '@name'}, {
            update: {method: 'PUT'},
            create: {method: 'POST'}
        });
    };

})();