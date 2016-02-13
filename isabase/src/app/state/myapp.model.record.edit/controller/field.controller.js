(function () {
    'use strict'

    angular.module('isabase-app')
        .controller('FieldCtrl', Controller);

    /* @ngInject */
    function Controller($scope, $stateParams, Record) {
        var field = $scope.field
            , appId = $stateParams.appId;

        $scope.model = $scope.ctrl.record;

        if(field.type == 'model') {
            $scope.data = Record.query({appId: appId, modelName: field.target});
            $scope.dataLabel = 'nome';
        }
    }

})();