(function() {
    'use strict'

    angular.module('isabase-app')
        .config(States);

    /* @ngInject */
    function States($stateProvider) {

        $stateProvider
            .state('admin.app.model.record', {
                url: '/:modelName/record',
                views: {
                    '@admin': {
                        templateUrl: 'isabase-app/record.state.tpl.html',
                        controller: 'RecordCtrl as ctrl'
                    }
                }
            });

    }

})();