(function() {
    'use strict'

    angular.module('isabase-app')
        .config(States);

    /* @ngInject */
    function States($stateProvider) {

        $stateProvider
            .state('admin.app.model.record.edit', {
                url: '/:recordId/edit',
                views: {
                    '@admin': {
                        templateUrl: 'isabase-app/record-edit.state.tpl.html',
                        controller: 'RecordEditCtrl as ctrl'
                    }
                }
            });

    }

})();