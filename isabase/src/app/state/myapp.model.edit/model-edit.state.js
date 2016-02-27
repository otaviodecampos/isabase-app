(function() {
    'use strict'

    angular.module('isabase-app')
        .config(States);

    /* @ngInject */
    function States($stateProvider) {

        $stateProvider
            .state('app.myapp.models.edit', {
                url: '/:modelName/edit',
                views: {
                    '@app': {
                        templateUrl: 'isabase-app/model-edit.tpl.html',
                        controller: 'ModelEditCtrl as ctrl'
                    }
                }
            });

    }

})();