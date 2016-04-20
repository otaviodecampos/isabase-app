(function () {
    'use strict'

    angular.module('isabase-app')
        .factory('apps', Factory);

    /* @ngInject */
    function Factory($resource, resourceUtil, RESOURCE_URL) {

        var apps = $resource(RESOURCE_URL.apps, {appName: '@name'}, {
            update: {method: 'PUT'},
            create: {method: 'POST'}
        });

        resourceUtil.decorateWithNewIndicator(apps);
        resourceUtil.decorateWithCreateOrUpdateByProperty(apps);

        return apps;
    };

})();