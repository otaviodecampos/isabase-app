(function() {
    'use strict'

    angular.module('isabase-app')
        .config(States);

    /* @ngInject */
    function States($stateProvider) {

        $stateProvider
            .state('admin.app.edit', {
                url: '/:appName/edit',
                views: {
                    '@admin': {
                        templateUrl: 'isabase-app/app-edit.state.tpl.html',
                        controller: 'AppEditCtrl as ctrl'
                    }
                }
            });

    }

})();