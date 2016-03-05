(function () {
    'use strict'

    angular.module('isabase-app')
        .factory('apps', Factory);

    /* @ngInject */
    function Factory($resource, RESOURCE_URL) {
        
        var apps = $resource(RESOURCE_URL.apps, {appName: '@name'}, {
            update: {method: 'PUT'},
            create: {method: 'POST'}
        });

        apps.prototype.$save = function () {
            var method = this.$create;
            if (this.id != undefined)  {
                method = this.$update;
            }
            return method.apply(this, arguments);
        };
        
        return apps;
    };

})();