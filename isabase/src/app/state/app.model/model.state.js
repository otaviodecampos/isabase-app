(function() {
    'use strict'

    angular.module('isabase-app')
        .config(States);

    /* @ngInject */
    function States($stateProvider) {

        $stateProvider
            .state('admin.app.model', {
                url: '/:appName/model',
                views: {
                    '@admin': {
                        templateUrl: 'isabase-app/model.state.tpl.html',
                        controller: 'ModelCtrl as ctrl'
                    }
                }
            });

    }

})();