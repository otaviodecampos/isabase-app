(function() {
    'use strict'

    angular.module('isabase-app')
        .config(States);

    /* @ngInject */
    function States($stateProvider) {

        $stateProvider
            .state('app.myapp.models.records.edit', {
                url: '/:recordId/edit',
                views: {
                    '@app': {
                        templateUrl: 'isabase-app/record-edit.tpl.html',
                        controller: 'RecordEditCtrl as ctrl'
                    }
                }
            });

    }

})();