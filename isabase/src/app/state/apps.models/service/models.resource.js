(function () {
    'use strict'

    angular.module('isabase-app')
        .factory('Models', Factory);

    /* @ngInject */
    function Factory($resource, RESOURCE_URL) {
        
        var Models = $resource(RESOURCE_URL.models, {appName: 'appName', modelName: '@name'}, {
            update: {method: 'PUT'},
            create: {method: 'POST'}
        });

        Models.prototype.$save = function () {
            var method = this.$create;
            if (this.id != undefined)  {
                method = this.$update;
            }
            return method.apply(this, arguments);
        };
        
        return Models;
    };

})();