(function () {
    'use strict'

    angular.module('isabase-app')
        .factory('App', Factory);

    /* @ngInject */
    function Factory($resource, RESOURCE) {
        
        var MyApp = $resource(RESOURCE.app, {appName: '@name'}, {
            update: {method: 'PUT'},
            create: {method: 'POST'}
        });
        
        MyApp.prototype.$save = function () {
            var method = this.$create;
            if (this.id != undefined)  {
                method = this.$update;
            }
            return method.apply(this, arguments);
        };
        
        return MyApp;
    };

})();