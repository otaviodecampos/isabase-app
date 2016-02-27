(function () {
    'use strict'

    angular.module('isabase-app')
        .factory('Model', Factory);

    /* @ngInject */
    function Factory($resource, RESOURCE) {
        
        var Model = $resource(RESOURCE.model, {appName: 'appName', modelName: '@name'}, {
            update: {method: 'PUT'},
            create: {method: 'POST'}
        });
        
        Model.prototype.$save = function () {
            var method = this.$create;
            if (this.id != undefined)  {
                method = this.$update;
            }
            return method.apply(this, arguments);
        };
        
        return Model;
    };

})();