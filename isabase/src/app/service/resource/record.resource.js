(function () {
    'use strict'

    angular.module('isabase-app')
        .factory('Record', Factory);

    /* @ngInject */
    function Factory($resource, RESOURCE) {

        var Record = $resource(RESOURCE.record, {appName: '@appName', modelName: '@modelName', recordId: '@id'}, {
            update: {method: 'PUT'},
            create: {method: 'POST'}
        });

        Record.prototype.$save = function () {
            var method = this.$create;
            if (this.id != undefined) {
                method = this.$update;
            }
            return method.apply(this, arguments);
        };

        return Record;
    };

})();