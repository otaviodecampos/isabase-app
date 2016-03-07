(function () {
    'use strict'

    angular.module('isabase-app')
        .factory('models', Factory);

    /* @ngInject */
    function Factory($resource, resourceUtil, RESOURCE_URL) {
        
        var models = $resource(RESOURCE_URL.models, {appName: 'appName', modelName: '@name'}, {
            update: {method: 'PUT'},
            create: {method: 'POST'}
        });

        resourceUtil.decorateWithNewIndicator(models);
        resourceUtil.decorateWithCreateOrUpdateByProperty(models);

        return models;
    };

})();