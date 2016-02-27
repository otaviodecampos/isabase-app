(function() {
    'use strict'

    angular.module('isabase-app')
        .config(States);

    /* @ngInject */
    function States($stateProvider) {

        $stateProvider
            .state('admin.app.model.edit', {
                url: '/:modelName/edit',
                views: {
                    '@admin': {
                        templateUrl: 'isabase-app/model-edit.state.tpl.html',
                        controller: 'ModelEditCtrl as ctrl'
                    }
                }
            });

    }

})();