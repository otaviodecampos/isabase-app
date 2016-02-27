(function() {
    'use strict'

    angular.module('isabase-app')
        .config(States);

    /* @ngInject */
    function States($stateProvider) {

        $stateProvider
            .state('app.myapp.models.records', {
                url: '/:modelName/records',
                views: {
                    '@app': {
                        templateUrl: 'isabase-app/records.tpl.html',
                        controller: 'RecordCtrl as ctrl'
                    }
                }
            });

    }

})();