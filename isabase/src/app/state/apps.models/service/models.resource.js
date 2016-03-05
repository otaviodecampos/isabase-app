(function () {
    'use strict'

    angular.module('isabase-app')
        .factory('models', Factory);

    /* @ngInject */
    function Factory($resource, RESOURCE_URL) {
        
        var models = $resource(RESOURCE_URL.models, {appName: 'appName', modelName: '@name'}, {
            update: {method: 'PUT'},
            create: {method: 'POST'}
        });

        models.prototype.$save = function () {
            var method = this.$create;
            if (this.id != undefined)  {
                method = this.$update;
            }
            return method.apply(this, arguments);
        };
        
        return models;
    };

})();