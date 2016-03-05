(function () {
    'use strict'

    angular.module('isabase-app')
        .factory('records', Factory);

    /* @ngInject */
    function Factory($resource, RESOURCE_URL) {

        var records = $resource(RESOURCE_URL.records, {appName: '@appName', modelName: '@modelName', recordId: '@id'}, {
            update: {method: 'PUT'},
            create: {method: 'POST'}
        });

        records.prototype.$save = function () {
            var method = this.$create;
            if (this.id != undefined) {
                method = this.$update;
            }
            return method.apply(this, arguments);
        };

        return records;
    };

})();