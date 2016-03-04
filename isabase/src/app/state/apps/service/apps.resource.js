(function () {
    'use strict'

    angular.module('isabase-app')
        .factory('Apps', Factory);

    /* @ngInject */
    function Factory($resource, RESOURCE_URL) {
        
        var Apps = $resource(RESOURCE_URL.apps, {appName: '@name'}, {
            update: {method: 'PUT'},
            create: {method: 'POST'}
        });

        Apps.prototype.$save = function () {
            var method = this.$create;
            if (this.id != undefined)  {
                method = this.$update;
            }
            return method.apply(this, arguments);
        };
        
        return Apps;
    };

})();