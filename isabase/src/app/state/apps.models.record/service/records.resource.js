(function () {
    'use strict'

    angular.module('isabase-app')
        .factory('records', Factory);

    /* @ngInject */
    function Factory($resource, resourceUtil, RESOURCE_URL) {

        var records = $resource(RESOURCE_URL.records, {appName: 'appName', modelName: 'modelName', recordId: '@id'}, {
            update: {method: 'PUT'},
            create: {method: 'POST'}
        });

        resourceUtil.decorateWithNewIndicator(records);
        resourceUtil.decorateWithCreateOrUpdateByProperty(records);

        return records;
    };

})();